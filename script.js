const API_KEY = '05902896074695709d7763505bb88b4d';
const TRENDING_URL = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`;
const ANIME_BASE_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16`;
const MOVIE_BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`;
let currentPageAnime = 1;
let currentPageMovie = 1;
let loadingTrending = false;
let loadingAnime = false;
let loadingMovie = false;
let totalPagesAnime = 1;
let totalPagesMovie = 1;

function createCard(container, className, posterPath, titleText, dateText, id, type) {
    const card = document.createElement('div');
    card.className = className;
    card.dataset.id = id;
    card.dataset.type = type;

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
    img.alt = titleText;

    const title = document.createElement('h3');
    title.textContent = titleText;

    card.appendChild(img);
    card.appendChild(title);

    if (dateText) {
        const year = document.createElement('p');
        year.textContent = dateText.split('-')[0];
        card.appendChild(year);
    }

    card.addEventListener('click', showDetails);

    container.appendChild(card);
}

function showDetails(event) {
    const card = event.currentTarget;
    const id = card.dataset.id;
    const type = card.dataset.type;
    const url = type === 'movie'
        ? `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        : `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('details-title').textContent = data.title || data.name;
            document.getElementById('details-overview').textContent = data.overview;
            document.getElementById('details-release-date').textContent = data.release_date || data.first_air_date;
            document.getElementById('details-poster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            document.getElementById('details').style.display = 'block';
        });
}

document.getElementById('close-details').addEventListener('click', () => {
    document.getElementById('details').style.display = 'none';
});

function fetchTrending() {
    if (loadingTrending) return;
    loadingTrending = true;
    document.getElementById('trending-spinner').style.display = 'block';

    fetch(TRENDING_URL)
        .then(response => response.json())
        .then(data => {
            document.getElementById('trending-slider').innerHTML = '';
            data.results.forEach(result => {
                const sliderItem = document.createElement('div');
                sliderItem.className = 'slider-item';
                sliderItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.name}">`;
                document.getElementById('trending-slider').appendChild(sliderItem);
            });
            document.getElementById('trending-spinner').style.display = 'none';
            loadingTrending = false;
        });
}

function fetchAnime(page) {
    if (loadingAnime) return;
    loadingAnime = true;
    document.getElementById('anime-spinner').style.display = 'block';

    fetch(`${ANIME_BASE_URL}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('anime-container').innerHTML = '';
            data.results.forEach(result => {
                createCard(document.getElementById('anime-container'), 'card', result.poster_path, result.name, result.first_air_date, result.id, 'tv');
            });
            totalPagesAnime = data.total_pages;
            document.getElementById('anime-spinner').style.display = 'none';
            loadingAnime = false;
        });
}

function fetchMovies(page) {
    if (loadingMovie) return;
    loadingMovie = true;
    document.getElementById('movie-spinner').style.display = 'block';

    fetch(`${MOVIE_BASE_URL}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('movie-container').innerHTML = '';
            data.results.forEach(result => {
                createCard(document.getElementById('movie-container'), 'card', result.poster_path, result.title, result.release_date, result.id, 'movie');
            });
            totalPagesMovie = data.total_pages;
            document.getElementById('movie-spinner').style.display = 'none';
            loadingMovie = false;
        });
}

// Initialize the site
fetchTrending();
fetchAnime(currentPageAnime);
fetchMovies(currentPageMovie);
