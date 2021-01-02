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

?>

<h2><?php echo $naglowek ?></h2>
<div class="priv_public">
    <?php 
        if ($priv == 1) echo " prywatne"; 
        else echo " publiczne";
    ?>
</div>
<br>
<div class="copy_link" id="copy_link" onclick="copy_link()">Skopiuj link</div><br>
<form id="ankieta" class="ankieta">
    <div class="opcje">
        <?php
        for ($i = 0; $i < count($opcje_array); $i++) {
            echo '
            <input id="opcja' . intval($i + 1) . '" name="glos" type="radio" value="' . intval($i + 1) . '" onclick="oddaj_glos(this.value)">
            <label class="glos" for="opcja' . intval($i + 1) . '">' . $opcje_array[$i] . '</label><br>
            <input id="plik" type="hidden" value="' . $plik . '">';
        }
        ?>
    </div>
</form>