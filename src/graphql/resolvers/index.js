/* eslint-disable node/no-unsupported-features/es-syntax */
const movieResolvers = require('./movies');
const userResolvers = require('./users');
const reviewsResolvers = require('./reviews');

module.exports = {
  Query: {
    ...movieResolvers.Query,
    ...reviewsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...movieResolvers.Mutation,
    ...reviewsResolvers.Mutation,
  },
};
