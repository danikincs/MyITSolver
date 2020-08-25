import { Article } from "./article"

export class ListMeta {
    pageSize:number
    pageCount:number
    page:number
    count:number

    constructor(pageSize:number, page:number, pageCount:number, count:number) {
        this.pageSize = pageSize;
        this.page = page;
        this.pageCount = pageCount;
        this.count = count;
    }
}