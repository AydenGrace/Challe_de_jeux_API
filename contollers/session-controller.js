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

const getOne = async (req, res) => {
  console.log(req.body);
  const { _id } = req.body;
  console.log(_id);
  try {
    const thisSession = await Session.findOne({ _id }).populate("room");
    res.json(thisSession);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addSession = async (req, res) => {
  // console.log(req.body);
  const { room, date } = req.body;
  // console.log(new Date(date).toString());
  const isRoomExist = await Room.find({ _id: room }).populate("tags");
  //ROOM DOESN'T EXIST
  if (!isRoomExist) {
    res.status(400).json({ message: "Room not found" });
    return;
  }
  //SESSION ALREADY EXIST
  const isSessionAlreadyExist = await Session.findOne({
    room: room,
    date: new Date(date),
  });
  // console.log(isSessionAlreadyExist);
  if (isSessionAlreadyExist) {
    res.status(400).json({ message: "Session for this room already exist" });
    return;
  }
  const newSession = await new Session({
    room: room,
    date: new Date(date),
  });
  // console.log(newSession);
  newSession
    .save()
    .then(() => {
      res.status(200).json({ message: "Session saved" });
    })
    .catch((e) => {
      // console.log(e.message);
      res.status(400).json({ message: "Error : Session not saved" });
    });
};

const VerifyAndSaveSession = async (room, date, res) => {
  const isSessionAlreadyExist = await Session.findOne({
    room: room,
    date: date,
  });
  if (!isSessionAlreadyExist) {
    const newSession = await new Session({
      room: room,
      date: date,
    });
    await newSession
      .save()
      .then(() => {
        console.log("Template Session saved");
      })
      .catch((e) => {
        // console.log(e.message);
        res.status(400).json({ message: "Error : Template Session not saved" });
        return;
      });
  }
};

const addSessionTemplate = async (req, res) => {
  console.log(req.body);
  const { room, template, dateFrom, dateTo } = req.body;

  const isRoomExist = await Room.find({ _id: room }).populate("tags");

  if (!isRoomExist) {
    res.status(400).json({ message: "Room not found" });
    return;
  }
  const Date_To = new Date(dateTo);

  for (
    let Date_Current = new Date(dateFrom);
    Date_Current <= Date_To;
    Date_Current.setDate(Date_Current.getDate() + 1)
  ) {
    console.log("DATE", Date_Current);
    let DayRef;
    switch (Date_Current.getDay()) {
      case 0:
        DayRef = template.sunday;
        break;
      case 1:
        DayRef = template.monday;
        break;
      case 2:
        DayRef = template.tuesday;
        break;
      case 3:
        DayRef = template.wednesday;
        break;
      case 4:
        DayRef = template.thursday;
        break;
      case 5:
        DayRef = template.friday;
        break;
      case 6:
        DayRef = template.saturday;
        break;
      default:
        res.status(400).json({ error: "Date Error" });
        return;
    }
    if (!DayRef) continue;
    DayRef.map((sessionTime) => {
      console.log(sessionTime);
      VerifyAndSaveSession(
        room,
        new Date(
          Date.UTC(
            Date_Current.getFullYear(),
            Date_Current.getMonth(),
            Date_Current.getDate(),
            new Date(sessionTime).getHours(),
            new Date(sessionTime).getMinutes(),
            0,
            0
          )
        ),
        res
      );
    });
  }
  res.status(200).json({ message: "template saved" });
};

const getDaySessions = async (req, res) => {
  // console.log(req.body);
  const { room, date } = req.body;
  const sessionsToFind = await getSessionsOfARoom(room, date);
  res.json(sessionsToFind);
};

const Togglelock = async (room, date) => {
  const isRoomExist = await Room.find({ _id: room });
  if (!isRoomExist) {
    console.log("Error : Room not found");
    return false;
  }
  console.log("DATE", new Date(date));

  const isSessionAlreadyExist = await Session.findOneAndUpdate(
    {
      room: room,
      date: new Date(date),
    },
    [{ $set: { isAvalaible: { $eq: [false, "$isAvalaible"] } } }]
  );
  console.log(isSessionAlreadyExist);

  if (!isSessionAlreadyExist) {
    console.log("Error : Session not found");

    return false;
  }
  console.log("Session toggled");
  return true;
};

const ToggleSessions = async (req, res) => {
  const { sessions } = req.body;

  sessions.map((session) => {
    Togglelock(session.room, session.date);
  });
  res.json({ message: "Sessions toggled" });
};

const getSessionsOfARoom = async (room, date) => {
  console.log(date);

  const isRoomExist = await Room.find({ _id: room }).populate("tags");
  //ROOM DOESN'T EXIST
  if (!isRoomExist) {
    res.status(400).json({ message: "Room not found" });
    return;
  }
  if (new Date(date).getMonth() + 1 < 10) {
    month_string = `0${new Date(date).getMonth() + 1}`;
  } else {
    month_string = `${new Date(date).getMonth() + 1}`;
  }

  if (new Date(date).getDate() < 10) {
    day_string = `0${new Date(date).getDate()}`;
  } else {
    day_string = `${new Date(date).getDate()}`;
  }

  let tomorrow = new Date(date);
  tomorrow.setDate(new Date(date).getDate() + 1);
  // console.log(tomorrow);
  tomorrow_year_string = tomorrow.getFullYear();

  if (tomorrow.getMonth() + 1 < 10) {
    tomorrow_month_string = `0${tomorrow.getMonth() + 1}`;
  } else {
    tomorrow_month_string = `${tomorrow.getMonth() + 1}`;
  }
  if (tomorrow.getDate() < 10) {
    tomorrow_string = `0${tomorrow.getDate()}`;
  } else {
    tomorrow_string = `${tomorrow.getDate()}`;
  }

  try {
    const sessionsFind = await Session.find({
      room: room,
      date: {
        $gte: new Date(
          `${new Date(
            date
          ).getFullYear()}-${month_string}-${day_string}T00:00:00.000Z`
        ),
        $lt: new Date(
          `${tomorrow_year_string}-${tomorrow_month_string}-${tomorrow_string}T00:00:00.000Z`
        ),
      },
    }).sort({ date: 1 });
    console.log(sessionsFind);

    return sessionsFind;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getAllofDay = async (req, res) => {
  const { date } = req.body;
  let tempArray = [];
  try {
    const rooms = await Room.find();
    // console.log(rooms);
    if (!rooms) {
      res.json([]);
      return;
    }

    for (let i = 0; i < rooms.length; i++) {
      tempArray.push({
        roomId: rooms[i]._id,
        roomName: rooms[i].name,
        sessions: await getSessionsOfARoom(rooms[i]._id, date),
      });
    }
    res.json(tempArray);
  } catch (e) {
    console.log(e.message);

    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  getAll,
  addSession,
  getDaySessions,
  getOne,
  addSessionTemplate,
  getAllofDay,
  ToggleSessions,
};
