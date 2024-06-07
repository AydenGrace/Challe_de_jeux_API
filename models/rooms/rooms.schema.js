const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const roomSchema = schema({
  name: String,
  overview: String,
  duration: { type: Number, default: 60 },
  difficulty: { type: Number, default: 1 },
  base_price: { type: Number, default: 24 },
  tags: [{ type: schema.Types.ObjectId, ref: "room_tags" }],
  imgs: [{ type: String }],
});

module.exports = mongoose.model("rooms", roomSchema);
