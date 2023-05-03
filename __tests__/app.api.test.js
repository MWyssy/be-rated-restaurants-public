const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection");

afterAll(() => {
  db.end();
});

describe("GET /api", () => {
  test("Get status 200 - responds with a message JSON object.", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "all ok" });
      });
  });
});

describe("GET /api/restaurants", () => {
  test("Get status 200 - responds with an array of restaurant objects.", () => {
    return request(app)
      .get("/api/restaurants")
      .expect(200)
      .then(({ body }) => {
        expect(body.restaurants.length).toBe(8);
        body.restaurants.forEach((restaurant) => {
          expect(typeof restaurant.restaurant_id).toBe("number");
          expect(typeof restaurant.restaurant_name).toBe("string");
          expect(typeof restaurant.area_id).toBe("number");
          expect(typeof restaurant.cuisine).toBe("string");
          expect(typeof restaurant.website).toBe("string");
        });
      });
  });
});

describe("POST /api/restaurants", () => {
  test("POST status 201 - responds with an array of the new retaurants added.", () => {
    const newRestaurants = [
      {
        restaurant_name: "The Codfather",
        area_id: 2,
        cuisine: "British",
        website: "www.thecodfather.com",
      },
    ];

    return request(app)
      .post("/api/restaurants")
      .send(newRestaurants)
      .expect(201)
      .then(({ body }) => {
        expect(body.restaurant.restaurant_id).toBe(9);
        expect(body.restaurant.restaurant_name).toBe("The Codfather");
        expect(body.restaurant.area_id).toBe(2);
        expect(body.restaurant.cuisine).toBe("British");
        expect(body.restaurant.website).toBe("www.thecodfather.com");
      });
  });
  test("The restaurant has been added to the restaurants table of the database.", () => {
    return request(app)
      .get("/api/restaurants")
      .then(({ body }) => {
        expect(body.restaurants.length).toBe(9);
      });
  });
});

describe("DELETE /api/restaurants", () => {
  test("DELETE status 200 - responds with the deleted restaurant", () => {
    return request(app)
      .delete("/api/restaurants/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.deletedRestaurant.restaurant_id).toBe(3);
      });
  });
  test("Deleted restaurant has been removed from restaurants table in the database.", () => {
    return request(app)
      .get("/api/restaurants")
      .then(({ body }) => {
        body.restaurants.forEach((restaurant) => {
          expect(restaurant.restaurant_id).not.toBe(3);
        });
      });
  });
});
