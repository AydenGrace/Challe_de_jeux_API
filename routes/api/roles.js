const { getAll } = require("../../contollers/roles-controller");

const router = require("express").Router();

router.get("/", getAll);

module.exports = router;
