const schema = require("mongoose").Schema;

const userSchema = new schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: String,
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
