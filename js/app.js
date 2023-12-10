'use strict';

// استخدام jQuery من مكتبة CDN
import 'https://code.jquery.com/jquery-3.6.4.min.js';
import listsMovies from './Movie.json' assert { type: 'json' };

const preLoader = document.querySelector(".preloader");
window.addEventListener("load", function () {
    preLoader.style.display = "none";
});
//_____________________________toggle_________________________________
const toggleBall = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(`.container, .navbar-container, .sidebar, .left-menu-icon, .movie-list-title, .toggle, .toggle-ball, .arrow, .menu-list-item, .dropdown-content, .profile-text, movie-list-title, .dropbtn, body`);

toggleBall.addEventListener("click", () => {
    items.forEach(item => {
        item.classList.toggle("active");
    });
});
//______________________class_________________________
class Carousel {
    constructor(arrowsSelector, movieListsSelector, maxClicks = 3, trX = 300) {
        this.arrows = document.querySelectorAll(arrowsSelector);
        this.movieLists = document.querySelectorAll(movieListsSelector);
        this.maxClicks = maxClicks;
        this.trX = trX;
        this.setupEventListeners();
        this.clickCounter = 0;
    }

    setupEventListeners() {
        this.arrows.forEach((arrow, index) => {
            arrow.addEventListener('click', () => this.handleArrowClick(index));
        });
    }

    handleArrowClick(index) {
        if (this.clickCounter < this.maxClicks) {
            const currentTransformValue = this.movieLists[index].computedStyleMap().get("transform")[0].x.value;
            this.movieLists[index].style.transform = `translateX(${currentTransformValue - this.trX}px)`;
        } else {
            this.movieLists[index].style.transform = 'translateX(0)';
            this.clickCounter = 0;
        }

        this.clickCounter++;
    }
}

// creat opject using class Carousel
// const carousel = new Carousel('.arrow', '.movie-list');
const carousel1 = new Carousel('.arrow', '.movie-list', 7, 350);







//___________________________API___________________________________

const accessToken = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTdjNjM4ZGRmZThiZDI3NDg3YWI5NTBmYTNmNGU4ZCIsInN1YiI6IjY1Njc5OTU4YTM0OTExMDBmZTI1ZTgyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VxyHqHDXVWiaXJOvbf7_LLwOJxJYCGdHO9L0bOg6P5Y
`
const apiKey = 'b57c638ddfe8bd27487ab950fa3f4e8d';
const apiBaseUrl = 'https://api.themoviedb.org/3';
const apiBaseImage = 'https://image.tmdb.org/t/p/w500';
const getMovies = '/discover/movie';
const apiUrl = `${apiBaseUrl}${getMovies}?api_key=${apiKey}`;

const movieList = document.querySelector(".popular-list");
// Add fetchMovies function
function redirectToDetails(movieId) {
    // Assuming detailsMovie.html takes a query parameter for the movie ID
    window.location.href = `../detailsMovie.html?movieId=${movieId}`;
}

async function fetchMovies(api, containerSelector) {
    const responseApi = await fetch(api);
    const data = await responseApi.json();

    const movieListContainer = document.querySelector(containerSelector);
    movieListContainer.innerHTML = ''; // Clear previous content
    const movieItems = data.results.map(movie => {
        const movieTitle = (movie.original_title).split(' ').slice(0, 2).join(' ');
        const movieDesc = (movie.overview).split(' ').slice(0, 20).join(' ');

        const movieListItem = document.createElement('div');
        movieListItem.className = 'movie-list-item';

        const menuListItems = document.createElement('div');
        menuListItems.className = 'menu-list-items';


        const img = document.createElement('img');
        img.src = `${apiBaseImage}${movie.poster_path}`;
        img.alt = '';
        img.className = 'movie-list-item-img';

        const title = document.createElement('span');
        title.className = 'movie-list-item-title';
        title.innerText = movieTitle;

        const desc = document.createElement('p');
        desc.className = 'movie-list-item-desc';
        desc.innerText = movieDesc;

        const btn = document.createElement('button');
        btn.className = 'movie-list-item-btn btn';
        btn.innerText = 'WATCH';
        btn.onclick = function () {
            redirectToDetails(movie.id);
        };

        menuListItems.appendChild(img);
        menuListItems.appendChild(title);
        menuListItems.appendChild(desc);
        menuListItems.appendChild(btn);

        movieListItem.appendChild(menuListItems);
        return movieListItem;
    });

    movieItems.forEach(movieItem => {
        movieListContainer.appendChild(movieItem);
    });

    //  using some jQuery for edit on the items api
    $(".movie-list-item-img").css({
        'height': '300px',
        'width': 'auto',
    });

    $(".movie-list-item-title").css({ 'top': '15%', 'left': '20px' });
    $(".movie-list-item-desc").css({ 'left': '20px', 'width': '180px' })
    $(".movie-list-item-btn").css({ 'bottom': '30%' });
}

// Fetch Now Playing Movies
const nowPlayingMoviesUrl = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
fetchMovies(nowPlayingMoviesUrl, '.popular-list');

// Fetch Trending Movies
const trendingMoviesUrl = `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=35`;
fetchMovies(trendingMoviesUrl, '.drama-list');

// Fetch Genre Movies
const genreMoviesUrl = `${apiBaseUrl}/trending/movie/week?api_key=${apiKey}`;
fetchMovies(genreMoviesUrl, '.comedy-list');

const animeMoviesUrl = `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=16`;
fetchMovies(animeMoviesUrl, '.anime-list');

const btnFuteare = document.querySelector(".featured-btn-frist");
btnFuteare.addEventListener('click', () => {
    window.location.href = `../detailsMovie.html?id=775244`;
});
const btnFuteareSec = document.querySelector(".featured-btn-second");
btnFuteareSec.addEventListener('click', () => {
    window.location.href = `../detailsMovie.html?id=900667`;
});

//__________search bar_____________
let searchBox = document.getElementsByClassName('search-box')[0];
let search = document.getElementById("search");
let searchIcon = document.getElementById("search-icon");

// Function to fetch movies from The Movie Database API
async function fetchSearch(searchTerm) {
    try {
        const apiKey = "b57c638ddfe8bd27487ab950fa3f4e8d"; // Replace with your actual API key
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&query=${searchTerm}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
}
// Function to render movies in the search box
function renderMovies(movies) {
    searchBox.innerHTML = ""; // Clear existing content
    movies.forEach(element => {
        const { poster_path, title, release_date, id } = element;
        let card = document.createElement('a');
        card.href = `detailsMovie.html?id=${id}`;
        card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${poster_path}">
              <div class="content">
                <h6>${title}</h6>
                <p class="search-movie-desc">${release_date}</p>
              </div>
        `;
        searchBox.appendChild(card);
    });
}

// Event listener for search icon click
searchIcon.addEventListener("click", async () => {
    search.classList.toggle("click");
    if (search.classList.contains("click")) {
        // Fetch and render movies when the search box is clicked
        const searchTerm = search.value.trim();
        if (searchTerm) {
            const movies = await fetchSearch(searchTerm);
            renderMovies(movies);
        }
    }
});

// Event listener for keyup in the search box
search.addEventListener("keyup", async () => {
    let filter = search.value.trim().toUpperCase();
    if (filter) {
        // Fetch and render movies based on the search input
        const movies = await fetchSearch(filter);
        renderMovies(movies);

        searchBox.style.visibility = "visible";
        searchBox.style.opacity = 1;
    } else {
        // Hide search box if search input is empty
        searchBox.style.visibility = "hidden";
        searchBox.style.opacity = 0;
    }
});