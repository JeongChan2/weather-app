import { useEffect, useState, useCallback } from 'react';
import './App.css';
import WeatherBox from './component/WeatherBox';

const APIKEY = "879daacd42e34fcb2b42379bd9748475";

// 유저는 현재위치의 날씨를 볼 수 있다.(지역, 섭씨, 화씨,날씨 상태)
// 유저는 다른 도시의 버튼들을 볼 수 있다.
// 유저는 다른 도시 버튼을 클릭하면 해당 도시의 날씨 정보를 볼 수 있다.
// 유저는 데이터가 로딩될 때 로딩 스피너를 볼 수 있다.

function App() {

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon);

      
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      getCurrentLocation();
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  }, [getCurrentLocation])

  

  const getWeatherByCurrentLocation = async(lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
    let response = await fetch(url)
    let data = await response.json();
    console.log("data", data);
  }

  return (
    <div>
      <WeatherBox/>
    </div>
  );
}

export default App;
