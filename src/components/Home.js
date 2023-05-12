import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyMovieContext } from "../context/FavoriteMovies";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { favorites } = useContext(MyMovieContext);

  useEffect(() => {
    const apiKey = "f0bcbf02b64d41045b26c944faa72ea1";
    const Fetch = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const data = await response.json();
      setMovies(data.results);
    };
    Fetch();
  }, []);

  const handleSearchClick = () => {
    const movieInput = document.getElementById("movie");
    const movieName = movieInput.value;
    console.log(movieName);

    const apiKey = "f0bcbf02b64d41045b26c944faa72ea1";
    const Fetch = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`
      );
      const data = await response.json();
      setMovies(data.results);
      // console.log(data.results)
    };
    Fetch();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const getPosterURL = (posterpath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face/${posterpath}`;
  };
  return (
    <div>
      <div className="header">
        <div className="top">
          <Link to='/' className="top-link">
            <p >MyMovies</p>
          </Link>
          <div className="search-input">
            <div className="input">
              <input
                type="text"
                placeholder="Search for a movie"
                className="search--input"
                id="movie"
                onKeyDown={handleKeyPress}
              />
            </div>
            <button id="btn" onClick={handleSearchClick}>
              Search
            </button>
          </div>
          <Link className="top-link" to="/fav">
            <p>
              My Watchlist <span>{favorites ? favorites.length : 0}</span>
            </p>
          </Link>
        </div>
      </div>

      <div className="container">
        {movies.map((item, index) => (
          <div className="movie-card" key={index}>
            <Link to={`/movies/${item.id}`}>
              <img src={getPosterURL(item.poster_path)} alt={item.title} />
            </Link>

            <div className="movie-details">
              <h3 className="movie-title">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
