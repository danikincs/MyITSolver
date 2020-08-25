import { Article } from "./article"
import { ListMeta } from "./listMeta";

//Basic wrapper for list, not necessary but good for future methods and actions
export class ListWrapper {

    list:Array<Article>
    meta:ListMeta

    constructor(articles:Array<Article>, listMeta:ListMeta) {
        this.list = articles;
        this.meta = listMeta
    }
}