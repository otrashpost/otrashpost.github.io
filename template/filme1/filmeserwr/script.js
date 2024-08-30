document.addEventListener('DOMContentLoaded', () => {
    const proxyUrl = 'https://corsproxy.io/?url=';
    const targetUrl = '/';
    const fullUrl = proxyUrl + encodeURIComponent(targetUrl);

    fetch(fullUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Process articles
            const items = doc.querySelectorAll('#archive-content .item');
            const itemContainer = document.getElementById('item-container');

            itemContainer.innerHTML = ''; // Clear the loading text

            items.forEach(item => {
                const imgSrc = item.querySelector('.poster img').src;
                const title = item.querySelector('.data h3 a').textContent;
                const link = item.querySelector('.data h3 a').href;

                const itemHTML = `
                    <a href="${link}" class="item">
                        <img src="${imgSrc}" alt="${title}">
                        <h3>${title}</h3>
                    </a>
                `;

                itemContainer.insertAdjacentHTML('beforeend', itemHTML);
            });

            // Process pagination
            const pagination = doc.querySelector('.pagination');
            const paginationContainer = document.getElementById('pagination');

            if (pagination) {
                paginationContainer.innerHTML = pagination.innerHTML;
            } else {
                paginationContainer.innerHTML = 'Não há navegação de páginas.';
            }

            // Process search form
            const searchForm = doc.querySelector('#advc-menu');
            const searchContainer = document.getElementById('advc-menu');

            if (searchForm) {
                searchContainer.innerHTML = searchForm.innerHTML;
            } else {
                searchContainer.innerHTML = 'Formulário de pesquisa não encontrado.';
            }
        })
        .catch(error => {
            document.getElementById('item-container').innerHTML = 'Erro ao carregar conteúdo.';
            document.getElementById('pagination').innerHTML = '';
            document.getElementById('advc-menu').innerHTML = 'Erro ao carregar formulário de pesquisa.';
            console.error('Error:', error);
        });
});
