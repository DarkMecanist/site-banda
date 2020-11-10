<div class="miniature-photo hidden-photo">
    <img src="imagens/galeria/foto-placeholder-banda.png" alt="foto-album" class="gallery-image">
    <div class="modal">
        <div class="modal-content">
            <span class="close-modal">x</span>
            <!-- <img src="imagens/galeria/foto-placeholder-banda.png" alt="imagem concerto Natal 2018" class="modal-event-image"> -->
            <?php
              $fileList = glob("imagens/galeria/Album_1/*");
              foreach ($fileList as $filename) {
                echo $filename, '<br>';
              }
             ?>
        </div>
    </div>
</div>
