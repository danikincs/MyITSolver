import express from 'express' ;

//routes
import token from "./routes/tokenRouter";
import article from "./routes/articleRouter";
import image from "./routes/uploadRouter";

import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { connectDB } from "./helpers/db"

import { handleError } from "./helpers/erroHandler";

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

app.use((err:any, req:any, res:any, next:any) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})