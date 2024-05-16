const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const userSchema = new schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: String,
    password_token: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
