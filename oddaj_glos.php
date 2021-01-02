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

if ($glos != 0) $array[$glos]++;

$inservote = $array[0];
for ($i = 1; $i < count($array); $i++) $inservote = $inservote . "||" . $array[$i];

$inservote = mb_convert_encoding($inservote, 'UTF-8');
$fp = fopen($filename, "w");
fputs($fp, $inservote);
fclose($fp);

$suma = 0;
$pol_tablicy = (count($array) - 1) / 2;
for ($i = 1; $i < $pol_tablicy + 1; $i++) $suma += intval($array[$i]);
?>

<h2><?php echo $array[0] ?></h2>
<div class="priv_public">
    <?php
    if ($priv == 1) echo " prywatne";
    else echo " publiczne";
    ?>
</div>
<br>
<div class="copy_link" id="copy_link" onclick="copy_link()">Skopiuj link</div><br>
<form id="ankieta" class="ankieta">
    <table>
        <col style="width: 100%;" />
        <?php
        for ($i = 1; $i < $pol_tablicy + 1; $i++) {
            $opcja = $i + $pol_tablicy;
            echo "
        <tr>
            <td>
            <br>$array[$opcja]
            </td>
        </tr>
        <tr>
            <td>
                <div class='procent' style='width: " . round(((intval($array[$i]) / $suma) * 100), 2) . "%;'>
                    <div class='procent_txt'>$array[$i] (" . round(((intval($array[$i]) / $suma) * 100), 2) . "%)</div>
                </div>
            </td>
        </tr>";
        }
        ?>
    </table>
    <input id="plik" type="hidden" value="<?php echo $q; ?>">
    <button onclick="cofnij_glos()" class="button button--ujarak button_red" type="button">Cofnij głos</button>
    <div onclick="losuj_glosowanie()" id="losuj" class="losuj">
        <i id="kostka" class="fas fa-dice-five"></i> Losuj
    </div>
</form>