'use strict';

const express = require('express'); // import express
const server = express();
const cors = require('cors');
require('dotenv').config();

const pokeData = require('./weather.json');
server.use(cors()); // the server can take any req from any client

const PORT = process.env.PORT;


// http://localhost:3001/ (/ === root route)
server.get('/',(req,res) => {
    res.send('Hi From the root route');
})

// http://localhost:3001/test (/test === route)
server.get('/test',(request,response) => {
    let str = 'Hello From the server side';
    response.send(str);
})

// http://localhost:3001/getWeather (/getWeather === route)
server.get('/getWeather',(req,res) => {
    // console.log(pokeData);
    console.log(req);
    let weatherInfo = weatherData.results.map(item => {
        return item.name;
    })
    res.status(200).send(weatherInfo);
})

// http://localhost:3001/getWeatherStatus?name=bulbasaur (/getWeatherStatus === route)
server.get('/getWeatherStatus', (req,res) => {
    console.log(req.query);
    const name = req.query.name;
    let weatherItem = weatherData.results.find(item => {
        if(item.name == name)
        return item;
    })
    console.log(weatherItem);
    res.send(weatherItem);
})

server.get('*', (req,res) => {
    res.status(404).send('page not found');
})


server.listen(PORT,() => {
    console.log(`I am listening on PORT = ${PORT}`);
})
