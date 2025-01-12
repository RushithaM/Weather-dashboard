import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { fetchWeatherData } from "../../utils/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CityWeatherCard from "../CityWeatherCard/CityWeatherCard"; // Correct import

const DEFAULT_CITIES = ["Bangalore"];

const Sidebar = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDefaultCities = async () => {
      try {
        const cityData = await Promise.all(
          DEFAULT_CITIES.map((city) => fetchWeatherData(city))
        );
        setCities(
          cityData.map((data) => ({
            id: data.id,
            name: data.name,
            country: data.sys.country,
            temp: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
          }))
        );
      } catch (err) {
        setError("Failed to load default cities");
      } finally {
        setLoading(false);
      }
    };

    loadDefaultCities();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        setLoading(true);
        const weatherData = await fetchWeatherData(searchTerm);
        const newCity = {
          id: weatherData.id,
          name: weatherData.name,
          country: weatherData.sys.country,
          temp: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
        };
        if (!cities.some((city) => city.id === newCity.id)) {
          setCities([newCity, ...cities]);
        }
        onCitySelect(newCity.name);
        setSearchTerm("");
        setError("");
      } catch (err) {
        setError("City not found. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const removeCity = (id) => {
    setCities(cities.filter((city) => city.id !== id));
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const draggedCity = cities[dragIndex];
    const newCities = [...cities];
    newCities.splice(dragIndex, 1);
    newCities.splice(hoverIndex, 0, draggedCity);
    setCities(newCities);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="sidebar">
        <form onSubmit={handleSearch} className="search-form mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search city..."
            className="search-input w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="search-button mt-2 w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
        {error && <p className="error-message text-red-500 mb-4">{error}</p>}
        <div className="city-list space-y-4">
          {cities.map((city, index) => (
            <CityWeatherCard
              key={city.id}
              index={index}
              city={city}
              onSelect={() => onCitySelect(city.name)}
              onRemove={() => removeCity(city.id)}
              moveCard={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Sidebar;
