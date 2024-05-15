const { getCats, addCat, deleteCat, updateCat } = require("../../contollers/cats-controller");

const router = require("express").Router();


router.get("/", getCats);

router.post("/add", addCat);

router.delete("/delete", deleteCat);

router.patch("/update", updateCat);

module.exports = router;
