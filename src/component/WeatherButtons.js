import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButtons = ({getCurrentWeather, getCurrentLocationWeather, cities, selectedCity}) => {
  return (
    <div>
      <Button className='city-button' variant={`${selectedCity === null ? "outline-warning" : "warning"}`} onClick={() => getCurrentLocationWeather()}>Current Location</Button>
      

      {cities.map((city) => (
        <Button className='city-button' variant={`${selectedCity === city ? "outline-warning" : "warning"}`} onClick={() => getCurrentWeather(city)}>{city}</Button>
      ))}
    </div>
  )
}

export default WeatherButtons
