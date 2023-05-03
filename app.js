const express = require("express");
const { getMessage } = require("./controllers/api.controller");
const {
  getRestaurants,
  postRestaurant,
  deleteRestaurant,
} = require("./controllers/restaurant.controller");
const app = express();

app.use(express.json());

app.get("/api", getMessage);

app.get("/api/restaurants", getRestaurants);

app.post("/api/restaurants", postRestaurant);

app.delete("/api/restaurants/:id", deleteRestaurant);

app.use((err, req, res, next) => {
  if (err.code === "23502") {
    res.status(400).send({ msg: "Incomplete/invalid request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid key/value format" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(400).send({ msg: "Invalid request format" });
});

module.exports = app;
