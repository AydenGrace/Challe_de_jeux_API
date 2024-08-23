const {
  getAll,
  addSession,
  getDaySessions,
  getOne,
  addSessionTemplate,
  ToggleSessions,
  getAllofDay,
} = require("../../contollers/session-controller");

const router = require("express").Router();

router.get("/", getAll);

router.post("/add", addSession);
router.post("/addTemplate", addSessionTemplate);
router.post("/get", getOne);
router.post("/getDay", getDaySessions);
router.post("/toggle", ToggleSessions);
router.post("/getAllofDay", getAllofDay);

module.exports = router;
