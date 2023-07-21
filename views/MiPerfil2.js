$(document).ready(function(){
    var funcion;
    Loader();
    setTimeout(verificar_sesion,2000);
    // verificar_sesion();
    
    // mostrar_card_direcciones();
    bsCustomFileInput.init();


    $('#departamento').select2({
        placeholder: 'Seleccione un departamento',
        language: {
            noResults: function(){
                return "No hay resultado";
            },
            searching: function(){
                return "Buscando....";
            }
        }
    });
    $('#municipio').select2({
        placeholder: 'Seleccione un municipio',
        language: {
            noResults: function(){
                return "No hay resultado";
            },
            searching: function(){
                return "Buscando....";
            }
        }
    });

    async function read_notificaciones(){
        funcion="read_notificaciones";
        let data = await fetch('../controllers/NotificacionController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let notificaciones = JSON.parse(response);
                // console.log(notificaciones);
                let template1='';
                let template2='';
                let template=`
                    <a  class="nav-link" data-toggle="dropdown" href="#">`;
                
                if (notificaciones.length==0) {
                    template+=`
                        <i class="fa-solid fa-bell" style="color: #ffdd00;"></i>
                    `;
                    template1+=`
                        Notificaciones
                    `;
                } else {
                    template+=`
                        <i class="fa-solid fa-bell fa-bounce" style="color: #ffdd00;"></i>
                        <span class="badge badge-warning navbar-badge">${notificaciones.length}</span>
                    `;
                    template1+=`
                        Notificaciones<span class="badge badge-warning right">${notificaciones.length}</span>
                    `;
                }

                template+=`
                    </a>
                    <div class="dropdown-menu dropdown-menu-xl dropdown-menu-right">
                        
                    

                `;
                $('#nav_cont_noti').html(template1);
                if (notificaciones.length==1) {
                    template+=`
                        <span class="dropdown-item dropdown-header">${notificaciones.length} Notificacion</span>
                    `;
                } else {
                    template+=`
                        <span class="dropdown-item dropdown-header">${notificaciones.length} Notificaciones</span>
                    `;
                }
                notificaciones.forEach(notificacion=>{
                    template+=`
                        <div class="dropdown-divider"></div>
                            <a href="../${notificacion.url_1}&&noti=${notificacion.id}" class="dropdown-item">
                                    <div class="media">
                                    <img src="../util/img/producto/${notificacion.imagen}" alt="User Avatar" class="img-size-50 mr-3">
                                        <div class="media-body">
                                            <h3 class="dropdown-item-title">
                                                ${notificacion.titulo}
                                            </h3>
                                            <p class="text-sm">${notificacion.asunto}</p>
                                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i>${notificacion.contenido}</p>
                                            <span class=" text-sm">${notificacion.fecha_creacion}</span>
                                        </div>
                                    </div>
                            </a>
                        <div class="dropdown-divider"></div>
                    `;
                })
                template+=`
                    <a href="../views/notificaciones.php" class="dropdown-item dropdown-footer">Ver todas las notificaciones</a>
                    </div>
                `;
                $('#notificacion').html(template);
            } catch (error) {
                console.error(error);
                console.log(response);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
              })
        }
    }

    async function read_favoritos(){
        funcion="read_favoritos";
        let data = await fetch('../controllers/FavoritoController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let favoritos = JSON.parse(response);
                // console.log(favoritos);
                let template1='';
                let template=`
                    <a class="nav-link" data-toggle="dropdown" href="#">`;
                if (favoritos.length==0) {
                    template+=`
                        <i class="fa-solid fa-heart" style="color: #d10000;"></i>
                    `;
                    template1+=`
                        Favoritos
                    `;
                } else {
                    template+=`
                        <i class="fa-solid fa-heart fa-beat" style="color: #d10000;"></i>
                        <span class="badge badge-warning navbar-badge">${favoritos.length}</span>
                    `;
                    template1+=`
                        Favoritos<span class="badge badge-warning right">${favoritos.length}</span>
                    `;
                }
                template+=`
                    </a>
                    <div class="dropdown-menu dropdown-menu-xl dropdown-menu-right">
                    
                `;
                
                if (favoritos.length==1) {
                    template+=`
                        <span class="dropdown-item dropdown-header">${favoritos.length} Favorito</span>
                    `;
                } else {
                    template+=`
                        <span class="dropdown-item dropdown-header">${favoritos.length} Favoritos</span>
                    `;
                }
                favoritos.forEach(favorito=>{
                    template+=`
                        <div class="dropdown-divider"></div>
                            <a href="../${favorito.url}" class="dropdown-item">
                                    <div class="media">
                                    <img src="../util/img/producto/${favorito.imagen}" alt="User Avatar" class="img-size-50 mr-3">
                                        <div class="media-body">
                                            <h3 class="dropdown-item-title">
                                                ${favorito.titulo}
                                            </h3>
                                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i>${favorito.precio}/COP</p>
                                            <span class=" text-sm">${favorito.fecha_creacion}</span>
                                        </div>
                                    </div>
                            </a>
                        <div class="dropdown-divider"></div>
                    `;
                })
                template+=`
                        <a href="../views/favoritos.php" class="dropdown-item dropdown-footer">Ver todos tus productos favoritos</a>
                    </div>
                `;
                $('#nav_cont_fav').html(template1);
                $('#favorito').html(template);
            } catch (error) {
                console.error(error);
                console.log(response);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
              })
        }
    }

    function mostrar_navegacion(usuario){
        let template=``;
        if (usuario===undefined||usuario==''||usuario==null) {
            template=`
            <li class="nav-item">
                <a class="nav-link"  href="../views/register.php" role="button">
                    <i class="fas fa-user-plus"></i>Registrarse
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  href="../views/login.php" role="button">
                    <i class="far fa-user"></i>Login
                </a>
            </li>
            `;
        } else {
            template=`
                <!-- Navbar Search -->
                <li class="nav-item">
                    <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                        <i class="fas fa-search"></i>
                    </a>
                    <div class="navbar-search-block">
                        <form class="form-inline">
                        <div class="input-group input-group-sm">
                            <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                            <div class="input-group-append">
                            <button class="btn btn-navbar" type="submit">
                                <i class="fas fa-search"></i>
                            </button>
                            <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                                <i class="fas fa-times"></i>
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                </li>
        
                <!-- Messages Dropdown Menu -->
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="badge badge-danger navbar-badge">3</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <a href="#" class="dropdown-item">
                        <!-- Message Start -->
                        <div class="media">
                            <img src="../../dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">
                            <div class="media-body">
                            <h3 class="dropdown-item-title">
                                Brad Diesel
                                <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                            </h3>
                            <p class="text-sm">Call me whenever you can...</p>
                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                            </div>
                        </div>
                        <!-- Message End -->
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                        <!-- Message Start -->
                        <div class="media">
                            <img src="../../dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                            <div class="media-body">
                            <h3 class="dropdown-item-title">
                                John Pierce
                                <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                            </h3>
                            <p class="text-sm">I got your message bro</p>
                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                            </div>
                        </div>
                        <!-- Message End -->
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                        <!-- Message Start -->
                        <div class="media">
                            <img src="../../dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                            <div class="media-body">
                            <h3 class="dropdown-item-title">
                                Nora Silvester
                                <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                            </h3>
                            <p class="text-sm">The subject goes here</p>
                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                            </div>
                        </div>
                        <!-- Message End -->
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
                    </div>
                </li>
                <!-- Notifications Dropdown Menu -->
                <li id="notificacion" class="nav-item dropdown">
                    
                </li>
                <li id="favorito" class="nav-item dropdown">
                    
                    
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <!-- la imagen es un circulo y fluid la hace responsive -->
                    <img src="../util/img/users/${usuario.avatar}" width="30" height="30" class="img-fluid img-circle" alt="">
                    <span>${usuario.user}</span>
                    </a>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="../views/mi_perfil.php"><i class="fas fa-user-cog"></i>  Mi perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-shopping-basket"></i>  Mis pedidos</a></li>
                    <li><a class="dropdown-item" href="../controllers/logout.php"><i class="fas fa-user-times"></i>  Cerrar Sesión</a></li>
                    </ul>
                </li>
            `;
        }
        $('#loader_1').hide(500);
        $('#menu_superior').html(template);

    }

    function mostrar_sidebar(usuario){
        let template=``;
        if (usuario===undefined||usuario==''||usuario==null) {
        } else {
            template=`
                <li class="nav-header">Perfil</li>
                <li id="nav_notificaciones" class="nav-item">
                  <a id="active_nav_notificaciones" href="../views/notificaciones.php" class="nav-link">
                    <i class="fa-regular fa-bell" style="color: #ffdd00;"></i>
                    <p id="nav_cont_noti">
                      Notificaciones
                    </p>
                  </a>
                </li>
                <li id="nav_favoritos" class="nav-item">
                  <a id="active_nav_favoritos" href="../views/favoritos.php" class="nav-link">
                  <i class="fa-regular fa-heart" style="color: #d10000;"></i>
                    <p id="nav_cont_fav">
                      Favoritos
                    </p>
                  </a>
                </li>
            `;
        }
        $('#loader_2').hide(500);
        $('#menu_lateral').html(template);

    }

    async function mostrar_card_usuario(){
        funcion="obtener_datos";
        let data = await fetch('../controllers/UsuarioController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {

            let response = await data.text();
            try {

                let usuario=JSON.parse(response);
                // console.log(usuario);
                let template=`
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white" style="background: url('../util/img/photo1.png') center center;">
                      <h3 class="widget-user-username text-right">${usuario.username}</h3>
                      <h5 id="tipo_usuario" class="widget-user-desc text-right">${usuario.tipo_usuario}</h5>
                    </div>
                    <div class="widget-user-image">
                      <img class="img-circle" src="../util/img/users/${usuario.avatar}" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                      <div class="row">
                        <div class="col-sm-4 border-right">
                          <div class="description-block">
                            <h5 class="description-header">3,200</h5>
                            <span class="description-text">SALES</span>
                          </div>
                          <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4 border-right">
                          <div class="description-block">
                            <h5 class="description-header">13,000</h5>
                            <span class="description-text">FOLLOWERS</span>
                          </div>
                          <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4">
                          <div class="description-block">
                            <h5 class="description-header">35</h5>
                            <span class="description-text">PRODUCTS</span>
                          </div>
                          <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                      </div>
                      <!-- /.row -->
                    </div>
                `;
                let template_1=`
                    <div class="card-header border-bottom-0 bg-dark text-white">
                      <strong>Datos del usuario</strong>
                      <div class="card-tools">
                        <button type="button" class="editar_datos btn btn-tool" data-bs-toggle="modal" data-bs-target="#modal_datos">
                          <i class="fas fa-pencil-alt text-white"></i>
                        </button>
                      </div>
                    </div>
                    <div class="card-body pt-0 mt-3">
                      <div class="row">
                        <div class="col-8">
                          <h2 class="lead text-white"><b>${usuario.nombres + ' ' + usuario.apellidos}</b></h2>
                          <ul class="ml-4 mb-0 fa-ul text-muted">
                            <li class="small"><span class="fa-li"><i class="fas fa-address-card"></i></span> DNI: <span>${usuario.dni}</span></li>
                            <li class="small"><span class="fa-li"><i class="fas fa-at"></i></span> Email: <span>${usuario.email}</span></li>
                            <li class="small"><span class="fa-li"><i class="fas fa-lg fa-phone"></i></span> Telefono: <span>${usuario.telefono}</span></li>
                          </ul>
                        </div>
                        <div class="col-4 text-center">
                          <img src="../util/img/personal.png" alt="user-avatar" class="img-circle img-fluid">
                        </div>
                      </div>
                    </div>
                    <div class="card-footer bg-dark">
                      <button class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#modal_contra">Cambiar Contraseña</button>
                    </div>
                `;
                $('#loader_3').hide(500);
                $('#loader_4').hide(500);
                $('#card_usuario').html(template);
                $('#card_datos_personales').html(template_1);


            } catch (error) {
                console.error(error);
                console.log(response);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
              })
        }
    }

    async function mostrar_card_direcciones(){
        funcion="mostrar_direcciones";
        let data = await fetch('../controllers/UsuarioMunicipioController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            try {
                let direcciones=JSON.parse(response);
                let contador=0;
                let template='';
                let template2='';
                direcciones.forEach(direccion => {
                    contador++;
                    template+=`
                    <div class="callout callout-info">
                        <div class="card-header">
                            <strong>Dirección ${contador}</strong>
                            <div class="card-tools">
                                <button dir_id="${direccion.id}" type="button" class="eliminar_direccion btn btn-tool">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <h2 class="lead"><b>${direccion.direccion}</b></h2>
                            <p class="text-muted text-sm"><b>Referencia: ${direccion.referencia}</b></p>
                            <ul class="text-sm">
                                <li class="text-sm">
                                    <i class="fas fa-lg fa-building"></i>
                                    :${direccion.municipio}, ${direccion.departamento}
                                </li>
                            </ul>
                        </div>
                    </div>
                    `;
                    $('#direcciones').html(template);
                });
                template2=`
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
                `;
                $('#datos').html(template2);
            } catch (error) {
                console.error(error);
                console.log(response);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
              })
        }
    }

    async function verificar_sesion() {
        funcion="verificar_sesion";
        let data = await fetch('../controllers/UsuarioController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {

            let response = await data.text();
            try {
                // console.log(productos);
                if (response !='') {//si estamos logueados entonces....
                    let sesion=JSON.parse(response);
                    mostrar_navegacion(sesion);
                    mostrar_sidebar(sesion);
                    $('#avatar_menu').attr('src','../util/img/users/' + sesion.avatar);
                    $('#usuario_menu').text(sesion.user);
                    read_notificaciones();//trae las notificaciones dependiendo del usuario
                    read_favoritos();//
                    mostrar_card_usuario();
                    mostrar_card_direcciones();
                    mostrar_historial();
                    llenar_departamentos();
                    CloseLoader();
                }else{
                    // mostrar_sidebar();
                    // mostrar_navegacion();
                    location.href='login.php';
                }
                // setTimeout(mostrar_productos,650);
                
            } catch (error) {
                console.error(error);
                console.log(response);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
              })
        }
    }//cuando ya hay una sesion verificada, no se puede volver a iniciar sesion

    /**El siguiente codigo tiene que ver con editar los datos del usuario */

    $(document).on('click', '.editar_datos',async (e) => {
        funcion = "obtener_datos";
        let data = await fetch('../controllers/UsuarioController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            try {
                let usuario=JSON.parse(response);
                // console.log(usuario);
                $('#nombres_mod').val(usuario.nombres);
                $('#apellidos_mod').val(usuario.apellidos);
                $('#dni_mod').val(usuario.dni);
                $('#email_mod').val(usuario.email);
                $('#telefono_mod').val(usuario.telefono);
            } catch (error) {
                console.error(error);
                console.log(response);
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo algún error!!',
                    text: 'Comuniquese con el area de sistemas ',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: data.statusText,
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
    })

    async function editar_datos(datos){
        let data = await fetch('../controllers/UsuarioController.php',{
            method:'POST',
            body:datos
        })
        if (data.ok) {
            let response = await data.text();
            try {
                let respuesta=JSON.parse(response);
                // console.log(respuesta);
                if (respuesta.mensaje=="success") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se han editado sus cambios',
                        showConfirmButton: false,
                        timer: 1500
                      }).then(function(){
                        verificar_sesion();
                        mostrar_card_usuario();
                        mostrar_historial();
                      })
                }
                else if(respuesta.mensaje=="danger"){
                    Swal.fire({
                        icon: 'warning',
                        title: 'No hubo ningún cambio!!',
                        text: 'no modificó ningún cambio'
                      })
                }
            } catch (error) {
                console.error(error);
                console.log(response);
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo algún error!!',
                    text: 'Comuniquese con el area de sistemas ',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: data.statusText,
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
    }
    // el siguiente evento se ejecuta cuando las validaciones ya están correctas
    // tambien caundo el boton submit del formulario sea presionado
    $.validator.setDefaults({
        submitHandler: function () {
            funcion="editar_datos";
            //metodo ajax en vez del post
            let datos=new FormData($('#form-datos')[0]);//aquí capturamos todos los datos
            datos.append("funcion", funcion);
            editar_datos(datos);
        }
    });

    jQuery.validator.addMethod("letras",
      function (value, element) {
        let variable = value.replace(/ /g, "");
        return /^[A-Za-z]+$/.test(variable);
      },
    "Este campo solo permite letras y ya");

    $('#form-datos').validate({//este tipo de reglas vienen por defecto
    rules: {
        nombres_mod: {
            required: true,
            letras: true,
        },
        apellidos_mod: {
            required: true,
            letras:true
        },
        dni_mod: {
            required: true,
            digits: true,
            minlength: 10,
            maxlength: 10
        },
        email_mod: {
          required: true,
          email: true
        },
        telefono_mod: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10
        }
    },
    messages: {
        nombres_mod:{
            required: "*Este campo es obligatorio"
        },
        apellidos_mod:{
            required: "*Este campo es obligatorio"
        },
        dni_mod:{
            required: "*Este campo es obligatorio",
            digits: "este campo no debe de contener letras",
            minlength: "es un minimo de 10 digitos",
            maxlength: "es un maximo de 10 digitos"
        },
        email_mod: {
          required: "Please enter a email address",
          email: "Please enter a vaild email address"
        },
        telefono_mod: {
            required: "*Este campo es obligatorio",
            digits: "este campo no debe de contener letras",
            minlength: "es un minimo de 10 digitos",
            maxlength: "es un maximo de 10 digitos"
        }
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
        $(element).addClass('is-invalid');
        $(element).removeClass('is-valid');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
        $(element).addClass('is-valid');
    }
    });

    /**CAMBIO DE CONTRASEÑA------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

    async function cambiar_contra(funcion,pass_old,pass_new){
        let data = await fetch('../controllers/UsuarioController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&pass_old='+pass_old+'&&pass_new='+pass_new
        })
        if (data.ok) {
            let response = await data.text();
            try {
                let respuesta=JSON.parse(response);
                console.log(respuesta);
                if (respuesta.mensaje=="success") {
                            
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha cambiado la contraseña.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        $('#form-contra').trigger('reset');
                        verificar_sesion();
                        mostrar_card_usuario();
                        mostrar_historial();
                    })
                } else if(respuesta.mensaje=="error"){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Contraseña incorrecta!!',
                        text: 'Por favor verifique la contraseña digitada.'
                    })
                }
            } catch (error) {
                console.error(error);
                console.log(response);
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo algún error!!',
                    text: 'Comuniquese con el area de sistemas ',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: data.statusText,
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
    }


    $.validator.setDefaults({
        submitHandler: function () {//cuando se valida todo entonces......
            // alert('Se validó todo.')
            funcion = "cambiar_contra";
            let pass_old=$('#pass_old').val();
            let pass_new=$('#pass_new').val();
            cambiar_contra(funcion,pass_old,pass_new);
        }
    });

    // podemos crear reglas en las validaciones

    jQuery.validator.addMethod("letras",
    function (value, element) {
      let variable = value.replace(/ /g, "");
      return /^[A-Za-z]+$/.test(value);
    },
    "Este campo solo permite letras");

    //hacemos las validaciones
    $('#form-contra').validate({//este tipo de reglas vienen por defecto
        rules: {
            pass_old: {
                required: true,
                minlength: 5,
                maxlength: 20
            },
            pass_new: {
                required: true,
                minlength: 5,
                maxlength: 20
            },
            pass_confirm: {
                required: true,
                equalTo: "#pass_new"
            }
        },
        messages: {
            pass_old:{
                required: "*Este campo es obligatorio",
                minlength: "*El password debe ser de minimo 5 caracteres",
                maxlength: "*El password debe ser de maximo 20 caracteres"
            },
            pass_new:{
                required: "*Este campo es obligatorio",
                minlength: "*El password debe ser de minimo 5 caracteres",
                maxlength: "*El password debe ser de maximo 20 caracteres"
            },
            pass_confirm:{
                required: "*Este campo es obligatorio",
                equalTo: "*el campo de la nueva contraseña no coincide"
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
            $(element).removeClass('is-valid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
            $(element).addClass('is-valid');
        }
    });

  /**Mostrar el historial-------------------------------------------------------------------------------------------------------------------------- */
    async function mostrar_historial(){
        funcion="mostrar_historial";
        let data = await fetch('../controllers/HistorialController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let historiales=JSON.parse(response);
                // console.log(historiales);
                let template='';
                historiales.forEach(historial=>{
                    // console.log(historial);
                    template+=`
                    <div class="time-label">
                        <span class="bg-danger">
                            ${historial[0].fecha}
                        </span>
                    </div>
                    `;
                    historial.forEach(cambio => {
                        // console.log(cambio.descripcion);
                        template+=`
                        <div>
                            ${cambio.m_icono}

                            <div class="timeline-item">
                                <span class="time"><i class="far fa-clock"></i>${cambio.hora}</span>

                                <h3 class="timeline-header">
                                    ${cambio.th_icono} se hizo un ${cambio.tipo_historial} en mi ${cambio.modulo}
                                </h3>

                                <div class="timeline-body">
                                    ${cambio.descripcion}
                                </div>
                            </div>
                        </div>
                        `;
                    });
                });
                template+=`
                    <div>
                    <i class="far fa-clock bg-gray"></i>
                    </div>
                `;
                $('#historiales').html(template);
            } catch (error) {
                console.error(error);
                console.log(response);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
    }

    function Loader(mensaje){
        if (mensaje==''||mensaje==null) {
            mensaje='Cargando datos...';
        }
        Swal.fire({
            position: 'center',
            html: '<i class="fa-solid fa-spinner fa-spin-pulse fa-xl" style="color: #409c8c;"></i>',
            title: mensaje,
            showConfirmButton:false
        })
    }

    function CloseLoader(mensaje,tipo){
        if (mensaje==''||mensaje==null) {
            Swal.close();
        } else {
            Swal.fire({
                position: 'center',
                icon: tipo,
                title: mensaje,
                showConfirmButton:false
            })
        }
    }

  /**Mostrar Lugares en verificacion de usuario----------------------------------------------------------------------------------------------------------------- */
    //funcion de llenado, para llenar las opciones del formulario del acordion
    async function llenar_departamentos(){
        //nos comunicamos con nuestro controlador
        funcion="llenar_departamentos";
        let data = await fetch('../controllers/DepartamentosController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            try {
                let departamentos=JSON.parse(response);
                // console.log(departamentos);
                let template='';//aquí se almacenará todo nuestro codigo html
                // hacemos un foreach para recorrer todos los departamentos
                departamentos.forEach(departamento/* es el elemento que hará el recorrido */ => {
                    template+=`
                    <option value="${departamento.id_departamento}">${departamento.departamento}</option>
                    `;
                });
                $('#departamento').html(template);
                $('#departamento').val('').trigger('change');
            } catch (error) {
                console.error(error);
                console.log(response);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
    }
    //detectamos el municipio dependiendo del departamento
    $('#departamento').change(async function(){
        let id_departamento=$('#departamento').val();//obtenemos el id del departamento seleccionado
        if (id_departamento==null) {
            id_departamento='';
        }
        funcion="llenar_municipios";
        let data = await fetch('../controllers/MunicipiosController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id_departamento='+id_departamento
        })
        if (data.ok) {
            let response = await data.text();
            try {
                if (response!='error') {
                    let municipios=JSON.parse(response);
                    // console.log(municipios);
                    let template='';
                    //aquí se almacenará todo nuestro codigo html
                    // hacemos un foreach para recorrer todos los departamentos
                    municipios.forEach(municipio/* es el elemento que hará el recorrido */ => {
                        template+=`
                        <option value="${municipio.id_municipio}">${municipio.municipio}</option>
                        `;
                    });
                    $('#municipio').html(template);
                    $('#municipio').val('').trigger('change');
                } else {
                    $('#municipio').html('');
                    Swal.fire({
                        icon: 'error',
                        title: 'Cuidado es ilegal!!',
                        text: 'No intentes vulnerar el sistema!!',
                        text: 'Recarga la pagina',
                    })
                }
                
            } catch (error) {
                console.error(error);
                console.log(response);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
    })

    async function crear_direccion(id_municipio,direccion,referencia) {
        let data = await fetch('../controllers/UsuarioMunicipioController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id_municipio='+id_municipio+'&&direccion='+direccion+'&&referencia='+referencia
        })
        if (data.ok) {
            let response = await data.text();
            try {
                let respuesta=JSON.parse(response);
                // console.log(respuesta);
                if (respuesta.mensaje == 'success') {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ah registrado su nueva dirección',
                        showConfirmButton: false,
                        timer: 1500
                        }).then(function(){
                        $('#form-direccion').trigger('reset');
                        $('#departamento').val('').trigger('change');
                        mostrar_card_direcciones();
                        mostrar_historial();
                        })
                } else if(respuesta.mensaje=='error'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Eso es ilegal!!',
                        text: 'No intente vulnerar el sistema'
                        })
                }

                //Evitamos con preven prevenir valores por defecto
                e.preventDefault();
            } catch (error) {
                console.error(error);
                console.log(response);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
    }

    $('#form-direccion').submit(e=>{
        funcion='crear_direccion';
        // --------------capturamos variables
        // capturamos la direccion, el municipio y la referencia del formulario
        let id_municipio=$('#municipio').val();
        // capturamos la contraseña del formulario
        let direccion=$('#direccion').val();
        let referencia=$('#referencia').val();
        // console.log(user + ' ' + pass);
        // mando la información al controlador
        crear_direccion(id_municipio,direccion,referencia);
        
        // prevenimos valores por defecto
        e.preventDefault();
    })

    async function eliminar_direccion(id) {
        funcion="eliminar_direccion";
        let respuesta='';
        let data = await fetch('../controllers/UsuarioMunicipioController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id='+id
        })
        if (data.ok) {
            let response = await data.text();
            try {
                respuesta=JSON.parse(response);
                console.log(respuesta);
                
            } catch (error) {
                console.error(error);
                console.log(response);
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo algún error!!',
                    text: 'Comuniquese con el area de sistemas ',
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: data.statusText,
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
        return respuesta;
    }

    $(document).on('click', '.eliminar_direccion', (e)=>{
        let elemento = $(this)[0].activeElement;
        let id=$(elemento).attr('dir_id');
        console.log(id);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success m-3',
              cancelButton: 'btn btn-danger m-3'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Desea borrar esta dirección?',
            text: "la dirección dejará de existir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                //nos comunicamos con nuestro controlador
                eliminar_direccion(id).then(respuesta=>{
                    if(respuesta.mensaje=="success"){
                        swalWithBootstrapButtons.fire(
                                'Eliminado!',
                                'Dirección eliminada.',
                                'success'
                              )
                              mostrar_card_direcciones();//hace una recarga en la funcion de mostrar direcciones
                              mostrar_historial();//recargamos el historial
                    }else if(respuesta.mensaje=="error"){
                        swalWithBootstrapButtons.fire(
                            'No se Borró',
                            'Hubo alteraciones en la integridad de los datos.',
                            'error'
                          )
                    }
                });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'La dirección todavía existe.',
                'error'
              )
            }
          })
    })
});

