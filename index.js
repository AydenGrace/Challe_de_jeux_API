const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const config = require("./database/config");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origon: "*",
  })
);

const routes = require("./routes");
app.use(routes);

mongoose
  .connect(config.mongoDB.uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => console.error(e));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log("\x1b[36m%s\x1b[0m", `http://localhost:${PORT}/api/`);
});
