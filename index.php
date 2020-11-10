<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Banda Filarmónica Alveguense</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="icon" href="imagens/logo_banda.png">
    <link rel="stylesheet" href="css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Upright:wght@700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fondamento&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
</head>
<body>

    <!-- NAV BAR -->
    <nav id="nav-bar">
        <div class="container">
            <a href="index.php">
                <div id="logo-img"></div>
                <h1>
                    <span>banda</span>
                    <span>filarmónica</span>
                    <span>alveguense</span>
                </h1>
            </a>

            <button id="collapse-menu_button" class="hidden-l hidden-m">
                <hr class="icon-bar">
                <hr class="icon-bar">
                <hr class="icon-bar">
            </button>

            <ul id="nav-menu" class="hidden-sm hidden-xsm">
                <li id="Eventos"><a class="nav-menu-button" href="#Eventos">Eventos</a></li>
                <li id="História"><a class="nav-menu-button" href="#História">História</a></li>
                <li id="Galeria"><a class="nav-menu-button" href="#Galeria">Galeria</a></li>
                <li id="Inscrições"><a class="nav-menu-button" href="#Inscrições">Inscrições</a></li>
                <li><a class="nav-menu-button" href="#footer">Contactos</a></li>
            </ul>
        </div>

        <div id="collapsable-menu"></div>
    </nav>



    <!--  MAIN CONTENT  -->
    <div id="main-content" class="container"></div>

<!--  FOOTER  -->
    <nav id="footer">
        <div class="container">
            <div class="footer-info-block">
                <div class="footer-title">Contactos:</div>
                <div class="footer-info">António Moutinho : 961075308</div>
                <div class="footer-info">banda.filarmonica.alveguense@gmail.com</div>
                <div><a href="https://www.facebook.com/bfa.alvega/" target="_blank" class="footer-info"><i id="facebook-logo" class="fa">&#xf082;</i></a></div>
            </div>
            <div class="footer-info-block">
                <div class="footer-title">Localização:</div>
                <div id="map-tile">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3080.08463843093!2d-8.048678984779341!3d39.46741657948673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1811580a9b7fe9%3A0x55cafe17a0eaba26!2sR.%20da%20Fonte%20de%20Santo%20Ant%C3%B3nio%202-10%2C%202205-110!5e0!3m2!1spt-PT!2spt!4v1584838248734!5m2!1spt-PT!2spt" width="200" height="100" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
            </div>
            <div class="footer-info-block">
                <div class="footer-title">Apoios:</div>
                <a href="http://cm-abrantes.pt/" target="_blank"><div id="logo-camara" class="footer-info"></div></a>
            </div>
        </div>
    </nav>
    <script src="js/ajax-utils.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
