import {Article} from "../models/article";
import {getConnectionManager} from "typeorm";

export class ArticleService {

    static createArticleDB(req: { body: any; }, res: any, next: any) {

        let article = new Article();
        article.title = req.body.title;
        article.imageUrl = req.body.image;
        article.text = req.body.description;

        getConnectionManager().get("default").manager.save(article).then((article) => {
            res.send(article)
        })
    }

    static getArticlesByPage(req: any, res: any, next: any) {

        const articles = getConnectionManager().get("default").getRepository(Article);
        let pageSize = req.query.size;
        let page = req.query.page;

        let startIndex: number = (page-1)*pageSize

        articles.find({skip:startIndex, take:pageSize}).then((articles) => {
           res.send(articles)
        });
    }

    static getArticleById(req: any, res: any, next: any) {

        const articles = getConnectionManager().get("default").getRepository(Article);
        articles.find({
            where: { id: req.query.id }
          }).then((article) => {
           res.send(article)
        });
    }
}