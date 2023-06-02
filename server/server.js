const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

app.post('/getWeather', async (req, res) => {
    const cities = req.body.cities;
    let weather = {};
    for (let city of cities) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`);
        let data = await response.json();
        let tempInKelvin = data.main.temp;
        let tempInCelsius = Math.round(tempInKelvin - 273.15);
        weather[city] = `${tempInCelsius}°C`;
    }
    res.json({ weather });
});

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});