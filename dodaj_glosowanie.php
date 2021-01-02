<?php
$naglowek = $_REQUEST['naglowek'];
$opcje = $_REQUEST['opcje'];
$haslo = $_REQUEST['haslo'];
$priv = 0;

if ($haslo != "") {
    $priv = 1;
}

$opcje_array = explode("||", $opcje);

$inservote = $naglowek;
for ($i = 0; $i < count($opcje_array); $i++) $inservote = $inservote . "||0";
for ($i = 0; $i < count($opcje_array); $i++) $inservote = $inservote . "||" . $opcje_array[$i];

$inservote = mb_convert_encoding($inservote, 'UTF-8');

$literki = "abcdefghijklmnopqrstuvwxyz0123456789";

$plik = "";
for ($i = 0; $i < 20; $i++) {
    $plik = $plik . $literki[rand(0, 35)];
}

$filename = "glosowania/" . $plik . ".txt";

$fp = fopen($filename, "w");
fputs($fp, $inservote);
fclose($fp);

$connection = new mysqli("localhost", "root", "", "glosowania");
$zapytanie = "INSERT INTO glosowania (id, nazwa, priv, haslo) VALUES (NULL, '$plik', $priv, '$haslo')";

$connection->query($zapytanie);

$connection->close();

$q = $plik;
$content = file($filename);
$array = explode("||", $content[0]);
include("pokaz_glosowanie.php");
?>