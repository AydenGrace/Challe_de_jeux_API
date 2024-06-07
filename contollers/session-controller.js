const Session = require("../models/reservation/sessions.schema");
const Room = require("../models/rooms/rooms.schema");

const getAll = (req, res) => {
  Session.find()
    .populate("room")
    .then((cats) => {
      res.status(200).json(cats);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

const addSession = async (req, res) => {
  console.log(req);
  const { roomId, date, isAvalaible } = req.body;
  const isRoomExist = await Room.find({ _id: roomId }).populate("tags");
  if (!isRoomExist) {
    res.status(400).json({ message: "Room not found" });
    return;
  }
  const isSessionAlreadyExist = await Session.find({
    room: roomId,
    date: date,
  });
  if (isSessionAlreadyExist) {
    res.status(400).json({ message: "Session for this room already exist" });
    return;
  }
  const newSession = await new Session({
    room: roomId,
    date: date,
    isAvalaible: isAvalaible,
  });
  newSession
    .save()
    .then(() => {
      res.status(200).json({ message: "Session saved" });
    })
    .catch(() => {
      res.status(400).json({ message: "Error : Session not saved" });
    });
};

module.exports = { getAll, addSession };
