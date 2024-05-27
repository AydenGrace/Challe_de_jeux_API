const Cats = require("../models/cats.schema");

const getCats = async (req, res) => {
  Cats.find()
    .then((cats) => {
      res.status(200).json(cats);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

const getFullCats = async (req, res) => {
  Cats.find()
    .then((cats) => {
      res.status(200).json(cats);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

const addCat = async (req, res) => {
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
};

const deleteCat = async (req, res) => {
  console.log(req);
  res.send("Chat Supprimé");
};

const updateCat = async (req, res) => {
  console.log(req);
  res.send("Chat Modifié");
};

module.exports = { getCats, addCat, deleteCat, updateCat, getFullCats };
