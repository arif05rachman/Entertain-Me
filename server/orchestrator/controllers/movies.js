const Redis = require("ioredis");
const redis = new Redis()
const axios = require("axios").default

const moviesApi = axios.create({ baseURL: "http://localhost:3001" })

class MoviesController {
  static async create(req, res, next) {
    try {
      const movie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags,
      };
      const { data } = await moviesApi.post("/movies", movie);
      await redis.del("movies");
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async findAll(req, res, next) {
    try {
      const movies = await redis.get("movies");
      const parsedMovies = JSON.parse(movies);
      if (!parsedMovies || !parsedMovies.length) {
        console.log(!movies, !parsedMovies, "masuk ==========================");
        const { data } = await moviesApi.get("/movies");
        await redis.set("movies", JSON.stringify(data));
        res.status(200).json({ movies: data });
      } else {
        res.status(200).json({ movies: parsedMovies });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async findOne(req, res, next) {
    try {
      const { id } = req.params;
      const movies = await redis.get("movies");
      const parsedMovies = JSON.parse(movies);
      if (!parsedMovies || !parsedMovies.length) {
        const { data } = await moviesApi.get("/movies/" + id);
        if (!data) {
          res.status(200).json({message: "no data"});
        }
        res.status(200).json(data);
      } else {
        const selectMovie = parsedMovies.filter((movie) => movie._id === id);
        if (!selectMovie.length) {
          const { data } = await moviesApi.get("/movies/" + id);
          res.status(400).json({message: "movie not found"});
        } else {
          console.log("data dari redis");
          res.status(200).json(selectMovie[0]);
        }
      }
    } catch (err) {
      console.log("error")
      res.status(500).json(err);
    }
  }
  static async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      const movie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags,
      };
      const { data } = await moviesApi.put(`/movies/${id}`, movie);
      redis.del("movies");
      console.log("masuk api")
      if (!data.modifiedCount) {
        res.status(400).json({message: "movie not found"});
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async destroy(req, res, next) {
    try {
      const {id} = req.params;
      const { data } = await moviesApi.delete(`/movies/${id}`);
      redis.del("movies");
      if (!data.deletedCount) {
        res.status(400).json({ message: "movie not found" });
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = MoviesController