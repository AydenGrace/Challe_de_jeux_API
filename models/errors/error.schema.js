const schema = require("mongoose").Schema;
const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const errorSchema = schema(
  {
    description: { type: String, required: true },
    tags: [
      {
        type: schema.Types.ObjectId,
        ref: "error_tag",
      },
    ],
    user: [{ type: schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("error", errorSchema);
