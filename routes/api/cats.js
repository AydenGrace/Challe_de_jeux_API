const router = require("express").Router();
const mongoose = require("mongoose");
const catSchema = require("./../../models/cats.schema");
const Cats = mongoose.model("cats", catSchema);
const schema = require("mongoose").Schema;
const pedigreeSchema = schema({
  content: String,
});
const Pedrigree = mongoose.model("cat_pedigree", pedigreeSchema);

router.get("/", (req, res) => {
  Cats.find()
    .then((cats) => {
      //Chats récupérés
      // Pedrigree.find({ _id: cats.pedigree })
      //   .then((p) => {
      //     cats.pedigree = p.content;
      //   })
      //   .catch((e) => {
      //     console.error(e);
      //     res.status(500).send("Pedigree Error");
      //   });
      res.status(200).json(cats);
    })
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
