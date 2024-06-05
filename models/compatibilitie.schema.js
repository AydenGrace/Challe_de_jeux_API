const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const compatibilitiesSchema = schema({
    content: String,
});

module.exports = mongoose.model("cat_compatibilities", compatibilitiesSchema);