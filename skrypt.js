'use strict'
let tryb = document.getElementById("tryb");
let slider = document.getElementById("slider");
let header = document.getElementById("header");
let footer = document.getElementById("footer");
let main = document.getElementById("main");
let procent = document.getElementsByClassName("procent");
let menu_icon = document.getElementById("pokaz_menu");
let menu_bg = document.getElementById("lista");

function zmien_tryb() {
    if (slider.classList.contains("slider2")) {
        tryb.classList.remove("ciemny");
        slider.classList.remove("slider2");
        header.classList.remove("header_dark");
        footer.classList.remove("footer_dark");
        main.classList.remove("main_dark");
        menu_icon.classList.remove("fa-bars_dark");
        menu_bg.classList.remove("menu_dark");
        for (let i = 0; i < procent.length; i++) procent[i].classList.remove("procent_dark");
        localStorage.setItem("tryb", "jasny");
    }
    else {
        tryb.classList.add("ciemny");
        slider.classList.add("slider2");
        header.classList.add("header_dark");
        footer.classList.add("footer_dark");
        main.classList.add("main_dark");
        menu_icon.classList.add("fa-bars_dark");
        menu_bg.classList.add("menu_dark");
        for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");
        localStorage.setItem("tryb", "ciemny");
    }
}

function ustaw_tryb() {
    if (localStorage.getItem("tryb") == "ciemny") {
        tryb.classList.add("ciemny");
        slider.classList.add("slider2");
        header.classList.add("header_dark");
        footer.classList.add("footer_dark");
        menu_icon.classList.add("fa-bars_dark");
        menu_bg.classList.add("menu_dark");
        main.classList.add("main_dark");
        for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");
    }
}

let kostki = ["one", "two", "three", "four", "five", "six"];
let n_kostka = 0;
let interval;

let kostka = document.getElementById("kostka");
let losuj = document.getElementById("losuj");

function zmien_kostke() {
    interval = setInterval(() => {
        if (n_kostka > 5) n_kostka = 0;
        if (n_kostka == 0) kostka.classList.replace("fa-dice-" + kostki[5], "fa-dice-" + kostki[n_kostka]);
        else kostka.classList.replace("fa-dice-" + kostki[n_kostka - 1], "fa-dice-" + kostki[n_kostka]);
        n_kostka++;
    }, 1000 / 4)
}

function kostka_stop() {
    clearInterval(interval);
}

let plik = "";

function losuj_glosowanie() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tresc").innerHTML = this.responseText;
            if (localStorage.getItem("tryb") == "ciemny") {
                for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");
            }
        }
    }
    let i = Math.floor(Math.random() * (pliki.length - 0)) + 0;
    plik = pliki[i];
    if (localStorage.getItem(plik) != null) {
        xmlhttp.open("GET", "oddaj_glos.php?glos=0&q=" + plik, true);
        xmlhttp.send();
    }
    else {
        xmlhttp.open("GET", "glosowanie.php?q=" + plik, true);
        xmlhttp.send();
    }
}

let nowa = document.getElementById("nowa");

nowa.addEventListener("click", () => {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tresc").innerHTML = this.responseText;
            if (localStorage.getItem("tryb") == "ciemny") {
                document.getElementById("plus_input").classList.add("plus_input_dark");
            }
        }
    }
    xmlhttp.open("GET", "dodaj.php", true);
    xmlhttp.send();
});

let priv = 0;

function podaj_haslo() {
    if (priv == 0) {
        document.getElementById("prywatne").innerHTML += ' <input id="haslo" class="haslo" type="text" placeholder="Podaj hasło"></input>';
        document.getElementById("priv").checked = true;
        priv = 1;
    }
    else {
        document.getElementById("prywatne").innerHTML = '<input onclick="podaj_haslo()" type="checkbox" class="check" id="priv" value="priv"> <label for="priv">Głosowanie prywatne</label>';
        priv = 0;
    }
}

function sprawdz_haslo() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tresc").innerHTML = this.responseText;
            if (localStorage.getItem("tryb") == "ciemny") {
                document.getElementById("plus_input").classList.add("plus_input_dark");
            }
        }
    }
    let haslo = document.getElementById("haslo").value;
    plik = document.getElementById("plik").value;
    xmlhttp.open("GET", "sprawdz_haslo.php?haslo=" + haslo + "&plik=" + plik, true);
    xmlhttp.send();
}

function dodaj_opcje() {
    let opcje_input = document.getElementsByClassName("opcja_input");
    let opcje_input_txt = [];
    for (let i = 0; i < opcje_input.length; i++) opcje_input_txt[i] = opcje_input[i].value;

    document.getElementById("opcje_nowa").innerHTML += '<input class="opcja_input" type="text" placeholder="Opcja"><br>';

    for (let i = 0; i < opcje_input.length - 1; i++) opcje_input[i].value = opcje_input_txt[i];
}

function skopiuj() {
    var copyText = document.getElementById("link");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById("copy_link").innerHTML = "Skopiowano"
    document.getElementById("copy_link").onclick = "copy_link()";
}

function copy_link() {
    let plik = document.getElementById("plik").value;
    let link = "" + window.location.href + "index.php?q=" + plik;
    document.getElementById("copy_link").innerHTML = "<textarea id='link' onclick='skopiuj()' cols='" + (link.length + 5) + "'>" + link + "</textarea>";
    document.getElementById("copy_link").onclick = "";
}

if (localStorage.getItem("twoje") == null) localStorage.setItem("twoje", "");
let twoje = "";
twoje = twoje + localStorage.getItem("twoje");

let margin;

