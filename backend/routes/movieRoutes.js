import express from 'express';
import { 
         getTrendingMovie,getMovieTrailers,getMovieDetails,getSimilarMovies,getMoviesByCategory 
       } from '../controllers/movieController.js';

const router = express.Router();

router.get("/trending",getTrendingMovie);
router.get("/:id/trailers",getMovieTrailers);
router.get("/:id/details",getMovieDetails);
router.get("/:id/similar",getSimilarMovies);
router.get("/:category", getMoviesByCategory);


export default router;