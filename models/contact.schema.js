const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const contactSchema = schema({
  name: { type: String, default: "Guest" },
  email: String,
  subject: { type: String, default: "La Challe de Jeux - Contact" },
  content: String,
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("contact", contactSchema);
