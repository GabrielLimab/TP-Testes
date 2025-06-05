import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MovieRepository } from '../domains/movies/repositories/MovieRepository';
import { MovieService } from '../domains/movies/services/MovieService';
import { RatingService } from '../domains/ratings/services/RatingService';

vi.mock('../domains/ratings/services/RatingService');
vi.mock('../domains/movies/repositories/MovieRepository');

describe('MovieService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getForYouMovies', () => {
    it('should return top-rated movies when user has no top-rated movie', async () => {
      const userId = '1';
      const topRatedMovies = [
        { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', vote_average: 8.5 },
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', vote_average: 9.0 },
      ];

      (RatingService.getUserTopRatedMovie as any).mockResolvedValue(null);
      (MovieRepository.getTopRatedMovies as any).mockResolvedValue(topRatedMovies);

      const result = await MovieService.getForYouMovies(userId);

      expect(RatingService.getUserTopRatedMovie).toHaveBeenCalledWith(userId);
      expect(MovieRepository.getTopRatedMovies).toHaveBeenCalled();
      expect(result).toEqual([
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', rating: '9.0' },
        { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', rating: '8.5' },
      ]);
    });

    it('should return personalized movies when user has top-rated movie', async () => {
      const userId = '1';
      const userTopRatedMovie = { movieId: 1, rating: 9.0 };
      const forYouMovies = [
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', vote_average: 7.5 },
        { id: 3, title: 'Movie 3', poster_path: '/path3.jpg', vote_average: 8.0 },
      ];

      (RatingService.getUserTopRatedMovie as any).mockResolvedValue(userTopRatedMovie);
      (MovieRepository.getForYouMovies as any).mockResolvedValue(forYouMovies);

      const result = await MovieService.getForYouMovies(userId);

      expect(RatingService.getUserTopRatedMovie).toHaveBeenCalledWith(userId);
      expect(MovieRepository.getForYouMovies).toHaveBeenCalledWith(userTopRatedMovie.movieId);
      expect(result).toEqual([
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', rating: '7.5' },
        { id: 3, title: 'Movie 3', poster_path: '/path3.jpg', rating: '8.0' },
      ]);
    });
  });

  describe('getTopRatedMovies', () => {
    it('should return top-rated movies', async () => {
      const topRatedMovies = [
        { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', vote_average: 8.5 },
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', vote_average: 9.0 },
      ];

      (MovieRepository.getTopRatedMovies as any).mockResolvedValue(topRatedMovies);

      const result = await MovieService.getTopRatedMovies();

      expect(MovieRepository.getTopRatedMovies).toHaveBeenCalled();
      expect(result).toEqual([
        { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', rating: '8.5' },
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', rating: '9.0' },
      ]);
    });
  });

  describe('getNowPlayingMovies', () => {
    it('should return now playing movies', async () => {
      const nowPlayingMovies = [
        { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', vote_average: 8.5 },
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', vote_average: 9.0 },
      ];

      (MovieRepository.getNowPlayingMovies as any).mockResolvedValue(nowPlayingMovies);

      const result = await MovieService.getNowPlayingMovies();

      expect(MovieRepository.getNowPlayingMovies).toHaveBeenCalled();
      expect(result).toEqual([
        { id: 1, title: 'Movie 1', poster_path: '/path1.jpg', rating: '8.5' },
        { id: 2, title: 'Movie 2', poster_path: '/path2.jpg', rating: '9.0' },
      ]);
    });
  });

  describe('getMovieDetails', () => {
    it('should return detailed movie info', async () => {
      const movieId = 1;
      const movieDetails = {
        genres: [{ name: 'Action' }, { name: 'Drama' }],
        overview: 'A great movie',
        vote_average: 8.5,
        release_date: '2021-01-01',
        backdrop_path: '/backdrop.jpg',
        poster_path: '/poster.jpg',
        runtime: 120,
        title: 'Movie 1',
      };
      const movieCredits = {
        cast: [
          { name: 'Actor 1', known_for_department: 'Acting' },
          { name: 'Actor 2', known_for_department: 'Acting' },
        ],
        crew: [
          { name: 'Director 1', known_for_department: 'Directing' },
          { name: 'Writer 1', known_for_department: 'Writing' },
        ],
      };
      const movieProviders = {
        results: {
          BR: {
            flatrate: [{ provider_name: 'Provider 1' }],
          },
        },
      };

      (MovieRepository.getMovieDetails as any).mockResolvedValue(movieDetails);
      (MovieRepository.getMovieCredits as any).mockResolvedValue(movieCredits);
      (MovieRepository.getMovieProviders as any).mockResolvedValue(movieProviders);

      const result = await MovieService.getMovieDetails(movieId);

      expect(MovieRepository.getMovieDetails).toHaveBeenCalledWith(movieId);
      expect(MovieRepository.getMovieCredits).toHaveBeenCalledWith(movieId);
      expect(MovieRepository.getMovieProviders).toHaveBeenCalledWith(movieId);
      expect(result).toEqual({
        genres: ['Action', 'Drama'],
        plot: 'A great movie',
        rating: 8.5,
        releaseDate: '2021-01-01',
        backdrop: '/backdrop.jpg',
        poster: '/poster.jpg',
        runtime: 120,
        title: 'Movie 1',
        stars: ['Actor 1', 'Actor 2'],
        director: 'Director 1',
        writers: ['Writer 1'],
        providers: ['Provider 1'],
      });
    });
  });

  describe('getMovieByName', () => {
    it('should return movies sorted by vote count', async () => {
      const movieName = 'Test Movie';
      const movies = [
        { title: 'Movie 1', overview: 'Overview 1', release_date: '2021-01-01', vote_average: 8.5, vote_count: 200, popularity: 80, poster_path: '/path1.jpg' },
        { title: 'Movie 2', overview: 'Overview 2', release_date: '2021-01-02', vote_average: 9.0, vote_count: 300, popularity: 90, poster_path: '/path2.jpg' },
        { title: 'Movie 3', overview: 'Overview 3', release_date: '2021-01-03', vote_average: 7.0, vote_count: 100, popularity: 70, poster_path: '/path3.jpg' },
      ];

      (MovieRepository.getMovieByName as any).mockResolvedValue(movies);

      const result = await MovieService.getMovieByName(movieName);

      expect(MovieRepository.getMovieByName).toHaveBeenCalledWith(movieName);
      expect(result).toEqual([
        { title: 'Movie 2', overview: 'Overview 2', release_date: '2021-01-02', vote_average: 9.0, vote_count: 300, popularity: 90, poster_path: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2//path2.jpg' },
        { title: 'Movie 1', overview: 'Overview 1', release_date: '2021-01-01', vote_average: 8.5, vote_count: 200, popularity: 80, poster_path: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2//path1.jpg' },
        { title: 'Movie 3', overview: 'Overview 3', release_date: '2021-01-03', vote_average: 7.0, vote_count: 100, popularity: 70, poster_path: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2//path3.jpg' },
      ]);
    });
  });
});
