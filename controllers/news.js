const cheerio = require("cheerio");
const axios = require("axios");
const _ = require("lodash");
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

exports.getHome = (req, res, next) => {
    res.json("Welcome to my climate news api");
};

exports.getOneNews = async (req, res, next) => {
    const newspaperId = req.params.newspaperId;
    console.log(newspaperId);
    try {
        const newspaperAddress = newspapers.filter(
            (newspaper) =>
                _.lowerCase(newspaper.name) == _.lowerCase(newspaperId)
        )[0].address;
        const newspaperBase = newspapers.filter(
            (newspaper) =>
                _.lowerCase(newspaper.name) == _.lowerCase(newspaperId)
        )[0].base;
        const response = await axios.get(newspaperAddress);
        const html = response.data;
        const $ = cheerio.load(html);
        const specificArticle = [];

        $('a:contains("climate")', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr("href");
            specificArticle.push({
                title,
                url: newspaperBase + url,
                source: newspaperId,
            });
        });
        return res.json(specificArticle);
    } catch (error) {
        console.log("error ", error);
        res.json("Server Side error");
    }
};

exports.getNews = async (req, res, next) => {
    res.json(articles);
};
