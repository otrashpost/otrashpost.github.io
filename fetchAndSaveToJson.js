const axios = require('axios');
const fs = require('fs');

// URL do site que você deseja buscar informações
const url = 'https://reidoscanais.app/embed/player.php?l=aHR0cHM6Ly94bi0tLS1pdGJhdmJ2YWNlaXoueG4tLS0tLS0tNDNkYmFiYmNxdnNhYzhhZmJmZHdjb2Vja3ZrbmdkMWZybGd1aGFqOWIubmV0L3d0Yy5waHA/aWQ9MTU3OQ==';

// Função para buscar os dados do site
async function fetchData() {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
}

// Função para salvar os dados em um arquivo JSON
async function saveToJson(data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync('dados.json', jsonData);
        console.log('Dados salvos em dados.json');
    } catch (error) {
        console.error('Erro ao salvar os dados em JSON:', error);
        throw error;
    }
}

// Função principal para executar o script
async function main() {
    try {
        const data = await fetchData();  // Busca os dados do site
        await saveToJson(data);          // Salva os dados em JSON
    } catch (error) {
        console.error('Erro durante a execução do script:', error);
    }
}

// Executa o script
main();
