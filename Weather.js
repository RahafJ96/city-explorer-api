const axios = require('axios');

const Weather = {};
const weatherMemory={};

Weather.handelWeather = function(req, res) {
    
    try{
    const city = req.query.cityName
    const lon = req.query.lon
    const lat = req.query.lat

    if(!city){
        city="Not matched city";
    }
    if(weatherMemory[city]!== undefined){
        console.log('Weather from the Memory');
        res.send(weatherMemory[city]);
    }
    else{
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_KEY}`;
    let axiosWeather=await axios.get(URL);
    let forcastArr = axiosWeather.data.data.map(items=> new Forcast(items));
    console.log('Weather data from API');
    weatherMemory[city]=forcastArr;
    res.send(forcastArr);
    }}
    catch(error){
        res.status(400)
        if(error.status){
            res.status(error.status).send(error.message);
        }
    }
    }
    
    // axios
    //     .get(URL)
    //     .then(Weathertatus => {
    //         let weatherArray = Weathertatus.data.data
    //         res.send(Weather.wetherForObject(weatherArray));
    //     })
    //     .catch(err => {
    //         res.send(err);
    //     })


// Weather.wetherForObject = (weatherObj) => {

//     const forCastObj = [];
//     weatherObj.map(element => {

//         const description = `Low of ${element.low_temp} ,High of ${element.max_temp} with ${element.weather.description}`;
//         const date = element.datetime;
//         forCastObj.push(new Forcast(description, date));
//         console.log(forCastObj);
//     });
//     return forCastObj;
// };
class Forcast {
    constructor(description, date) {
        this.date = date;
        this.description = description;

    }
}
module.exports = Weather;