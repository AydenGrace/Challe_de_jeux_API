const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const roomSchema = schema({
  name: { type: String, required: true, unique: true },
  overview: String,
  duration: { type: Number, default: 60 },
  difficulty: { type: Number, default: 1 },
  base_price: { type: Number, default: 24 },
  tags: [{ type: schema.Types.ObjectId, ref: "room_tag" }],
  imgs: [{ type: String }],
});

module.exports = mongoose.model("rooms", roomSchema);
