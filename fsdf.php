<?php
$url = 'https://d31ii3fk8fd7mh.cloudfront.net/out/v1/c8af1e1deee840d5ac16c838d0247817/index.mpd'; // Substitua pelo caminho real do seu arquivo .m3u8
header('Content-Type: application/vnd.apple.mpegurl');
readfile($url);
?>
