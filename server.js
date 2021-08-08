'use strict'

const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
server.use(cors());
const PORT = process.env.PORT;
const Weather = require('./Weather')
const movies = require('./movies')



//http://localhost:3010/getWeather?lat=31.95&lon=35.91&cityName=amman
server.get('/getWeather', Weather.getWeatherHandler);

//http://localhost:3010/movies?city=Amman
server.get('/movies', movies.getMovieHandler);


server.listen(PORT, () => console.log(`I'm listening on ${PORT}`))