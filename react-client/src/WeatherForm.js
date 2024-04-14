import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './WeatherForm.css';
import Button from 'react-bootstrap/Button';
function WeatherForm() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [isTableVisible, setIsTableVisible] = useState(false);

    const getWeather = async () => {
        try {
            //const coordResp = await axios.get(`http://localhost:3001/getWeatherInfo/city/?city=${city}`);
            const coordResp = await axios.get(`https://weather-bdiplus-0d49aaaaa8a4.herokuapp.com/getWeatherInfo/city?city=${city}`);
            //const { lat, lon } = coordResp.data[0];
            if (coordResp.data.length === 0) {
                // City does not exist, show popup
                alert('The city does not exist.');
                return; // Stop execution
            }
            else {
                const { lat, lon } = coordResp.data[0];
                const weatherResp = await axios.get(`https://weather-bdiplus-0d49aaaaa8a4.herokuapp.com/getWeatherInfo/all?lat=${lat}&lon=${lon}`);
                setWeather(weatherResp.data.current);
                setIsTableVisible(true);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className="weather-form-container">
            {!isTableVisible && (
                <>
                    <input
                        className="weather-form-input"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                    />
                    <Button variant="Success" className="weather-form-button" onClick={getWeather}>Get Weather</Button>
                </>
            )}
            {isTableVisible && weather && (
                <table className="weather-table">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>Temperature</td>
                            <td>{weather.temp} °C</td>
                        </tr>
                        <tr>
                            <td>Weather</td>
                            <td>
                                <span className="weather-icon">
                                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                                    {weather.weather[0].main}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{weather.weather[0].description}</td>
                        </tr>
                        <tr>
                            <td>Sunrise</td>
                            <td>{moment.unix(weather.sunrise).format("h:mm a")}</td>
                        </tr>
                        <tr>
                            <td>Sunset</td>
                            <td>{moment.unix(weather.sunset).format("h:mm a")}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{weather.humidity}%</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default WeatherForm;