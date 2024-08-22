const {
  getAll,
  addSession,
  getDaySessions,
  getOne,
  addSessionTemplate,
} = require("../../contollers/session-controller");

const router = require("express").Router();

router.get("/", getAll);

router.post("/add", addSession);
router.post("/addTemplate", addSessionTemplate);
router.post("/get", getOne);
router.post("/getDay", getDaySessions);

module.exports = router;
