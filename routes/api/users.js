const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("./../../models/users.schema");
const User = mongoose.model("users", userSchema);
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Users");
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  let stop = false;
  const users = new User({
    username,
    email,
    password: await bcrypt.hash(password, 12),
  });

  await User.findOne({ email: email })
    .then((t) => {
      res.status(201).json({ status: 400, message: "Email déjà utilisé" });
      stop = true;
    })
    .catch((err) =>
      res.json({ status: 400, message: "Une erreur est survenue", error: err })
    );

  if (stop) return;

  users
    .save()
    .then((t) => res.status(200).json({ status: 200, user: t }))
    .catch((err) =>
      res.json({ status: 400, message: "Une erreur est survenue", error: err })
    );
});

router.post("/login", (req, res) => {
  res.send("Users");
});

module.exports = router;
