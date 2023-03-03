//* node-graphql/src/schema.js

const {gql} = require('apollo-server');

const typeDefs = gql`
  type Movie {
    id: ID
    description: String
    movieName: String!
    directorName: String!
    releaseDate: String
    reviews: [Review]
  }

  type Review {
    id: ID!
    movieId: String!
    userId: String!
    rating: Int
    comment: String
  }
  type User {
    id: ID!
    email: String!
    token: String!
    name: String!
    password: Int
  }

  input RegisterInput {
    name: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getMovies(offset: Int, limit: Int, search: String): [Movie!]
    getMovie(movieId: ID!): Movie
    getReviewsByMovieId(
      offset: Int
      limit: Int
      search: String
      movieId: ID!
    ): [Review]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createMovie(
      description: String
      movieName: String!
      directorName: String!
      releaseDate: String
    ): Movie!
    deleteMovie(movieId: ID!): String!
    createReview(movieId: Int!, comment: String!, rating: Int): Review!
    deleteReview(reviewId: ID!): Movie!
    changePassword(
      currentPassword: String!
      password: String!
      confirmPassword: String!
    ): User
    updateMovie(
      movieId: ID!
      description: String
      movieName: String
      directorName: String
      releaseDate: String
    ): Movie!
    updateReview(reviewId: Int!, comment: String!, rating: Int): Review!
  }
`;
module.exports = {
  typeDefs,
};
