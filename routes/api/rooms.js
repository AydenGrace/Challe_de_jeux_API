const {
  getAll,
  addTag,
  addRoom,
  getAllTags,
} = require("../../contollers/rooms-controller");

const router = require("express").Router();

router.get("/", getAll);

router.get("/getTags", getAllTags);

router.post("/newTag", addTag);

router.post("/add", addRoom);

module.exports = router;
