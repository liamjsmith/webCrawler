const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://news.ycombinator.com/';

app.get('/scrape', async (req, res) => {
  try {
    const response = await axios(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $('.athing', html).each(function () {
      const title = $(this).find('.title .titleline').text();
      const rank = $(this).find('.rank').text();
      const points = $(this).next().find('.score').text();
      const comments = $(this).next().find('.subtext a:contains("comment")').text();
      articles.push({
        title,
        rank,
        comments: parseInt(comments) || 0,
        points: parseInt(points) || 0,
      });
    });

    const topArticles = articles.slice(0, 30);
    res.json(topArticles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
