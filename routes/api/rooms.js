const {
  getAll,
  addTag,
  addRoom,
} = require("../../contollers/rooms-controller");

const router = require("express").Router();

router.get("/", getAll);

router.post("/newTag", addTag);

router.post("/add", addRoom);

module.exports = router;
