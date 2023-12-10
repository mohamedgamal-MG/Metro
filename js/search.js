'use strict';

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