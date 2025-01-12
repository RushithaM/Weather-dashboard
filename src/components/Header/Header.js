import React from "react";
import "./Header.css";
import { Sun, Moon, RefreshCw, Loader } from "lucide-react";

const Header = ({ darkMode, toggleDarkMode, onRefresh, isRefreshing }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    if (hour < 22) return "Good Evening";
    return "Good Night";
  };

  const getFormattedDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getLastUpdateTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="greeting-container">
          <h1 className="greeting">{getGreeting()}!</h1>
          <p className="date">{getFormattedDate()}</p>
          <p className="last-update">Last updated: {getLastUpdateTime()}</p>
        </div>
        <div className="header-actions">
          <button
            className="refresh-button"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh weather data"
          >
            {isRefreshing ? (
              <Loader className="refresh-icon spinning" />
            ) : (
              <RefreshCw className="refresh-icon" />
            )}
          </button>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
