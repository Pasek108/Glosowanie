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
        if (document.getElementById("plus_input") != null) document.getElementById("plus_input").classList.remove("plus_input_dark");
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
        if (document.getElementById("plus_input") != null) document.getElementById("plus_input").classList.add("plus_input_dark");
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
    if (document.getElementsByClassName("public")[0] != undefined) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("tresc").innerHTML = this.responseText;
                if (localStorage.getItem("tryb") == "ciemny") {
                    for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");
                }

                if (localStorage.getItem("twoje") == null) localStorage.setItem("twoje", "");

                let twoje_tab = localStorage.getItem("twoje").split(";")
                if (twoje_tab.length > 1) {
                    for (let i = 0; i < twoje_tab.length - 1; i++) {
                        let twoje_split = twoje_tab[i].split("-");
                        if (twoje_split[0] == plik) {
                            document.getElementById("priv_public").innerHTML += '<br><button onclick="usun_glosowanie()"class="button button--ujarak button_red" type="button">Usuń głosowanie</button>';
                        }
                    }
                }
            }
        }

        let i = Math.floor(Math.random() * pliki.length);
        plik = pliki[i];
        if (localStorage.getItem(plik) != null) {
            let url = new URL("http://localhost/Nauka/Glosowanie/php/oddaj_glos.php");
            url.searchParams.set('glos', 0);
            url.searchParams.append('plik', plik);
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
        else {
            let url = new URL("http://localhost/Nauka/Glosowanie/php/glosowanie.php");
            url.searchParams.set('plik', plik);
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
    }
    else document.getElementById("tresc").innerHTML = "Brak publicznych głosowań."
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

    let url = new URL("http://localhost/Nauka/Glosowanie/php/dodaj.php");
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
});

let priv = 0;

function podaj_haslo() {
    if (priv == 0) {
        document.getElementById("prywatne").innerHTML += ' <input id="haslo" type="text" placeholder="Podaj hasło" pattern="[A-Za-z0-9AaĄąĆćĘęŁłŃńÓóŚśŹźŻż.,?\s]{0,30}"></input>';
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
        }

        if (localStorage.getItem("twoje") == null) localStorage.setItem("twoje", "");

        let twoje_tab = localStorage.getItem("twoje").split(";")
        if (twoje_tab.length > 1) {
            for (let i = 0; i < twoje_tab.length - 1; i++) {
                let twoje_split = twoje_tab[i].split("-");
                if (twoje_split[0] == plik) {
                    document.getElementById("priv_public").innerHTML += '<br><button onclick="usun_glosowanie()"class="button button--ujarak button_red" type="button">Usuń głosowanie</button>';
                }
            }
        }
    }

    let haslo = document.getElementById("haslo").value;
    plik = document.getElementById("plik").value;
    let url = new URL("http://localhost/Nauka/Glosowanie/php/sprawdz_haslo.php");
    url.searchParams.set('haslo', haslo);
    url.searchParams.append('plik', plik);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function dodaj_opcje() {
    let opcje_input = document.getElementsByClassName("opcja_input");
    if (opcje_input.length < 30) {
        let opcje_input_txt = [];
        for (let i = 0; i < opcje_input.length; i++) opcje_input_txt[i] = opcje_input[i].value;
        document.getElementById("opcje_nowa").innerHTML += '<input class="opcja_input" type="text" placeholder="Opcja" pattern="[A-Za-z0-9AaĄąĆćĘęŁłŃńÓóŚśŹźŻż.,?\s]{0,48}"><br>';

        for (let i = 0; i < opcje_input.length - 1; i++) opcje_input[i].value = opcje_input_txt[i];
    }
    else alert("Zbyt wiele opcji");
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
    let url = new URL("http://localhost/Nauka/Glosowanie/index.php");
    url.searchParams.set('plik', plik);
    document.getElementById("copy_link").innerHTML = "<textarea id='link' onclick='skopiuj()' cols='72'>" + url + "</textarea>";
    document.getElementById("copy_link").onclick = "";
}

if (localStorage.getItem("twoje") == null) localStorage.setItem("twoje", "");

let margin;

