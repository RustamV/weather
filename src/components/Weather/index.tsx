import React, { useEffect, useState } from "react";
import axios from "axios";
const styles = require("./index.module.scss");

interface weatherConfig {
  name?: string;
}

const Weather: React.FC = () => {
  const [weatherState, setWeatherState] = useState<weatherConfig>({});
  const fetchWeather = async () => {
    try {
      const { data } = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather?q=Ufa,ru&appid=79ad50b6530fe52fe585772ecf0c4a99"
      );
      setWeatherState(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return <div className={styles["weather"]}>{weatherState?.name}</div>;
};

export default Weather;
