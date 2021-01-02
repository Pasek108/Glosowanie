<form>
    <textarea id="naglowek_input" class="naglowek_input" placeholder="Nagłówek"></textarea><br>
    <input type="checkbox" class="check" id="wiele" value="wiele"> <label for="wiele">Pozwól wybrać więcej niż jedną opcje</label><br>
    <div id="prywatne">
        <input onclick="podaj_haslo()" type="checkbox" class="check" id="priv" value="priv"> <label for="priv">Głosowanie prywatne </label>
    </div><br>
    <div id="opcje_nowa">
        <input class="opcja_input" type="text" placeholder="Opcja"><br>
        <input class="opcja_input" type="text" placeholder="Opcja"><br>
        <input class="opcja_input" type="text" placeholder="Opcja"><br>
    </div>
    <div onclick="dodaj_opcje()" id="plus_input" class="plus_input">+ dodaj opcje</div>

    <button onclick="dodaj_glosowanie()" class="button button--ujarak" type="button">Dodaj głosowanie</button><br>
</form>