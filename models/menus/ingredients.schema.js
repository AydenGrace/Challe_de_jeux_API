const schema = require("mongoose").Schema;
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ingredientSchema = schema({
  name: { type: String, required: true, unique: true },
  isMeal: { type: Boolean, required: true },
  isVegan: { type: Boolean, required: true },
});

module.exports = mongoose.model("menu_ingredients", ingredientSchema);
