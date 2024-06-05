const schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const newsletterSchema = schema({
    email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("newsletter_list", newsletterSchema);