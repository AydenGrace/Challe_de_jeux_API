const User = require("../models/users.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendValidationAccount,
  sendInvalideToken,
  sendChangePwd,
} = require("../email/email");

const createTokenEmail = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "1h" });
};

const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const token = createTokenEmail(email);
      console.log(token);
      // Encode data before passing it in the URL
      const encodedPayload = token.replace(/\./g, ",");
      console.log(encodedPayload);
      // Now you can use `encodedPayload` in the URL
      await sendConfirmationEmail(email, encodedPayload);
      const salt = await bcrypt.genSalt(10);
      const hashpwd = await bcrypt.hash(password, salt);
      const user = new User({
        username,
        email,
        password: hashpwd,
        token,
      });
      await user.save();
      res.status(200).json({
        message:
          "Veuillez confirmer votre inscription en consultant votre boite mail",
        status: 200,
      });
    } else {
      res.json({ message: "Compte déjà existant.", status: 400 });
    }
  } catch (error) {
    res.json({ error: error.message });
    console.error(error);
  }
};

const verifyMail = async (req, res) => {
  const token = req.params.token;
  const isTokenNull = await User.findOne({ token: token });
  const decoded = jwt.verify(token, process.env.SECRET, {
    ignoreExpiration: true,
  });
  console.log(decoded);
  try {
    if (!isTokenNull) {
      res.json({ message: "Token déjà validé.", status: 400 });
      return;
    }
    if (decoded.exp * 1000 > new Date().getTime()) {
      //Token encore valide
      await User.findOneAndUpdate({ email: decoded.email }, { token: null });
      await sendValidationAccount(decoded.email);
      res.json({ message: "Inscription confirmée avec succès.", status: 200 });
    } else {
      await User.findOneAndDelete({ email: decoded.email });
      await sendInvalideToken(decoded.email);
      res.json({ message: "Token non valide ou expiré.", status: 400 });
    }
  } catch (error) {
    console.error(error);
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.token) {
        res.json({
          message: "Compte non validé.",
          status: 400,
        });
        return;
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.status(200).json({ user, status: 200 });
      } else {
        res.json({
          message: "Combinaison email/mot de passe incorrect.",
          status: 400,
        });
      }
    } else {
      res.json({
        message: "Combinaison email/mot de passe incorrect.",
        status: 400,
      });
    }
  } catch (error) {
    res.json({ error: error.message });
    console.error(error);
  }
};

const ForgotPwd = async (req, res) => {
  const { email } = req.body;
  try {
    const token = createTokenEmail(email);
    const user = await User.findOneAndUpdate(
      { email },
      { password_token: token }
    );
    if (user) {
      const encodedPayload = token.replace(/\./g, ",");
      console.log(encodedPayload);
      await sendChangePwd(email, encodedPayload);
      res.json({
        message: "Demande enregistrée.",
        status: 200,
      });
    } else {
      res.json({
        message: "Aucun compte correspondant.",
        status: 400,
      });
    }
  } catch (error) {
    res.json({ error: error.message });
    console.error(error);
  }
};

module.exports = { Register, verifyMail, Login, ForgotPwd };
