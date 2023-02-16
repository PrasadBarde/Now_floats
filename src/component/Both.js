import React,{useState,useEffect} from "react";
import "./style.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


function Both(props) {
    let [data, setData] = useState({});
  let [icon, setIcon] = useState("");
  let [seardata,setSeardata]=useState({});
  let [sericon,setSericon]=useState("");
    const navigate =useNavigate();
    const handleCurrentbtnClick=()=>{
        navigate("/")
    }
    const handleFavouritebtnClick=()=>{
        navigate("/search")
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${props.api}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log(data);
          displayCurrentWeather(data);
          setData(data);
          setSeardata(localStorage.getItem("fav"));
      console.log(seardata);
        });
      }, [props.api]);
    
      function displayCurrentWeather(data) {
        const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        setIcon(iconUrl);
      }
      
  return (
 <>
 <Header/>
 <div class="container">
        <button className="currenthbtn" onClick={handleCurrentbtnClick}>
          Goback Current Location...
        </button>
        <button className="bothbtn" onClick={handleFavouritebtnClick}>
          Goback Search Location...
        </button>
        <div className="current-weather">
          <h2>Current Weather</h2>
          <div className="weather-details">
            <div className="weather-icon" style={{ backgroundImage: `url(${icon})` }}></div>
            <div className="weather-info">
              <div className="temperature">{Math.round(data.main?.temp) + "°C"}</div>
              <div className="location">{data.name + ", " + data.sys?.country}</div>
              <div className="description">{data.weather?.[0]?.description}</div>
            </div>
          </div>
        </div>
      <div className="detail-weather">
        <h2>Favourite place Weather Details</h2>
        <div className="weather-details">
        <div className="weather-icon" style={{ backgroundImage: `url(${icon})` }}></div>
          <div className="weather-info">
          <div className="temperature">{Math.round(data.main?.temp) + "°C"}</div>
              <div className="location">{data.name + ", " + data.sys?.country}</div>
              <div className="description">{data.weather?.[0]?.description}</div>
          </div>
        </div>
      </div>
    </div>
 </>
  )
}

export default Both;