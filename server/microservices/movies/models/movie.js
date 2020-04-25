const { getData } = require("../database")
const Movie = getData().collection("movies")
const { ObjectId } = require("mongodb")


class MovieModel {
  static find() {
    return Movie.find().toArray()
  }
  static findOne(id) {
    return Movie.findOne({_id: ObjectId(id)})
  }
  static insert(newMovie) {
    return Movie.insertOne(newMovie)
  }
  static updateOne(id, updateMovie) {
    return Movie.updateOne(
      {
        _id: ObjectId(id)
      },
      {
        $set: updateMovie
      }
    )
  }
  static deleteOne(id) {
    return Movie.deleteOne({_id: ObjectId(id)})
  }
}

module.exports = MovieModel