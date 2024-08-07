const router = require("express").Router();

const Apis = [
  {
    require: require("./cats"),
    url: "/cats",
    name: "Cats",
  },
  {
    require: require("./rooms"),
    url: "/rooms",
    name: "Rooms",
  },
  {
    require: require("./users"),
    url: "/users",
    name: "Users",
  },
  {
    require: require("./contact"),
    url: "/contact",
    name: "Contact",
  },
  {
    require: require("./sessions"),
    url: "/sessions",
    name: "Sessions",
  },
  {
    require: require("./reservation"),
    url: "/reservations",
    name: "Reservations",
  },
];

Apis.map((item) => {
  router.use(item.url, item.require);
});

router.get("/", (req, res) => {});

module.exports = router;
