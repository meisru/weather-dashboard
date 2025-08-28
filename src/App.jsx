import { useState, useEffect } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import TemperatureChart from "./components/TemperatureChart";
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const majorCities = ["Riyadh", "Mecca", "Medina"];

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCity, setSelectedCity] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeatherData({ [city]: res.data }); // overwrite previous search
      setSelectedCity(city);
    } catch (err) {
      console.error(err);
      alert("City not found!");
    }
  };

  // Load major cities initially
  useEffect(() => {
    majorCities.forEach(city => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
        .then(res => setWeatherData(prev => ({ ...prev, [city]: res.data })))
        .catch(err => console.error(err));
    });
  }, []);

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <h1 className="title">🌤 Weather Dashboard</h1>
        <WeatherForm fetchWeather={fetchWeather} />
      </div>

      <div className="weather-section major-cities">
          {!selectedCity && (
          <div className="major-cities-row">
            {majorCities.map(city =>
              weatherData[city] ? (
                <WeatherCard
                  key={city}
                  weather={weatherData[city].list[0]}
                  city={city}
                />
              ) : null
            )}
          </div>
        )}
      </div>

      {selectedCity && weatherData[selectedCity] && (
        <div className="weather-section searched-city">
          <WeatherCard
            weather={weatherData[selectedCity].list[0]}
            city={selectedCity}
          />
          <TemperatureChart data={weatherData[selectedCity].list} />
        </div>
      )}
    </div>
  );
}

export default App;


