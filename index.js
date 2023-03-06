const express = require("express");

const newsRoute = require("./routes/news");

const app = express();

app.use(newsRoute);

app.listen(8000, () => {
    console.log("server is spinning at port 8000");
});
