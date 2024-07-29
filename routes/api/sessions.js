const {
  getAll,
  addSession,
  getDaySessions,
  getOne,
} = require("../../contollers/session-controller");

const router = require("express").Router();

router.get("/", getAll);

router.post("/add", addSession);
router.post("/get", getOne);
router.post("/getDay", getDaySessions);

module.exports = router;
