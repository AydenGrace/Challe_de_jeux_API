const {
  getAll,
  createAReservation,
  cancel,
  validate,
  getAllFromUserId
} = require("../../contollers/reservation-controller");

const router = require("express").Router();

router.get("/", getAll);
router.post("/makeBooking", createAReservation);
router.post("/cancel",cancel);
router.post("/validate",validate);
router.post("/getAllFromUserId",getAllFromUserId);

module.exports = router;
