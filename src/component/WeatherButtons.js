import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButtons = ({setCurrentWeather, getCurrentLocationWeather}) => {
  return (
    <div>
      <Button variant="warning" onClick={() => getCurrentLocationWeather()}>Current Location</Button>
      <Button variant="warning" onClick={() => setCurrentWeather("Paris")}>Paris</Button>
      <Button variant="warning" onClick={() => setCurrentWeather("New York")}>New York</Button>
    </div>
  )
}

export default WeatherButtons
