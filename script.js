document.getElementById('fetch-button').addEventListener('click', () => {
    const pageUrl = 'https://api.example.com/movies'; // Substitua pela URL desejada

    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Limpa o conteúdo anterior
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = '';

            // Adiciona o novo conteúdo
            data.movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                movieCard.innerHTML = `
                    <img src="${movie.poster}" alt="Poster do ${movie.title}">
                    <h3>${movie.title}</h3>
                    <p>${movie.description}</p>
                `;
                contentDiv.appendChild(movieCard);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
