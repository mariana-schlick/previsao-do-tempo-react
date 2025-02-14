/* eslint-disable react/prop-types */
import './WeatherInformations5Days.css';

function WeatherInformations5Days({ forecast, getTemperatureColor }) {
    if (!forecast || !forecast.list) {
        return null; // Retorna nada se não houver previsão
    }

    console.log(forecast);

    // Filtrar a previsão para exibir apenas um horário fixo por dia (exemplo: 12:00)
    const dailyForecasts = forecast.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
    ).slice(0, 5); // Pegamos apenas 5 dias

    return (
        <div className="forecast-container">
            <h2>Previsão para os próximos 5 dias</h2>
            <div className="forecast-list">
                {dailyForecasts.map((day, index) => (
                    <div key={index} className="forecast-item">
                        <p className="day-title">{new Date(day.dt_txt).toLocaleDateString('pt-BR', { weekday: 'long' })}</p>
                        <img
                            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                            alt="Weather Icon"
                        />
                        <p className="temperature" style={{ color: getTemperatureColor(day.main.temp) }}>
                            {Math.round(day.main.temp)}°C
                        </p>
                        <p className="forecast-description">{day.weather[0].description}</p>
                        <div className="forecast-details">
                            <p>Sensação {Math.round(day.main.feels_like)}°C</p>
                            <p>Umidade {day.main.humidity}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeatherInformations5Days;
