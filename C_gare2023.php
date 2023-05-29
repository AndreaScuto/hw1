<?php 

require_once 'autenticazione.php';
if (!checkAuth()) exit;

header('Content-Type: application/json');

gare();

function gare() {

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://v1.formula-1.api-sports.io/races?season=2023&type=Race&timezone=Europe%2FRome',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => array(
    'x-rapidapi-key: 4a7414a153db433937462623af36141c',
    'x-rapidapi-host: v1.formula-1.api-sports.io'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

}
?>