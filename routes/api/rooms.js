const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Rooms");
});

module.exports = router;
