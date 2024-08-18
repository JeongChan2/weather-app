import { useEffect, useState, useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButtons from "./component/WeatherButtons";
import ClipLoader from "react-spinners/ClipLoader";

const APIKEY = "879daacd42e34fcb2b42379bd9748475";

// 유저는 현재위치의 날씨를 볼 수 있다.(지역, 섭씨, 화씨,날씨 상태)
// 유저는 다른 도시의 버튼들을 볼 수 있다.
// 유저는 다른 도시 버튼을 클릭하면 해당 도시의 날씨 정보를 볼 수 있다.
// 유저는 데이터가 로딩될 때 로딩 스피너를 볼 수 있다.

function App() {
  const cities = ['paris','new york','tokyo','seoul']
  
  const [weather, setWeather] = useState(null); // 날씨 정보 저장
  const [loading, setLoading] = useState(false); // Loader
  const [city, setCity] = useState(null); // 도시 정보 저장

  /**
   * 날씨 정보 저장
   * @param {string} city 도시
   * @param {string} lat 위도
   * @param {string} lon 경도
   */
  const getCurrentWeather = async (city = null, lat = null, lon = null) => {
    try {
      setCity(city);
      let url = ``;
      url = city?`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`:
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`;
      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);

    } catch(error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  /**
   * 현재 위치의 날씨 정보 호출
   */
  const getCurrentLocationWeather = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getCurrentWeather(null, lat, lon);
    });
  }, []);

  /**
   * componentDidMount
   */
  useEffect(() => {
    if (navigator.geolocation) {
      getCurrentLocationWeather();
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [getCurrentLocationWeather]);

  return (
    <div>
      <div className="container">
      {loading ? (
        <ClipLoader color='#f88c6a' loading={loading} size={150} />
        ) : (
        <>
          <WeatherBox weather={weather} />
          <WeatherButtons getCurrentWeather={getCurrentWeather} getCurrentLocationWeather={getCurrentLocationWeather} cities={cities} selectedCity={city} />
        </>
      )}
      
      </div>
      
    </div>
  );
}

export default App;
