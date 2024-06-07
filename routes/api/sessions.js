const { getAll } = require("../../contollers/session-controller");

const router = require("express").Router();

router.get("/", getAll);

module.exports = router;
