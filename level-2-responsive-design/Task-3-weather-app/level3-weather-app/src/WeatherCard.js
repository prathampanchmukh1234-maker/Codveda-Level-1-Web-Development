function WeatherCard({ data }) {
  return (
    <div className="card">
      <h2>{data.name}</h2>
      <p>🌡 Temperature: {data.main?.temp}°C</p>
      <p>☁ Condition: {data.weather?.[0]?.main}</p>
    </div>
  );
}

export default WeatherCard;
