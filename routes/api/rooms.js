const { getAll } = require("../../contollers/rooms-controller");

const router = require("express").Router();

router.get("/", getAll);

module.exports = router;
