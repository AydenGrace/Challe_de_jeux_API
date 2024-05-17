const router = require("express").Router();
const mongoose = require("mongoose");
const contactSchema = require("./../../models/contact.schema");
const Contact = mongoose.model("contact", contactSchema);

router.get("/", (req, res) => {
  res.send("Contact");
});

router.post("/send", getEmailForm);

module.exports = router;
