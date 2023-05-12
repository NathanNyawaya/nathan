import React from "react";
import Home from "./components/Home";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import { FavoritesProvider } from "./context/FavoriteMovies";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route
            path="/"
            element={
              <FavoritesProvider>
                <Home />
              </FavoritesProvider>
            }
          />
          <Route
            path="/fav"
            element={
              <FavoritesProvider>
                <Watchlist />
              </FavoritesProvider>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <FavoritesProvider>
                <MovieDetails />
              </FavoritesProvider>
            }
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
