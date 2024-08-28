document.addEventListener('DOMContentLoaded', () => {
    fetch('movies.json')
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById('movie-list');
            
            data.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.className = 'movie';
                
                const img = document.createElement('img');
                img.src = movie.image;
                img.alt = movie.title;
                
                movieDiv.appendChild(img);
                movieList.appendChild(movieDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});
