const { sendContactForm } = require("../email/email");
const Contact = require("../models/communication/contact.schema");

const getEmailForm = async (req, res) => {
  const { name, email, subject, content } = req.body;
  const newContact = new Contact({
    name,
    email,
    subject,
    content,
    date: new Date(),
  });
  await sendContactForm(newContact);
  await newContact
    .save()
    .then((t) => {
      console.log(t);
      res.status(200).json(t);
    })
    .catch((e) => {
      console.error(e);
      res.status(400).send("Add Error");
    });
};

module.exports = { getEmailForm };
