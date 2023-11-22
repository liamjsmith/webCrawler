const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://news.ycombinator.com/'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        $('.athing', html).each(function() {
            const title = $(this).find('.title .titleline').text()
            const rank = $(this).find('.rank').text()
            const points = $(this).next().find('.score').text()
            const comments = $(this).next().find('.subtext a:contains("comment")').text() 
            articles.push({
                title,
                rank,
                comments: parseInt(comments) || 0,
                points: parseInt(points) || 0,
            })
            return articles.slice(0, 30);
        })
        console.log(articles)
    }).catch(err => console.log(err)) 

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
