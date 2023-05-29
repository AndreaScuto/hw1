<?php 

require_once 'autenticazione.php';
if (!checkAuth()) exit;

header('Content-Type: application/json');

archivio();

function archivio() {

    $anno = urlencode($_GET["ANNO"]);
    $tipo = urlencode($_GET["TIPO"]);
    $url = "http://ergast.com/api/f1/" . $anno . "/" . $tipo . ".json";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $res=curl_exec($ch);
    

    echo $res;
    curl_close($ch);
}
?>