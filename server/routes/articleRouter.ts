import express from 'express';
import { ArticleController } from "../controllers/articleController";

const router = express.Router();


router.get('/get', function (req, res, next) {
  ArticleController.get_article_by_id(req, res, next)
})

router.get('/list', function (req, res, next) {
  ArticleController.get_articles(req, res, next)
})

router.post('/create', function (req, res, next) {
  ArticleController.create_article(req, res, next)
})

export default router;