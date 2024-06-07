<?php
// Recebe o conteúdo do iframe
$conteudo = $_POST['conteudo'];

// Salva o conteúdo em um arquivo JSON
$file = 'conteudo_iframe.json';
file_put_contents($file, $conteudo);

// Responde com uma mensagem de sucesso
echo json_encode(array("message" => "Conteúdo do iframe recebido com sucesso."));
?>
