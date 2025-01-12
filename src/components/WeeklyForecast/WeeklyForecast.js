import React from "react";
import "./WeeklyForecast.css";
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Loader } from "lucide-react";

const WeeklyForecast = ({ forecastData, isRefreshing }) => {
  if (!forecastData) return <div>Loading...</div>;

  const getWeatherIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300)
      return <CloudRain className="weather-icon" />;
    if (weatherId >= 300 && weatherId < 600)
      return <CloudRain className="weather-icon" />;
    if (weatherId >= 600 && weatherId < 700)
      return <CloudSnow className="weather-icon" />;
    if (weatherId >= 700 && weatherId < 800)
      return <Wind className="weather-icon" />;
    if (weatherId === 800) return <Sun className="weather-icon" />;
    return <Cloud className="weather-icon" />;
  };

  const getDayName = (date) => {
    return new Date(date).toLocaleDateString("en-US", { weekday: "short" });
  };

  const today = new Date();
  const dailyForecasts = forecastData.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 7)
    .map((item, index) => ({
      day: getDayName(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      weatherId: item.weather[0].id,
      isToday: index === 0,
    }));

  const currentDayIndex = dailyForecasts.findIndex(
    (forecast) => forecast.day === getDayName(today)
  );
  const reorderedForecasts = [
    ...dailyForecasts.slice(currentDayIndex),
    ...dailyForecasts.slice(0, currentDayIndex),
  ];

  return (
    <div className={`weekly-forecast ${isRefreshing ? "refreshing" : ""}`}>
      {isRefreshing && (
        <div className="forecast-overlay">
          <Loader className="loading-spinner" />
        </div>
      )}
      {reorderedForecasts.map((forecast, index) => (
        <div
          key={index}
          className={`forecast-day ${forecast.isToday ? "today" : ""}`}
        >
          <p className="day-name">{forecast.day}</p>
          {getWeatherIcon(forecast.weatherId)}
          <p className="temperature">{forecast.temperature}°C</p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;
