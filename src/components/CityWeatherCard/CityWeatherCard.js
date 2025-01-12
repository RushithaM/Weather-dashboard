import React from "react";
import "./CityWeatherCard.css";
import { useDrag, useDrop } from "react-dnd";

const CityWeatherCard = ({ city, index, onSelect, onRemove, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      if (!moveCard) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`city-weather-card ${isDragging ? "dragging" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="card-content" onClick={onSelect}>
        <h3 className="text-lg font-semibold">
          {city.name}, {city.country}
        </h3>
        <p className="temperature text-2xl">{Math.round(city.temp)}°C</p>
        <p className="condition text-sm">{city.description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${city.icon}.png`}
          alt={city.description}
          className="w-16 h-16"
        />
      </div>
      <button
        className="remove-button absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={onRemove}
      >
        ×
      </button>
    </div>
  );
};
export default CityWeatherCard;
