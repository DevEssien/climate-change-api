const cheerio = require("cheerio");
const axios = require("axios");

const newspapers = require("../utils/newspapers");

const articles = [];

newspapers.forEach(async (newspaper) => {
    const response = await axios.get(newspaper.address);
    const html = response.data;
    const $ = cheerio.load(html);

    $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
            title,
            url: newspaper.base + url,
            source: newspaper.name,
        });
    });
});

exports.getNews = async (req, res, next) => {
    res.json(articles);
};

exports.getHome = (req, res, next) => {
    res.json("Welcome to my climate news api");
};
