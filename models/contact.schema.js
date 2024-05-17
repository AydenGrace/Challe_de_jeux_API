const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Guest" },
    email: String,
    subject: { type: String, default: "La Challe de Jeux - Contact" },
    content: String,
    date: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);
