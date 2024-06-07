const schema = require("mongoose").Schema;
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const categorySchema = schema({
  content: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("menu_categories", categorySchema);
