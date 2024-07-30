const schema = require("mongoose").Schema;
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const reservationSchema = schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    price: { type: Number, required: true },
    nbPlayers: { type: Number, required: true },
    isPayed: { type: Boolean, required: true },
    session: {
      type: schema.Types.ObjectId,
      ref: "sessions",
      required: true,
    },
    reductions: [
      {
        type: schema.Types.ObjectId,
        ref: "reservation_reductions",
      },
    ],
    user: { type: schema.Types.ObjectId, ref: "users" },
  },
  {
    Timestamp: true,
  }
);

module.exports = mongoose.model("reservation", reservationSchema);
