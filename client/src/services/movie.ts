import { CardProps } from '../types/CardProps';
import { MovieProps } from '../types/MovieProps';
import api from './api';

export const getRecommendedMovies = async () => {
  try {
    const response = await api.get('/movies/for-you/');
    return response.data as CardProps[];
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }

};

export const getTopRatedMovies = async () => {
  try {
    const response = await api.get('/movies/top-rated/');
    return response.data as CardProps[];
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
};

export const getNowPlayingMovies = async () => {
  try {
    const response = await api.get('/movies/now-playing/');
    return response.data as CardProps[];
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
};

export const getWatchedMovie = async (id: string) => {
  try {
    const response = await api.get(`/ratings/${id}/watched`);
    return response;
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
}

export const getMovieRating = async (id: string) => {
  try {
    const response = await api.get(`/ratings/${id}/rating`);
    return response;
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
}

export const getMovieAverageRating = async (id: string) => {
  try {
    const response = await api.get(`/ratings/${id}/average-rating`);
    return response;
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
}

export const getMovieDetails = async (id: string) => {
  try {
    const response = await api.get(`/movies/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
}

export const createRating = async (id: string, rating: number) => {
  try {
    const response = await api.post(`/ratings/${id}/rating`, {rating: rating });
    return response;
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
}

export const watchedMovie = async (id: string, watched: boolean) => {
  try {
    const response = await api.post(`/ratings/${id}/rating`, {watched: watched});
    return response;
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
}

export const createReview = async (id: string, review: string) => {
  try {
    const response = await api.post(`/ratings/${id}/rating`, {review: review });
    return response;
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
}

export const getReviews = async (id: string) => {
  try {
    const response = await api.get(`/ratings/${id}/reviews`);
    return response;
  } catch (error) {
    console.error('Error fetching movies data:', error);
    throw error;
  }
}

export const getReviewsByUser = async () => {
    try {
        const response = await api.get(`/ratings/users/user/reviews`);
        return response;
    } catch (error) {
        console.error('Error fetching movies data:', error);
        throw error;
    }
}

export const getMovieByName = async (movieName: string) => {
    try {
        console.log("Chegou aqui")
        const response = await api.get(`/movies/search/${movieName}`);
        return response;
    } catch (error) {
        console.error('Error fetching movies data:', error);
        throw error;
    }
}
