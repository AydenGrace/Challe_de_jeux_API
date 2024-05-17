const Contact = require("../models/contact.schema");

const getEmailForm = async (req, res) => {
  const { name, email, subject, content, date } = req.body;
  console.log(body);
  const newContact = new Contact({
    name,
    email,
    subject,
    content,
    date,
  });
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

  await sendContactForm(newContact);
};

module.exports = { getEmailForm };
