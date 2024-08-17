import React from 'react'

const WeatherBox = ({weather}) => {
  // console.log(weather)
  return (
    <div className='weather-box'>
      <div>{weather?.name}</div>
      <h2>{weather?.main.temp}C / { 9/5*weather?.main.temp + 32}</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox
