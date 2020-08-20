const express = require('express');
const app = express();
const port = 3000;


//routes
const token = require("./routes/tokenRouter");
const article = require("./routes/articleRouter");

app.use('/api/token', token);
app.use('/api/article', article);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})