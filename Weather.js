const axios = require('axios');

const Weather = {};

Weather.handelWeather = function(req, res) {
    const city = req.query.cityName
    const lon = req.query.lon
    const lat = req.query.lat
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_KEY}`;


    axios
        .get(URL)
        .then(weathertatus => {
            let weatherArray = weathertatus.data.data
            res.send(Weather.wetherForObject(weatherArray));
        })
        .catch(err => {
            res.send(err);
        })
}

Weather.wetherForObject = (weatherObj) => {

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
module.exports = Weather;