import {createConnection} from "typeorm";
import {Article} from "../models/article";
import {Token} from "../models/token"
import "reflect-metadata";

export function connectDB() {
    //database
    createConnection({
        type: "mysql",
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: 3306,
        database: "test",
        entities: [
            Article,
            Token
        ],
        synchronize: true,
        logging: false,
    }).then(connection => {
        console.log("connection created")
    }).catch(error => console.log("Volt egy errorom", error));
}