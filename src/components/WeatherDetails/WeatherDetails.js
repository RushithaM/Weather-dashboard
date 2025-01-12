import React from "react";
import "./WeatherDetails.css";
import {
  Droplets,
  Sunrise,
  Wind,
  Thermometer,
  Eye,
  Gauge,
  Loader,
} from "lucide-react";

const WeatherDetails = ({ weatherData, isRefreshing }) => {
  if (!weatherData) return <div>Loading...</div>;

  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  const DetailCard = ({ icon: Icon, title, value }) => (
    <div className={`detail-card ${isRefreshing ? "refreshing" : ""}`}>
      {isRefreshing && (
        <div className="detail-overlay">
          <Loader className="loading-spinner" />
        </div>
      )}
      <Icon className="detail-icon" />
      <div className="detail-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );

  return (
    <div className="weather-details">
      <DetailCard
        icon={Droplets}
        title="Humidity"
        value={`${weatherData.main.humidity}%`}
      />
      <DetailCard
        icon={Eye}
        title="Visibility"
        value={`${(weatherData.visibility / 1000).toFixed(1)} km`}
      />
      <DetailCard
        icon={Sunrise}
        title="Sunrise / Sunset"
        value={`${sunrise} / ${sunset}`}
      />
      <DetailCard
        icon={Wind}
        title="Wind Speed"
        value={`${weatherData.wind.speed} m/s`}
      />
      <DetailCard
        icon={Thermometer}
        title="Feels Like"
        value={`${Math.round(weatherData.main.feels_like)}°C`}
      />
      <DetailCard
        icon={Gauge}
        title="Pressure"
        value={`${weatherData.main.pressure} hPa`}
      />
    </div>
  );
};

export default WeatherDetails;
