const {
  getCats,
  addCat,
  deleteCat,
  updateCat,
  getFullCats,
} = require("../../contollers/cats-controller");

const router = require("express").Router();

router.get("/", getCats);
router.get("/getFull", getFullCats);

router.post("/add", addCat);

router.delete("/delete", deleteCat);

router.patch("/update", updateCat);

module.exports = router;
