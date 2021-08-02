'use strict';

const express = require('express'); // import express
const server = express();
const cors = require('cors');
// require('dotenv').config();

//import the weather data
const weatherData = require('./data/weather.json');
server.use(cors()); // the server can take any req from any client

const PORT = 3001;


// http://localhost:3001/ (/ === root route)
server.get('/',(req,res) => {
    res.send('Hi From the root route');
})

// http://localhost:3001/test (/test === route)
server.get('/test',(request,response) => {
    let str = 'Hello From the server side';
    response.send(str);
})

// http://localhost:3001/getWeatherStatus (/getWeatherStatus === route)
server.get('/getWeatherStatus',(req,res) => {
    console.log(weatherData);
    let getData = weatherData.map(item => {
        return item.city_name
    })
    console.log(getData);
    res.status(200).send(getData);
})


// http://localhost:3001/getWeatherInfo?city_name=Amman (/getWeatherInfo === route)
server.get('/getWeatherInfo', (req,res) => {
    console.log(req.query);
    const cityName = req.query.city_name;
    console.log(cityName);
    let weatherItem = weatherData.find(item => {
        if(item.city_name == cityName)
        return item;
    })
    console.log(weatherItem);
    res.send(weatherItem);
})

server.get('*', (req,res) => {
    res.status(404).send('Page not Found');
})


server.listen(PORT,() => {
    console.log(`I am listening on PORT = ${PORT}`);
})
