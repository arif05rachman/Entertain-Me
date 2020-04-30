import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom"
import { useSelector } from "react-redux";
import {
  Navbar,
  MovieList,
  MovieDetail,
  TvSeriesList,
  TvSeriesDetail
} from "./Components";
function App() {
    const searchQuery = useSelector((state) => state.searchQuery);
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/movies" />
        </Route>
        <Route path="/movies" exact>
          <MovieList searchQuery={searchQuery} />
        </Route>
        <Route path="/movies/:movieId" exact>
          <MovieDetail />
        </Route>

        <Route path="/tv" exact>
          <TvSeriesList searchQuery={searchQuery} />
        </Route>
        <Route path="/tv/:tvSeriesId" exact>
          <TvSeriesDetail />
        </Route>
      </Switch>
    </>
  );
}

export default App;
