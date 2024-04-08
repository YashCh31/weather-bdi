const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

const API_KEY = "339f30d4ff9aeb0f2dfa11db3fc96817";

const URL = "https://api.openweathermap.org/data/3.0/onecall?";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getWeatherInfo/all/', async (req, resp) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    let result;
    try {
        result = await axios.get(URL + "lat=" + lat + "&lon=" + lon + "&appid=" + API_KEY + "&units=metric");
        resp.json(result.data);
    } catch (err) {
        console.error(`failed all api due to ${err.message}`);
    }
});

app.get('/getWeatherInfo/city/', async (req, resp) => {
    let turl = "http://api.openweathermap.org/geo/1.0/direct?q=";
    //{city name},{state code},{country code}&limit={limit}&appid={API key}";
    const city = req.query.city;
    let result;
    try {
        result = await axios.get(turl + city + "&appid=" + API_KEY + "&units=metric");
        resp.json(result.data);
    } catch (err) {
        console.error(`failed city api due to ${err.message}`);
    }
    
});


app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
})