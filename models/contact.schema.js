const schema = require("mongoose").Schema;

const contactSchema = schema({
  name: { type: String, default: "Guest" },
  email: String,
  subject: { type: String, default: "La Challe de Jeux - Contact" },
  content: String,
  date: { type: Date, default: Date.now() },
});

module.exports = contactSchema;
