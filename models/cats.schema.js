const schema = require("mongoose").Schema;

const catSchema = schema({
  name: String,
  overview: String,
  img: { type: String, default: "./img/cats/default.webp" },
  born_date: { type: Date, default: Date.now() },
  arrival_date: { type: Date, default: Date.now() },
  adopted_date: { type: Date, default: null },
  death_date: { type: Date, default: null },
  pedigree: { type: String, default: "Européen" },
  robe: String,
  disease: { type: Array, default: [] },
  compatible: { type: Array, default: [] },
  personality: { type: Array, default: [] },
});

module.exports = catSchema;
