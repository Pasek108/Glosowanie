<?php
header('Content-type: text/plain; charset=utf-8');
mb_internal_encoding('UTF-8');
$q = $_REQUEST['q'];

$connection = new mysqli("localhost", "root", "", "glosowania");
$zapytanie = "SELECT * FROM glosowania";

$result = $connection->query($zapytanie);

$priv = 0;
$haslo = "";
$istnieje = 0;
while ($row = $result->fetch_assoc()) {
    if ($row["nazwa"] == $q) {
        $priv = $row["priv"];
        $haslo = $row["haslo"];
        $istnieje = 1;
        break;
    }
}

$connection->close();

if ($istnieje == 1) {
    $filename = "glosowania/" . $q . ".txt";
    $content = file($filename);

    $array = explode("||", $content[0]);

    if($priv==0) include("pokaz_glosowanie.php");
    else include("podaj_haslo.php");
}
else echo "Głosowanie nie istnieje";
?>