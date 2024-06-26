const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const archievementSchema = schema({
  content: { type: String, required: true, unique: true },
  points: { type: Number, required: true },
  img: { type: String },
});

module.exports = mongoose.model("user_archivements", archievementSchema);
