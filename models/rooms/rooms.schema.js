const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const roomSchema = schema({
  name: String,
  overview: String,
  img: { type: String, default: "./img/cats/default.webp" },
  duration: { type: Number, default: 60 },
  difficulty: { type: Number, default: 1 },
  base_price: { type: Number, default: 24 },
  tags: [{ type: schema.Types.ObjectId, ref: "room_tags" }],
});

module.exports = mongoose.model("rooms", roomSchema);
