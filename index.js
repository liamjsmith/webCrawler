const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://news.ycombinator.com/'

app.get('/', function (req, res) {
    res.json('This is my webscraper')
})

app.get('/results', (req, res) => {
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.athing', html).each(function() {
                const title = $(this).find('.title .titleline a:first-of-type').text()
                const url = $(this).find('.title .titleline a').attr('href')
                const rank = $(this).find('.rank').text()
                const points = $(this).next().find('.score').text()
                const comments = $(this).next().find('.subtext a:contains("comment")').text() 
                articles.push({
                    title,
                    url,
                    rank,
                    comments: parseInt(comments) || 0,
                    points: parseInt(points) || 0,
                })
                return articles.slice(0, 30);
            })
            res.json(articles)
            console.log(articles)
        }).catch(err => console.log(err)) 
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
