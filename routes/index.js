const router = require("express").Router();

const apiRouter = require("./api");

router.use("/api", apiRouter);

router.get("/", (req, res) => {
  //   res.send("ROUTES");
});

module.exports = router;
