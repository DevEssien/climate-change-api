const express = require("express");

const newsController = require("../controllers/news");

const router = express.Router();

router.get("/", newsController.getHome);

router.get("/news", newsController.getNews);

module.exports = router;
