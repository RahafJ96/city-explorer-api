'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherJSON = require('./data/weather.json');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

//https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=528201f1d0e44da091e9e2dd6b0a8bd8&include=minutely
//http://api.weatherbit.io/v2.0/current
//localhost:3001/weather?searchQuery=amman
server.get('/weather', getWeather);

server.use('*', (req, res) => 
res.status(404).send('Page not found'));

function getWeather(req, res) {
  let searchQuery = req.query.searchQuery;
  
  const city = weatherJSON.find(city => 
  city.city_name.toLowerCase() === searchQuery.toLowerCase());
  
  if(city != undefined)
  {
    const weatherArray = city.data.map(day => 
    new Forecast(day)
    );
    
    res.status(200).send(weatherArray);
  }
  else
  {
    errorHandler(res);
  }
}

function errorHandler(res) {
  res.status(500).send('Something went Wrong');
}
  

function Forecast(item) {
  this.date = item.valid_date
  this.description = item.weather.description
}

server.listen(PORT, () => console.log(`I'm listening on ${PORT}`))