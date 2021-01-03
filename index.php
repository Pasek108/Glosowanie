<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="utf-8">
    <title>Glosowania</title>
    <meta name="description" content="Strona do głosowania">
    <meta name="keywords" content="głosowanie,oddaj głos,ankieta">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="Cache-control" content="public">

    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Raleway&display=swap" rel="stylesheet">

    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.min.js"></script>
    <![endif]-->

    <script>
        let pliki = [
            <?php include("php/zaladuj_pliki.php"); ?>
        ];
    </script>
</head>

<body>
    <header id="header">
        <div id="logo" class="logo">
            <div id="logo_txt" class="logo_txt">
                Głosowania
            </div>
        </div>
        <div class="tryb">
            <div class="przelacznik">
                <i class="fas fa-sun"></i>
                <div id="slider" class="slider">
                    <div id="tryb" class="jasny"></div>
                </div>
                <i class="fas fa-moon"></i>
            </div>
        </div>
        <div class="dodaj">
            <div id="nowa" class="nowa">
                <div class="plus">+</div>
                <div class="nowe">Utwórz głosowanie</div>
            </div>
        </div>
    </header>

    <main id="main">
        <i class="fas fa-bars" id="pokaz_menu" onclick="pokaz_menu()"></i>
        <div class="menu" id="lista" style="margin-left: -19.1rem">
            <ul class="lista">
                <div id="lista_twoje" class="lista_twoje">
                    <div>Utworzone przez ciebie:</div>
                </div>
                <div id="lista_public" class="lista_public">
                    <div>Głosowania publiczne:</div>
                </div>
            </ul>
        </div>
        <div id="tresc">
            <p style="text-align: center;">
                Ta strona jest poświęcona głosowaniu, możesz uczestniczyć w stworzonych przez innych ludzi głosowaniach prywatnych
                (po podaniu hasła) lub publicznych.
                <br>Możesz też stworzyc własne głosowanie klikając przycisk z + na górnym pasku.
                <br><br>Kliknij losuj aby wziąć udział w losowym publicznym głosowaniu lub skorzystaj z menu po lewej.
            </p>
            <div id="losuj" class="losuj">
                <i id="kostka" class="fas fa-dice-one"></i> Losuj
            </div>
        </div>

    </main>

    <footer id="footer">
        Artur Pas 2021
    </footer>
    <script src="skrypt.js"></script>
</body>

</html>