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