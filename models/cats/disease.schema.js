const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const diseasesSchema = schema({
    content: String,
});

module.exports = mongoose.model("cat_diseases", diseasesSchema);