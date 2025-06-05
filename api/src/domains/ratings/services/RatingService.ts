import { AxiosError } from "axios";
import prisma from "../../../../libs/prisma";
import api from "../../movies/repositories/MovieAPI";

class RatingServiceClass {
  async createRating(movieId: number, userId: string, rating?: number, watched?: boolean, review?: string) {
    const existentRating = await prisma.rating.findFirst({
      where: {
        movieId: movieId,
        userId: userId
      }
    });

    if (existentRating) {
      await prisma.rating.update({
        where: {
          id: existentRating.id
        },
        data: {
          rating: rating,
          watched: watched,
          review: review
        }
      });

      return existentRating;
    }

    const createdRating = await prisma.rating.create({
      data: { rating: rating, movieId: movieId, user: { connect: { id: userId }}, watched: watched, review: review }
    });

    return createdRating;
  }

  async getRating(movieId: number, userId: string) {
    const rating = await prisma.rating.findFirst({
      where: {
        movieId: movieId,
        userId: userId
      }
    });

    if (rating === null || rating.rating === null) {
      return -1;
    }

    return rating.rating;
  }

  async getUserTopRatedMovie(userId: string) {
    const topRating = await prisma.rating.findFirst({
      where: {
        userId: userId,
        rating: {
          not: null
        }
      },
      orderBy: {
        rating: 'desc'
      }
    });

    return topRating;
  }
  
  async getAverageRating(movieId: number) {
    const rating = await api.get(`/movie/${movieId}`).then(
      (response) => {
        return response.data;
      }
    ).catch(
      (error: AxiosError) => {
        if (error.response) {
          throw error.response.data;
        }
    });
    
    const apiRating = rating.vote_average;

    const ratings = await prisma.rating.findMany({
      where: {
        movieId: movieId,
        rating: {
          not: null
        }
      }
    });
    
    if (ratings.length === 0) {
      return {
        "average": apiRating,
        "count": rating.vote_count
      };
    }

    const sum = ratings.reduce((acc, rating) => acc + (rating.rating || 0), 0); 

    const average = (sum + apiRating) / (ratings.length + 1);

    return {
      "average": average,
      "count": ratings.length + rating.vote_count
    };
  }

  async getReviews(movieId: number) {
    const reviews = await prisma.rating.findMany({
      where: {
        movieId: movieId,
        review: {
          not: null
        }
      },
      select: {
        review: true,
        rating: true,
        user: {
          select: {
            name: true
          }
        }
      } 
    });

    return reviews;
  }

  async getWatchedMovie(movieId: number, userId: string) {
    const watchedMovie = await prisma.rating.findFirst({
      where: {
        movieId: movieId,
        userId: userId
      }
    });

    if (!watchedMovie) {
      return false;
    }

    return watchedMovie.watched;
  }

  async getRatingByUser(userId: string) {
    const ratings = await prisma.rating.findMany({
      where: {
        userId: userId,
        rating: {
          not: null
        }
      }
    });

    return ratings;
  }
}
export const RatingService = new RatingServiceClass();

