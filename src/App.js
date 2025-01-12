import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import Sidebar from "./components/Sidebar/Sidebar";
import CityWeatherCard from "./components/CityWeatherCard/CityWeatherCard";
import { fetchWeatherData, fetchForecastData } from "./utils/api";
import { Loader } from "lucide-react";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState("Bangalore");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(null);
  const [cityWeatherCards, setCityWeatherCards] = useState([]);

  // Load saved city cards from localStorage
  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cityWeatherCards"));
    if (storedCards) {
      setCityWeatherCards(storedCards);
    }
    setLastRefreshTime(new Date().toISOString());
  }, []);

  // Save city cards to localStorage when updated
  useEffect(() => {
    localStorage.setItem("cityWeatherCards", JSON.stringify(cityWeatherCards));
  }, [cityWeatherCards]);

  // Main data fetching function
  const fetchData = async (selectedCity = city, isRefreshAction = false) => {
    try {
      if (isRefreshAction) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      const [weather, forecast] = await Promise.all([
        fetchWeatherData(selectedCity),
        fetchForecastData(selectedCity),
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
      setError(null);
      setLastRefreshTime(new Date().toISOString());
    } catch (err) {
      setError("Failed to fetch weather data");
      console.error(err);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  // Fetch data when city changes
  useEffect(() => {
    fetchData();
  }, [city]);

  // Handle refresh button click
  const handleRefresh = async () => {
    if (isRefreshing) return;

    try {
      // Refresh main weather data
      await fetchData(city, true);

      // Refresh all city cards if they exist
      if (cityWeatherCards.length > 0) {
        await refreshAllCards();
      }
    } catch (error) {
      setError("Failed to refresh data");
      console.error("Refresh failed:", error);
    }
  };

  // Refresh all city weather cards
  const refreshAllCards = async () => {
    try {
      setIsRefreshing(true);
      const updatedCards = await Promise.all(
        cityWeatherCards.map(async (card) => {
          const updatedCityWeather = await fetchWeatherData(card.name);
          return {
            id: updatedCityWeather.id,
            name: updatedCityWeather.name,
            country: updatedCityWeather.sys.country,
            temp: updatedCityWeather.main.temp,
            description: updatedCityWeather.weather[0].description,
            icon: updatedCityWeather.weather[0].icon,
            lastUpdated: new Date().toISOString(),
          };
        })
      );
      setCityWeatherCards(updatedCards);
      setError(null);
    } catch (error) {
      console.error("Error refreshing cards:", error);
      setError("Failed to refresh cards");
    } finally {
      setIsRefreshing(false);
    }
  };

  // Add new city weather card
  const addCityWeatherCard = async (cityName) => {
    try {
      const cityWeather = await fetchWeatherData(cityName);
      const newCard = {
        id: cityWeather.id,
        name: cityWeather.name,
        country: cityWeather.sys.country,
        temp: cityWeather.main.temp,
        description: cityWeather.weather[0].description,
        icon: cityWeather.weather[0].icon,
        lastUpdated: new Date().toISOString(),
      };

      if (!cityWeatherCards.some((card) => card.id === newCard.id)) {
        setCityWeatherCards([...cityWeatherCards, newCard]);
      }
    } catch (error) {
      console.error("Error adding city weather card:", error);
    }
  };

  // Remove city weather card
  const removeCityWeatherCard = (id) => {
    setCityWeatherCards(cityWeatherCards.filter((card) => card.id !== id));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle city selection
  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          lastRefreshTime={lastRefreshTime}
        />
        <div className="content">
          <div className="main-content">
            {loading ? (
              <div className="loading-container">
                <Loader className="loading-spinner" />
                <span>Loading weather data...</span>
              </div>
            ) : error ? (
              <div className="error-container">{error}</div>
            ) : (
              <>
                <CurrentWeather
                  weatherData={weatherData}
                  forecastData={forecastData}
                  isRefreshing={isRefreshing}
                />
                <WeeklyForecast
                  forecastData={forecastData}
                  isRefreshing={isRefreshing}
                />
                <WeatherDetails
                  weatherData={weatherData}
                  isRefreshing={isRefreshing}
                />
              </>
            )}
          </div>
          <Sidebar
            onCitySelect={handleCitySelect}
            onAddCity={addCityWeatherCard}
          />
          <div className="city-weather-cards">
            {cityWeatherCards.map((city) => (
              <CityWeatherCard
                key={city.id}
                city={city}
                onSelect={() => handleCitySelect(city.name)}
                onRemove={() => removeCityWeatherCard(city.id)}
                lastUpdated={city.lastUpdated}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
