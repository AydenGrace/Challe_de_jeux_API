const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const personalitiesSchema = schema({
    content: String,
});

module.exports = mongoose.model("cat_personalities", personalitiesSchema);