import express from 'express' ;

//routes
import token from "./routes/tokenRouter";
import article from "./routes/articleRouter";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Article} from "./models/article";
import dotenv from "dotenv";
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = 3000;

//Bodyparser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//database
createConnection({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    database: "test",
    entities: [
        Article
    ],
    synchronize: true,
    logging: false,
}).then(connection => {
    console.log("connection created")
}).catch(error => console.log("Volt egy errorom", error));

app.use('/api/token', token);
app.use('/api/article', article);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})