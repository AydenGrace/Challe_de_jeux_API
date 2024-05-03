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
  const users = new User({
    username,
    email,
    password: await bcrypt.hash(password, 12),
  });
  users
    .save()
    .then((t) => res.status(200).json(t))
    .catch((err) =>
      res.json({ message: "Une erreur est survenue", error: err })
    );
});

router.post("/login", (req, res) => {
  res.send("Users");
});

module.exports = router;
