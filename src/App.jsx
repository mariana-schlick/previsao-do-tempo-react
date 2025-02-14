import { useState, useRef } from 'react'
import axios from 'axios'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days'
import './App.css'

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const inputRef = useRef(null)

  async function searchCity() {
    const city = inputRef.current.value.trim();
    if (!city) return; // Evita busca vazia

    const key = "e9e478c51149c1c56bb92085311b87cb"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`

    try {
      const response = await axios.get(url)
      const response5Days = await axios.get(url5Days)

      setWeather(response.data)
      setForecast(response5Days.data)
    } catch (error) {
      console.error("Erro ao buscar dados da cidade:", error)
      alert("Cidade não encontrada. Verifique o nome e tente novamente.")
    }
  }

  // Função para capturar a tecla pressionada
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchCity();
    }
  };

  // Função para determinar a cor baseada na temperatura
  const getTemperatureColor = (temp) => {
    if (temp < 0) return 'rgb(11, 53, 77)';
    if (temp >= 25) return 'rgb(226, 61, 49)';
    if (temp <= 15) return 'rgb(68, 153, 57)';
    return 'rgb(255, 136, 0)';
  };

  return (
    <div>
      <div className="title">
        <img src="src/assets/title.png" alt="Title" />
      </div>
      <div className='container'>
        <input
          ref={inputRef}
          type="text"
          placeholder='Nome da cidade'
          onKeyDown={handleKeyDown} // Adiciona o evento de tecla
        />
        <button onClick={searchCity}>Buscar</button>

        <WeatherInformations
          weather={weather}
          getTemperatureColor={getTemperatureColor}
        />

        <WeatherInformations5Days
          forecast={forecast}
          getTemperatureColor={getTemperatureColor}
        />
      </div>
    </div>
  )
}

export default App;
