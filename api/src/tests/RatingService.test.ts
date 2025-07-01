import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { RatingService } from "../domains/ratings/services/RatingService"; // ajuste o caminho conforme necessário
import api from "../domains/movies/repositories/MovieAPI";

vi.mock("axios");

const prisma = new PrismaClient();

vi.mock("../domains/movies/repositories/MovieAPI", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("../libs/prisma");
vi.mock("@prisma/client", () => {
  const mPrismaClient = {
    rating: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      findMany: vi.fn(),
    },
    user: {
      create: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

describe("RatingsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createRating", () => {
    test("should create rating if no existentRating is found", async () => {
      const movieId = 1;
      const userId = "1";
      const rating = 4;
      const watched = true;
      const review = "Brand new review";

      prisma.rating.findFirst.mockResolvedValue(null);

      const createdRating = {
        id: 2,
        movieId,
        userId,
        rating,
        watched,
        review,
      };
      prisma.rating.create.mockResolvedValue(createdRating);

      const result = await RatingService.createRating(
        movieId,
        userId,
        rating,
        watched,
        review
      );

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: { movieId, userId },
      });
      expect(prisma.rating.create).toHaveBeenCalledWith({
        data: {
          movieId,
          rating,
          watched,
          review,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      expect(result).toEqual(createdRating);
    });
    test("should update rating if existentRating is found", async () => {
      const movieId = 1;
      const userId = "1";
      const rating = 5;
      const watched = true;
      const review = "Great movie";

      const existentRating = {
        id: 1,
        rating: 4,
        movieId,
        userId,
        watched: false,
        review: "Old review",
      };
      const updatedRating = { ...existentRating, rating, watched, review };

      prisma.rating.findFirst.mockResolvedValue(existentRating);
      prisma.rating.update.mockResolvedValue(updatedRating);

      const result = await RatingService.createRating(
        movieId,
        userId,
        rating,
        watched,
        review
      );

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: { movieId, userId },
      });
      expect(prisma.rating.update).toHaveBeenCalledWith({
        where: { id: existentRating.id },
        data: { rating, watched, review },
      });
      expect(result).toEqual(existentRating);
    });

    test("should call findFirst and update when an existent rating is found", async () => {
      const userId = "1";
      const movieId = 1;
      const rating = 5;
      const watched = true;
      const review = "test";

      const existentRating = {
        id: 1,
        rating: 3,
        movieId,
        userId,
        watched: false,
        review: "old review",
      };

      // Configure mocks
      (prisma.rating.findFirst as any).mockResolvedValue(existentRating);
      (prisma.rating.update as any).mockResolvedValue({
        ...existentRating,
        rating,
        watched,
        review,
      });

      await RatingService.createRating(
        movieId,
        userId,
        rating,
        watched,
        review
      );

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: {
          movieId,
          userId,
        },
      });

      expect(prisma.rating.update).toHaveBeenCalledWith({
        where: {
          id: existentRating.id,
        },
        data: {
          rating,
          watched,
          review,
        },
      });
    });

    test("should propagate error if create throws", async () => {
      const movieId = 1;
      const userId = "1";
      const rating = 5;
      const watched = true;
      const review = "Some review";

      (prisma.rating.findFirst as any).mockResolvedValue(null);
      (prisma.rating.create as any).mockRejectedValue(new Error("Create failed"));

      await expect(
        RatingService.createRating(movieId, userId, rating, watched, review)
      ).rejects.toThrow("Create failed");

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: { movieId, userId },
      });

      expect(prisma.rating.create).toHaveBeenCalledWith({
        data: {
          movieId,
          rating,
          watched,
          review,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    });
  });

  describe("getRating", () => {
    test("should return the rating when a rating is found", async () => {
      const userId = "1";
      const movieId = 1;
      const expectedRating = 5;

      // Configure mocks
      (prisma.rating.findFirst as any).mockResolvedValue({
        movieId,
        userId,
        rating: expectedRating,
      });

      const result = await RatingService.getRating(movieId, userId);

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: {
          movieId,
          userId,
        },
      });

      expect(result).toBe(expectedRating);
    });

    test("should return -1 when no rating is found", async () => {
      const userId = "1";
      const movieId = 1;

      // Configure mocks
      (prisma.rating.findFirst as any).mockResolvedValue(null);

      const result = await RatingService.getRating(movieId, userId);

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: {
          movieId,
          userId,
        },
      });

      expect(result).toBe(-1);
    });
  });

    test("should return -1 when the rating found has null rating", async () => {
      const userId = "1";
      const movieId = 1;

      // Configure mocks
      (prisma.rating.findFirst as any).mockResolvedValue({
        movieId,
        userId,
        rating: null,
      });

      const result = await RatingService.getRating(movieId, userId);

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: {
          movieId,
          userId,
        },
      });

      expect(result).toBe(-1);
    });

  describe("getUserTopRatedMovie", () => {
    test("should return the top-rated movie for the user", async () => {
      const userId = "1";
      const expectedTopRating = {
        movieId: 1,
        userId: userId,
        rating: 5,
        watched: true,
        review: "Great movie!",
      };

      (prisma.rating.findFirst as any).mockResolvedValue(expectedTopRating);

      const result = await RatingService.getUserTopRatedMovie(userId);

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: {
          userId: userId,
          rating: {
            not: null,
          },
        },
        orderBy: {
          rating: "desc",
        },
      });

      expect(result).toEqual(expectedTopRating);
    });
  });

  describe("getReviews", () => {
    test("should return reviews for the specified movie", async () => {
      const movieId = 1;
      const expectedReviews = [
        {
          review: "Great movie!",
          rating: 5,
          user: {
            name: "User One",
          },
        },
        {
          review: "Not bad",
          rating: 3,
          user: {
            name: "User Two",
          },
        },
      ];

      (prisma.rating.findMany as any).mockResolvedValue(expectedReviews);

      const result = await RatingService.getReviews(movieId);

      expect(prisma.rating.findMany).toHaveBeenCalledWith({
        where: {
          movieId: movieId,
          review: {
            not: null,
          },
        },
        select: {
          review: true,
          rating: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      expect(result).toEqual(expectedReviews);
    });

    test("should return an empty array when no reviews are found", async () => {
      const movieId = 1;

      (prisma.rating.findMany as any).mockResolvedValue([]);

      const result = await RatingService.getReviews(movieId);

      expect(prisma.rating.findMany).toHaveBeenCalledWith({
        where: {
          movieId: movieId,
          review: {
            not: null,
          },
        },
        select: {
          review: true,
          rating: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      expect(result).toEqual([]);
    });
  });

  describe("getWatchedMovie", () => {
    test("should return false if no rating is found for the movie and user", async () => {
      const movieId = 1;
      const userId = "1";

      (prisma.rating.findFirst as any).mockResolvedValue(null);

      const result = await RatingService.getWatchedMovie(movieId, userId);

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: {
          movieId: movieId,
          userId: userId,
        },
      });

      expect(result).toBe(false);
    });

    test("should return the watched status if rating is found for the movie and user", async () => {
      const movieId = 1;
      const userId = "1";
      const expectedWatched = true;

      (prisma.rating.findFirst as any).mockResolvedValue({
        movieId: movieId,
        userId: userId,
        watched: expectedWatched,
      });

      const result = await RatingService.getWatchedMovie(movieId, userId);

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: {
          movieId: movieId,
          userId: userId,
        },
      });

      expect(result).toBe(expectedWatched);
    });

    test("should return the watched status if rating is found for the movie and user but watched is false", async () => {
      const movieId = 1;
      const userId = "1";
      const expectedWatched = false;

      (prisma.rating.findFirst as any).mockResolvedValue({
        movieId: movieId,
        userId: userId,
        watched: expectedWatched,
      });

      const result = await RatingService.getWatchedMovie(movieId, userId);

      expect(prisma.rating.findFirst).toHaveBeenCalledWith({
        where: {
          movieId: movieId,
          userId: userId,
        },
      });

      expect(result).toBe(expectedWatched);
    });
  });

  describe("getRatingByUser", () => {
    test("should return ratings for the specified user", async () => {
      const userId = "1";
      const expectedRatings = [
        {
          movieId: 1,
          userId: userId,
          rating: 5,
          watched: true,
          review: "Great movie!",
        },
        {
          movieId: 2,
          userId: userId,
          rating: 4,
          watched: true,
          review: "Good movie!",
        },
      ];

      (prisma.rating.findMany as any).mockResolvedValue(expectedRatings);

      const result = await RatingService.getRatingByUser(userId);

      expect(prisma.rating.findMany).toHaveBeenCalledWith({
        where: {
          userId: userId,
          rating: {
            not: null,
          },
        },
      });

      expect(result).toEqual(expectedRatings);
    });

    test("should return an empty array when no ratings are found for the specified user", async () => {
      const userId = "1";

      (prisma.rating.findMany as any).mockResolvedValue([]);

      const result = await RatingService.getRatingByUser(userId);

      expect(prisma.rating.findMany).toHaveBeenCalledWith({
        where: {
          userId: userId,
          rating: {
            not: null,
          },
        },
      });
    });
  });

  describe("getAverageRating", () => {
    test("should return combined average", async () => {
      (api.get as any).mockResolvedValue({
        data: { vote_average: 8, vote_count: 1000 },
      });

      (prisma.rating.findMany as any).mockResolvedValue([{ rating: 4 }, { rating: 6 }]);

      const result = await RatingService.getAverageRating(1);

      expect(result).toEqual({ average: 6, count: 1002 });
    });
  });
    test("should return API average and count when no local ratings exist", async () => {
      const movieId = 1;

      // Mock da API (TMDB)
      (api.get as any).mockResolvedValue({
        data: {
          vote_average: 7.2,
          vote_count: 800,
        },
      });

      // Mock do Prisma - nenhum rating local
      (prisma.rating.findMany as any).mockResolvedValue([]);

      const result = await RatingService.getAverageRating(movieId);

      expect(api.get).toHaveBeenCalledWith(/movie/${movieId});
      expect(prisma.rating.findMany).toHaveBeenCalledWith({
        where: {
          movieId: movieId,
          rating: { not: null },
        },
      });

      expect(result).toEqual({
        average: 7.2,
        count: 800,
      });
    });
});
