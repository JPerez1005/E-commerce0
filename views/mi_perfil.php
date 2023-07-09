<?php
    include_once 'Layouts/general/header.php';
?>
<!-- modal editar usuario -->
<div class="modal" id="modal_datos" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title">Editar datos personales</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="form-datos" enctype="multipart/form-data">
          <div class="form-group">
            <label for="nombres_mod">Nombres</label>
            <input type="text" name="nombres_mod" class="form-control" id="nombres_mod" placeholder="Digite un nombres">
          </div>
          <div class="form-group">
            <label for="apellidos_mod">Apellidos</label>
            <input type="text" name="apellidos_mod" class="form-control" id="apellidos_mod" placeholder="Digite Apellidos">
          </div>
          <div class="form-group">
            <label for="dni_mod">DNI</label>
            <input type="text" name="dni_mod" class="form-control" id="dni_mod" placeholder="Digite DNI">
          </div>
          <div class="form-group">
            <label for="email_mod">Email</label>
            <input type="text" name="email_mod" class="form-control" id="email_mod" placeholder="Digite un email">
          </div>
          <div class="form-group">
            <label for="telefono_mod">Telefono</label>
            <input type="text" name="telefono_mod" class="form-control" id="telefono_mod" placeholder="Digite un telefono">
          </div>
          <div class="form-group">
            <label for="exampleInputFile">Foto de perfil</label>
            <div class="input-group">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="avatar_mod" name="avatar_mod">
                <label class="custom-file-label" for="exampleInputFile">Seleccione una imagen</label>
              </div>
            </div>
          </div>
          <center>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-outline-success">Guardar</button>
            </div>
          </center>
        </form>
      </div>
    </div>
  </div>
</div>
<!-- modal editar contraseña del usuario-->
<div class="modal" id="modal_contra" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title">Cambiar contraseña</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="form-contra">
          <div class="form-group">
            <label for="pass_old">Ingrese Contraseña Actual</label>
            <input type="password" name="pass_old" class="form-control" id="pass_old" placeholder="Ingrese Contraseña Actual">
          </div>
          <div class="form-group">
            <label for="pass_new">Nueva contraseña</label>
            <input type="password" name="pass_new" class="form-control" id="pass_new" placeholder="Digite Nueva contraseña">
          </div>
          <div class="form-group">
            <label for="pass_confirm">Confirmar contraseña</label>
            <input type="password" name="pass_confirm" class="form-control" id="pass_confirm" placeholder="Confirmar contraseña">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-outline-success">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


  <title>E-commerce 0 | Mi Perfil</title>
