const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// Roteamento para capturar e retransmitir o manifesto MPD
app.get('/paga/:filename', async (req, res) => {
  const originalUrl = 'https://0108-vos.dtvott.com/DASH/manifest.mpd';
  
  try {
    const response = await fetch(originalUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${originalUrl}: ${response.statusText}`);
    }

    // Captura o conteúdo do manifesto MPD
    const content = await response.text();

    // Transmite o conteúdo para o novo link
    // Neste exemplo, apenas retornamos o conteúdo como resposta
    res.setHeader('Content-Type', 'application/dash+xml');
    res.send(content);

  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
