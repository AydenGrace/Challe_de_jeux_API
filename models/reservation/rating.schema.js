const schema = require("mongoose").Schema;
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ratingSchema = schema(
  {
    reservation: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "reservation",
    },
    user: { type: schema.Types.ObjectId, required: true, ref: "users" },
    stars: { type: Number, required: true },
    comment: { type: String },
  },
  { timestamp: true }
);

module.exports = mongoose.model("reservation_rating", ratingSchema);
