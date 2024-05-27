const Roles = require("../models/roles.schema");

const getAll = async (req, res) => {
  Roles.find()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

module.exports = { getAll };
