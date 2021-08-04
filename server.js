'use strict'

const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
server.use(cors());
const PORT = process.env.PORT;


//Weather

//http://localhost:3010/getWeather?lat=31.95&lon=35.91&cityName=Amman
server.get('/getWeather', handelWeather);

async function handelWeather(req, res) {
    const city = req.query.cityName
    const lon = req.query.lon
    const lat = req.query.lat
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_KEY}`;


    axios
        .get(URL)
        .then(Weathertatus => {
            let weatherArray = Weathertatus.data.data
            res.send(wetherForObject(weatherArray));
        })
        .catch(err => {
            res.send(err);
        })
}

const wetherForObject = (weatherObj) => {

    const forCastObj = [];
    weatherObj.map(element => {

        const description = `Low of ${element.low_temp} ,High of ${element.max_temp} with ${element.weather.description}`;
        const date = element.datetime;
        forCastObj.push(new Forcast(description, date));
        console.log(forCastObj);
    });
    return forCastObj;
};
class Forcast {
    constructor(description, date) {
        this.date = date;
        this.description = description;

    }
}

//MOVIES
//https://api.themoviedb.org/3/movie/550?api_key=41875812c2b323e366b30029131d151b
//http://localhost:3010/movies?city=Amman
server.get('/movies', handelMovies);

async function handelMovies(req, res) {
    const city = req.query.city
    const URLMovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${city}`

    axios
        .get(URLMovie)
        .then(Weathertatus => {
            let moviesArray = Weathertatus.data.results
            res.send(moviesForObject(moviesArray));
        })
        .catch(err => {
            res.send(err);
        })
}


const moviesForObject = (moviesObj) => {

    const forMoviesObj = [];
    moviesObj.map(element => {

    const title = element.title
    const overview = element.overview
    const vote_average = element.vote_average
    const vote_count = element.vote_count
    const poster_path = process.env.IMG_URL+element.poster_path
    const popularity = element.popularity
    const release_date = element.release_date

        forMoviesObj.push(new Movies(title,overview,vote_average,vote_count,poster_path,popularity,release_date));

        console.log(forMoviesObj);
    });
    return forMoviesObj;
}


class Movies {
    constructor(title,overview,vote_average,vote_count,poster_path,popularity,release_date) {
    this.title = title
    this.overview = overview
    this.vote_average = vote_average
    this.vote_count = vote_count
    this.poster_path = poster_path
    this.popularity = popularity
    this.release_date = release_date
    }
}

server.listen(PORT, () => {console.log(` I'm Listening to port number ${PORT} `)})