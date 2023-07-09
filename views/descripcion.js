$(document).ready(function(){

    Loader();
    // setTimeout(verificar_sesion,2000);

    verificar_sesion();
    // verificar_producto();
    toastr.options={
        'debug': false,
        'positionClass': 'toast-bottom-right',
        'onclick':null,
        'fadeIn':300,
        'fadeOut':1000,
        'timeOut':5000,
        'extendedTimeOut':1000
    }

    async function read_notificaciones(){
        funcion="read_notificaciones";
        let data = await fetch('../controllers/NotificacionController.php',{
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
                }else{
                    mostrar_sidebar();
                    mostrar_navegacion();
                }
                // setTimeout(mostrar_productos,650);
                verificar_producto();
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

    function carrusel_imagenes(producto){
        let template = '';
        if (producto.imagenes.length>0) {
                    template+=`
                    <div class="col-12">
                        <img id="imagen_principal" src="../util/img/producto/${producto.imagenes[0].nombre}" class="img-fluid" alt="todavía no hay imagen">
                    </div>
                    <div class="col-12 product-image-thumbs">
                    `;
                    producto.imagenes.forEach(imagen => {
                        console.log(imagen);
                        template+=`
                        <button prod_img="${imagen.nombre}" class="imagen_pasarelas product-image-thumb">
                            <img src="../util/img/producto/${imagen.nombre}">
                        </button>
                        `;
                    });
                    template+=`
                    </div>
                    `;
        } else {
                    template+=`
                    <div class="col-12">
                        <img id="imagen_principal" src="../util/img/producto/${producto.imagen}" class="product-image img-fluid" alt="todavía no hay imagen">
                    </div>
                    `;
        }
        $('loader_3').hide(500);
        $('#imagenes').html(template);
    }

    async function mostrar_titulo_favorito(){

        funcion="mostrar_titulo_favorito";
        let data = await fetch('../controllers/FavoritoController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {

            let response = await data.text();
            try {
                let producto=JSON.parse(response);
                console.log(producto);
                let template='';
                if (producto.usuario_sesion!='') {
                    if (producto.estado_favorito=='') {
                        template+=`${producto.producto} <button type="button" id_favorito="${producto.id_favorito}" estado_fav="${producto.estado_favorito}" class="btn bandera_favorito"><i class="fa-regular fa-heart" style="color: #d10000;"></i></button>`;
                    } else {
                        if (producto.estado_favorito=='I') {
                            template+=`${producto.producto} <button type="button" id_favorito="${producto.id_favorito}" estado_fav="${producto.estado_favorito}" class="btn bandera_favorito"><i class="fa-regular fa-heart" style="color: #d10000;"></i></button>`;
                        } else {
                            template+=`${producto.producto} <button type="button" id_favorito="${producto.id_favorito}" estado_fav="${producto.estado_favorito}" class="btn bandera_favorito"><i class="fa-solid fa-heart fa-beat" style="color: #d10000;"></i></button>`;
                        }
                    }
                } else {
                    template+=`${producto.producto}`;
                }
                $('#producto').html(template);
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

    function mostrar_informacion_precio(producto){
        let template='';
            if (producto.calificacion!=0) {
                // template+=`</br>`;
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
        template+=`<h4 class="text-danger">COP/ ${producto.precio_descuento}</h4>`;
        $('#informacion_precios').html(template);
    }

    function mostrar_informacion_envio(producto){
        let template='';
        if (producto.envio=='gratis') {
            template+=`
            <i class="fa-solid fa-cart-shopping fa-fade fa-lg" style="color: #04ff00;"></i>
            <span class="ml-1">Envio:  </span>
            <span class="badge bg-success">Envío Gratis</span><br>`;
        }else{
            template+=`
            <i class="fa-solid fa-cart-shopping fa-fade fa-lg" style="color: red;"></i>
            <span class="ml-1">Envio:  </span>
            <span class="mr-1">COP/ 2000.00</span><br>`;
        }
        template+=`</br>`;
        template+=`<i class="fas fa-store text-danger"></i>
                    <span class="ml-1">Recogelo en tienda: ${producto.direccion_tienda}</span>`;
        $('#informacion_envio').html(template);
    }

    function mostrar_tienda(producto){
        let template=`
        <h2 class="mb-0">
            <button class="btn btn-warning">
            <i class="fa-solid fa-star fa-beat" style="color: #000000;"></i><span class="ml-2">${producto.promedio_calificacion_tienda}</span>
            </button>
            <span>${producto.tienda}</span>
        </h2>

        <h4 class="mt-0">
            <small >${producto.numero_resenas}</small>
        </h4>

        <div class="mt-3 product-share">
            <a href="#" class="text-gray">
            <i class="fab fa-facebook-square fa-2x"></i>
            </a>
            <a href="#" class="text-gray">
            <i class="fab fa-twitter-square fa-2x"></i>
            </a>
            <a href="#" class="text-gray">
            <i class="fas fa-envelope-square fa-2x"></i>
            </a>
            <a href="#" class="text-gray">
            <i class="fas fa-rss-square fa-2x"></i>
            </a>
        </div>
        `;
        $('#tienda').html(template);
    }

    function mostrar_agregar_carrito(){
        let template=`
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <select id="cantidad_producto" class="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="btn btn-success btn-flat">
            <i class="fas fa-cart-plus fa-lg mr-2"></i>
            Agregar al Carrito
            </div>
        </div>
        `;
        $('#agregar_carrito').html(template);
    }

    function mostrar_caracteristicas(caracteristicas){
        let template=`
        <table class="table table-hover table-responsive">
            <thead>
                <tr>
                    <td>#</td>
                    <td>Caracteristicas</td>
                    <td>Descripción</td>
                </tr> 
            </thead>
            <tbody>`;

        let cont=0;
        caracteristicas.forEach(caracteristica=>{
            cont++;
            template+=`
                <tr>
                    <td>${cont}</td>
                    <td>${caracteristica.titulo}</td>
                    <td>${caracteristica.descripcion}</td>
                </tr>
            `;
        });

        template+=`
            </tbody>
        </table>
        `;
        
        $('#product-caract').html(template);
    }

    function mostrar_resenas(resenas){
        let template='';
        resenas.forEach(resena=>{
            template+=`
            <div class="card-comment">
                <!-- User image -->
                <img class="img-circle img-sm" src="../util/img/users/${resena.avatar}" alt="User Image">
                <div class="comment-text text-white">
                <span class="username text-white">
                    ${resena.usuario}
                    `;
            for (let index = 0; index < resena.calificacion; index++) {
                template+=`<i class="fa-solid fa-star fa-fade" style="color: #fff700;"></i>`;
            }
            let estrellas_faltantes=5-resena.calificacion;
            for(let index=0; index<estrellas_faltantes; index++){
                template+=`<i class="fa-regular fa-star fa-fade" style="color: #fff700;"></i>`;
            }
            template+=`
                    <span class="text-muted float-right text-white">${resena.fecha_creacion}</span>
                </span><!-- /.username -->
                ${resena.descripcion}
                </div>
                <!-- /.comment-text -->
            </div>
            `;
        })
        $('#resenas').html(template);
    }

    async function mostrar_comentarios(){
        funcion="mostrar_comentarios";
        let data = await fetch('../controllers/PreguntaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {

            let response = await data.text();
            try {
                let producto=JSON.parse(response);
                console.log(producto);
                let template='';
                if (producto.bandera=='2') {
                    template+=`
                    <div class="card-footer col-7 mx-auto">
                        <form id="form_pregunta">
                          <div class="input-group">
                          <img class="direct-chat-img" src="../util/img/users/${producto.avatar_sesion}" alt="Message User Image">
                            <input type="text" id="pregunta" placeholder="Hacer una pregunta..." class="form-control" required>
                            <span class="input-group-append">
                              <button type="submit" class="btn btn-primary">Enviar</button>
                            </span>
                          </div>
                        </form>
                    </div>
                    `;
                }
                template+=`
                <div class="direct-chat-messages direct-chat-danger col-7 mx-auto preguntas">
                `;
                producto.preguntas.forEach(pregunta => {
                    template+=`
                    <div class="direct-chat-msg">
                        <div class="direct-chat-infos clearfix">
                          <span class="direct-chat-name float-left">${pregunta.username}</span>
                          <span class="direct-chat-timestamp float-right">${pregunta.fecha_creacion}</span>
                        </div>
                        <!-- /.direct-chat-infos -->
                        <img class="direct-chat-img" src="../util/img/users/${pregunta.avatar}" alt="Message User Image">
                        <!-- /.direct-chat-img -->
                        <div class="direct-chat-text">
                          ${pregunta.contenido}
                        </div>`;
                    if (pregunta.estado_respuesta=='0') {
                        if (producto.bandera=='1') {
                            template+=`
                            <div class="card-footer">
                              <form">
                                <div class="input-group">
                                <img class="direct-chat-img" src="../util/img/users/${producto.avatar}" alt="Message User Image">
                                  <input type="text" placeholder="Responder pregunta..." class="form-control respuesta" required>
                                  <input type="hidden" value="${pregunta.id}" class="id_pregunta">
                                  <span class="input-group-append">
                                    <button type="submit" class="btn btn-danger enviar_respuesta">Enviar</button>
                                  </span>
                                </div>
                              </form>
                            </div>
                            `;
                        }
                    }else{
                        template+=`
                        <div class="direct-chat-msg right">
                          <div class="direct-chat-infos clearfix">
                            <span class="direct-chat-name float-right">${producto.username}</span>
                            <span class="direct-chat-timestamp float-left">${pregunta.respuesta.fecha_creacion}</span>
                          </div>
                          <img class="direct-chat-img" src="../util/img/users/${producto.avatar}" alt="Message User Image">
                          <div class="direct-chat-text">
                            ${pregunta.respuesta.contenido}
                          </div>
                        </div>
                        `;
                    }
                    template+=`    
                    </div>
                    `;
                })
                template+=`
                </div>
                `;
                $('#product-pre').html(template);
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

    async function verificar_producto(){
        funcion="verificar_producto";
        let data = await fetch('../controllers/ProductoTiendaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let producto = JSON.parse(response);
                console.log(producto);
                if (producto.usuario_sesion!='') {
                    read_notificaciones();//trae las notificaciones dependiendo del usuario
                }

                carrusel_imagenes(producto);
                mostrar_titulo_favorito();
                
                $('#marca').text('Marca: '+producto.marca).css('font-weight', 'bold');
                $('#sku').text('SKU: ' + producto.sku).css('font-weight', 'bold');
                
                mostrar_informacion_precio(producto);
                mostrar_informacion_envio(producto);
                mostrar_tienda(producto);
                if (producto.usuario_sesion!='') {
                    mostrar_agregar_carrito();
                }
                $('#product-desc').text(producto.detalles);
                mostrar_caracteristicas(producto.caracteristicas);
                mostrar_resenas(producto.resenas);
                mostrar_comentarios();
                
            } catch (error) {
                console.error(error);
                console.log(response);
                if (response=='error') {
                    location.href="../index.php";//redirigimos al index si la variable fue cambiada
                    alert("Ten en cuenta que cualquier modificación ilegal de los URLs está sujeta a acciones legales.");
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
              })
        }
    }
    $(document).on('click', '.imagen_pasarelas', (e)=>{
        let elemento=$(this)[0].activeElement;
        // console.log(elemento);
        let img=$(elemento).attr('prod_img');
        $('#imagen_principal').attr('src','../util/img/producto/' + img);
    })

    async function realizar_pregunta(pregunta){
        funcion="realizar_pregunta";
        let data = await fetch('../controllers/PreguntaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&pregunta='+pregunta
        })
        if (data.ok) {
            let response = await data.text();
            console.log(response);
            try {
                let respuesta = JSON.parse(response);
                console.log(respuesta);
                mostrar_comentarios();
                $('#form_pregunta').trigger('reset');
                read_notificaciones();
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


    $(document).on('submit', '#form_pregunta', (e)=>{
        let pregunta=$('#pregunta').val();
        realizar_pregunta(pregunta);
        e.preventDefault();
    })

    async function realizar_respuesta(respuesta, id_pregunta){
        funcion="realizar_respuesta";
        let data = await fetch('../controllers/RespuestaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&respuesta='+respuesta+'&&id_pregunta='+id_pregunta
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let respuesta = JSON.parse(response);
                console.log(respuesta);
                mostrar_comentarios();
                read_notificaciones();
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

    $(document).on('click', '.enviar_respuesta', (e)=>{
        let elemento=$(this)[0].activeElement.parentElement.parentElement;
        let respuesta=$(elemento).children('input.respuesta').val();
        let id_pregunta=$(elemento).children('input.id_pregunta').val();
        if (respuesta != '') {
            realizar_respuesta(respuesta, id_pregunta)
        } else {
            toastr.error('* la respuesta está vacia');
        }
        e.preventDefault();
    })

    async function cambiar_estado_favorito(id_favorito, estado_favorito){
        funcion="cambiar_estado_favorito";
        let data = await fetch('../controllers/FavoritoController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id_favorito='+id_favorito+'&&estado_favorito='+estado_favorito
        })
        if (data.ok) {
            let response = await data.text();
            console.log(response);
            try {
                let respuesta = JSON.parse(response);
                console.log(respuesta.mensaje);
                if (respuesta.mensaje=='add') {
                    toastr.success('se agregó a favoritos');
                }
                else if(respuesta.mensaje=='remove'){
                    toastr.success('se removió de favoritos');
                }
                else if(respuesta.mensaje=='error al eliminar'){
                    toastr.error('No intente vulnerar el sistema');
                }
                mostrar_titulo_favorito();
                read_favoritos();
                
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

    $(document).on('click', '.bandera_favorito', (e)=>{
        let elemento=$(this)[0].activeElement;
        let id_favorito = $(elemento).attr('id_favorito');
        let estado_favorito = $(elemento).attr('estado_fav');
        cambiar_estado_favorito(id_favorito, estado_favorito);
    })

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
});