const {
  Register,
  Login,
  verifyMail,
  ForgotPwd,
  ChangePwd,
  getAll,
} = require("../../contollers/users-controller");

const router = require("express").Router();

const rolesRouter = require("./roles");
router.use("/roles", rolesRouter);

router.use("/", getAll);

router.post("/register", Register);

router.post("/login", Login);

router.post("/forgot_password", ForgotPwd);

router.patch("/change_password", ChangePwd);

router.get("/verifyMail/:token", verifyMail);

module.exports = router;
