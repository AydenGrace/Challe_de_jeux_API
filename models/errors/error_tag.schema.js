const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const errorTagSchema = schema({
    content: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("error_tag", errorTagSchema);