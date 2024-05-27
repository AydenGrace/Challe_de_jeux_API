const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const roleSchema = new schema({
  name: { type: String, unique: true },
  power: Number,
});

module.exports = mongoose.model("roles", roleSchema);
