<h3 class="event-title">XXV Encontro De Bandas</h3>
<h4 class="event-description">Alvega, 2019</h4>
<div class="photo-content">
  <?php
    $dir = glob("../imagens/galeria/Album_2/*");
    foreach ($dir as $image) {
      $imageFile = substr($image, 3);
      echo " <div class='miniature-photo'>
      <img src=$imageFile alt='foto-album' class='gallery-image'>
      <div class='modal'>
          <div class='modal-content'>
              <span class='close-modal'>x</span>
              <img src=$imageFile alt='imagem concerto Natal 2018' class='modal-event-image'>
          </div>
      </div>
      </div>";
    }
   ?>
  </div>
</div>
<?php
  if (count($dir) > 10) {
    echo "<button class='button-expand'>Ver +</button>";
  }
 ?>
<hr>

<h3 class="event-title">XXIV Festival De Bandas</h3>
<h4 class="event-description">Alvega, 2018</h4>
<div class="photo-content">
  <?php
    $dir = glob("../imagens/galeria/Album_1/*");
    foreach ($dir as $image) {
      $imageFile = substr($image, 3);
      echo " <div class='miniature-photo'>
      <img src=$imageFile alt='foto-album' class='gallery-image'>
      <div class='modal'>
          <div class='modal-content'>
              <span class='close-modal'>x</span>
              <img src=$imageFile alt='imagem concerto Natal 2018' class='modal-event-image'>
          </div>
      </div>
      </div>";
    }
   ?>
  </div>
</div>
<?php
  if (count($dir) > 10) {
    echo "<button class='button-expand'>Ver +</button>";
  }
 ?>
<hr>

<h3 class="event-title">Concerto Solidário</h3>
<h4 class="event-description">Alvega, 2018</h4>
<div class="photo-content">
  <?php
    $dir = glob("../imagens/galeria/Album_3/*");
    foreach ($dir as $image) {
      $imageFile = substr($image, 3);
      echo " <div class='miniature-photo'>
      <img src=$imageFile alt='foto-album' class='gallery-image'>
      <div class='modal'>
          <div class='modal-content'>
              <span class='close-modal'>x</span>
              <img src=$imageFile alt='imagem concerto Natal 2018' class='modal-event-image'>
          </div>
      </div>
      </div>";
    }
   ?>
  </div>
</div>
<?php
  if (count($dir) > 10) {
    echo "<button class='button-expand'>Ver +</button>";
  }
 ?>
<hr>
