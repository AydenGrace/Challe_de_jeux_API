const Roles = require("../models/user/roles.schema");

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

const getbyId = async (req, res) => {
  const { _id } = req.body;
  Roles.findOne({ _id: _id })
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

const getbyName = async (req, res) => {
  const { name } = req.body;
  Roles.findOne({ name: name })
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

const getbyPower = async (req, res) => {
  const { power } = req.body;
  Roles.findOne({ power: power })
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

const addOne = async (req, res) => {
  const { name, power } = req.body;
  const isAlreadyExist = await Roles.findOne({
    $or: [{ name: name }, { power: power }],
  });
  console.log(isAlreadyExist);
  if (isAlreadyExist) {
    res.status(400).json({ message: "Role already exist." });
    return;
  }
  const newRole = new Roles({
    name,
    power,
  });
  await newRole
    .save()
    .then((t) => {
      console.log(t);
      res.status(200).json(t);
    })
    .catch((e) => {
      console.error(e);
      res.status(400).send("Add Error");
    });
};

module.exports = { getAll, getbyId, getbyName, getbyPower, addOne };
