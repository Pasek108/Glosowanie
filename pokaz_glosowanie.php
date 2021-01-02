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
    <div class="opcje">
        <?php
        $pol_tablicy = (count($array) - 1) / 2;
        for ($i = $pol_tablicy + 1; $i < count($array); $i++) {
            echo '
            <input id="opcja' . intval($i - $pol_tablicy) . '" name="glos" type="radio" value="' . intval($i - $pol_tablicy) . '" onclick="oddaj_glos(this.value)">
            <label class="glos" for="opcja' . intval($i - $pol_tablicy) . '">' . $array[$i] . '</label><br>
            <input id="plik" type="hidden" value="' . $q . '">';
        }
        ?>
    </div>
    <div onclick="losuj_glosowanie()" id="losuj" class="losuj">
        <i id="kostka" class="fas fa-dice-five"></i> Losuj
    </div>
</form>