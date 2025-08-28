export default function WeatherCard({ weather, city }) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="city-card">
      <img src={iconUrl} alt={weather.weather[0].description} />
      <div>
        <h2>{city}</h2>
        <p>{weather.weather[0].description}</p>
        <p>Temp: {weather.main.temp}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
      </div>
    </div>
  );
}

