const API_KEY = '05902896074695709d7763505bb88b4d';
const FEATURED_URL = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
const GENRES_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
const LATEST_MOVIES_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=release_date.desc`;
const LATEST_SHOWS_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=release_date.desc`;

document.addEventListener('DOMContentLoaded', () => {
    loadFeatured();
    loadGenres();
    loadLatest();
    setupModal();
    setupSlider();
});

async function loadFeatured() {
    try {
        const response = await fetch(FEATURED_URL);
        const data = await response.json();
        const sliderInner = document.querySelector('.slider-inner');
        data.results.forEach(item => {
            const slide = document.createElement('div');
            slide.className = 'slider-item';
            slide.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title || item.name}">`;
            sliderInner.appendChild(slide);
        });
        document.getElementById('featured-spinner').style.display = 'none';
    } catch (error) {
        console.error('Error loading featured content:', error);
    }
}

async function loadGenres() {
    try {
        const response = await fetch(GENRES_URL);
        const data = await response.json();
        const genresContainer = document.getElementById('genres-container');
        data.genres.forEach(genre => {
            const genreCard = document.createElement('div');
            genreCard.className = 'card';
            genreCard.innerHTML = `<h3>${genre.name}</h3>`;
            genresContainer.appendChild(genreCard);
        });
    } catch (error) {
        console.error('Error loading genres:', error);
    }
}

async function loadLatest() {
    try {
        const [moviesResponse, showsResponse] = await Promise.all([
            fetch(LATEST_MOVIES_URL),
            fetch(LATEST_SHOWS_URL)
        ]);

        const [moviesData, showsData] = await Promise.all([
            moviesResponse.json(),
            showsResponse.json()
        ]);

        const moviesContainer = document.getElementById('movies-container');
        const showsContainer = document.getElementById('shows-container');

        moviesData.results.forEach(item => {
            const card = createCard(moviesContainer, 'card', item.poster_path, item.title, item.release_date, item.id, 'movie');
            moviesContainer.appendChild(card);
        });

        showsData.results.forEach(item => {
            const card = createCard(showsContainer, 'card', item.poster_path, item.name, item.first_air_date, item.id, 'tv');
            showsContainer.appendChild(card);
        });

        document.getElementById('movies-spinner').style.display = 'none';
        document.getElementById('shows-spinner').style.display = 'none';
    } catch (error) {
        console.error('Error loading latest content:', error);
    }
}

function createCard(container, className, posterPath, titleText, dateText, id, type) {
    const card = document.createElement('div');
    card.className = className;
    card.dataset.id = id;
    card.dataset.type = type;
    card.addEventListener('click', () => openModal(id, type));

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${posterPath}`;
    img.alt = titleText;

    const title = document.createElement('h3');
    title.textContent = titleText;

    card.appendChild(img);
    card.appendChild(title);

    return card;
}

function openModal(id, type) {
    const modal = document.getElementById('details');
    const detailsTitle = document.getElementById('details-title');
    const detailsOverview = document.getElementById('details-overview');
    const detailsReleaseDate = document.getElementById('details-release-date');
    const detailsPoster = document.getElementById('details-poster');

    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            detailsTitle.textContent = data.title || data.name;
            detailsOverview.textContent = data.overview;
            detailsReleaseDate.textContent = `Lançamento: ${data.release_date || data.first_air_date}`;
            detailsPoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            modal.style.display = 'block';
        })
        .catch(error => console.error('Error fetching details:', error));
}

function setupModal() {
    const closeModalButton = document.getElementById('close-details');
    closeModalButton.addEventListener('click', () => {
        document.getElementById('details').style.display = 'none';
    });
}

function setupSlider() {
    const sliderInner = document.querySelector('.slider-inner');
    const prevButton = document.querySelector('.slider-control.prev');
    const nextButton = document.querySelector('.slider-control.next');

    let index = 0;

    function showSlide(newIndex) {
        const slides = document.querySelectorAll('.slider-item');
        if (newIndex < 0) newIndex = slides.length - 1;
        if (newIndex >= slides.length) newIndex = 0;
        sliderInner.style.transform = `translateX(-${newIndex * 100}%)`;
        index = newIndex;
    }

    prevButton.addEventListener('click', () => showSlide(index - 1));
    nextButton.addEventListener('click', () => showSlide(index + 1));

    // Auto-slide every 5 seconds
    setInterval(() => showSlide(index + 1), 5000);
}
