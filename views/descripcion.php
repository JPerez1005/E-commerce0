<?php
if(!empty($_GET['id'])&& $_GET['name']){
    session_start();
    $_SESSION['product-verification']=$_GET['id'];
    // echo $_SESSION['product-verification'];
    if (!empty($_GET['noti'])) {
      $_SESSION['noti']=$_GET['noti'];
    }
    include_once 'Layouts/general/header.php';
?>
<title><?php echo $_GET['name']?> | E-commerce</title>
<style>
  .preguntas{
    height: 80% !important;
  }
</style>
<!-- Content Header (Page header) -->
<section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="text-center"><?php echo $_GET['name']?></h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active"><?php echo $_GET['name']?></li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
</section>

<!-- Main content -->
<section class="content">

      <!-- Default box -->
      <div class="card card-solid col-10 mx-auto">
        <div class="card-body">
          <div class="row">
            <div id="imagenes" class="col-12 col-sm-6">
                <div class="col-12">
                  <div id="loader_3" class="overlay">
                    <i class="fa-solid fa-spinner fa-spin-pulse fa-xl" style="color: #409c8c;"></i>
                  </div>
                </div>
            </div>
            <div class="col-12 col-sm-6">
              <h3 id="producto" class="my-3">No vuelva a modificar los URL</h3>
              <span id="marca"></span><br>
              <span id="sku"></span>
              <div id="informacion_precios">
                <p>para cambiar la situación del mundo, primero hay que cambiar uno mismo como persona</p>
              </div>
              <hr style="color: black; background-color: black; height:1px;">
                <div class="card card-light">
                    <div id="informacion_envio" class="card-body">
                        <p>"La justicia no consiste en ser neutral entre el bien y el mal, sino en encontrar el justo medio entre los dos extremos".</p>
                        <br>
                        <h3>Aristóteles, Ética a Nicómaco</h3>
                    </div>
                </div>
              <h4>Envío y vendido por: </h4>

              <div id="tienda" class="bg-light py-2 px-3 mt-4 border"></div>

              <div id="agregar_carrito" class="mt-4">
                
              </div>
            </div>
          </div>

          <div class="row mt-4">
            <nav class="col-7 mx-auto">
              <div class="nav nav-tabs" id="product-tab" role="tablist">
                <a class="nav-item nav-link active" id="product-pre-tab" data-toggle="tab" href="#product-pre" role="tab" aria-controls="product-pre" aria-selected="true">Preguntas</a>
                <a class="nav-item nav-link" id="product-desc-tab" data-toggle="tab" href="#product-desc" role="tab" aria-controls="product-desc" aria-selected="true">Descripción</a>
                <a class="nav-item nav-link" id="product-caract-tab" data-toggle="tab" href="#product-caract" role="tab" aria-controls="product-caract" aria-selected="false">Caracteristicas</a>
                <a class="nav-item nav-link" id="product-rese-tab" data-toggle="tab" href="#product-rese" role="tab" aria-controls="product-rese" aria-selected="false">Reseñas</a>
              </div>
            </nav>
            <div class="tab-content p-3" id="nav-tabContent">
              <div class="tab-pane fade show active" id="product-pre" role="tabpanel" aria-labelledby="product-pre-tab">
                
              </div>
              <div class="tab-pane fade show col-7 mx-auto" id="product-desc" role="tabpanel" aria-labelledby="product-desc-tab">
                
              </div>
              <div class="tab-pane fade col-7 mx-auto" id="product-caract" role="tabpanel" aria-labelledby="product-caract-tab">
                
              </div>
              <div class="tab-pane fade col-7 mx-auto" id="product-rese" role="tabpanel" aria-labelledby="product-rese-tab">
                    <div id="resenas"class="card-footer card-comments bg-dark text-white">
                    </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

</section>
<!-- /.content -->
<?php
    include_once 'Layouts/general/footer.php';
}else {
    header('Location: ../index.php');
}
?>
<script src="descripcion.js"></script>