const schema = require("mongoose").Schema;
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const menuSchema = schema({
  name: { type: String, required: true, unique: true },
  ingredients: [
    { type: schema.Types.ObjectId, required: true, ref: "menu_ingredients" },
  ],
  category: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "menu_categories",
  },
});

module.exports = mongoose.model("menu", menuSchema);
