const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const roomsTagsSchema = schema({
  content: String,
});

module.exports = mongoose.model("room_tag", roomsTagsSchema);
