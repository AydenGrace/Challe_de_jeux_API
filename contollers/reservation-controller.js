const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const Reservation = require("../models/reservation/reservation.schema");
const Sessions = require("../models/reservation/sessions.schema");
const Room = require("../models/rooms/rooms.schema");

const getAll = async (req, res) => {
  Reservation.find()
    .populate("session")
    .populate("reductions")
    .populate("user")
    .then((reserv) => {
      res.status(200).json(reserv);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

const createAReservation = async (req, res) => {
  const {
    Nbplayers,
    email,
    name,
    phone,
    userId,
    sessionId,
    Total,
    ProductId,
    reductionsId,
  } = req.body;

  console.log(
    Nbplayers,
    email,
    name,
    phone,
    userId,
    sessionId,
    Total,
    ProductId,
    reductionsId
  );
  try {
    const isAlreadyASession = await Reservation.findOne({
      session: sessionId,
    }).populate("session");
    console.log(isAlreadyASession);
    //A RESERVATION ALREADY EXIST FOR THIS SESSION
    if (isAlreadyASession) {
      console.log("A booking already exist");
      res.status(500).json({ error: "A booking already exist" });
      return;
    }
    const ThisSession = await Sessions.findOne({ _id: sessionId });
    //THIS SESSION IS NOT AVAILABLE TO RESERVATION
    if (!ThisSession.isAvalaible) {
      console.log("This session can't be booked");
      res.status(500).json({ error: "This session can't be booked" });
      return;
    }

    const thisReservation = new Reservation({
      email,
      name,
      phone,
      price: Total,
      nbPlayers: Nbplayers,
      isPayed: false,
      session: sessionId,
      user: userId ? userId : null,
      reductions: reductionsId ? reductionsId : null,
    });
    console.log(thisReservation);
    await thisReservation.save();
    const sessionToUpdate = await Sessions.findOneAndUpdate(
      { _id: ThisSession._id },
      { $set: { isAvalaible: false } }
    );
    console.log(sessionToUpdate);
    const CartSessionId = await cart(Total, ProductId, res);
    console.log("Stripe session : ", CartSessionId);
    if (CartSessionId) res.json({ CartSessionId });
    else res.status(400).json({ error: "An unknowed error has occured" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const cart = async (price, productId, res) => {
  try {
    const RoomProduct = await Room.findOne({ _id: productId });
    if (!RoomProduct) {
      console.log("Room not found");
      res.status(400).json({ error: "Room not found" });
      return -1;
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: RoomProduct.name,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.ALLOWED_URL}/booking_success`,
      cancel_url: `${process.env.ALLOWED_URL}/booking`,
    });
    return session.id;
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ error: e.message });
  }
};

module.exports = { getAll, createAReservation };
