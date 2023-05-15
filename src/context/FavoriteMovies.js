import React, { createContext, useState, useEffect } from "react";


export const MyMovieContext = createContext([]);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");

    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const toggleFavorite = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.map(Number)
  
    if (favorites.includes(id)) {
      // Remove id if it already exists in favorites
      favorites = favorites.filter((favoriteId) => favoriteId !== id);
    } else {
      // Add id to favorites if it doesn't exist
      favorites.push(id);
    }
  
    // localStorage.setItem("favorites", JSON.stringify(favorites));
    setFavorites(favorites);
  };
  

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <MyMovieContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </MyMovieContext.Provider>
  );
};
