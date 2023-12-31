$(document).ready(function(){
    var funcion;
    Loader();
    // setTimeout(verificar_sesion,2050);
    verificar_sesion();


    async function read_notificaciones(){
        funcion="read_notificaciones";
        let data = await fetch('controllers/NotificacionController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            console.log(response);
            try {
                let notificaciones = JSON.parse(response);
                console.log(notificaciones);
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
                            <a href="${notificacion.url_1}&&noti=${notificacion.id}" class="dropdown-item">
                                    <div class="media">
                                    <img src="util/img/producto/${notificacion.imagen}" alt="User Avatar" class="img-size-50 mr-3">
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
                    <a href="views/notificaciones.php" class="dropdown-item dropdown-footer">Ver todas las notificaciones</a>
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
        let data = await fetch('controllers/FavoritoController.php',{
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
                            <a href="${favorito.url}" class="dropdown-item">
                                    <div class="media">
                                    <img src="util/img/producto/${favorito.imagen}" alt="User Avatar" class="img-size-50 mr-3">
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
                        <a href="views/favoritos.php" class="dropdown-item dropdown-footer">Ver todos tus productos favoritos</a>
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
                <a class="nav-link"  href="views/register.php" role="button">
                    <i class="fas fa-user-plus"></i>Registrarse
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link"  href="views/login.php" role="button">
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
                    <img src="util/img/users/${usuario.avatar}" width="30" height="30" class="img-fluid img-circle" alt="">
                    <span>${usuario.user}</span>
                    </a>
                    <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="views/mi_perfil.php"><i class="fas fa-user-cog"></i>  Mi perfil</a></li>
                    <li><a class="dropdown-item" href="#"><i class="fas fa-shopping-basket"></i>  Mis pedidos</a></li>
                    <li><a class="dropdown-item" href="controllers/logout.php"><i class="fas fa-user-times"></i>  Cerrar Sesión</a></li>
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
                    <a id="active_nav_notificaciones" href="views/notificaciones.php" class="nav-link">
                        <i class="fa-regular fa-bell" style="color: #ffdd00;"></i>
                        <p id="nav_cont_noti">
                            Notificaciones
                        </p>
                    </a>
                </li>
                <li id="nav_favoritos" class="nav-item">
                    <a id="active_nav_favoritos" href="views/favoritos.php" class="nav-link">
                    <i class="fa-regular fa-heart" style="color: #d10000;"></i>
                        <p id="nav_cont_fav">
                            Favoritos
                        </p>
                    </a>
                </li>`;
            if (usuario.tipo_usuario==1) {
                template+=`<li class="nav-header">Producto</li>
                <li id="nav_marcas" class="nav-item">
                    <a id="active_nav_marcas" href="views/marcas.php" class="nav-link">
                        <i class="fa-solid fa-tags" style="color: #005eff;"></i>
                        <p id="nav_cont_marc">
                            Marcas
                        </p>
                    </a>
                </li>
                `;
            }else if(usuario.tipo_usuario==2){
                template+=`<li class="nav-header">Producto</li>
                <li id="nav_marcas" class="nav-item">
                    <a id="active_nav_marcas" href="views/marcas.php" class="nav-link">
                        <i class="fa-solid fa-tags" style="color: #005eff;"></i>
                        <p id="nav_cont_marc">
                            Marcas
                        </p>
                    </a>
                </li>
                `;
            }else if(usuario.tipo_usuario==3){
                template+=`<li class="nav-header">Producto</li>
                <li id="nav_marcas" class="nav-item">
                    <a id="active_nav_marcas" href="views/marcas.php" class="nav-link">
                        <i class="fa-solid fa-tags" style="color: #005eff;"></i>
                        <p id="nav_cont_marc">
                            Marcas
                        </p>
                    </a>
                </li>
                `;    
            }
        }
        $('#loader_2').hide(500);
        $('#menu_lateral').html(template);
    }

    async function verificar_sesion() {
        funcion="verificar_sesion";
        let data = await fetch('controllers/UsuarioController.php',{
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
                    console.log(sesion);
                    mostrar_navegacion(sesion);
                    mostrar_sidebar(sesion);
                    $('#avatar_menu').attr('src','util/img/users/' + sesion.avatar);
                    $('#usuario_menu').text(sesion.user);
                    read_notificaciones();//trae las notificaciones dependiendo del usuario
                    read_favoritos();
                }else{
                    mostrar_sidebar();
                    mostrar_navegacion();
                }
                // setTimeout(mostrar_productos,650);
                mostrar_productos();
                CloseLoader();
                
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

    async function mostrar_productos(){
        funcion="mostrar_productos";
        let data = await fetch('controllers/ProductoTiendaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {

            let response = await data.text();
            try {
                let productos = JSON.parse(response);
                // console.log(productos);
                let template=``;
                productos.forEach(producto => {
                    template+=`
                    <div class="col-sm-2">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-sm-12">
                              <img src="util/img/producto/${producto.imagen}" alt="No ah colocado ninguna imagen" class="img-fluid">
                            </div>
                            <div class="col-sm-12">
                              <span class="text-muted float-left">${producto.marca}</span><br>
                              <a href="views/descripcion.php?name=${producto.producto}&&id=${producto.id}" class="titulo_producto">${producto.producto}</a><br>`
                if (producto.envio=='gratis') {
                    template+=`</br>`;
                    template+=`<span class="badge bg-success">Envío Gratis</span><br>`;
                }
                if (producto.calificacion!=0) {
                    template+=`</br>`;
                    for (let index = 0; index < producto.calificacion; index++) {
                        template+=`<i class="fa-solid fa-star fa-bounce" style="color: #fff700;"></i>`;
                    }
                    let estrellas_faltantes=5-producto.calificacion;
                    for(let index=0; index<estrellas_faltantes; index++){
                        template+=`<i class="fa-regular fa-star fa-bounce" style="color: #fff700;"></i>`;
                    }
                    template+=`</br>`;
                }
                if (producto.descuento!=0) {
                    template+=`
                    <span class="text-muted" style="text-decoration: line-through">COP/ ${producto.precio}</span>
                    <span class="text-muted">-${producto.descuento}%</span><br>
                    `;
                }
                    template+=`
                              <h4 class="text-danger">COP/ ${producto.precio_descuento}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                });
                $('loader_3').hide(500);
                $('#productos').html(template);
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
})