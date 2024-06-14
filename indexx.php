
<?php
function randomString($length = 3) {
    $randomString = '';
    $characters = implode("", array_merge(range('a', 'z'), range('A', 'Z')));
    for ($i = 0; $i < $length; $i++) $randomString .= $characters[mt_rand(0, strlen($characters) - 1)];
    return $randomString;
}
function encode($output) { 
	  $randomFunc = randomString();
    $randomOut = randomString();
    $randomNum = randomString();
    $randomVal = mt_rand(999999, 99999999);
    $return = '<!-- CONTINUE O QUE ESTAVA FAZENDO, NÃO HÁ NADA AQUI -->
    <script>var ' . $randomOut . ' = ""; var ' . $randomNum . ' = [';
    foreach(str_split($output) as $x){ $return .= '"'.base64_encode(randomString().(ord($x) + $randomVal).randomString()) . '", '; if (mt_rand(0, 1)){ $return .= "\n"; } }
    $return = rtrim($return, ', ');
    $return .= ']; ' . $randomNum . '.forEach(function ' . $randomFunc . '(value) { ' . $randomOut . ' += String.fromCharCode(parseInt(atob(value).replace(/\D/g,\'\')) - ' . $randomVal . '); } ); document.write(decodeURIComponent(escape(' . $randomOut . '))); </script>'  ;;
    return $return;
}
ob_start("encode");
?>
<script src="https://cdn.jsdelivr.net/npm/console-ban@5.0.0/dist/console-ban.min.js"></script>
<script>
    ConsoleBan.init({
      redirect: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    })
</script>
    	<noscript>
		<style>
			body {
				display: none;
			}
		</style>
		<meta http-equiv="refresh" content="0;url=javascript_disabled.php">
	</noscript>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capturar HTML</title>
</head>
<body>
    <h1>Capturar HTML de outro site</h1>
    
    <form id="htmlForm">
        <label for="url">URL do site:</label><br>
        <input type="text" id="url" name="url" value="https://exemplo.com"><br><br>
        <button type="button" onclick="capturarHTML()">Capturar HTML</button>
    </form>

    <div id="resultado"></div>

    <script>
        function capturarHTML() {
            var url = document.getElementById("url").value;

            // Requisição para capturar o HTML
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var htmlCapturado = xhr.responseText;
                    document.getElementById("resultado").innerHTML = "<pre>" + htmlCapturado + "</pre>";
                }
            };
            xhr.send();
        }
    </script>
</body>
</html>
