const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const coatsSchema = schema({
    content: String,
});

module.exports = mongoose.model("cat_coat", coatsSchema);