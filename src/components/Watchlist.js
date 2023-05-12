import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MyMovieContext } from "../context/FavoriteMovies";

const API_KEY = "f0bcbf02b64d41045b26c944faa72ea1";
const API_URL = "https://api.themoviedb.org/3/movie/";

const Watchlist = () => {
  const { favorites, toggleFavorite } = useContext(MyMovieContext);
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    // Fetch movie details for each ID in savedArray
    const fetchMovies = async () => {
      const movieDetails = await Promise.all(
        favorites.map(async (id) => {
          const response = await fetch(`${API_URL}${id}?api_key=${API_KEY}`);
          const data = await response.json();
          // console.log(data);
          return data;
        })
      );
      setMyMovies(movieDetails);
    };

    fetchMovies();
  }, [favorites]);

  return (
    <div className="watchlist">
      <div className="top">
        <Link to="/" className="top-link">
          <p>MyMovies</p>
        </Link>
      </div>
      <div className="watchlist--section">
        <div className="container">
          {favorites.length === 0 && (
            <p className="empty--list">
              You have no movies added to your watchlist yet{" "}
              <Link to="/" className="empty--link">
                Add movies
              </Link>
            </p>
          )}
          {myMovies.map((item, index) => (
            <div className="movie-card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                
              />

              <div className="movie-details">
                <p className="movie-title">{item.title}</p>
                <button className="movie--details--button" onClick={() => toggleFavorite(item.id)}>
                  Delete movie
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
