import {Article} from "../models/article";
import {getConnectionManager} from "typeorm";
import { ListWrapper } from "../models/listWrapper";
import { ListMeta } from "../models/listMeta";
import { ErrorHandler } from "../models/Error";

export class ArticleService {


    static createArticleDB(req: { body: any; }, res: any, next: any) {

        try {
            const { title, image, text } = req.body
            console.log(title, image, text, req.body)
            if(!title || !image || !text) {
                throw new ErrorHandler(404, 'Missing required parameters.')
            }

            let article = new Article();
            article.title = title;
            article.imageUrl = image;
            article.text = text;
            
            getConnectionManager().get("default").manager.save(article).then((article) => {
                res.send(article)
            })
        }catch(err) {
            next(err)
        }
    }

    static getArticlesByPage(req: any, res: any, next: any) {

        try {
            const articles = getConnectionManager().get("default").getRepository(Article);
            const { pageSize, page } = req.query
            if(!pageSize || !page) {
                throw new ErrorHandler(404, 'Missing required parameters.')
            }
            let meta:any;
    
            this.getAll().then(result => {
                meta = new ListMeta(pageSize, page, result/pageSize, 0)
            })
    
            let startIndex: number = (page-1)*pageSize
    
            articles.find({skip:startIndex, take:pageSize}).then((articles) => {
               res.send(new ListWrapper(articles, meta))
            });
        }catch(err) {
            next(err)
        }
    }

    static getArticleById(req: any, res: any, next: any) {

        try {
            const articles = getConnectionManager().get("default").getRepository(Article);
            articles.find({
                where: { id: req.query.id }
              }).then((article) => {
                if(!article.length) {
                    throw new ErrorHandler(404, "Can't find article by the given id.")
                }
               res.send(article)
            }).catch(err => {
                next(err)
            });
        }catch(err) {
            next(err)            
        }
    }

    //Helper static func 
    static async getAll() {
        const articles = getConnectionManager().get("default").getRepository(Article);
        let [allArticles, articleCount] = await articles.findAndCount();
        return articleCount;
    }
}