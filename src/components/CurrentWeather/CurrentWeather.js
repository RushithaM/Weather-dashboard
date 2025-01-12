import React from "react";
import "./CurrentWeather.css";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  Cloudy,
  Loader,
} from "lucide-react";

const getWeatherIcon = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300)
    return <CloudLightning className="weather-icon" />;
  if (weatherId >= 300 && weatherId < 400)
    return <CloudDrizzle className="weather-icon" />;
  if (weatherId >= 500 && weatherId < 600)
    return <CloudRain className="weather-icon" />;
  if (weatherId >= 600 && weatherId < 700)
    return <CloudSnow className="weather-icon" />;
  if (weatherId >= 700 && weatherId < 800)
    return <Cloudy className="weather-icon" />;
  if (weatherId === 800) return <Sun className="weather-icon" />;
  return <Cloud className="weather-icon" />;
};

const CurrentWeather = ({ weatherData, forecastData, isRefreshing }) => {
  if (!weatherData || !forecastData) return <div>Loading...</div>;

  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div className={`weather-card ${isRefreshing ? "refreshing" : ""}`}>
      {isRefreshing && (
        <div className="weather-overlay">
          <Loader className="loading-spinner" />
        </div>
      )}
      <div className="card-header">
        <span className="username">{weatherData.name}</span>
      </div>
      <div className="card-content">
        <div className="temperature-section">
          {getWeatherIcon(weatherData.weather[0].id)}
          <div className="temperature">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <div className="location">
            {weatherData.name}, {weatherData.sys.country}
          </div>
        </div>
        <div className="weather-description">
          {weatherData.weather[0].description}
        </div>
        <div className="sunset-info">
          Sunset time, {currentDay}
          <span className="sunset-time">{sunset}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
