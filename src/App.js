import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style.css";

const API_KEY = "04794127ed8dd51b3f4b806399afef77";

function App() {
  const [city, setCity] = useState();
  const [weather, setWeather] = useState();

  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    console.log(response);
    setWeather(response.data);
  };

  return (
    <div className="App">
      {weather ? (
        <SearchWeather weather={weather} />
      ) : (
        <SearchCity setCity={setCity} fetchWeather={fetchWeather} />
      )}
      {/* <SearchWeather /> */}
    </div>
  );
}

export default App;

const WeatherInfoComonent = (props) => {
  return (
    <div className="Sunset_main">
      <div className="Sunset">
        <h6>{props.value}</h6>
        <h6>{props.name}</h6>
      </div>
    </div>
  );
};

function SearchWeather(props) {
  const { weather } = props;
  const isDay = weather?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  return (
    <div>
      <div className="main_weatherDiv">
        <div className="main_weather">
          <h4>React Weather App</h4>
          <br />
          <div className="main_img">
            <span>
              <h4>{`${Math.floor(weather?.main?.temp - 273)}°C`}</h4>{" "}
              <h6>{`| ${weather?.weather[0].description}`}</h6>
            </span>
            <span></span>
          </div>
          <div>
            <h2>{`${weather?.name}, ${weather?.sys?.country}`}</h2>
            <h5>Weather Info</h5>
            <div className="main_Weather">
              <div>
                <WeatherInfoComonent
                  name={isDay ? "sunset" : "sunrise"}
                  value={`${getTime(
                    weather?.sys[isDay ? "sunset" : "sunrise"]
                  )}`}
                />
                <WeatherInfoComonent
                  name={"Wind"}
                  value={weather?.wind?.speed}
                />
              </div>
              <div>
                <WeatherInfoComonent
                  name={"Humidity"}
                  value={weather?.main?.humidity}
                />
                <WeatherInfoComonent
                  name={"Pressure"}
                  value={weather?.main?.pressure}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchCity(props) {
  const { setCity, fetchWeather } = props;

  return (
    <div className="main_weatherDiv">
      <div className="main_div">
        <h4>React Weather App</h4>
        <br /> <h4>Find Weather of the City</h4>
        <form onSubmit={fetchWeather}>
          <input
            type="text"
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <button type={"submit"}>Search</button>
        </form>
      </div>
    </div>
  );
}
