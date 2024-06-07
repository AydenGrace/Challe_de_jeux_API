const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const diseasesSchema = schema({
  content: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("cat_diseases", diseasesSchema);
