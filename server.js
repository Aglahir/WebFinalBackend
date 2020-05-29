const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const { DATABASE_URL, PORT } = require("./config");

const app = express();

let router = require("./api/routes");

const db = require("./models");

app.use(morgan("dev"));
app.use("/api/", router(db));

app.listen(PORT, () => {
  console.log("This server is running on port " + PORT);

  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };
    mongoose.connect(DATABASE_URL, settings, (err) => {
      if (err) {
        return reject(err);
      } else {
        console.log("Database connected successfully.");
        return resolve();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});
