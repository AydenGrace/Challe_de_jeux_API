const schema = require("mongoose").Schema;

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

const Pedigree = require("mongoose").model("cat_pedigree", pedigreeSchema);
const Coat = require("mongoose").model("cat_coat", coatsSchema);
const Diseases = require("mongoose").model("cat_diseases", diseasesSchema);
const Compatibilities = require("mongoose").model(
  "cat_compatibilities",
  compatibilitiesSchema
);
const Personalities = require("mongoose").model(
  "cat_personalities",
  personalitiesSchema
);

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
