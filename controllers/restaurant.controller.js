const {
  selectRestaurants,
  addRestaurants,
  removeRestaurant,
} = require("../models/restaurant.model");

exports.getRestaurants = (req, res) => {
  selectRestaurants().then((result) => {
    res.status(200).send({ restaurants: result });
  });
};

exports.postRestaurant = (req, res, next) => {
  addRestaurants(req.body)
    .then((result) => {
      if (result.hasOwnProperty("code")) {
        next(result);
      } else {
        res.status(201).send({ restaurant: result });
      }
    })
    .catch(next);
};

exports.deleteRestaurant = (req, res) => {
  removeRestaurant(req.params.id).then((result) => {
    res.status(200).send({ deletedRestaurant: result });
  });
};
