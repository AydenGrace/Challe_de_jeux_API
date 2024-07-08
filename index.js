const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const config = require("./database/config");
const cors = require("cors");
const allowedOrigin = "https://challe-de-jeux-frontend.vercel.app";
// const allowedOrigin = "http://localhost:5173";
const { default: BackupToolkit } = require("mongodb-backup-toolkit");
const cron = require("node-cron");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

const Backup = async () => {
  const date = new Date(Date.now());
  await BackupToolkit.backup(
    config.mongoDB.uri,
    // `../ChalleDeJeux_dumbs/dumb_${date.getFullYear()}-${
    //   date.getMonth() + 1
    // }-${date.getDate()}_${date.getHours()}H${date.getMinutes()}/`
    `./dumbs/dumb_${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}_${date.getHours()}H${date.getMinutes()}/`
  );
};

const routes = require("./routes");
app.use(routes);

mongoose
  .connect(config.mongoDB.uri)
  .then(() => {
    console.log("Connected to MongoDB");
    // Backup();
    // task = cron.schedule("12 00 * * *", () => {
    //   console.log("Starting Database Backup !");
    //   Backup();
    // });
  })
  .catch((e) => console.error(e));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`);
  console.log("\x1b[36m%s\x1b[0m", `http://localhost:${PORT}/api/`);
});
