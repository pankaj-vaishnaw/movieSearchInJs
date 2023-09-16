// const apiKey = '6f662713';
async function showMovieDetails(imdbID) {
    try {
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
       

        
        const movieDetailsContainer = document.getElementById('movieDetails');
        movieDetailsContainer.innerHTML = `
            
            <img src=${data.Poster} alt='poster'>
            <h2>${data.Title}</h2>
            <p>Year: ${data.Year}</p>
            <p>release Date: ${data.Released}</p>
            <p>Director: ${data.Director}</p>
            <p>Plot: ${data.Plot}</p>
            <!-- Add more details here as needed -->
        `;
    } catch (error) {
        console.error('Error:', error);
      
    }
}


const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');


if (imdbID) {
    showMovieDetails(imdbID);
} else {
   
   
}