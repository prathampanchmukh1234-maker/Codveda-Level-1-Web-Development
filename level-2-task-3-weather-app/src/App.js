import { useState } from "react";
import WeatherCard from "./WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=58f76ad05c7779ca62a230e6d071d6e6`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <input
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;


