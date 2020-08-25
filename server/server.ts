import express from 'express' ;

//routes
import token from "./routes/tokenRouter";
import article from "./routes/articleRouter";
import image from "./routes/uploadRouter";

import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { connectDB } from "./helpers/db"

//Dotenv for database connections
dotenv.config();
const app = express();
const port = 3000;

//Bodyparser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//database
connectDB();

app.use('/api/token', token);
app.use('/api/article', article);
app.use('/api/image', image)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})