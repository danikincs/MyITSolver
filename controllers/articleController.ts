import { ArticleService } from "../service/ArticleService";

export class ArticleController {
    static create_article(req: any, res: any, next: any) {
        ArticleService.createArticleDB(req, res, next)
    }

    static get_articles(req: any, res: any, next: any) {
        ArticleService.getArticlesByPage(req, res, next)
    }

    static get_article_by_id(req: any, res: any, next: any) {
            ArticleService.getArticleById(req, res, next);
    }
  }