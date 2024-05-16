const {
  Register,
  Login,
  verifyMail,
  ForgotPwd,
} = require("../../contollers/users-controller");

const router = require("express").Router();

router.post("/register", Register);

router.post("/login", Login);

router.post("/forgot_password", ForgotPwd);

router.get("/verifyMail/:token", verifyMail);

module.exports = router;
