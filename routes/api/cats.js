const router = require("express").Router();
const mongoose = require("mongoose");
const catSchema = require("./../../models/cats.schema");
const Cats = mongoose.model("cats", catSchema);

router.get("/", (req, res) => {
  Cats.find()
    .then((data) => res.status(200).json(data))
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
});

router.post("/add", (req, res) => {
  const body = req.body;
  console.log(body);
  const newCat = new Cats(body);
  newCat
    .save()
    .then((t) => {
      console.log(t);
      res.status(200).json(t);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Add Error");
    });
});
// Route qui supprime une todo
router.delete("/delete", (req, res) => {
  console.log(req);
  res.send("Chat Supprimé");
});
// Route qui modifie une todo
router.patch("/update", (req, res) => {
  console.log(req);
  res.send("Chat Modifié");
});

module.exports = router;
