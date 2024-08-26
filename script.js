document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');

            data.images.forEach(imgData => {
                const imgElement = document.createElement('img');
                imgElement.src = imgData.url;
                imgElement.alt = imgData.alt;
                imgElement.onclick = () => window.location.href = imgData.link;

                gallery.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});
