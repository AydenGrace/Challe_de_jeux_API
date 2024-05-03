const router = require("express").Router();
const mongoose = require("mongoose");
const contactSchema = require("./../../models/contact.schema");
const Contact = mongoose.model("contact", contactSchema);

router.get("/", (req, res) => {
  res.send("Contact");
});

router.post("/send", (req, res) => {
  const body = req.body;
  console.log(body);
  const newContact = new Contact(body);
  newContact
    .save()
    .then((t) => {
      console.log(t);
      res.status(200).json(t);
    })
    .catch((e) => {
      console.error(e);
      res.status(400).send("Add Error");
    });
});

module.exports = router;
