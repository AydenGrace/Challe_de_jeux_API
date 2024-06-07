const schema = require("mongoose").Schema;
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, required: true },
    token: String,
    password_token: String,
    role: { type: ObjectId, ref: "roles" },
    archievements: [{ type: ObjectId, ref: "user_archivements" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
