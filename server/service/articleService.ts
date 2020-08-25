import {Article} from "../models/article";
import {getConnectionManager} from "typeorm";
import { ListWrapper } from "../models/listWrapper";
import { ListMeta } from "../models/listMeta";

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
        let meta:any;

        this.getAll().then(result => {
            console.log("result", result)
            meta = new ListMeta(pageSize, page, result/pageSize, 0)

        })

        let startIndex: number = (page-1)*pageSize

        articles.find({skip:startIndex, take:pageSize}).then((articles) => {
           res.send(new ListWrapper(articles, meta))
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

    //Helper static func 
    static async getAll() {
        const articles = getConnectionManager().get("default").getRepository(Article);
        let [allArticles, articleCount] = await articles.findAndCount();
        return articleCount;
    }
}