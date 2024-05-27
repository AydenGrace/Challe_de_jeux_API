const {
  getAll,
  getbyId,
  getbyName,
  getbyPower,
  addOne,
} = require("../../contollers/roles-controller");

const router = require("express").Router();

router.get("/", getAll);

router.get("/id", getbyId);

router.get("/name", getbyName);

router.get("/power", getbyPower);

router.post("/add", addOne);

module.exports = router;
