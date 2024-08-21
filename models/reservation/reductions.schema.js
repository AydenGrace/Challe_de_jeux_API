const schema = require("mongoose").Schema;
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const reductionSchema = schema(
  {
    pourcentage: { type: Number },
    directValue: { type: Number },
    isOnlyOne: { type: Boolean, required: true },
    code: { type: String, required: true, unique: true },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("reservation_reductions", reductionSchema);
