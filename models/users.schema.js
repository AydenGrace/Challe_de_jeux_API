const schema = require("mongoose").Schema;

const userSchema = schema({
  email: String,
  password: String,
  name: { type: String, default: "Guest" },
});

module.exports = userSchema;
