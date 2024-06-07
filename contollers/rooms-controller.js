const Room = require("../models/rooms/rooms.schema");
const RoomTags = require("../models/rooms/rooms_tag.schema");

const getAll = async (req, res) => {
  Room.find()
    .populate("tags")
    .then((cats) => {
      res.status(200).json(cats);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send("Get Error");
    });
};

const addRoom = async (req, res) => {
  console.log(req);
  const { name, overview, duration, difficulty, base_price, tags, imgs } =
    req.body;
  const isAlreadyExist = await Room.findOne({ name });
  if (isAlreadyExist) {
    res.status(400).json({ message: "Room already exist" });
    return;
  }
  const newRoom = await new Room({
    name,
    overview,
    duration,
    difficulty,
    base_price,
    tags,
    imgs,
  });

  newRoom
    .save()
    .then(() => {
      res.status(200).json({ message: "Room saved" });
    })
    .catch(() => {
      res.status(400).json({ message: "Error : Room not saved" });
    });
};

const addTag = async (req, res) => {
  console.log(req);
  const { content } = req.body;
  const isAlreadyExist = await RoomTags.findOne({ content });
  if (isAlreadyExist) {
    res.status(400).json({ message: "Room Tag already exist" });
    return;
  }
  const newTagRoom = await new RoomTags({
    content,
  });

  newTagRoom
    .save()
    .then(() => {
      res.status(200).json({ message: "Room Tag saved" });
    })
    .catch(() => {
      res.status(400).json({ message: "Error : Room Tag not saved" });
    });
};
module.exports = { getAll, addRoom, addTag };
