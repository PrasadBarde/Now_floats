import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import "./style.css";
import Header from "./Header";
import Both from "./Both";

function Current(props) {
 
  let [data, setData] = useState({});
  let [icon, setIcon] = useState("");
  let navigate = useNavigate();
  let [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  const handlebtnClick = () => {
    navigate("/search")
  };

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
    });
  }, [props.api]);

  function displayCurrentWeather(data) {
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    setIcon(iconUrl);
  }

 

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  
  function handleAddFavorite() {
    const newFavorite = {
      name: data.name,
      country: data.sys?.country,
      lat: data.coord?.lat,
      lon: data.coord?.lon,
    };
    setFavorites([...favorites, newFavorite]);
  }

  return (
    <>
      <Header />
      <div className="container">
        <button className="searchbtn" onClick={handlebtnClick}>Search for Perticular City...</button>

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

        <div className="favorite-locations">
          <h2>Favorite Locations</h2>
          <ul>
            {favorites.map((favorite, index) => (
              <li key={index}>{favorite.name + ", " + favorite.country}</li>
            ))}
          </ul>
          <button className="add-favorite" onClick={handleAddFavorite}>Add Current Location to Favorites</button>
        </div>
      </div>
      
    </>
  );
}


export default Current;

