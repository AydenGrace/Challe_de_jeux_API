const schema = require("mongoose").Schema;

const userSchema = schema({
  email: String,
  password: String,
  username: { type: String, default: "Guest" },
});

module.exports = userSchema;
