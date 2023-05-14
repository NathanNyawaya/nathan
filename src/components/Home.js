import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyMovieContext } from "../context/FavoriteMovies";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { favorites } = useContext(MyMovieContext);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState(false)

  const Fetch = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      // filter movies that do not have images out
      const filteredMovies = data.results.filter((movie) => movie.poster_path);
      setMovies(filteredMovies);
      // setMovies(data.results || data);
      if (data.results.length === 0) {
        setIsLoading(false);
        setErrorFetch(true)
      }
      // console.log(data.results);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const apiKey = "f0bcbf02b64d41045b26c944faa72ea1";;
    let apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    // if genre id is selected, update the apiUrl with genre id as a query parameter
    if (selectedGenre) {
      apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}`;
    }
    Fetch(apiUrl);
  }, [selectedGenre]);

  const handleSearchClick = () => {
    const movieInput = document.getElementById("movie");
    const movieName = movieInput.value;
    setIsLoading(true);
    setMovies([])
    const apiKey = "f0bcbf02b64d41045b26c944faa72ea1";
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`
    Fetch(apiUrl);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
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
    <div className="home--section">
      <div className="header">
        <div className="top">
          <div className="top--left">
            <Link to="/" className="top-link">
              <p>MyMovies</p>
            </Link>
            <select value={selectedGenre} onChange={handleGenreChange}>
              <option value="">All Genres</option>
              <option value="28">Action</option>
              <option value="35">Comedy</option>
              <option value="18">Drama</option>
              <option value="27">Horror</option>
              <option value="10749">Romance</option>
            </select>
          </div>
          <Link className="top-link" to="/fav">
            <p>
              My Watchlist <span>{favorites ? favorites.length : 0}</span>
            </p>
          </Link>
        </div>
      </div>
      {/* search box */}
      <div className="search--section">
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
      </div>

      {/* movie display section */}
      <div className="container">
        {movies.length > 0 ? (
          movies.map((item, index) => (
            <div className="movie-card" key={index}>
              <Link to={`/movies/${item.id}`}>
                <img src={getPosterURL(item.poster_path)} alt={item.title} />
              </Link>

              <div className="movie-details">
                <h3 className="movie-title">{item.title}</h3>
              </div>
            </div>
          ))
        ) : // input search error
        isloading ? (
          <p className="empty--list">loading...</p>
        ) : (
          errorFetch && <p className="empty--list">Sorry, Please input a valid key word!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
