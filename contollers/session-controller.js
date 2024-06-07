const Session = require("../models/rooms/sessions.schema");

const getAll = (req, res) => {
  Session.find()
    .populate("room")
    .then((cats) => {
      res.status(200).json(cats);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

module.exports = { getAll };
