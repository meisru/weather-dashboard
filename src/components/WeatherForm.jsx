import { useState } from "react";

export default function WeatherForm({ fetchWeather }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) fetchWeather(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        required
      />
      <button
        type="submit"
        className="submit-button"
      >
        Search
      </button>
    </form>
  );
}

