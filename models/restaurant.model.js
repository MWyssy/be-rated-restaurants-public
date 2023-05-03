const db = require("../db/connection");
const format = require("pg-format");
const { formattedRestaurants } = require("../utils/index.js");

exports.selectRestaurants = () => {
  return db.query("SELECT * FROM restaurants;").then((result) => {
    return result.rows;
  });
};

exports.addRestaurants = (newRestaurant) => {
  const itemsInsrtStr = format(
    `INSERT INTO restaurants
            (restaurant_name, area_id, cuisine, website)
        VALUES
            %L
        RETURNING *;`,
    formattedRestaurants(newRestaurant)
  );
  return db
    .query(itemsInsrtStr)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      return err;
    });
};

exports.removeRestaurant = (id) => {
  return db
    .query("DELETE FROM restaurants WHERE restaurant_id = $1 RETURNING *;", [
      id,
    ])
    .then(({ rows }) => {
      return rows[0];
    });
};
