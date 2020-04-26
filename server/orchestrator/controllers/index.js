const Redis = require("ioredis")
const redis = new Redis()
const axios = require("axios").default

const moviesApi = axios.create({
  baseURL: "https://arcane-brook-08405.herokuapp.com",
});
const tvSeriesApi = axios.create({
  baseURL: "https://warm-tundra-50159.herokuapp.com",
});

var dataMovies
var dataTvSeries

class MainController{
  static async getAll(req, res, next) {
    try {
      const movies = await redis.get("movies")
      const tvSeries = await redis.get("tvSeries");
      let moviesParsed = await JSON.parse(movies)
      let tvSeriesParsed = await JSON.parse(tvSeries);
      if (!moviesParsed || dataMovies !== movies) {
        const { data } = await moviesApi.get("movies")
        console.log("masuk movies")
        dataMovies = await JSON.stringify(data);
        redis.set("movies", await JSON.stringify([...data]))
        moviesParsed.concat([...data])
      } else if (!tvSeriesParsed || dataTvSeries !== tvSeries) {
        const { data } = await tvSeriesApi.get("tvSeries");
        console.log("masuk tvSeries")
        dataTvSeries = await JSON.stringify(data);
        redis.set("tvSeries", await JSON.stringify([...data]));
        tvSeriesParsed.concat([...data]);
      }
      res.status(200).json({movies: moviesParsed, tvSeries: tvSeriesParsed})
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = {
  MainController
}