const feedDisplay = document.querySelector('#feed');

let originalData = null;

function fetchDataAndDisplay(data) {
    feedDisplay.innerHTML = ''; // Clear previous content

    data.forEach(article => {
        const articleItem = `<div class="wrapper"><div class="titleContainer"><p>${article.rank}</p><a href="${article.url}"><p class="heading">${article.title}</p></a></div><div class="infoContainer"><p class="points">${article.points}</p><p class="comments">${article.comments}</p></div></div>`;
        feedDisplay.insertAdjacentHTML('beforeend', articleItem);
    });
}

function fetchOriginalData() {
    fetch('http://localhost:8000/results')
        .then(response => response.json())
        .then(data => {
            originalData = data;
            fetchDataAndDisplay(originalData);
        })
        .catch(err => console.log(err));
}

    document.getElementById('filterByComments').addEventListener('click', () => {
        const filteredData = originalData.filter(article => article.title.split(' ').length > 5);
        const sortedData = filteredData.sort((a, b) => b.comments - a.comments);
        fetchDataAndDisplay(sortedData);
    });

    document.getElementById('filterByPoints').addEventListener('click', () => {
        const filteredData = originalData.filter(article => article.title.split(' ').length <= 5);
        const sortedData = filteredData.sort((a, b) => b.points - a.points);
        fetchDataAndDisplay(sortedData);
    });

    document.getElementById('reset').addEventListener('click', () => {
        fetchDataAndDisplay(originalData);
    });

    // Initial data load
    fetchOriginalData();