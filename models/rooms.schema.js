const schema = require("mongoose").Schema;

const roomSchema = schema({
  name: String,
  overview: String,
  img: { type: String, default: "./img/cats/default.webp" },
  duration: { type: Number, default: 60 },
  difficulty: { type: Number, default: 1 },
  base_price: { type: Number, default: 24 },
  tags: { type: Array, default: [] },
});

module.exports = roomSchema;
