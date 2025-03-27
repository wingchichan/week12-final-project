"use client";
import { useState, useEffect } from "react";
import "../styles/WeatherWidget.css";

export default function WeatherWidget() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "8622541f9a9f43b1a5b143446252403";

  const fetchWeather = async (query, selectedDate) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&dt=${selectedDate}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();

      if (data.forecast?.forecastday?.length > 0) {
        const forecast = data.forecast.forecastday[0];
        setWeather({
          temperature: forecast.day.avgtemp_c,
          description: forecast.day.condition.text,
          location: data.location.name,
          icon: forecast.day.condition.icon,
        });
        setError(null);
      } else {
        setWeather(null);
        setError("No forecast available for this date");
      }
    } catch (err) {
      setWeather(null);
      setError("Error fetching weather data");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeather(`${latitude},${longitude}`, date || getTodayDate());
        },
        (error) => {
          setError("Geolocation access denied. Please enter a location manually");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (date && location) {
      fetchWeather(location, date);
    }
  }, [date]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather(location, date || getTodayDate());
  };

  return (
    <>
      <h2>Weather Widget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          min={getTodayDate()}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div className="weather-info-container">
          <p className="weather-info">
            {weather.location}: {weather.temperature}°C, {weather.description}
          </p>
          {weather.icon && (
            <img
              className="weather-icon"
              src={`https:${weather.icon}`}
              alt={weather.description}
            />
          )}
        </div>
      )}
    </>
  );
}  