<!-- Main content -->
<section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5">

            <!-- Profile Image -->
            <div id="card_usuario" class="card card-widget widget-user shadow-lg mt-3">
              <div class="card">
                <div class="card-body">
                  <div id="loader_3" class="overlay">
                    <i class="fa-solid fa-spinner fa-spin-pulse fa-xl" style="color: #409c8c;"></i>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.card -->

            <!-- About Me Box//Datos del usuario -->
            <div id="card_datos_personales" class="card card-light d-flex flex-fill">
              <div class="card">
                <div class="card-body">
                  <div id="loader_4" class="overlay">
                    <i class="fa-solid fa-spinner fa-spin-pulse fa-xl" style="color: #409c8c;"></i>
                  </div>
                </div>
              </div>
            </div>
            <!-- Direcciones de envío -->
            <div class="card card-light d-flex flex-fill">
                <div class="card-header border-bottom-0 bg-dark text-white">
                  <strong>Direcciones de Envío</strong>
                </div>
                <div class="card-body pt-0 mt-3">
                  <div class="row">
                    <div class="col-8">
                      <div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                          <h2 class="accordion-header">
                          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Mis Direcciones
                          </button>
                          </h2>
                          <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div id="direcciones" class="accordion-body">
                              <!-- aquí se colocan las direcciones dinamicamente -->
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              Agregar Dirección
                            </button>
                          </h2>
                          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                              <form id="form-direccion">
                                <div class="form-group">
                                  <label>Departamento: </label>
                                  <select id="departamento" class="form-control" style="width:100%" required></select>
                                </div>
                                <div class="form-group">
                                  <label>Municipio: </label>
                                  <select id="municipio" class="form-control" style="width:100%" required></select>
                                </div>
                                <div class="form-group">
                                  <label>Direccion: </label>
                                  <input id="direccion" class="form-control" placeholder="Ingrese su direccion" required></input>
                                </div>
                                <div class="form-group">
                                  <label>Referencia: </label>
                                  <input id="referencia" class="form-control" placeholder="Ingrese alguna referencia"></input>
                                </div>
                                <div class="text-center">
                                  <button type="submit" class="btn btn-outline-dark">Crear Punto</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-4 text-center">
                      <img src="../util/img/direccion.png" alt="user-avatar" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
            </div>
            <div class="card card-light d-flex flex-fill">
                <div class="card-header border-bottom-0">
                  <strong>Mis tarjetas de pago</strong>
                  <div class="card-tools">
                    <button type="button" class="btn btn-tool"><i class="fas fa-plus"></i></button>
                  </div>
                </div>
                <div class="card-body pt-0 mt-3">
                  <div class="row">
                    <div class="col-8">
                      <h2 class="lead"><b>Nicole Pearson</b></h2>
                      <p class="text-muted text-sm"><b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover </p>
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-building"></i></span> Address: Demo Street 123, Demo City 04312, NJ</li>
                        <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Phone #: + 800 - 12 12 23 52</li>
                      </ul>
                    </div>
                    <div class="col-4 text-center">
                      <img src="../util/img/tarjeta.png" alt="user-avatar" class="img-circle img-fluid">
                    </div>
                  </div>
                </div>
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-7">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                  <li class="nav-item"><a class="nav-link active" href="#timeline" data-toggle="tab">Historial</a></li>
                  <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane" id="activity">
                    <!-- Post -->
                    <div class="post">
                      <div class="user-block">
                        <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                        <span class="username">
                          <a href="#">Jonathan Burke Jr.</a>
                          <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                        </span>
                        <span class="description">Shared publicly - 7:30 PM today</span>
                      </div>
                      <!-- /.user-block -->
                      <p>
                        Lorem ipsum represents a long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>

                      <p>
                        <a href="#" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</a>
                        <a href="#" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i> Like</a>
                        <span class="float-right">
                          <a href="#" class="link-black text-sm">
                            <i class="far fa-comments mr-1"></i> Comments (5)
                          </a>
                        </span>
                      </p>

                      <input class="form-control form-control-sm" type="text" placeholder="Type a comment">
                    </div>
                    <!-- /.post -->

                    <!-- Post -->
                    <div class="post clearfix">
                      <div class="user-block">
                        <img class="img-circle img-bordered-sm" src="../../dist/img/user7-128x128.jpg" alt="User Image">
                        <span class="username">
                          <a href="#">Sarah Ross</a>
                          <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                        </span>
                        <span class="description">Sent you a message - 3 days ago</span>
                      </div>
                      <!-- /.user-block -->
                      <p>
                        Lorem ipsum represents a long-held tradition for designers,
                        typographers and the like. Some people hate it and argue for
                        its demise, but others ignore the hate as they create awesome
                        tools to help create filler text for everyone from bacon lovers
                        to Charlie Sheen fans.
                      </p>

                      <form class="form-horizontal">
                        <div class="input-group input-group-sm mb-0">
                          <input class="form-control form-control-sm" placeholder="Response">
                          <div class="input-group-append">
                            <button type="submit" class="btn btn-danger">Send</button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <!-- /.post -->

                    <!-- Post -->
                    <div class="post">
                      <div class="user-block">
                        <img class="img-circle img-bordered-sm" src="../../dist/img/user6-128x128.jpg" alt="User Image">
                        <span class="username">
                          <a href="#">Adam Jones</a>
                          <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                        </span>
                        <span class="description">Posted 5 photos - 5 days ago</span>
                      </div>
                      <!-- /.user-block -->
                      <div class="row mb-3">
                        <div class="col-sm-6">
                          <img class="img-fluid" src="../../dist/img/photo1.png" alt="Photo">
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-6">
                          <div class="row">
                            <div class="col-sm-6">
                              <img class="img-fluid mb-3" src="../../dist/img/photo2.png" alt="Photo">
                              <img class="img-fluid" src="../../dist/img/photo3.jpg" alt="Photo">
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-6">
                              <img class="img-fluid mb-3" src="../../dist/img/photo4.jpg" alt="Photo">
                              <img class="img-fluid" src="../../dist/img/photo1.png" alt="Photo">
                            </div>
                            <!-- /.col -->
                          </div>
                          <!-- /.row -->
                        </div>
                        <!-- /.col -->
                      </div>
                      <!-- /.row -->

                      <p>
                        <a href="#" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</a>
                        <a href="#" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i> Like</a>
                        <span class="float-right">
                          <a href="#" class="link-black text-sm">
                            <i class="far fa-comments mr-1"></i> Comments (5)
                          </a>
                        </span>
                      </p>

                      <input class="form-control form-control-sm" type="text" placeholder="Type a comment">
                    </div>
                    <!-- /.post -->
                  </div>
                  <!-- /.tab-pane -->
                  <div class="active tab-pane" id="timeline">
                    <!-- The timeline -->
                    <div id="historiales" class="timeline timeline-inverse">
                      
                    </div>
                  </div>
                  <!-- /.tab-pane -->

                  <div class="tab-pane" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input type="email" class="form-control" id="inputName" placeholder="Name">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                          <input type="email" class="form-control" id="inputEmail" placeholder="Email">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputName2" placeholder="Name">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">Experience</label>
                        <div class="col-sm-10">
                          <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Skills</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputSkills" placeholder="Skills">
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <div class="checkbox">
                            <label>
                              <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <button type="submit" class="btn btn-danger">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>

    <?php
    include_once 'Layouts/general/footer.php';
    ?>

    <script src="mi_perfil.js"></script>