function aktualizuj_menu() {
    let twoje_tab = localStorage.getItem("twoje").split(";")

    document.getElementById("lista_twoje").innerHTML = "<div>Utworzone przez ciebie:</div>";
    if (twoje_tab.length == 1) document.getElementById("lista_twoje").innerHTML += "<li class='menu_li'>Brak</li></a>";
    else {
        for (let i = 0; i < twoje_tab.length - 1; i++) {
            let twoje_split = twoje_tab[i].split("-");
            let url = new URL("http://localhost/Nauka/Glosowanie/index.php");
            url.searchParams.set('plik', twoje_split[0]);
            document.getElementById("lista_twoje").innerHTML += "<a href='" + url + "'><li class='menu_li'>" + twoje_split[0] + "</li></a>";
        }
    }

    document.getElementById("lista_public").innerHTML = "<div>Głosowania publiczne:</div>";
    for (let i = 0; i < pliki.length; i++) {
        let url = new URL("http://localhost/Nauka/Glosowanie/index.php");
        url.searchParams.set('plik', pliki[i]);
        document.getElementById("lista_public").innerHTML += "<a href='" + url + "'><li class='menu_li public'>" + pliki[i] + "</li></a>";
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
}

setInterval(aktualizuj_menu, 10000);

document.getElementById("logo_txt").addEventListener("click", () => {
    window.location.replace("http://localhost/Nauka/Glosowanie/");
});
window.addEventListener("load", () => {
    sprawdz_link();
    ustaw_tryb();
    aktualizuj_menu();
});

slider.addEventListener("click", zmien_tryb);
losuj.addEventListener("mouseover", zmien_kostke);
losuj.addEventListener("mouseout", kostka_stop);
losuj.addEventListener("click", losuj_glosowanie);

let szerokosc_okna = window.innerWidth;
function resize() {
    if (szerokosc_okna != window.innerWidth) {
        if (window.innerWidth <= 768) {
            document.getElementById("pokaz_menu").style.marginLeft = "-1.5rem";
            document.getElementById("lista").style.marginLeft = "-17.6rem";
            margin = "-1.5rem";
            menu_showed = 0
        }
        else {
            document.getElementById("pokaz_menu").style.marginLeft = "-3rem";
            document.getElementById("lista").style.marginLeft = "-19.1rem";
            margin = "-3rem";
            menu_showed = 0
        }
        szerokosc_okna = window.innerWidth;
    }
}

setInterval(resize, 1000);

let menu_showed = 0;
function pokaz_menu() {
    if (menu_showed == 0) {
        if (margin == "-3rem") {
            menu_bg.style.marginLeft = "-3rem";
            menu_icon.style.marginLeft = "13.1rem";
        }
        else {
            menu_bg.style.marginLeft = "-1.5rem";
            menu_icon.style.marginLeft = "14.6rem";
        }
        document.getElementById("lista").style.height = "" + document.getElementById("main").offsetHeight + "px";
        menu_showed = 1;
    }
    else {
        if (margin == "-3rem") {
            menu_bg.style.marginLeft = "-19.1rem";
            menu_icon.style.marginLeft = "-3rem";
        }
        else {
            menu_bg.style.marginLeft = "-17.6rem";
            menu_icon.style.marginLeft = "-1.5rem";
        }
        menu_showed = 0;
    }
}

function sprawdz_link() {
    let url = window.location.href;

    if (url.search("plik=") != -1) {
        let plik = url.slice(url.search("plik=") + 5, url.length)

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("tresc").innerHTML = this.responseText;
                if (localStorage.getItem("tryb") == "ciemny") for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");

                if (document.getElementById("priv_public") != null) {
                    if (localStorage.getItem("twoje") == null) localStorage.setItem("twoje", "");

                    let twoje_tab = localStorage.getItem("twoje").split(";")
                    if (twoje_tab.length > 1) {
                        for (let i = 0; i < twoje_tab.length - 1; i++) {
                            let twoje_split = twoje_tab[i].split("-");
                            if (twoje_split[0] == plik) {
                                document.getElementById("priv_public").innerHTML += '<br><button onclick="usun_glosowanie()"class="button button--ujarak button_red" type="button">Usuń głosowanie</button>';
                            }
                        }
                    }
                }
            }
        }

        if (localStorage.getItem(plik) != null) {
            let url = new URL("http://localhost/Nauka/Glosowanie/php/oddaj_glos.php");
            url.searchParams.set('glos', 0);
            url.searchParams.append('plik', plik);
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
        else {
            let url = new URL("http://localhost/Nauka/Glosowanie/php/glosowanie.php");
            url.searchParams.set('plik', plik);
            xmlhttp.open("GET", url, true);
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
            if (localStorage.getItem("twoje") == null) localStorage.setItem("twoje", "");

            let twoje_tab = localStorage.getItem("twoje").split(";")
            if (twoje_tab.length > 1) {
                for (let i = 0; i < twoje_tab.length - 1; i++) {
                    let twoje_split = twoje_tab[i].split("-");
                    if (twoje_split[0] == plik) {
                        document.getElementById("priv_public").innerHTML += '<br><button onclick="usun_glosowanie()"class="button button--ujarak button_red" type="button">Usuń głosowanie</button>';
                    }
                }
            }
        }
        localStorage.removeItem(plik);
    }

    let url = new URL("http://localhost/Nauka/Glosowanie/php/cofnij_glos.php");
    url.searchParams.set('glos', vote);
    url.searchParams.append('plik', plik);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function odswiez_glosy() {
    if (document.getElementById("plik") != null && document.getElementById("opcja1") == null && document.getElementById("haslo") == null) {
        let plik = document.getElementById("plik").value;

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("tresc").innerHTML = this.responseText;
                if (localStorage.getItem("tryb") == "ciemny") for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");

                if (localStorage.getItem("twoje") == null) localStorage.setItem("twoje", "");

                let twoje_tab = localStorage.getItem("twoje").split(";")
                if (twoje_tab.length > 1) {
                    for (let i = 0; i < twoje_tab.length - 1; i++) {
                        let twoje_split = twoje_tab[i].split("-");
                        if (twoje_split[0] == plik) {
                            document.getElementById("priv_public").innerHTML += '<br><button onclick="usun_glosowanie()"class="button button--ujarak button_red" type="button">Usuń głosowanie</button>';
                        }
                    }
                }
            }
        }

        if (localStorage.getItem(plik) != null) {
            let url = new URL("http://localhost/Nauka/Glosowanie/php/oddaj_glos.php");
            url.searchParams.set('glos', 0);
            url.searchParams.append('plik', plik);
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
        else {
            let url = new URL("http://localhost/Nauka/Glosowanie/php/glosowanie.php");
            url.searchParams.set('plik', plik);
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }
    }
}

