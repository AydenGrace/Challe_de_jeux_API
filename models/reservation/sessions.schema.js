const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const sessionsSchema = schema({
  room: { type: schema.Types.ObjectId, required: true, ref: "rooms" },
  date: { type: Date, required: true },
  isAvalaible: { type: Boolean, default: true },
});

module.exports = mongoose.model("sessions", sessionsSchema);
