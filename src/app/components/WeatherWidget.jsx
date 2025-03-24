"use client";
import { useState, useEffect } from "react";

export default function WeatherWidget() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "8622541f9a9f43b1a5b143446252403"; // ваш API ключ

  const fetchWeather = async (query) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather({
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        location: data.location.name,
        icon: data.current.condition.icon, // добавляем иконку погоды
      });
      setError(null);
    } catch (err) {
      setWeather(null);
      setError("Error fetching weather data");
    }
  };

  // Функция для получения текущего местоположения
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeather(`${latitude},${longitude}`); // передаем координаты в запрос
        },
        (error) => {
          setError("Error fetching location: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Вызов getLocation при монтировании компонента
  useEffect(() => {
    getLocation();
  }, []);

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather(location); // Погода по городу, если указано место
  };

  return (
    <div>
      <h2>Weather Widget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={handleChange}
          placeholder="Enter location"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <p>
            {weather.location}: {weather.temperature}°C, {weather.description}
          </p>
          {weather.icon && (
            <img
              src={`https:${weather.icon}`} // Иконка погоды
              alt={weather.description}
            />
          )}
        </div>
      )}
    </div>
  );
}
