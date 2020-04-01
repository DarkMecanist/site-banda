
document.addEventListener("DOMContentLoaded", function (event) {
    var collapsable_menu = document.getElementById('collapsable-menu');
    var button = document.getElementById('collapse-menu_button');
    var selected_menu = 'Eventos';

    function set_main_content() {
        var content = "AH POIS!";

        document.getElementById("main-content").textContent = content;

        console.log(document.getElementById("main-content").textContent)
    }

    var is_pressed = false;

    function detect_expand_collapse() {

        console.log('INSIDE THE DETECTION FUNC');
        console.log('Current value of the variable is pressed is: ' + is_pressed.toString());

        if (is_pressed == true) {
            collapse_collapsable_menu();

            console.log('collapsing menu');

            is_pressed = false;

        } else{
            expand_collapsable_menu();

            console.log('expanding menu');

            is_pressed = true;
        }

    }

    function expand_collapsable_menu() {

        collapsable_menu.innerHTML = '<ul>\n' +
            '            <li id="Eventos"><a class="nav-menu-button" href="#Eventos">Eventos</a></li>\n' +
            '            <li id="História"><a class="nav-menu-button" href="#História">História</a></li>\n' +
            '            <li id="Galeria"><a class="nav-menu-button" href="#Galeria">Galeria</a></li>\n' +
            '            <li id="Inscrições"><a class="nav-menu-button" href="#Inscrições">Inscrições</a></li>\n' +
            '            <li><a class="nav-menu-button" href="#footer">Contactos</a></li>\n' +
            '            </ul>';

        button.style = 'background-color: #b30000';

    }

    function force_collapse() {
        console.log('Current value of the variable is pressed is: ' + is_pressed.toString());

        is_pressed = false;
        collapse_collapsable_menu();

        console.log('Current value of the variable is pressed is: ' + is_pressed.toString());
    }

    function collapse_collapsable_menu() {
        collapsable_menu.innerHTML = '';

        button.style = 'background-color: #333333';

    }

    function apply_mouseover_style() {
        if (this.parentElement.id !== selected_menu) {
            this.parentElement.style.cssText = 'color: #333333; background-color: whitesmoke; border-radius: 2px; transition: 0.3s';
            this.style.cssText = 'color: #333333; background-color: whitesmoke; border-radius: 2px; transition: 0.3s';
        }
    }

    function remove_mouseover_style() {
        if (this.parentElement.id !== selected_menu) {
            this.parentElement.style.cssText = 'background-color: #333333; color: whitesmoke; transition: 0.3s';
            this.style.cssText = 'background-color: #333333; color: whitesmoke; transition: 0.3s';
        }
    }

    function select_menu(){
        var unselected_style = '';

        if (this.text !== selected_menu){
            unselected_style = 'background-color: #333333; color: whitesmoke';

            this.style.cssText = 'background-color: whitesmoke; color: #333333;';
            this.parentElement.style.cssText = 'background-color: whitesmoke; color: #333333;';

            var previously_selected_menu = document.getElementById(selected_menu);

            previously_selected_menu.style = unselected_style;
            previously_selected_menu.firstChild.style = unselected_style;

            selected_menu = this.text;

            console.log('Correctly selected the menu: ' + selected_menu);
        }
    }

    function highlight_nav_menu_button() {
        var main_content = document.getElementById('main-content');
        var parent_id = this.parentElement.id;

        if (main_content.classList.length === 1) {
            main_content.classList.add(parent_id);
        } else {
            main_content.classList.remove(main_content.classList[1]);
            main_content.classList.add(parent_id);
        }

        console.log(main_content.classList);
    }

    document.getElementById('collapse-menu_button').onclick = detect_expand_collapse;
    document.getElementById('footer').addEventListener('click', force_collapse);
    document.getElementById('main-content').addEventListener('click', force_collapse);
    // document.querySelector('.nav-menu-button').addEventListener('mouseover', add_li_border_radius);
    // document.querySelector('.nav-menu-button').addEventListener('mouseleave', remove_li_border_radius);

    for (i=0; i<document.querySelectorAll('.nav-menu-button').length; i++) {
        document.querySelectorAll('.nav-menu-button')[i].onclick = select_menu;
        document.querySelectorAll('.nav-menu-button')[i].addEventListener('mouseover', apply_mouseover_style);
        document.querySelectorAll('.nav-menu-button')[i].addEventListener('mouseleave', remove_mouseover_style);
    }
});

