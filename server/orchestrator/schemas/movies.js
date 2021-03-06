const { gql } = require("apollo-server")
const { makeExecutableSchema } = require("graphql-tools")

const {
  moviesQueryResolver,
  moviesMutationResolver,
} = require("../resolvers/movies");

const moviesSchema = makeExecutableSchema({
  typeDefs: gql`
    type Movie {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }
    type Result {
      status: Int
      count: Int
    }
    type Query {
      movies: [Movie]
      findOneMovie(movieId: ID): Movie
    }
    type Mutation {
      addMovie(
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
      ): Movie
      updateMovie(
        movieId: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
      ): Result
      deleteMovie(movieId: ID): Result
    }
  `,
  resolvers: {
    Query: moviesQueryResolver,
    Mutation: moviesMutationResolver,
  },
});

module.exports = moviesSchema;