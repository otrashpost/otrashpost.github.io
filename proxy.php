<?php
$url = 'https://0108-vos.dtvott.com/DASH/manifest.mpd'; // Substitua pelo caminho real do seu arquivo .m3u8
header('Content-Type: application/vnd.apple.mpegurl');
readfile($url);
?>
