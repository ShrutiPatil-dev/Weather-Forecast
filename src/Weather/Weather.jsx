import React, { useEffect, useRef, useState } from 'react'
import clear_sky from "../assets/clear.png"
import drizzle from "../assets/drizzle.png"
import humidity from "../assets/humidity.png"
import cloud from '../assets/cloud.png'
import snow from '../assets/snow.png'
import rain from '../assets/rain.png'
import { SlMagnifier } from "react-icons/sl";
import house from '../assets/house.png'
import wind from '../assets/wind.png'
import thunderstorm from '../assets/thunderstorm.png'
import mist  from '../assets/mist.png'
import './Weather.css'

function Weather() {

    let api_key = "08b134dc51a593fa582598c015b0e37e";
    
    const inputRef = useRef();
    const [weatherdata,setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_sky,
        "01n": clear_sky,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "11d": thunderstorm,
        "11n": thunderstorm,
        "13d": snow,
        "13n": snow,
        "50d": mist,
        "50n": mist,
        };


    const search = async (city) =>{


        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

            const response = await fetch(url);
            const data = await response.json();

            console.log(data)

            const icon = allIcons[data.weather[0].icon] || clear_sky;
            
            setWeatherData({
                humidity : data.main.humidity,
                temp : Math.floor(data.main.temp),
                mintemp : Math.floor(data.main.temp_min),
                maxtemp : Math.floor(data.main.temp_max),
                winSpeed : data.wind.speed,
                location : data.name,
                description : data.weather[0].description,
                icon : icon

            })

            
        }
        catch (error){
            console.error("Something bad happened");
            console.error(error.message);
            
          
        }
    }

    useEffect(() =>{
        search("london")
    },[])

  

  return (
    <div>
        <div className="container">
             <div className="input">
                    <input type="text" ref={inputRef} placeholder='Search Location '/>
                    <SlMagnifier className="search" size={22} color='white' onClick={()=> search(inputRef.current.value)}/>
             </div>

              <div className="weather-info">
                 <img className="icon" src={weatherdata.icon} alt="icon"/>
                <h3 className='location'>{weatherdata.location}</h3>
                <p className="temperature">{weatherdata.temp}°C</p>
                
                 <div className="temp">
                 <p >Max {weatherdata.maxtemp}°C</p>
                 <p >Min {weatherdata.mintemp}°C</p>
                 </div>
                 <p className='description'>{weatherdata.description}</p>

                 <div className="column">
                    <div className="col">
                        <img src={humidity} alt="humdity"/>
                        <div>
                            <p>{weatherdata.humidity} %</p>
                            <span>Humidity</span>
                        </div>

                    </div>
                    <div className="col">

                    <img src={wind} alt="humdity"/>
                        <div>
                            <p>{weatherdata.winSpeed} Km/h</p>
                            <span>Wind Speed</span>
                        </div>

                    </div>
                 </div>
                 
              </div>

        
            
        </div>
      
    </div>
  )
}

export default Weather
