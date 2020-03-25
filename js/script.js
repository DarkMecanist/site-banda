
function set_main_content() {
    var content = "AH POIS!";

    document.getElementById("main-content").textContent = content;

    console.log(document.getElementById("main-content").textContent)
}

var is_pressed = true;

function detect_expand_collapse() {
    var button = document.getElementById('collapse-menu_button');

    if (is_pressed === false) {
        collapse_collapsable_menu();

        console.log('collapsing menu');

        button.style = 'background-color: #333333';

        is_pressed = true;

    } else{
        expand_collapsable_menu();

        console.log('expanding menu');

        button.style = 'background-color: #b30000';

        is_pressed = false;
    }

}


function expand_collapsable_menu() {
    var collapsable_menu = document.getElementById('collapsable-menu');

    collapsable_menu.innerHTML = '<ul>\n' +
        '            <li><a class="nav-menu-button" href="#Banda">Banda</a></li>\n' +
        '            <li><a class="nav-menu-button" href="#História">História</a></li>\n' +
        '            <li><a class="nav-menu-button" href="#Eventos">Eventos</a></li>\n' +
        '            <li><a class="nav-menu-button" href="#Galeria">Galeria</a></li>\n' +
        '            <li><a class="nav-menu-button" href="#footer">Contactos</a></li>\n' +
        '        </ul>';

    console.log(collapsable_menu.style);
}

function collapse_collapsable_menu() {
    var collapsable_menu = document.getElementById('collapsable-menu');

    collapsable_menu.innerHTML = '';

}

document.getElementById('collapse-menu_button').onclick = detect_expand_collapse;
