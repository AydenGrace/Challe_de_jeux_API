const router = require("express").Router();
const mongoose = require("mongoose");
const contactSchema = require("./../../models/contact.schema");
const { getEmailForm } = require("../../contollers/contact-controller");
const Contact = mongoose.model("contact", contactSchema);

router.get("/", (req, res) => {
  res.send("Contact");
});

router.post("/send", getEmailForm);

module.exports = router;
