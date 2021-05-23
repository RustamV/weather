import axios from "axios";

interface weatherAPIInterface {
  getWeatherFromCity: (...args: any[]) => any;
}

const weatherAPI: weatherAPIInterface = {
  getWeatherFromCity: (queryData: any) => {
    return axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${queryData.city},ru&appid=${queryData.appID}`
    );
  },
};

export default weatherAPI;
