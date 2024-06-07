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

module.exports = { getAll };
