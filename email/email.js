const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendContactForm = async (content) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_MAIL,
    subject: "Nouveau formulaire de contact : " + content.subject,
    html: `<p>De: ${content.name}<br/>Email : ${
      content.email
    }<br/>Daté du : ${content.date.toLocaleDateString(
      "fr-FR"
    )} à ${content.date.toLocaleTimeString("fr-FR")}<br/><br/>${
      content.content
    }</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendConfirmationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Confirmation d'inscription",
    html: `<p>Merci de vous être inscrit ! Cliquez sur le lien suivant pour confirmer l'inscription : <a href="${process.env.BASE_URL}/verify_mail/${token}">Confirmer l'inscription</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendValidationAccount = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Inscription validée",
    html: `<p>Bienvenue sur notre site ! Cliquez sur le lien pour vous connecter : <a href="${process.env.BASE_URL}">Se connecter</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendInvalideToken = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Problème lors de la validation de votre compte.",
    html: `<p>Le temps d'inscription a expiré. Cliquez sur le lien pour vous inscrire à nouveau : <a href="${process.env.BASE_URL}">S'inscrire</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendChangePwd = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Demande de changement de mot de passe.",
    html: `<p>Votre demande de changement de mot de passe a bien été reçue. Si cette demande n'est pas de votre initiative, merci d'ignorer le lien suivant : <a href="${process.env.BASE_URL}/change_password/${token}">Modifier mon mot de passe</a>.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendConfirmationEmail,
  sendValidationAccount,
  sendInvalideToken,
  sendChangePwd,
  sendContactForm,
};
