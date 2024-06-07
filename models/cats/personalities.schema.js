const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const personalitiesSchema = schema({
  content: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("cat_personalities", personalitiesSchema);
