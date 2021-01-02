<?php
header('Content-type: text/plain; charset=utf-8');
mb_internal_encoding('UTF-8');
$glos = $_REQUEST['glos'];
$q = $_REQUEST['q'];

$connection = new mysqli("localhost", "root", "", "glosowania");
$zapytanie = "SELECT * FROM glosowania";

$result = $connection->query($zapytanie);

$priv = 0;
while ($row = $result->fetch_assoc()) {
    if ($row["nazwa"] == $q) {
        $priv = $row["priv"];
        break;
    }
}

$connection->close();

$filename = "glosowania/" . $q . ".txt";

$content = file($filename);

$array = explode("||", $content[0]);

if ($glos != 0) $array[$glos]--;

$inservote = $array[0];
for ($i = 1; $i < count($array); $i++) $inservote = $inservote . "||" . $array[$i];

$inservote = mb_convert_encoding($inservote, 'UTF-8');
$fp = fopen($filename, "w");
fputs($fp, $inservote);
fclose($fp);

$suma = 0;
$pol_tablicy = (count($array) - 1) / 2;
for ($i = 1; $i < $pol_tablicy + 1; $i++) $suma += intval($array[$i]);

include("pokaz_glosowanie.php");
?>