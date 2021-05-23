import React, { useEffect, useState } from "react";
import { Container } from "react-grid-system";
import { Select } from "antd";
import appID from "../../config/appID";
import { weatherAPI } from "../../api";

const { Option } = Select;
const styles = require("./index.module.scss");

interface weatherConfig {
  name?: string;
}

const Weather: React.FC = () => {
  const [weatherState, setWeatherState] = useState<weatherConfig>({});

  const fetchWeather = async (city: string) => {
    try {
      const { data } = await weatherAPI.getWeatherFromCity({ city, appID });
      setWeatherState(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather("Ufa");
  }, []);

  return (
    <Container>
      <div className={styles["weather"]}>
        <Select
          defaultValue="Ufa"
          style={{ width: 120 }}
          bordered={false}
          onChange={(value) => fetchWeather(value)}
        >
          <Option value="Ufa">Ufa</Option>
          <Option value="Moscow">Moscow</Option>
          <Option value="Kazan">Kazan</Option>
        </Select>
        {weatherState?.name}
      </div>
    </Container>
  );
};

export default Weather;
