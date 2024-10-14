import express from 'express';
import {
         getTrendingTv,getTvTrailers,getTvDetails,getSimilarTvs,getTvsByCategory
       } from '../controllers/tvController.js';

const router = express.Router();

router.get("/trending",getTrendingTv);
router.get("/:id/trailers",getTvTrailers);
router.get("/:id/details",getTvDetails);
router.get("/:id/similar",getSimilarTvs);
router.get("/:category", getTvsByCategory);

export default router;