const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const pedigreeSchema = schema({
    content: String,
});

module.exports = mongoose.model("cat_pedigree", pedigreeSchema);