import React, { useState } from 'react'
import './WeatherApp.css'

const Weather = () => {
    const [cities, setCities] = useState('');
    const [weather, setWeather] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3001/getWeather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cities: cities.split(',') })
        });
        const data = await response.json();
        setWeather(data.weather);
    }

    return (
        <div>
            <div class="jumbotron jumbotron-fluid headingw">
                <div class="container headw">
                    <h1 class="display">Weather</h1>
                    <p class="lead">Search Now !</p>

                </div>

            </div>
            <form>
                <div class="form-group mx-auto my-4 w-50">
                    <label for="exampleInputEmail1">Cities</label>
                    <input value={cities} onChange={event => setCities(event.target.value)} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Cities" />
                    <small id="emailHelp" class="form-text text-muted">Enter the city names by separating them by commas</small>
                </div>
                <button type="submit" style={{ "margin-top": "-10px" }} class="btn btn-primary" onClick={handleSubmit}>Search</button>
            </form>

            {weather && <table class="table my-4 ">
                <thead class="thead-light">
                    <tr>

                        <th scope="col">City</th>
                        <th scope="col">Temperature</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(weather).map(([city, temp]) => (
                        

                        <tr key={city}>
                            <td>{city}</td>
                            <td>{temp}</td>
                        </tr>
                        
                    ))}

                </tbody>
            </table>}

        </div>
    )
}

export default Weather