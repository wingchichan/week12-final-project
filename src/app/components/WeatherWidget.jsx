"use client";
import { useState } from "react";

export default function WeatherWidget() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=8622541f9a9f43b1a5b143446252403&q=${location}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeather({
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        location: data.location.name,
      });
      setError(null);
    } catch (err) {
      setWeather(null);
      setError("Error fetching weather data");
    }
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather();
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
        <p>
          {weather.location}: {weather.temperature}°C, {weather.description}
        </p>
      )}
    </div>
  );
}
