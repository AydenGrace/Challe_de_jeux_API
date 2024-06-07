const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const sessionsSchema = schema({
  room: { type: schema.Types.ObjectId, required: true, ref: "rooms" },
  Date: { type: Date, required: true },
  IsAvalaible: Boolean,
});

module.exports = mongoose.model("sessions", sessionsSchema);
