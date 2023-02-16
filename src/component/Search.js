import React, { useEffect, useState} from "react";
import "./style.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Search(props) {
  const [searchText, setSearchText] = useState("");
  let [data, setData] = useState({});
  let [icon, setIcon] = useState("");
  let [flag, setFlag] = useState(false);
  let [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  useEffect(() => {
    if (flag) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${props.api}&units=metric`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          displayCurrentWeather(data);
          handleAddFavorite(data);
          
        })
        .catch((error) => console.error(error));

      function displayCurrentWeather(data) {
        const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        setIcon(iconUrl);
      }

      function handleAddFavorite(data) {
        console.log(data);
        localStorage.setItem("fav",JSON.stringify(data) )
        const newFavorite = {
          name: data.name,
          country: data.sys?.country,
          lat: data.coord?.lat,
          lon: data.coord?.lon,
        };
        setFavorites([...favorites, newFavorite]);
      }

      setFlag(false);
    }
  }, [props.api, flag]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log(favorites);
  }, [favorites]);

  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFlag(true);
  }

  let navigate = useNavigate();
  const handleSearchbtnClick = () => {
    navigate("/");
  };
  const handleBothbtnClick = ()=>{
    navigate("/both")
  }
  return (
    <>
      <Header />
      <div className="Searchcontainer">
        <button className="currenthbtn" onClick={handleSearchbtnClick}>
          Goback Current Location...
        </button>
        <button className="bothbtn" onClick={handleBothbtnClick}>
          Goto Current & Favourite Location...
        </button>
        <div class="search-location">
          <h2>Search Location</h2>
          <form onSubmit={handleSubmit}>
            <input
              id="inputloc"
              type="text"
              name="location"
              placeholder="Enter location"
              onChange={handleSearchChange}
            />
            <button type="submit" id="buttons">
              Search
            </button>
          </form>
        </div>
        <div class="detail-weather">
          <h2>Weather Details</h2>
          <div class="weather-details">
            <div
              className="weather-icon"
              style={{ backgroundImage: `url(${icon})` }}
            ></div>
            <div className="weather-info">
              <div className="temperature">
                {Math.round(data.main?.temp) + "°C"}
              </div>
              <div className="location">
                {data.name + ", " + data.sys?.country}
              </div>
              <div className="description">
                {data.weather?.[0]?.description}
              </div>
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
        </div>
      </div>
      
    </>
  );
}

export default Search;
