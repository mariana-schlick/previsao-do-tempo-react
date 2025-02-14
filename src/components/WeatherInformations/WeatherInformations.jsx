/* eslint-disable react/prop-types */
import './WeatherInformations.css';

function WeatherInformations({ weather, getTemperatureColor }) {
    if (!weather || !weather.weather || !weather.weather[0]) {
        return <p className="local">. . . . . . . . . . . . . . . . . . . . . . . . . . . </p>;
    }

    console.log(weather);

    const temperatureColor = getTemperatureColor(weather.main.temp); // Obtemos a cor com base na temperatura

    return (
        <div className="weather-container">
            <h2>{weather.name}</h2>
            <div className="weather-info">
                <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt="Weather Icon"
                />
                {/* Aplicando a cor dinâmica à temperatura */}
                <p className="temperature" style={{ color: temperatureColor }}>
                    {Math.round(weather.main.temp)}°C
                </p>
            </div>
            <p className="description">{weather.weather[0].description}</p>
            <div className="weather-details">
                <p>Sensação Térmica {Math.round(weather.main.feels_like)}°C</p>
                <p>Umidade {weather.main.humidity}%</p>
                <p>Pressão {weather.main.pressure}hPa</p>
            </div>
        </div>
    );
}

export default WeatherInformations;
