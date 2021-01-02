<?php
$haslo = $_REQUEST['haslo'];
$plik = $_REQUEST['plik'];

$connection = new mysqli("localhost", "root", "", "glosowania");
$zapytanie = "SELECT * FROM glosowania";

$result = $connection->query($zapytanie);

$poprawne = 0;
while ($row = $result->fetch_assoc()) {
    if ($row["nazwa"] == $plik && $row["haslo"] == $haslo) {
        $poprawne = 1;
        break;
    }
}

if ($poprawne == 1) {
    $q = $plik;
    $priv = 1;
    $filename = "glosowania/" . $q . ".txt";
    $content = file($filename);

    $array = explode("||", $content[0]);
    include("pokaz_glosowanie.php");
} else echo "Błędne hasło, brak dostepu.";

$connection->close();
