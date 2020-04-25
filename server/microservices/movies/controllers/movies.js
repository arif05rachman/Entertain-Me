const Movie = require("../models/movie")

class MoviesController {
  static find(req, res, next) {
    Movie.find()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
  static findOne(req, res, next) {
    const { id } = req.params;
    Movie.findOne(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
  static insert(req, res, next) {
    const newMovie = req.body;
    Movie.insert(newMovie)
      .then((result) => {
        res.status(201).json(result.ops[0]);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
  static update(req, res, next) {
    const { id } = req.params;
    const updatedMovie = req.body;
    Movie.updateOne(id, updatedMovie)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
  static delete(req, res, next) {
    const { id } = req.params;
    Movie.deleteOne(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: "internal server error" });
      });
  }
}

module.exports = MoviesController