setInterval(odswiez_glosy, 10000);

function dodaj_glosowanie() {
    let naglowek = document.getElementById("naglowek_input").value;
    let opcje = document.getElementsByClassName("opcja_input");
    let priv = document.getElementById("priv").checked;
    let wielokrotny = 0;
    if (document.getElementById("wiele").checked) wielokrotny = 1;

    let admin = "";
    let literki = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 20; i++) admin = admin + literki[Math.floor(Math.random() * 35)];

    let haslo = "";
    if (priv) haslo = document.getElementById("haslo").value;

    let opcje_txt = "";
    for (let i = 0; i < opcje.length; i++) {
        if (opcje[i].value != "") {
            if (i == 0) opcje_txt = opcje_txt + opcje[i].value;
            else opcje_txt = opcje_txt + "||" + opcje[i].value;
        }
    }

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tresc").innerHTML = this.responseText;
            localStorage.setItem("twoje", localStorage.getItem("twoje") + document.getElementById("plik").value + "-" + admin + ";");
        }

        if (localStorage.getItem("twoje") == null) localStorage.setItem("twoje", "");

        let twoje_tab = localStorage.getItem("twoje").split(";")
        if (twoje_tab.length > 1) {
            for (let i = 0; i < twoje_tab.length - 1; i++) {
                let twoje_split = twoje_tab[i].split("-");
                if (twoje_split[0] == plik) {
                    document.getElementById("priv_public").innerHTML += '<br><button onclick="usun_glosowanie()"class="button button--ujarak button_red" type="button">Usuń głosowanie</button>';
                }
            }
        }

        aktualizuj_menu();
    }

    let url = new URL("http://localhost/Nauka/Glosowanie/php/dodaj_glosowanie.php");
    url.searchParams.set('naglowek', naglowek);
    url.searchParams.append('opcje', opcje_txt);
    url.searchParams.append('wiele', wielokrotny);
    url.searchParams.append('haslo', haslo);
    url.searchParams.append('admin', admin);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function usun_glosowanie() {
    plik = document.getElementById("plik").value;

    let admin_haslo = "";
    let twoje_tab = localStorage.getItem("twoje").split(";")
    for (let i = 0; i < twoje_tab.length - 1; i++) {
        let twoje_split = twoje_tab[i].split("-");
        if (twoje_split[0] == plik) admin_haslo = twoje_split[1];
    }
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("tresc").innerHTML = this.responseText;
            if (localStorage.getItem("tryb") == "ciemny") {
                for (let i = 0; i < procent.length; i++) procent[i].classList.add("procent_dark");
            }
            let nowe = "";
            for (let i = 0; i < twoje_tab.length - 1; i++) {
                let twoje_split = twoje_tab[i].split("-");
                if (twoje_split[0] != plik) nowe = nowe + twoje_tab[i] + ";";
            }
            localStorage.setItem("twoje", "" + nowe);
        }
    }

    if (twoje_tab.length > 1) {
        let url = new URL("http://localhost/Nauka/Glosowanie/php/usun_glosowanie.php");
        url.searchParams.set('plik', plik);
        url.searchParams.append('haslo', admin_haslo);
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

function oddaj_glos() {
    plik = document.getElementById("plik").value;
    let radio = document.getElementsByClassName("radio");
    let vote = "0";
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            vote = vote + ";" + radio[i].value;
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
            if (localStorage.getItem("twoje") == null) localStorage.setItem("twoje", "");

            let twoje_tab = localStorage.getItem("twoje").split(";")

            if (twoje_tab.length > 1) {
                for (let i = 0; i < twoje_tab.length - 1; i++) {
                    let twoje_split = twoje_tab[i].split("-");
                    if (twoje_split[0] == plik) {
                        document.getElementById("priv_public").innerHTML += '<br><button onclick="usun_glosowanie()"class="button button--ujarak button_red" type="button">Usuń głosowanie</button>';
                    }
                }
            }
        }
    }
    if (vote != "0") {
        let url = new URL("http://localhost/Nauka/Glosowanie/php/oddaj_glos.php");
        url.searchParams.set('glos', vote);
        url.searchParams.append('plik', plik);
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}