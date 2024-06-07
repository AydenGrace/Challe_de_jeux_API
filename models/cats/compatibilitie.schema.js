const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const compatibilitiesSchema = schema({
  content: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("cat_compatibilities", compatibilitiesSchema);