document.getElementById("logo_txt").addEventListener("click", () => {
    window.location.replace("http://localhost/Nauka/Glosowanie/");
});
window.addEventListener("load", () => {
    sprawdz_link();
    ustaw_tryb();
    let twoje_tab = twoje.split(";")

    if (twoje_tab.length == 1) document.getElementById("lista_twoje").innerHTML += "<li class='menu_li'>Brak</li></a>";
    else {
        for (let i = 0; i < twoje_tab.length - 1; i++) {
            document.getElementById("lista_twoje").innerHTML += "<a href='http://localhost/Nauka/Glosowanie/index.php?q=" + twoje_tab[i] + "'><li class='menu_li'>" + twoje_tab[i] + "</li></a>";
        }
    }

    for (let i = 0; i < pliki.length; i++) {
        document.getElementById("lista_public").innerHTML += "<a href='http://localhost/Nauka/Glosowanie/index.php?q=" + pliki[i] + "'><li class='menu_li'>" + pliki[i] + "</li></a>";
    }

    document.getElementById("lista").style.height = "" + document.getElementById("main").offsetHeight + "px";

    if (window.innerWidth <= 768) {
        document.getElementById("pokaz_menu").style.marginLeft = "-1.5rem";
        margin = "-1.5rem";
    }
    else {
        document.getElementById("pokaz_menu").style.marginLeft = "-3rem";
        margin = "-3rem";
    }
});
slider.addEventListener("click", zmien_tryb);
losuj.addEventListener("mouseover", zmien_kostke);
losuj.addEventListener("mouseout", kostka_stop);
losuj.addEventListener("click", losuj_glosowanie);

let menu_showed = 0;
function pokaz_menu() {
    if (menu_showed == 0) {
        if (margin == "-3rem") {
            menu_bg.style.marginLeft = "-3rem";
            menu_icon.style.marginLeft = "13rem";
        }
        else {
            menu_bg.style.marginLeft = "-1.5rem";
            menu_icon.style.marginLeft = "14.5rem";
        }
        menu_showed = 1;
    }
    else {
        if (margin == "-3rem") {
            menu_bg.style.marginLeft = "-19rem";
            menu_icon.style.marginLeft = "-3rem";
        }
        else {
            menu_bg.style.marginLeft = "-17.5rem";
            menu_icon.style.marginLeft = "-1.5rem";
        }
        menu_showed = 0;
    }
}

function sprawdz_link() {
    let url = window.location.href;
    if (url.search("q=") != -1) {
        let plik = url.slice(url.search("q=") + 2, url.length)
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("tresc").innerHTML = this.responseText;
                if (localStorage.getItem("tryb") == "ciemny") {
                    for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");
                }
            }
        }
        if (localStorage.getItem(plik) != null) {
            xmlhttp.open("GET", "oddaj_glos.php?glos=0&q=" + plik, true);
            xmlhttp.send();
        }
        else {
            xmlhttp.open("GET", "glosowanie.php?q=" + plik, true);
            xmlhttp.send();
        }
    }
}

function cofnij_glos() {
    let plik = document.getElementById("plik").value;
    let vote = localStorage.getItem(plik);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tresc").innerHTML = this.responseText;
        }
    }
    xmlhttp.open("GET", "cofnij_glos.php?glos=" + vote + "&q=" + plik, true);
    xmlhttp.send();
}

function odswiez_glosy() {
    if (document.getElementById("plik") != null) {
        let plik = document.getElementById("plik").value;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("tresc").innerHTML = this.responseText;
                if (localStorage.getItem("tryb") == "ciemny") {
                    for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");
                }
            }
        }
        if (localStorage.getItem(plik) != null) {
            xmlhttp.open("GET", "oddaj_glos.php?glos=0&q=" + plik, true);
            xmlhttp.send();
        }
        else {
            xmlhttp.open("GET", "glosowanie.php?q=" + plik, true);
            xmlhttp.send();
        }
    }
}

setInterval(odswiez_glosy, 10000);

function dodaj_glosowanie() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tresc").innerHTML = this.responseText;
            localStorage.setItem("twoje", twoje + document.getElementById("plik").value + ";");
        }
    }
    let naglowek = document.getElementById("naglowek_input").value;
    let opcje = document.getElementsByClassName("opcja_input");
    let wielokrotny = document.getElementById("wiele").checked;
    let priv = document.getElementById("priv").checked;
    let haslo = "";
    if (priv) haslo = document.getElementById("haslo").value;
    let opcje_txt = "";
    for (let i = 0; i < opcje.length; i++) {
        if (opcje[i].value != "") {
            if (i == 0) opcje_txt = opcje_txt + opcje[i].value;
            else opcje_txt = opcje_txt + "||" + opcje[i].value;
        }
    }
    let url = new URL("http://localhost/Nauka/Glosowanie/dodaj_glosowanie.php");
    url.searchParams.set('naglowek', naglowek);
    url.searchParams.append('opcje', opcje_txt);
    url.searchParams.append('wiele', wielokrotny);
    url.searchParams.append('haslo', haslo);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function oddaj_glos() {
    plik = document.getElementById("plik").value;
    let radio = document.getElementsByClassName("radio");
    let vote = 0;
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            vote = radio[i].value;
            break;
        }
    }
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tresc").innerHTML = this.responseText;
            if (localStorage.getItem("tryb") == "ciemny") {
                for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");
            }
            localStorage.setItem(plik, "" + vote);
        }
    }
    xmlhttp.open("GET", "oddaj_glos.php?glos=" + vote + "&q=" + plik, true);
    xmlhttp.send();
}