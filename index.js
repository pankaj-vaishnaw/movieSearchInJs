const apiKey = '6f662713'; // Replace with your actual OMDB API key

const searchInput = document.getElementById('searchInput');
const movieResults = document.getElementById('movieResults');
const pagination = document.getElementById('pagination');

function createMovieCard(movie) {
    const movieCard = document.createElement('a'); 
    movieCard.classList.add('movie-card');
    movieCard.setAttribute('target', '_blank');

    const poster = document.createElement('img');
    poster.src = movie.Poster;
    poster.alt = movie.Title;
    movieCard.appendChild(poster);

    const title = document.createElement('h3');
    title.textContent = movie.Title;
    movieCard.appendChild(title);

   
    const year = document.createElement('p');
    year.textContent = `Year: ${movie.Year}`;
    movieCard.appendChild(year);

    movieCard.href = `movie_details.html?imdbID=${movie.imdbID}`;

   
    movieCard.addEventListener('click', (event) => {
        event.preventDefault();
        const imdbID = new URLSearchParams(event.currentTarget.search).get('imdbID');
        if (imdbID) {
            window.location.href = `movie_details.html?imdbID=${imdbID}`;
        } 
    });

    return movieCard;
}


function displayMovieResults(results) {
    
    movieResults.innerHTML = '';

    
    results.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieResults.appendChild(movieCard);
    });
}


async function fetchMovieData(query, page = 1) {
    try {
       

        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`;
        

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        

        if (data.Response==='True') {
            displayMovieResults(data.Search);
            handlePagination(data.totalResults, page);
        } else {
            movieResults.innerHTML = '<p>No results found.</p>';
            pagination.innerHTML = ''; 
        }
    } catch (error) {
       
       console.log(error)
    }
}


function handlePagination(totalResults, currentPage) {
    const totalPages = Math.ceil(totalResults / 10); // Assuming 10 results per page

    
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('pagination-button');

   
        if (i === currentPage) {
            button.classList.add('active');
        }

        
        button.addEventListener('click', () => {
            fetchMovieData(searchInput.value, i);
        });

        pagination.appendChild(button);
    }
}


function debounce(func, wait) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}


searchInput?.addEventListener('input', debounce(() => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovieData(query);
    }
}, 500)); 
fetchMovieData('avengers');