const express = require("express");

const newsController = require("../controllers/news");

const router = express.Router();

router.get("/", newsController.getHome);

router.get("/news", newsController.getNews);

router.get("/news/:newspaperId", newsController.getOneNews);

module.exports = router;
