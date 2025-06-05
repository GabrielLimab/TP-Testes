import { Router, Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../../../middlewares/auth';
import { statusCodes } from '../../../../utils/constants/status-codes';
import { RatingService } from '../services/RatingService';

export const router = Router();
router.post('/:movieId',
  verifyJWT,
  async(req: Request, res: Response, next:NextFunction) => {
    try {
      const rating = await RatingService.createRating(parseInt(req.params.movieId), req.userId!, req.body.rating, req.body.watched, req.body.review);
      res.status(statusCodes.CREATED).json(rating);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/:movieId',
  verifyJWT,
  async(req: Request, res: Response, next:NextFunction) => {
    try {
      const rating = await RatingService.getRating(parseInt(req.params.movieId), req.userId!);
      res.status(statusCodes.SUCCESS).json(rating);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:id/rating',
  verifyJWT,
  async(req: Request, res: Response, next:NextFunction) => {
    try {
      const rating = await RatingService.createRating(parseInt(req.params.id), req.userId!, req.body.rating, req.body.watched, req.body.review);
      res.status(statusCodes.CREATED).json(rating);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/:id/reviews',
  verifyJWT,
  async(req: Request, res: Response, next:NextFunction) => {
    try {
      const reviews = await RatingService.getReviews(parseInt(req.params.id));
      res.status(statusCodes.SUCCESS).json(reviews);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/users/user/reviews',
    verifyJWT,
    async(req: Request, res: Response, next:NextFunction) => {
      try {
        const reviews = await RatingService.getRatingByUser(req.userId!);
        res.status(statusCodes.SUCCESS).json(reviews);
      } catch (error) {
        next(error);
      }
    },
)

router.get('/:id/rating',
  verifyJWT,
  async(req: Request, res: Response, next:NextFunction) => {
    try {
        const rating = await RatingService.getRating(parseInt(req.params.id), req.userId!);
      res.status(statusCodes.SUCCESS).json(rating);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id/average-rating',
  verifyJWT,
  async(req: Request, res: Response, next:NextFunction) => {
    try {
        const rating = await RatingService.getAverageRating(parseInt(req.params.id));
      res.status(statusCodes.SUCCESS).json(rating);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id/watched',
  verifyJWT,
  async(req: Request, res: Response, next:NextFunction) => {
    try {
        const rating = await RatingService.getWatchedMovie(parseInt(req.params.id), req.body.watched);
      res.status(statusCodes.SUCCESS).json(rating);
    } catch (error) {
      next(error);
    }
  }
);
