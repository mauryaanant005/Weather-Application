
import React, { useState, useEffect } from 'react';
import './App.css';

import searchImg from 'H:/React/weather-app/assets/search.png';
import clearImg from 'H:/React/weather-app/assets/clear.png';
import humidityImg from 'H:/React/weather-app/assets/humidity.png';
import windImg from 'H:/React/weather-app/assets/wind.png';
import snowImg from 'H:/React/weather-app/assets/snow.png';
import cloudImg from 'H:/React/weather-app/assets/cloud.png';
import rainImg from 'H:/React/weather-app/assets/rain.png';
import drizzleImg from 'H:/React/weather-app/assets/drizzle.png';




async function getWeatherData(BASE_URL) {
  let response = await fetch(BASE_URL);
  let data = await response.json();
  return data;
}

const getWeatherIcon=(data)=>{
  switch (data.weather[0].main.toLowerCase() ){
    case 'clear':
      return clearImg;
    case 'clouds':
        return  cloudImg;
    case 'rain':
          return rainImg;
    case 'snow':
            return snowImg;
    case 'rizzle':
           return drizzleImg;

                
  }
}

function Weather() {
  const API_KEY = "39a81a4cceb598345a180093ec5b3981";
  const [location, setLocation] = useState();
  const [Data, setWeatherData] = useState({});
  const [WeatherIcon ,setWeatherIcon]=useState(clearImg)

  useEffect(() => {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
    getWeatherData(BASE_URL).then((d) => {
      setWeatherData(d);
      console.log(d);
      let icon = getWeatherIcon(d)
      setWeatherIcon(icon)
    });
  }, [location]);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          className="input"
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Search..."
        />
        <button className="searchButton">
        <img src={searchImg} alt="search" />
        </button>
      </div>
      <div className="align">
        <img src={WeatherIcon}  className="weather-icon" />
        <div className="content">
          <p className="temperature">{Math.round(Data.main?.temp - 273.15)}°C</p>
          <p className="location">{Data.name}</p>
        </div>
      </div>
      <div className="weather-data">
        <div className="col">
          <img src={humidityImg} alt="humidity" />
          <div>
            <br />
            <p>{Data.main?.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={windImg} alt="wind" />
          <div>
            <br />
            <p>{Data.wind?.speed} Km/hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <Weather />;
}

export default App;
