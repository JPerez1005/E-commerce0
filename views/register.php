<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Register | E-commerce</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../util/css/css/all.min.css">
  <!-- icheck bootstrap -->
  <!-- <link rel="stylesheet" href="../../plugins/icheck-bootstrap/icheck-bootstrap.min.css"> -->
  <!-- Theme style -->
  <link rel="stylesheet" href="../util/css/adminlte.min.css">
  <!-- diseño de los alert -->
  <link rel="stylesheet" href="../util/css/toastr.min.css">
  <link rel="stylesheet" href="../util/css/sweetalert2.min.css">
</head>
<!-- Modal -->
<div class="modal fade" id="terminos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Terminos y condiciones</h1>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
        *usaremos sus datos para generar publicidad de acuerdo a sus gustos
        <br>
        *la empresa no se hace responsable de fraudes o estafas
        <br>
        Repudiandae fuga nesciunt mollitia eaque aliquam consequatur sapiente eos molestias fugiat obcaecati vel, id veritatis distinctio nisi dolores eum deleniti adipisci natus molestiae ipsam quaerat nulla est! Officiis, laboriosam doloremque.
        Minus atque minima cum natus, soluta quis ullam voluptate, necessitatibus ea, asperiores culpa. Impedit dolorem, fugit minima, beatae nihil, rerum magnam alias ipsam doloremque modi ipsum asperiores? Quis, accusantium quae.
        Soluta voluptatibus doloremque minima perferendis molestias necessitatibus praesentium, aperiam voluptatum repudiandae, delectus consequatur possimus ipsa aliquid veniam ad eos obcaecati tempore. Iusto expedita quae impedit omnis aspernatur deserunt consequuntur magnam.
        Dolor, quia officia aliquam magnam provident tempora hic officiis. Distinctio, accusantium mollitia? Sed ea totam ratione odit commodi, unde fuga delectus eligendi ullam? Veritatis modi, maxime molestias eos voluptatibus iusto.
        Voluptatibus et dolore quas maiores incidunt error veniam laboriosam! Laborum adipisci animi doloribus nesciunt voluptates, consectetur aliquid, eveniet minima quis molestias id laudantium totam minus fuga natus repudiandae sunt ut!
        Quis sapiente necessitatibus minima tenetur magni veritatis veniam eius illo animi quisquam soluta repellat, porro aliquid ipsum distinctio corporis voluptates obcaecati cum accusantium vero. Quam animi illum sit sunt fugiat!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-block" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<body class="hold-transition login-page">
<div class="mt-5">
  <div class="login-logo">
    <a href="../index.php"><b>Li</b>CODE</a>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
        <p class="login-box-msg">Registrar cuenta</p>
        <!-- form start -->
        <form id="form-register">
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input autocomplete="off" autocorrect="off" type="text" name="username" class="form-control" id="username" placeholder="Digite un username">
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="pass">Password</label>
                        <input autocomplete="new-password" type="password" name="pass" class="form-control" id="pass" placeholder="Digite un password">
                    </div>
                    <div class="form-group">
                        <label for="nombres">Nombres</label>
                        <input type="text" name="nombres" class="form-control" id="nombres" placeholder="Digite un nombres">
                    </div>
                    <div class="form-group">
                        <label for="dni">DNI</label>
                        <input type="text" name="dni" class="form-control" id="dni" placeholder="Digite un DNI">
                    </div>
                    <div class="form-group">
                        <label for="telefono">Telefono</label>
                        <input type="text" name="telefono" class="form-control" id="telefono" placeholder="Digite un telefono">
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label for="pass_repeat">Repeat Password</label>
                        <input type="password" name="pass_repeat" class="form-control" id="pass_repeat" placeholder="Digite denuevo el password">
                    </div>
                    <div class="form-group">
                        <label for="apellidos">Apellidos</label>
                        <input type="text" name="apellidos" class="form-control" id="apellidos" placeholder="Digite un apellidos">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" name="email" class="form-control" id="email" placeholder="Digite un email">
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group mb-0">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" name="terms" class="custom-control-input" id="terms">
                            <label class="custom-control-label" for="terms">Estoy de acuerdo con los 
                                <a href="#" data-toggle="modal" data-target="#terminos">terminos de servicio</a>.</label>
                        </div>
                    </div>
                </div>
            </div>
                <!-- /.card-body -->
                <div class="card-footer text-center">
                  <button type="submit" class="btn bg-gradient-primary">Registrarse</button>
                </div>
        </form>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="../util/js/jquery.min.js"></script>
<!-- Bootstrap 4 -->
<script src="../util/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="../util/js/adminlte.min.js"></script>
<!-- script del login -->
<script src="register.js"></script>
<!-- diseño de los alert -->
<script src="../util/js/toastr.min.js"></script>
<script src="../util/js/sweetalert2.min.js"></script>
<!-- librerias para las validaciones -->
<script src="../util/js/jquery.validate.min.js"></script>
<script src="../util/js/additional-methods.min.js"></script>
<!-- Page specific script validations -->
<script src="register.js"></script>
</body>
</html>
