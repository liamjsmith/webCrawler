const feedDisplay = document.querySelector('#feed')

fetch('http://localhost:8000/results')
    .then(response => {return response.json()})
    .then(data => {
        data.forEach(article => {
            const articleItem = `<div class="wrapper"><div class="titleContainer"><p>` + article.rank + `</p><h3>` + article.title + `</h3></div><div class="infoContainer"><p>` + article.points + `</p><p>` + article.comments + `</p></div></div>`
            feedDisplay.insertAdjacentHTML("beforeend", articleItem)
        })
    })
    .catch(err => console.log(err))