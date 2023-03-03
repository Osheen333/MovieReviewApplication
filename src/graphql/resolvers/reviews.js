const {UserInputError, AuthenticationError} = require('apollo-server');
const checkAuth = require('../../util/check-auth');
const {prisma} = require('../../database');

module.exports = {
  Query: {
    async getReviewsByMovieId(_, {offset = 0, limit = 5, search, movieId}) {
      try {
        const reviews = await prisma.review.findMany({
          where: {
            movieId: +movieId,
            OR: [
              {
                comment: {
                  contains: search,
                },
              },
            ],
          },
          skip: +offset,
          take: +limit,
        });
        return reviews;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createReview: async (parent, {movieId, comment, rating}, context) => {
      if (rating < 1 || rating > 5) {
        throw new UserInputError('Empty Review', {
          errors: {
            comment: 'Rating must be between 1 and 5',
          },
        });
      }

      const user = checkAuth(context);

      if (comment.trim() === '') {
        throw new UserInputError('Empty Review', {
          errors: {
            comment: 'Review comment must not be empty',
          },
        });
      } else {
        const movie = await prisma.movie.findFirst({
          where: {id: Number(movieId)},
        });

        if (movie) {
          const newReview = {
            comment,
            rating,
            movieId,
            userId: user.id,
          };

          const reviewdMoview = await prisma.review.create({data: newReview});
          return reviewdMoview;
        }
        throw new UserInputError('Movies not found', {
          error: 'Movies not found',
        });
      }
    },
    async deleteReview(parent, {reviewId}, context) {
      const user = checkAuth(context);

      // TODO: reviewd user is only able to delete review

      try {
        const getReview = await prisma.review.findFirst({
          where: {id: Number(reviewId)},
        });
        console.log(getReview);

        if (getReview.userId === user.id) {
          const review = await prisma.review.delete({
            where: {
              id: +reviewId,
            },
          });
          return 'review deleted successfuly';
        }
        throw new AuthenticationError('Error', {
          errors: {
            comment: 'Auction not allowed',
          },
        });
      } catch (error) {
        throw new UserInputError('Empty Review', {
          error,
        });
      }
    },
    updateReview: async (parent, {reviewId, comment, rating}, context) => {
      checkAuth(context);

      if (comment.trim() === '') {
        throw new UserInputError('Empty Review', {
          errors: {
            comment: 'Review comment must not be empty',
          },
        });
      } else {
        const movie = await prisma.review.findFirst({
          where: {id: Number(reviewId)},
        });

        if (movie) {
          const newReview = {
            comment,
            rating,
          };

          const reviewdMoview = await prisma.review.update({
            where: {id: +reviewId},
            data: newReview,
          });

          return reviewdMoview;
        }
        throw new UserInputError('Review not found', {
          error: 'Review not found',
        });
      }
    },
  },
};
