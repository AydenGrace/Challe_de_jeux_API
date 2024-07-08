const {
  getCats,
  addCat,
  deleteCat,
  updateCat,
  getFullCats,
  findCat,
} = require("../../contollers/cats-controller");

const router = require("express").Router();

router.get("/", getCats);
router.get("/getFull", getFullCats);

router.post("/add", addCat);

router.delete("/delete", deleteCat);

router.patch("/update", updateCat);

router.post("/find", findCat);

module.exports = router;
