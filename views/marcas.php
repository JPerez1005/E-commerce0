<?php
include_once 'Layouts/general/header.php';
?>
<!-- Agrega el siguiente estilo en la sección <style> -->
<style>
    .widget-user-image {
        text-align: center;
    }

    .widget-user-image img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        object-position: center;
        border-radius: 50%;
    }
</style>

<div class="modal" id="modal_crear_marca" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title">Crear Marca</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <!-- Ahora vamos a permitir el uso de las imgs -->
                <form id="form-marca" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="nom_marc">Nombre de la marca</label>
                        <input type="text" name="nom_marc" class="form-control" id="nom_marc"
                            placeholder="Ingrese el Nombre de la marca">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputFile">Imagen de la marca</label>
                        <div class="input-group">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" name="img_marc" id="img_marc">
                                <label class="custom-file-label" for="exampleInputFile">Seleccione una imagen</label>
                            </div>
                        </div>
                    </div>
                    <!-- Este es el FOOTER--------------------------------------------------------------- -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-outline-success">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modal_editar_marca" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title">Editar Marca</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="card card-widget widget-user">
                    <div class="widget-user-header">
                        <h3 id="widget_nombre_marca" class="widget-user-username"></h3>
                        <h5 class="widget-user-desc">Founder &amp; CEO</h5>
                    </div>
                    <div class="widget-user-image">
                        <img id="widget_imagen_marca" class="img-circle elevation-4" src="" alt="Imagen Marca">
                    </div>
                    <style>
                        .card-footer .description-block {
                            color: white; /* Cambia el color del texto a blanco */
                            border-color: white; /* Cambia el color del borde a blanco */
                        }

                        .card-footer {
                            background-color: black; /* Establece el fondo en negro (black) */
                        }
                    </style>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">3,200</h5>
                                    <span class="description-text">SALES</span>
                                </div>
                            </div>
                            <div class="col-sm-4 border-right">
                                <div class="description-block">
                                    <h5 class="description-header">13,000</h5>
                                    <span class="description-text">FOLLOWERS</span>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="description-block">
                                    <h5 class="description-header">35</h5>
                                    <span class="description-text">PRODUCTS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Ahora creamos el formulario -->
                <!-- Ahora vamos a permitir el uso de las imgs -->
                <form id="form_marca_mod" enctype="multipart/form-data">
                    <input type="hidden" id="id_marc_mod" name="id_marc_mod">
                    <div class="form-group">
                        <label for="nom_marc_mod">Nombre de la marca</label>
                        <input type="text" name="nom_marc_mod" class="form-control" id="nom_marc_mod"
                            placeholder="Ingrese el Nombre de la marca">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputFile">Imagen de la marca</label>
                        <div class="input-group">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" name="img_marc_mod" id="img_marc_mod">
                                <label class="custom-file-label" for="exampleInputFile">Seleccione una imagen</label>
                            </div>
                        </div>
                    </div>
                    <!-- Este es el FOOTER--------------------------------------------------------------- -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-outline-success">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<title>E-commerce 0 | Marcas</title>
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Marcas</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Marcas</li>
                </ol>
            </div>
        </div>
    </div><!-- /.container-fluid -->
</section>

<!-- Main content -->
<section class="content">

    <!-- Default box -->
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">Marca <button class="btn btn-success" type="button" data-bs-toggle='modal'
                    data-bs-target="#modal_crear_marca">+</button></h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
            <table id="marca" class="table table-hover">
                <thead>
                    <tr>
                        <th>Marca</th>
                        <th>Imagen</th>
                        <th>Fecha de Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
            Footer
        </div>
        <!-- /.card-footer-->
    </div>
    <!-- /.card -->

</section>

<?php
include_once 'Layouts/general/footer.php';
?>

<script src="marcas2.js"></script>