const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const pedigreeSchema = schema({
  content: String,
});

const diseasesSchema = schema({
  content: String,
});

const compatibilitiesSchema = schema({
  content: String,
});

const personalitiesSchema = schema({
  content: String,
});

const coatsSchema = schema({
  content: String,
});

const Pedigree = mongoose.model("cat_pedigree", pedigreeSchema);
module.exports = mongoose.model("cat_pedigree", pedigreeSchema);
const Coat = mongoose.model("cat_coat", coatsSchema);
module.exports = mongoose.model("cat_coat", coatsSchema);
const Diseases = mongoose.model("cat_diseases", diseasesSchema);
module.exports = mongoose.model("cat_diseases", diseasesSchema);
const Compatibilities = mongoose.model(
  "cat_compatibilities",
  compatibilitiesSchema
);
module.exports = mongoose.model("cat_compatibilities", compatibilitiesSchema);
const Personalities = mongoose.model("cat_personalities", personalitiesSchema);
module.exports = mongoose.model("cat_personalities", personalitiesSchema);

const catSchema = schema({
  name: String,
  overview: String,
  img: { type: String, default: "./img/cats/default.webp" },
  born_date: { type: Date, default: Date.now() },
  arrival_date: { type: Date, default: Date.now() },
  adopted_date: { type: Date, default: null },
  death_date: { type: Date, default: null },
  pedigree: { type: schema.ObjectId, ref: "Pedigree" },
  coat: [{ type: schema.ObjectId, ref: "Coat" }],
  diseases: [{ type: schema.ObjectId, ref: "Diseases" }],
  compatibilities: [{ type: schema.ObjectId, ref: "compatibilities" }],
  personalities: [{ type: schema.ObjectId, ref: "Personalities" }],
});

module.exports = mongoose.model("cats", catSchema);
