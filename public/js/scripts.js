document.addEventListener('DOMContentLoaded', function() {
    fetch('https://mycdn.delivery/space/tracks-v1a1/mono.m3u8')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo .m3u8');
            }
            return response.text();
        })
        .then(data => {
            // Processar o conteúdo do arquivo .m3u8
            processM3U8Content(data);
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });

    function processM3U8Content(content) {
        // Dividir o conteúdo por quebras de linha para analisar linha por linha
        const lines = content.split('\n');

        // Variáveis para armazenar as informações desejadas
        let extm3u = '';
        let targetDuration = 0;
        let version = 0;

        // Iterar sobre cada linha do arquivo .m3u8
        lines.forEach(line => {
            // Remover espaços em branco extras
            line = line.trim();

            // Verificar se a linha começa com #EXTM3U, #EXT-X-TARGETDURATION ou #EXT-X-VERSION
            if (line.startsWith('#EXTM3U')) {
                extm3u = line;
            } else if (line.startsWith('#EXT-X-TARGETDURATION')) {
                targetDuration = parseInt(line.split(':')[1]);
            } else if (line.startsWith('#EXT-X-VERSION')) {
                version = parseInt(line.split(':')[1]);
            }

            // Você pode adicionar mais lógica para capturar outras informações conforme necessário
        });

        // Exemplo de como você pode usar essas informações
        console.log('EXTM3U:', extm3u);
        console.log('TARGET DURATION:', targetDuration);
        console.log('VERSION:', version);

        // Aqui você pode usar essas variáveis para atualizar dinamicamente seu site
    }
});
