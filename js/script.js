
(function (global) {

    var eventosHtml = "snippets/eventos-snippet.html";
    var historiaHtml = "snippets/história-snippet.html";
    var galeriaHtml = "snippets/galeria-snippet.php";
    var inscricoesHtml = "snippets/inscrições-snippet.html";

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
        var currently_open_modal = '';

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

                for (let i=0; i < instrument_list.length; i++) {

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
            } else if (page === 'Galeria') {

                var image_list = document.querySelectorAll('.gallery-image');
                for (let i = 0; i < image_list.length; i++) {
                    image_list[i].onclick = open_modal;
                }

                let close_modal_buttons = document.querySelectorAll('.close-modal');
                for (let i = 0; i < close_modal_buttons.length; i++) {
                    close_modal_buttons[i].onclick = close_modal;
                }

                var expand_album_buttons = document.querySelectorAll('.button-expand');
                for (let i = 0; i < expand_album_buttons.length; i++) {
                    expand_album_buttons[i].onclick = expand_album_view;
                }

                var photo_contents = document.querySelectorAll('.photo-content');
                for (let i = 0; i < photo_contents.length; i++) {
                  let image_counter = 0;
                  let images = photo_contents[i].children;

                  for (let j = 0; j < images.length; j++) {

                    image_counter += 1;
                    if (image_counter > 10) {
                      images[j].classList.add("hidden-photo");
                    }
                  }
                }
            } else if (page === 'Eventos') {
                var event_images = document.querySelectorAll('.event-image');
                for (i = 0; i < event_images.length; i++) {
                    event_images[i].onclick = open_modal;
                }
                let close_modal_buttons = document.querySelectorAll('.close-modal');
                for (i = 0; i < close_modal_buttons.length; i++) {
                    close_modal_buttons[i].onclick = close_modal;
                }
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
                image_element.style.cssText = 'height: auto; width:100%;';
                image_element.src = "imagens/inscrições/flauta transversal_grande.png";
            } else if (selected_instrument === "Clarinete") {
                image_element.style.cssText = 'height: auto; width:100%;';
                image_element.src = "imagens/inscrições/clarinete_grande.png";
            } else if (selected_instrument === "Saxofone") {
                image_element.style.cssText = 'height: 420px; width:auto;';
                image_element.src = "imagens/inscrições/saxofone_grande.png";
            } else if (selected_instrument === "Trompete") {
                image_element.style.cssText = 'height: auto; width:100%;';
                image_element.src = "imagens/inscrições/trompete_grande.png";
            } else if (selected_instrument === "Trompa") {
                image_element.style.cssText = 'height: 420px; width:auto;';
                image_element.src = "imagens/inscrições/trompa_grande.png";
            } else if (selected_instrument === "Trombone") {
                image_element.style.cssText = 'height: auto; width:100%;';
                image_element.src = "imagens/inscrições/trombone_grande.png";
            } else if (selected_instrument === "Tuba") {
                image_element.style.cssText = 'height: 420px; width:auto;';
                image_element.src = "imagens/inscrições/tuba_grande.png";
            } else if (selected_instrument === "Bombardino") {
                image_element.style.cssText = 'height: 420px; width:auto;';
                image_element.src = "imagens/inscrições/bombardino_grande.png";
            } else if (selected_instrument === "Percussão") {
                image_element.style.cssText = 'height: auto; width: 80%;';
                image_element.src = "imagens/inscrições/percussão_grande.png";
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
            console.log('running refresh event listener');

            for (var i=0; i<document.querySelectorAll('.nav-menu-button').length; i++) {
                document.querySelectorAll('.nav-menu-button')[i].onclick = select_menu;
                document.querySelectorAll('.nav-menu-button')[i].addEventListener('mouseover', apply_mouseover_style_nav_menu);
                document.querySelectorAll('.nav-menu-button')[i].addEventListener('mouseleave', remove_mouseover_style_nav_menu);
            }

            var event_images = document.querySelectorAll('.event-image');
            for (i = 0; i < event_images.length; i++) {
                event_images[i].onclick = open_modal;
            }
            var close_modal_buttons = document.querySelectorAll('.close-modal');
            for (i = 0; i < close_modal_buttons.length; i++) {
                close_modal_buttons[i].onclick = close_modal;
            }


            }

        function open_modal(){
            var target_modal = this.nextElementSibling;
            currently_open_modal = target_modal;

            document.addEventListener('keydown', close_modal_by_esc_press);
            target_modal.addEventListener('click', close_modal_by_outside_click);

            target_modal.style.display = "block";
        }

        function close_modal(){

            document.removeEventListener('keydown', close_modal_by_esc_press);
            currently_open_modal.removeEventListener('click', close_modal_by_outside_click);

            currently_open_modal.style.display = 'none';
            currently_open_modal = '';
        }

        function close_modal_by_esc_press(event) {
            const keyName = event.key;
            console.log(keyName);
            if (keyName === 'Escape') {
                close_modal()
            }
        }

        function close_modal_by_outside_click(event) {
            if (event.target.tagName !== 'IMG'){
                close_modal();
            }
        }

        function expand_album_view() {

            console.log(this);
            console.log('expanding album');

            var album = this.previousElementSibling;
            var hidden_photos = document.querySelectorAll('.hidden-photo');

            for (let i = 0; i < hidden_photos.length; i++) {
                if (hidden_photos[i].parentElement === this.previousElementSibling) {
                    hidden_photos[i].style.cssText = 'display: inline;';
                }
            }

            this.innerText = 'Ver -';
            this.onclick = collapse_album_view;

        }

        function collapse_album_view() {

            console.log(this);
            console.log('collapsing album');

            var hidden_photos = document.querySelectorAll('.hidden-photo');

            for (let i = 0; i < hidden_photos.length; i++) {
                if (hidden_photos[i].parentElement === this.previousElementSibling) {
                    hidden_photos[i].style.cssText = 'display: none;';
                }
            }

            this.innerText = 'Ver +';
            this.onclick = expand_album_view;
        }


        document.getElementById('collapse-menu_button').onclick = detect_expand_collapse;
        document.getElementById('footer').addEventListener('click', force_collapse);
        document.getElementById('main-content').addEventListener('click', force_collapse);
        // document.querySelector('.nav-menu-button').addEventListener('mouseover', add_li_border_radius);
        // document.querySelector('.nav-menu-button').addEventListener('mouseleave', remove_li_border_radius);

        showLoading('#main-content');

        $ajaxUtils.sendGetRequest(eventosHtml, function (responseText) {
            document.querySelector("#main-content").innerHTML = responseText;
        }, false, false);

        refresh_event_listeners();
        highlight_selected_nav_menu_button();
    });

})(window);
