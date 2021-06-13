import React, { useEffect, useState } from "react";
import { Container } from "react-grid-system";
import { Select, Typography } from "antd";
import { weatherAPI } from "../../api";
import appID from "../../config/appID";
import "./index.scss";
import InfoCard from "../InfoCard";
import dayjs from "dayjs";
dayjs.locale("en-EN");

const { Title } = Typography;
const { Option } = Select;

interface IMain {
  temp?: number;
  humidity?: number;
}

interface IWind {
  speed?: number;
  gust?: number;
}

interface IWeatherArray {
  [index: number]: { id?: number; description?: string; main?: string };
}

interface weatherConfig {
  name?: string;
  dt?: number;
  main?: IMain;
  wind?: IWind;
  weather?: IWeatherArray;
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
    <Container style={{ height: "100%" }}>
      <div className="weather">
        <div className="weather__grid">
          <div className="weather__header">
            <Title level={3}>Select city</Title>
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
          </div>
          <InfoCard
            title={weatherState.name}
            subtitle={dayjs.unix(weatherState?.dt ?? 0).format("DD/MM/YYYY")}
            main={
              weatherState?.main?.temp
                ? (weatherState?.main?.temp - 272).toFixed(0) + "°C"
                : 0
            }
          />
          <InfoCard
            title="Wind speed"
            subtitle={"Gust " + weatherState?.wind?.gust + " m/s"}
            main={weatherState?.wind?.speed + " m/s"}
          />
          <InfoCard
            title={"Weather"}
            main={
              weatherState?.weather !== undefined
                ? weatherState?.weather[0]?.main
                : ""
            }
          />
          <InfoCard
            title="Humidity"
            main={weatherState?.main?.humidity + " %"}
          />
        </div>
      </div>
    </Container>
  );
};

export default Weather;
