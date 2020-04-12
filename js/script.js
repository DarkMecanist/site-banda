
(function (global) {

    var eventosHtml = "snippets/eventos-snippet.html";
    var historiaHtml = "snippets/história-snippet.html";
    var galeriaHtml = "snippets/galeria-snippet.html";
    var inscricoesHtml = "snippets/inscr-snippet.html";

    // Function to insert HTML into a selector
    function insertHtml(selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    function showLoading(selector) {
        var html = "<div>";
        html += "<img src='imagens/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };


    document.addEventListener("DOMContentLoaded", function (event) {
        var collapsable_menu = document.getElementById('collapsable-menu');
        var button = document.getElementById('collapse-menu_button');
        var selected_menu = 'Eventos';
        var selected_instrument = 'Flauta transversal';

        function set_main_content(page) {
            showLoading('#main-content');

            var html = 'nada';
            if (page === 'Eventos') {
                html = eventosHtml;
            } else if (page === 'História') {
                html = historiaHtml;
            } else if (page === 'Galeria') {
                html = galeriaHtml;
            } else if (page === 'Inscrições') {
                html = inscricoesHtml;
            };

            $ajaxUtils.sendGetRequest(html, function (responseText) {
                document.querySelector("#main-content").innerHTML = responseText;
            }, false, false);

            if (page === 'Inscrições') {
                //set mouseover and onclick behaviour
                var unselected_style = 'background-color: #333333; color: whitesmoke;';
                var selected_style = 'background-color: whitesmoke; color: #333333; border-radius: 2px;';
                var instrument_list = document.querySelector("#list-instruments").children;

                for (i=0; i < instrument_list.length; i++) {

                    if (instrument_list[i].tagName === "LI") {
                        instrument_list[i].addEventListener('mouseover', apply_mouseover_style_instrument);
                        instrument_list[i].addEventListener('mouseleave', remove_mouseover_style_instrument);
                        instrument_list[i].onclick = select_instrument;

                        console.log('SELECTED INSTRUMENT: ' + selected_instrument);
                        // console.log('INSTRUMENT: ' + instrument_list[i].firstChild.text);
                        if (instrument_list[i].firstChild.text === selected_instrument) {
                            instrument_list[i].style = selected_style;
                            instrument_list[i].firstChild.style = selected_style;
                        } else {
                            instrument_list[i].style = unselected_style;
                            instrument_list[i].firstChild.style = unselected_style;
                        }
                    }
                }

                change_image_instrument();
            }

        }

        var is_pressed = false;

        function detect_expand_collapse() {

            if (is_pressed == true) {
                collapse_collapsable_menu();

                is_pressed = false;

            } else{
                expand_collapsable_menu();

                is_pressed = true;
            }

        }

        function expand_collapsable_menu() {

            collapsable_menu.innerHTML = '<ul>\n' +
                '            <li id="Eventos-CM"><a class="nav-menu-button" href="#Eventos-CM">Eventos</a></li>\n' +
                '            <li id="História-CM"><a class="nav-menu-button" href="#História-CM">História</a></li>\n' +
                '            <li id="Galeria-CM"><a class="nav-menu-button" href="#Galeria-CM">Galeria</a></li>\n' +
                '            <li id="Inscrições-CM"><a class="nav-menu-button" href="#Inscrições-CM">Inscrições</a></li>\n' +
                '            <li><a class="nav-menu-button" href="#footer">Contactos</a></li>\n' +
                '            </ul>';

            button.style = 'background-color: #b30000';

            refresh_event_listeners();


            var collapsable_nav_menu_button = document.getElementById(selected_menu + '-CM');
            var selected_style = 'background-color: whitesmoke; color: #333333;';

            collapsable_nav_menu_button.style = selected_style;
            collapsable_nav_menu_button.firstChild.style = selected_style;

        }

        function force_collapse() {
            // console.log('Current value of the variable is pressed is: ' + is_pressed.toString());

            is_pressed = false;
            collapse_collapsable_menu();

            // console.log('Current value of the variable is pressed is: ' + is_pressed.toString());
        }

        function collapse_collapsable_menu() {
            collapsable_menu.innerHTML = '';

            button.style = 'background-color: #333333';

        }

        function apply_mouseover_style_nav_menu() {
            if (this.text !== selected_menu) {
                this.parentElement.style.cssText = 'color: #333333; background-color: whitesmoke; border-radius: 2px; transition: 0.3s';
                this.style.cssText = 'color: #333333; background-color: whitesmoke; border-radius: 2px; transition: 0.3s';
            }
        }

        function remove_mouseover_style_nav_menu() {
            if (this.text !== selected_menu) {
                this.parentElement.style.cssText = 'background-color: #333333; color: whitesmoke; transition: 0.3s';
                this.style.cssText = 'background-color: #333333; color: whitesmoke; transition: 0.3s';
            }
        }

        function apply_mouseover_style_instrument() {
            if (this.firstChild.text !== selected_instrument) {
                this.firstChild.style.cssText = 'color: #333333; background-color: whitesmoke; border-radius: 2px; transition: 0.3s';
                this.style.cssText = 'color: #333333; background-color: whitesmoke; border-radius: 2px; transition: 0.3s';
            }
        }

        function remove_mouseover_style_instrument() {
            if (this.firstChild.text !== selected_instrument) {
                this.firstChild.style.cssText = 'background-color: #333333; color: whitesmoke; transition: 0.3s';
                this.style.cssText = 'background-color: #333333; color: whitesmoke; transition: 0.3s';
            }
        }

        function select_instrument() {
            var unselected_style = 'background-color: #333333; color: whitesmoke;';
            var selected_style = 'background-color: whitesmoke; color: #333333;';

            if (this.firstChild.text !== selected_instrument) {
                this.style.cssText = selected_style;
                this.firstChild.style.cssText = selected_style;

                var previously_selected_instrument = document.getElementById(selected_instrument);

                previously_selected_instrument.style.cssText = unselected_style;
                previously_selected_instrument.firstChild.style.cssText = unselected_style;

                selected_instrument = this.firstChild.text;

                change_image_instrument();
            }
        }

        function change_image_instrument() {
            var image_element = document.getElementById('image-instrument');

            if (selected_instrument === "Flauta transversal") {
                image_element.src = "imagens/inscr/flauta transversal_grande.png";
                image_element.style.cssText = 'height: auto; width:100%;'
            } else if (selected_instrument === "Clarinete") {
                image_element.src = "imagens/inscr/clarinete_grande.png";
                image_element.style.cssText = 'height: auto; width:100%;'
            } else if (selected_instrument === "Saxofone") {
                image_element.src = "imagens/inscr/saxofone_grande.png";
                image_element.style.cssText = 'height: 420px; width:auto;'
            } else if (selected_instrument === "Trompete") {
                image_element.src = "imagens/inscr/trompete_grande.png";
                image_element.style.cssText = 'height: auto; width:100%;'
            } else if (selected_instrument === "Trompa") {
                image_element.src = "imagens/inscr/trompa_grande.png";
                image_element.style.cssText = 'height: 420px; width:auto;'
            } else if (selected_instrument === "Trombone") {
                image_element.src = "imagens/inscr/trombone_grande.png";
                image_element.style.cssText = 'height: auto; width:100%;'
            } else if (selected_instrument === "Tuba") {
                image_element.src = "imagens/inscr/tuba_grande.png";
                image_element.style.cssText = 'height: 420px; width:auto;'
            } else if (selected_instrument === "Bombardino") {
                image_element.src = "imagens/inscr/bombardino_grande.png";
                image_element.style.cssText = 'height: 420px; width:auto;'
            } else if (selected_instrument === "Percussão") {
                image_element.src = "imagens/inscr/percussão_grande.png";
                image_element.style.cssText = 'height: auto; width: 80%;'
            }
        }

        function select_menu(){
            //Change button style
            var unselected_style = 'background-color: #333333; color: whitesmoke;';
            var selected_style = 'background-color: whitesmoke; color: #333333;';

            // console.log(this.parentElement.parentElement);


            if (this.text !== 'Contactos' && this.text !== selected_menu){
                set_main_content(this.text);
                // console.log(this.text);

                this.style.cssText = selected_style;
                this.parentElement.style.cssText = selected_style;

                if (this.parentElement.id.toString().split('-CM').length === 1) {
                    // REGULAR MENU
                    var previously_selected_menu_regular = document.getElementById(selected_menu);

                    previously_selected_menu_regular.style = unselected_style;
                    previously_selected_menu_regular.firstChild.style = unselected_style;

                    selected_menu = this.text;

                    highlight_nav_menu_button('collapsable', selected_style, previously_selected_menu_regular.firstChild.text, unselected_style);

                } else {
                    //COLLAPSABLE MENU
                    var previously_selected_menu_collapsable = document.getElementById(selected_menu + '-CM');

                    previously_selected_menu_collapsable.style = unselected_style;
                    previously_selected_menu_collapsable.firstChild.style = unselected_style;

                    selected_menu = this.text;

                    highlight_nav_menu_button('regular', selected_style, previously_selected_menu_collapsable.firstChild.text, unselected_style);
                }

                // console.log('Correctly selected the menu: ' + selected_menu);


            }
        }

        function highlight_nav_menu_button(nav_button_type, selected_style, previously_selected_menu, unselected_style) {

            // console.log('PREVIOUS MENU: ' + previously_selected_menu);

            if (nav_button_type === 'regular') {
                var regular_nav_menu_button = document.getElementById(selected_menu);
                var previous_regular_nav_menu_button = document.getElementById(previously_selected_menu);

                regular_nav_menu_button.style = selected_style;
                regular_nav_menu_button.firstChild.style = selected_style;

                previous_regular_nav_menu_button.style = unselected_style;
                previous_regular_nav_menu_button.firstChild.style = unselected_style;
            } else {
                var collapsable_nav_menu_button = document.getElementById(selected_menu + '-CM');
                var previous_collapsable_nav_menu_button = document.getElementById(previously_selected_menu + '-CM');

                collapsable_nav_menu_button.style = selected_style;
                collapsable_nav_menu_button.firstChild.style = selected_style;

                previous_collapsable_nav_menu_button.style = unselected_style;
                previous_collapsable_nav_menu_button.firstChild.style = unselected_style
            }
        }

        function highlight_selected_nav_menu_button() {
            var regular_nav_menu_button = document.getElementById(selected_menu);
            var selected_style = 'background-color: whitesmoke; color: #333333;';

            regular_nav_menu_button.style = selected_style;
            regular_nav_menu_button.firstChild.style = selected_style;
        }

        function refresh_event_listeners(){
            for (i=0; i<document.querySelectorAll('.nav-menu-button').length; i++) {
                document.querySelectorAll('.nav-menu-button')[i].onclick = select_menu;
                document.querySelectorAll('.nav-menu-button')[i].addEventListener('mouseover', apply_mouseover_style_nav_menu);
                document.querySelectorAll('.nav-menu-button')[i].addEventListener('mouseleave', remove_mouseover_style_nav_menu);
            }

        }

        document.getElementById('collapse-menu_button').onclick = detect_expand_collapse;
        document.getElementById('footer').addEventListener('click', force_collapse);
        document.getElementById('main-content').addEventListener('click', force_collapse);
        // document.querySelector('.nav-menu-button').addEventListener('mouseover', add_li_border_radius);
        // document.querySelector('.nav-menu-button').addEventListener('mouseleave', remove_li_border_radius);

        refresh_event_listeners();
        highlight_selected_nav_menu_button();

        showLoading('#main-content');

        $ajaxUtils.sendGetRequest(eventosHtml, function (responseText) {
            document.querySelector("#main-content").innerHTML = responseText;
        }, false);
    });


})(window);

