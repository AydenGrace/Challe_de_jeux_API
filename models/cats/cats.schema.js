const schema = require("mongoose").Schema;
const mongoose = require("mongoose");


const catSchema = schema({
  name: String,
  overview: String,
  img: { type: String, default: "./img/cats/default.webp" },
  born_date: { type: Date, default: Date.now() },
  arrival_date: { type: Date, default: Date.now() },
  adopted_date: { type: Date, default: null },
  death_date: { type: Date, default: null },
  pedigree: { type: schema.Types.ObjectId, ref: "cat_pedigree" },
  coat: [{ type: schema.Types.ObjectId, ref: "cat_coat" }],
  diseases: [{ type: schema.Types.ObjectId, ref: "cat_diseases" }],
  compatibilities: [{ type: schema.Types.ObjectId, ref: "cat_compatibilities" }],
  personalities: [{ type: schema.Types.ObjectId, ref: "cat_personalities" }],
});

module.exports = mongoose.model("cats", catSchema);
