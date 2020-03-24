
function set_main_content() {
    var content = "AH POIS!";

    document.getElementById("main-content").textContent = content;

    console.log(document.getElementById("main-content").textContent)
}

function detect_expand_collapse() {
    if (document.getElementById('collapse-menu_button').style[0] == 'background-color') {
        collapse_collapsable_menu();
        console.log('collapsing menu')
    } else{
        expand_collapsable_menu();
        // console.log(document.getElementById('collapse-menu_button').style[0] == 'background-color');
        console.log('expanding menu')
    }

}


function expand_collapsable_menu() {
    document.getElementById('collapsable-menu').innerHTML = '<ul>\n' +
        '            <li><a class="nav-menu-button" href="#Banda">Banda</a></li>\n' +
        '            <li><a class="nav-menu-button" href="#História">História</a></li>\n' +
        '            <li><a class="nav-menu-button" href="#Eventos">Eventos</a></li>\n' +
        '            <li><a class="nav-menu-button" href="#Galeria">Galeria</a></li>\n' +
        '            <li><a class="nav-menu-button" href="#footer">Contactos</a></li>\n' +
        '        </ul>';

    document.getElementById('collapse-menu_button').style = 'background-color: #b30000'
}

function collapse_collapsable_menu() {
    document.getElementById('collapsable-menu').innerHTML = '';

    document.getElementById('collapse-menu_button').style = 'background-color: #333333'
}