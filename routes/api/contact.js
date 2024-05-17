const router = require("express").Router();
const { getEmailForm } = require("../../contollers/contact-controller");

router.get("/", (req, res) => {
  res.send("Contact");
});

router.post("/send", getEmailForm);

module.exports = router;
