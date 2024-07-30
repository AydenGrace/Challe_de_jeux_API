const {
  getAll,
  createAReservation,
} = require("../../contollers/reservation-controller");

const router = require("express").Router();

router.get("/", getAll);
router.post("/makeBooking", createAReservation);

module.exports = router;
