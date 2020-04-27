import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import { store } from "./stores";
import {
  addMovie,
  updateMovie,
  deleteMovie,
} from "./resolvers/moviesResolvers";
import {
  addTvSeries,
  updateTvSeries,
  deleteTvSeries,
} from "./resolvers/tvSeriesResolvers";

const history = createBrowserHistory();

const client = new ApolloClient({
  uri: "https://lit-tor-48728.herokuapp.com",
  // uri: "http://localhost:4000",
  clientState: {
    resolvers: {
      Mutation: {
        addMovie,
        updateMovie,
        deleteMovie,
        addTvSeries,
        updateTvSeries,
        deleteTvSeries,
      },

      defaults: {
        movies: [],
        tvSeries: [],
      },
    },
  },
});

export default(component) => {
         return (
           <ApolloProvider client={client}>
             <Provider store={store}>
               <Router history={history}>{component}</Router>
             </Provider>
           </ApolloProvider>
         );
       };
