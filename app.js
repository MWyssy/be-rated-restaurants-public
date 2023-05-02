const express = require('express');
const { getMessage } = require('./controllers/api.controller');
const { getRestaurants, postRestaurant, deleteRestaurant } = require('./controllers/restaurant.controller');
const app = express();

app.use(express.json());

app.get('/api', getMessage);

app.get('/api/restaurants', getRestaurants);

app.post('/api/restaurants', postRestaurant);

app.delete('/api/restaurants/:id', deleteRestaurant);

module.exports = app;