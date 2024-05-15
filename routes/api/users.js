const { Register, Login, verifyMail } = require("../../contollers/users-controller");

const router = require("express").Router();


router.post("/register", Register);

router.post("/login", Login);

router.get("/verifyMail/:token", verifyMail);

module.exports = router;
