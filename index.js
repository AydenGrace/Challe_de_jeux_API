const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const config = require("./database/config");
const cors = require("cors");
// const allowedOrigin = "https://challe-de-jeux-frontend.vercel.app";

app.use(express.json());
app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", process.env.BASE_URL);
  res.header("Access-Control-Allow-Origin", "https://challe-de-jeux-frontend.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const routes = require("./routes");
app.use(routes);

mongoose
  .connect(config.mongoDB.uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => console.error(e));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
  console.log("\x1b[36m%s\x1b[0m", `http://localhost:${PORT}/api/`);
});
