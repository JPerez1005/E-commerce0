$(document).ready(function(){
    toastr.options={
        'debug': false,
        'positionClass': 'toast-bottom-right',
        'onclick':null,
        'fadeIn':300,
        'fadeOut':1000,
        'timeOut':5000,
        'extendedTimeOut':1000
    }

    Loader();
    // setTimeout(verificar_sesion,2000);
    verificar_sesion();
    bsCustomFileInput.init();
    $('#btn_adm').hide();
    $('#btn_ven').hide();

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
                </li>`;
            if (usuario.tipo_usuario==1) {
                template+=`<li class="nav-header">Producto</li>
                <li id="nav_marcas" class="nav-item">
                    <a id="active_nav_marcas" href="../views/marcas.php" class="nav-link">
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
                    <a id="active_nav_marcas" href="../views/marcas.php" class="nav-link">
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
                    <a id="active_nav_marcas" href="../views/marcas.php" class="nav-link">
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

    async function verificar_sesion(){
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
                    if (sesion.tipo_usuario!=4) {
                        mostrar_navegacion(sesion);
                        mostrar_sidebar(sesion);
                        $('#active_nav_marcas').addClass('active bg-black');
                        $('#avatar_menu').attr('src','../util/img/users/' + sesion.avatar);
                        $('#usuario_menu').text(sesion.user);
                        read_notificaciones();//trae las notificaciones dependiendo del usuario
                        read_favoritos();//
                        read_all_marcas();
                        if (sesion.tipo_usuario==1 || sesion.tipo_usuario==2) {
                            read_solicitudes_por_aprobar();
                            CloseLoader();
                            $('#btn_adm').show();
                        } else if(sesion.tipo_usuario==3){
                            CloseLoader();
                            $('#btn_ven').show();
                            read_solicitudes();
                        }
                    } else {
                        location.href='../index.php';
                    }
                }else{
                    location.href='login.php';
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
    }//cuando ya hay una sesion verificada, no se puede volver a iniciar sesion

    async function read_all_marcas(){
        funcion="read_all_marcas";
        let data = await fetch('../controllers/MarcaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let marcas = JSON.parse(response);
                // console.log(marcas);
                datatable=$('#marca').DataTable({
                    data: marcas,
                    "aaSorting":[],
                    "searching":true,
                    "paging": false,
                    "autoWidth":false,
                    "responsive":true,
                    "processing":true,
                    columns: [
                        {data: "nombre"},
                        {data: "descripcion"},
                        {
                            'render':function(data,type,datos,meta){
                                return `<img width="100" height="100" object-fit="cover" src="../util/img/marca/${datos.imagen}">`;
                            }
                        },
                        {data: "fecha_creacion"},
                        {
                            'render':function(data,type,datos,meta){
                                if (datos.tipo_usuario==3) {
                                    return `<button class="alerta_usuario btn btn-info" title="Editar Marca" type="button"><i class="fas fa-pencil-alt"></i></button>
                                            <button class="alerta_usuario btn btn-danger" title="Eliminar Marca" type="button"><i class="fas fa-trash-alt"></i></button>`;
                                } else {
                                    return `<button id="${datos.id}" nombre="${datos.nombre}" img="${datos.imagen}" desc="${datos.descripcion}" class="edit btn btn-info" title="Editar Marca" type="button" data-bs-toggle="modal" data-bs-target="#modal_editar_marca"><i class="fas fa-pencil-alt"></i></button>
                                            <button id="${datos.id}" nombre="${datos.nombre}" img="${datos.imagen}" class="remove btn btn-danger" title="Eliminar Marca" type="button"><i class="fas fa-trash-alt"></i></button>`;
                                }
                            }
                        },
                    ],
                    "destroy":true,
                    "language":colombia
                });
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

    async function read_solicitudes(){
        funcion="read_solicitudes";
        let data = await fetch('../controllers/SolicitudMarcaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let solicitudes = JSON.parse(response);
                // console.log(solicitudes);
                datatable=$('#mis_solicitudes_marcas').DataTable({
                    data: solicitudes,
                    "aaSorting":[],
                    "searching":true,
                    "paging": false,
                    "autoWidth":false,
                    "responsive":true,
                    "processing":true,
                    columns: [
                        {data: "nombre"},
                        {data: "descripcion"},
                        {
                            'render':function(data,type,datos,meta){
                                return `<img width="100" height="100" object-fit="cover" src="../util/img/marca/${datos.imagen}">`;
                            }
                        },
                        {
                            'render':function(data,type,datos,meta){
                                if (datos.estado_envio==0) {
                                    return `<button id="${datos.id}" nombre="${datos.nombre}" class="send_sol btn btn-outline-primary">Enviar</button>`;
                                }else if(datos.estado_envio==1){
                                    return `<span class="badge bg-primary">Enviado...</span>`;
                                }else if(datos.estado_envio==2){
                                    return `<span class="badge bg-success">Aceptado!!!</span>`;
                                }else if(datos.estado_envio==3){
                                    return `<span class="badge bg-danger">Su solicitud, no fue Aprobada</span>
                                            </br>
                                            <span>${datos.observacion}</span>`;
                                }
                            }
                        },
                        {
                            'render':function(data,type,datos,meta){
                                if (datos.estado_aprobado=='' || datos.estado_aprobado=='null') {
                                    return `<span class="badge bg-info">En espera...</span>`;
                                } else {
                                    return `<span>${datos.estado_aprobado}</span>`
                                }
                            }
                        },
                        {data: "fecha_creacion"},
                        {
                            'render':function(data,type,datos,meta){
                                if (datos.estado_envio==0) {
                                    return `<button id="${datos.id}" nombre="${datos.nombre}" img="${datos.imagen}" desc="${datos.descripcion}" class="edit_solicitud btn btn-info" title="Editar Solicitud" type="button" data-bs-toggle="modal" data-bs-target="#modal_editar_solicitud"><i class="fas fa-pencil-alt"></i></button>
                                            <button id="${datos.id}" nombre="${datos.nombre}" img="${datos.imagen}" class="remove_solicitud btn btn-danger" title="Eliminar Solicitud" type="button"><i class="fas fa-trash-alt"></i></button>`;
                                }else if(datos.estado_envio==1){
                                    return `<button class="alerta_solicitud_enviada btn btn-info" title="Editar Solicitud" type="button"><i class="fas fa-pencil-alt"></i></button>
                                            <button class="alerta_solicitud_enviada btn btn-danger" title="Eliminar Solicitud" type="button"><i class="fas fa-trash-alt"></i></button>`;
                                }else if(datos.estado_envio==2){
                                    return `<button class="alerta_solicitud_aprovada btn btn-info" title="Editar Solicitud" type="button"><i class="fas fa-pencil-alt"></i></button>
                                            <button id="${datos.id}" nombre="${datos.nombre}" img="${datos.imagen}" class="remove_solicitud btn btn-danger" title="Eliminar Solicitud" type="button"><i class="fas fa-trash-alt"></i></button>`;
                                }else if(datos.estado_envio==3){
                                    return `<button id="${datos.id}" nombre="${datos.nombre}" img="${datos.imagen}" desc="${datos.descripcion}" class="edit_solicitud btn btn-info" title="Editar Solicitud" type="button" data-bs-toggle="modal" data-bs-target="#modal_editar_solicitud"><i class="fas fa-pencil-alt"></i></button>
                                            <button id="${datos.id}" nombre="${datos.nombre}" img="${datos.imagen}" class="remove_solicitud btn btn-danger" title="Eliminar Solicitud" type="button"><i class="fas fa-trash-alt"></i></button>`;
                                }
                            }
                        },
                    ],
                    "destroy":true,
                    "language":colombia
                });
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

    async function read_solicitudes_por_aprobar(){
        funcion="read_solicitudes_por_aprobar";
        let data = await fetch('../controllers/SolicitudMarcaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let solicitudes = JSON.parse(response);
                // console.log(solicitudes);
                datatable=$('#solicitudes_por_aprobar').DataTable({
                    data: solicitudes,
                    "aaSorting":[],
                    "searching":true,
                    "paging": false,
                    "autoWidth":false,
                    "responsive":true,
                    "processing":true,
                    columns: [
                        {data: "nombre"},
                        {data: "descripcion"},
                        {
                            'render':function(data,type,datos,meta){
                                return `<img width="100" height="100" object-fit="cover" src="../util/img/marca/${datos.imagen}">`;
                            }
                        },
                        {
                            data: 'solicitante'
                        },
                        {data: "fecha_creacion"},
                        {
                            'render':function(data,type,datos,meta){
                                return `<button id="${datos.id}" nombre="${datos.nombre}" img="${datos.imagen}" desc="${datos.descripcion}" class="aprobar_solicitud btn btn-success" title="Aprobar Solicitud" type="button"><i class="fas fa-check"></i></button>
                                <button id="${datos.id}" nombre="${datos.nombre}" img="${datos.imagen}" desc="${datos.descripcion}" class="rechazar_solicitud btn btn-danger" title="Rechazar Solicitud" type="button"><i class="fas fa-times"></i></button>`
                            }
                        },
                    ],
                    "destroy":true,
                    "language":colombia
                });
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

    async function crear_marca(datos){
        let data = await fetch('../controllers/MarcaController.php',{
            method:'POST',
            body: datos
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let respuesta = JSON.parse(response);
                if (respuesta.mensaje=="Marca Creada") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha agregado la marca.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        $('#form-marca').trigger('reset');//reseteamos el formulario
                        read_all_marcas();
                    })
                }
            } catch (error) {
                console.error(error);
                console.log(response);
                Swal.fire({
                    icon: 'warning',
                    title: 'Hubo algún Error!!',
                    text: 'Por favor Comuniquese con el area de sistemas.'
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
    }

    // Validaciones---------------------------------------------------------------
    // el siguiente evento se ejecuta cuando las validaciones ya están correctas
    // tambien caundo el boton submit del formulario sea presionado
    $.validator.setDefaults({
        submitHandler: function () {
            let funcion='crear_marca';
            let datos=new FormData($('#form-marca')[0]);
            datos.append('funcion',funcion);
            crear_marca(datos);
        }
    });

    $('#form-marca').validate({//este tipo de reglas vienen por defecto
    rules: {
        nom_marc: {
            required: true
        },
        desc: {
            required: true
        },
        img_marc: {
            required: true,
            extension: "png|jpg|jpeg|jfif"
        }
    },
    messages: {
        nom_marc:{
            required: "*Este campo es obligatorio"
        },
        desc:{
            required: "*Este campo es obligatorio"
        },
        img_marc:{
            required: "*Este campo es obligatorio",
            extension: 'Solo es valido el formato: png,jpg,jpeg'
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

    // el uso de los componentes de carga-------------------------------------------
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

    //El uso de eventos--------------------------------------------------------------
    $(document).on('click', '.edit', function (e) { // Utilizamos function en lugar de ()=>
        $('#form_marca_mod').trigger('reset');//reseteamos el formulario
        let elemento = e.currentTarget; // Utilizamos e.currentTarget para obtener el elemento que desencadenó el evento
        let id = $(elemento).attr('id');
        let nombre = $(elemento).attr('nombre');
        let img = $(elemento).attr('img');
        let descripcion = $(elemento).attr('desc');
        // console.log(id, nombre, img);
        $('#widget_nombre_marca').text(nombre);
        $('#widget_desc_marca').text(descripcion);
        $('#widget_imagen_marca').attr('src','../util/img/marca/'+img);
        $('#nom_marc_mod').val(nombre);
        $('#desc_mod').val(descripcion);
        $('#id_marc_mod').val(id);
        // console.log(id);
    });

    async function editar_marca(datos){
        let data = await fetch('../controllers/MarcaController.php',{
            method:'POST',
            body: datos
        })
        if (data.ok) {
            let response = await data.text();
            try {
                let respuesta = JSON.parse(response);
                // console.log(respuesta);
                if (respuesta.mensaje=="success") {
                    $('#form_marca_mod').trigger('reset');//reseteamos el formulario
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha editado la marca.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        $('#widget_nombre_marca').text(respuesta.nombre_marca);
                        $('#widget_desc_marca').text(respuesta.desc_marca);
                        if(respuesta.img!=''){
                            $('#widget_imagen_marca').attr('src','../util/img/marca/'+respuesta.img);
                        }
                        read_all_marcas();
                        $('#form_marca_mod').trigger('reset');//reseteamos el formulario
                        //con la ayuda del selector de jquery quitamos el modal
                        $('#modal_editar_marca').modal('hide')//hide para ocultar el modal con el selector
                    })
                }else if(respuesta.mensaje=="danger"){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error!!',
                        text: 'No hizo ningún cambio.'
                    })
                }
            } catch (error) {
                console.error(error);
                console.log(response);
                if (response=='error') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cuidado!!',
                        text: 'No intente vulnerar el sistema.'
                    })
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

    $.validator.setDefaults({
        submitHandler: function () {
            let funcion="editar_marca";
            let datos=new FormData($('#form_marca_mod')[0]);
            datos.append('funcion',funcion);
            editar_marca(datos);
            //editar_marca(datos);//mandamos los datos a la funcion
        }
    });

    $('#form_marca_mod').validate({//este tipo de reglas vienen por defecto
        rules: {
            nom_marc_mod: {
                required: true
            },
            desc_mod: {
                required: true
            },
            img_marc_mod: {
                extension: "png|jpg|jpeg|jfif"
            }
        },
        messages: {
            nom_marc_mod:{
                required: "*Este campo es obligatorio"
            },
            desc_mod:{
                required: "*Este campo es obligatorio"
            },
            img_marc_mod:{
                extension: 'Solo es valido el formato: png,jpg,jpeg'
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

    async function eliminar_marca(id,nombre){
        let funcion="eliminar_marca";
        let respuesta=''
        let data = await fetch('../controllers/MarcaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id='+id+'&&nombre='+nombre
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                respuesta = JSON.parse(response);
                // console.log(marcas);
            } catch (error) {
                console.error(error);
                console.log(response);
                if (response=='error') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cuidado!!',
                        text: 'No intente vulnerar el sistema.'
                    })
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
        return respuesta;
    }

    $(document).on('click', '.remove', function (e) { // Utilizamos function en lugar de ()=>
        let elemento = e.currentTarget; // Utilizamos e.currentTarget para obtener el elemento que desencadenó el evento
        let id = $(elemento).attr('id');
        let nombre = $(elemento).attr('nombre');
        let img = $(elemento).attr('img');
        // console.log(id,nombre,img);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-2',
                cancelButton: 'btn btn-danger mr-2'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Estas seguro de eliminar la marca '+nombre+'?',
            text: "You won't be able to revert this!",
            imageUrl: '../util/img/marca/'+img,
            imageWidth: 100,
            imageHeight: 100,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                eliminar_marca(id,nombre).then(respuesta=>{
                    if (respuesta.mensaje=='success'){
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your brand '+nombre+' has been deleted.',
                            'success'
                        )
                        read_all_marcas();
                    }
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your brand '+nombre+' is safe :)',
                    'error'
                )
            }
        })
    });

    $(document).on('click', '.alerta_usuario', function (e) { // Utilizamos function en lugar de ()=>
        toastr.error('No tienes permiso para realizar esta accion','Error!');
    });

    $(document).on('click', '.alerta_solicitud_enviada', function (e) { // Utilizamos function en lugar de ()=>
        toastr.warning('La solicitud ya fue enviada, no se puede editar ni eliminar','Cuidado!');
    });

    $(document).on('click', '.alerta_solicitud_aprobada', function (e) { // Utilizamos function en lugar de ()=>
        toastr.warning('La solicitud fue aprobada, no se puede editar la solicitud','Cuidado!');
    });

    // Creación de las solicitudes de las marcas

    async function crear_solicitud_marca(datos){
        let data = await fetch('../controllers/SolicitudMarcaController.php',{
            method:'POST',
            body: datos
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let respuesta = JSON.parse(response);
                if (respuesta.mensaje=="Solicitud Marca Enviada") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha creado la solicitud de la marca.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        $('#form_marca_sol').trigger('reset');//reseteamos el formulario
                        read_solicitudes();
                    })
                }
            } catch (error) {
                console.error(error);
                console.log(response);
                if (response=='error_marca') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cuidado!!',
                        text: 'La marca ya existe.'
                    })
                } else if(response=='error_sol'){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cuidado!!',
                        text: 'Ya hay una solicitud existente para esta marca.'
                    })
                }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Hubo algún Error!!',
                        text: 'Por favor Comuniquese con el area de sistemas.'
                    })
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

    $.validator.setDefaults({
        submitHandler: function () {
            let funcion='crear_solicitud_marca';
            let datos=new FormData($('#form_marca_sol')[0]);
            datos.append('funcion',funcion);
            crear_solicitud_marca(datos);
        }
    });

    $('#form_marca_sol').validate({//este tipo de reglas vienen por defecto
    rules: {
        nom_marc_sol: {
            required: true
        },
        desc_sol: {
            required: true
        },
        img_marc_sol: {
            required: true,
            extension: "png|jpg|jpeg|jfif"
        }
    },
    messages: {
        nom_marc_sol:{
            required: "*Este campo es obligatorio"
        },
        desc_sol:{
            required: "*Este campo es obligatorio"
        },
        img_marc_sol:{
            required: "*Este campo es obligatorio",
            extension: 'Solo es valido el formato: png,jpg,jpeg'
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

    // Editar las solicitudes de las marcas
    $(document).on('click', '.edit_solicitud', function (e) { // Utilizamos function en lugar de ()=>
        let elemento = e.currentTarget; // Utilizamos e.currentTarget para obtener el elemento que desencadenó el evento
        let id = $(elemento).attr('id');
        let nombre = $(elemento).attr('nombre');
        let img = $(elemento).attr('img');
        let descripcion = $(elemento).attr('desc');
        // console.log(id, nombre, img, descripcion);
        $('#widget_nombre_sol').text(nombre);
        $('#widget_desc_sol').text(descripcion);
        $('#widget_imagen_sol').attr('src','../util/img/marca/'+img);
        $('#nom_marc_mod_sol').val(nombre);
        $('#desc_mod_sol').val(descripcion);
        $('#id_marc_mod_sol').val(id);
        console.log(id);
    });

    async function editar_solicitud(datos){
        let data = await fetch('../controllers/SolicitudMarcaController.php',{
            method:'POST',
            body: datos
        })
        if (data.ok) {
            let response = await data.text();
            try {
                let respuesta = JSON.parse(response);
                console.log(respuesta);
                if (respuesta.mensaje=="success") {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Se ha editado la solicitud de la marca.',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        //estos parametros nos los envia el controladord y los recibimos
                        $('#widget_nombre_sol').text(respuesta.nombre_sol);
                        $('#widget_desc_sol').text(respuesta.desc_sol);
                        if(respuesta.img_sol!=''){
                            $('#widget_imagen_sol').attr('src','../util/img/marca/'+respuesta.img_sol);
                        }
                        read_solicitudes();
                        $('#form_marca_mod_sol').trigger('reset');//reseteamos el formulario
                        //con la ayuda del selector de jquery quitamos el modal
                        $('#modal_editar_solicitud').modal('hide')//hide para ocultar el modal con el selector
                    })
                }else if(respuesta.mensaje=="danger"){
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error!!',
                        text: 'No hizo ningún cambio.'
                    })
                }
            } catch (error) {
                console.error(error);
                console.log(response);
                if (response=='error') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cuidado!!',
                        text: 'No intente vulnerar el sistema.'
                    })
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

    $.validator.setDefaults({
        submitHandler: function () {
            // alert('validado');
            let funcion="editar_solicitud";
            let datos=new FormData($('#form_marca_mod_sol')[0]);
            datos.append('funcion',funcion);
            editar_solicitud(datos);//mandamos los datos a la funcion
        }
    });

    $('#form_marca_mod_sol').validate({//este tipo de reglas vienen por defecto
        rules: {
            nom_marc_mod_sol: {
                required: true
            },
            desc_mod_sol: {
                required: true
            },
            img_marc_mod_sol: {
                extension: "png|jpg|jpeg|jfif"
            }
        },
        messages: {
            nom_marc_mod_sol:{
                required: "*Este campo es obligatorio"
            },
            desc_mod_sol:{
                required: "*Este campo es obligatorio"
            },
            img_marc_mod_sol:{
                extension: 'Solo es valido el formato: png,jpg,jpeg'
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

    /*Eliminamos la solicitud de la marca*/
    async function eliminar_solicitud(id,nombre){
        let funcion="eliminar_solicitud";
        let respuesta=''
        let data = await fetch('../controllers/SolicitudMarcaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id='+id+'&&nombre='+nombre
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                respuesta = JSON.parse(response);
                // console.log(marcas);
            } catch (error) {
                console.error(error);
                console.log(response);
                if (response=='error') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cuidado!!',
                        text: 'No intente vulnerar el sistema.'
                    })
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
        return respuesta;
    }

    $(document).on('click', '.remove_solicitud', function (e) { // Utilizamos function en lugar de ()=>
        let elemento = e.currentTarget; // Utilizamos e.currentTarget para obtener el elemento que desencadenó el evento
        let id = $(elemento).attr('id');
        let nombre = $(elemento).attr('nombre');
        let img = $(elemento).attr('img');
        // console.log(id,nombre,img);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-2',
                cancelButton: 'btn btn-danger mr-2'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Estas seguro de eliminar la solicitud de la marca '+nombre+'?',
            text: "You won't be able to revert this!",
            imageUrl: '../util/img/marca/'+img,
            imageWidth: 100,
            imageHeight: 100,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                eliminar_solicitud(id,nombre).then(respuesta=>{
                    console.log(respuesta);
                    if (respuesta.mensaje=='success'){
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your brand '+nombre+' has been deleted.',
                            'success'
                        )
                        read_solicitudes();
                    }
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your brand '+nombre+' is safe :)',
                    'error'
                )
            }
        })
    });

    /*Envio de las solicitudes */
    async function enviar_solicitud(id,nombre){
        let funcion="enviar_solicitud";
        let data = await fetch('../controllers/SolicitudMarcaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id='+id+'&&nombre='+nombre
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let respuesta = JSON.parse(response);
                if (respuesta.mensaje=="success") {
                    toastr.success('La solicitud marca '+nombre+' fue enviada correctamente','solicitud enviada');
                    read_solicitudes();
                }
                // console.log(respuesta);
            } catch (error) {
                console.error(error);
                console.log(response);
                if (response=='error') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cuidado!!',
                        text: 'No intente vulnerar el sistema.'
                    })
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

    $(document).on('click', '.send_sol', function (e) { // Utilizamos function en lugar de ()=>
        let elemento = e.currentTarget; // Utilizamos e.currentTarget para obtener el elemento que desencadenó el evento
        let id = $(elemento).attr('id');
        let nombre = $(elemento).attr('nombre');
        // console.log(id, nombre);
        // console.log(id);
        enviar_solicitud(id,nombre);
    });

    /*Aprobar solicitud */

    async function aprobar_solicitud(id,nombre){
        let funcion="aprobar_solicitud";
        let respuesta=''
        let data = await fetch('../controllers/SolicitudMarcaController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id='+id+'&&nombre='+nombre
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                respuesta = JSON.parse(response);
                // console.log(marcas);
            } catch (error) {
                console.error(error);
                console.log(response);
                if (response=='error') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cuidado!!',
                        text: 'No intente vulnerar el sistema.'
                    })
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
            })
        }
        return respuesta;
    }

    $(document).on('click', '.aprobar_solicitud', function (e) { // Utilizamos function en lugar de ()=>
        let elemento = e.currentTarget; // Utilizamos e.currentTarget para obtener el elemento que desencadenó el evento
        let id = $(elemento).attr('id');
        let nombre = $(elemento).attr('nombre');
        let img = $(elemento).attr('img');
        let descripcion = $(elemento).attr('desc');
        // console.log(id,nombre,img);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success ml-2',
                cancelButton: 'btn btn-danger mr-2'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Desea aprobar la solicitud de la marca '+nombre+'?',
            //text: "You won't be able to revert this!",
            imageUrl: '../util/img/marca/'+img,
            imageWidth: 100,
            imageHeight: 100,
            showCancelButton: true,
            confirmButtonText: 'Yes, approve it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                aprobar_solicitud(id,nombre).then(respuesta=>{
                    console.log(respuesta);
                    if (respuesta.mensaje=='success'){
                        swalWithBootstrapButtons.fire(
                            'Aprobed!',
                            'Your brand '+nombre+' has been aprobed.',
                            'success'
                        )
                        read_solicitudes_por_aprobar();
                        read_all_marcas();
                    }else if(respuesta.mensaje=='danger'){
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Your brand '+nombre+' is not aprobed, that name is existing',
                            'error'
                        )
                        read_solicitudes_por_aprobar();
                    }
                })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your brand '+nombre+' is not aprobed',
                    'error'
                )
            }
        })
    });
})

// idioma del DATATABLE
let colombia = {
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Llenar",
        "fillHorizontal": "Llenar celdas horizontalmente",
        "fillVertical": "Llenar celdas verticalemente",
        "info": "Información"
    },
    "buttons": {
        "copy": "Copiar",
        "copySuccess": {
            "_": "Copiado con exito",
            "1": "Fila copiada con exito"
        },
        "copyTitle": "Tabla Copiada",
        "createState": "Crear estado",
        "pageLength": {
            "_": "ver %d filas",
            "-1": "Ver todas las Filas",
            "1": "Ver una fila"
        },
        "renameState": "Renombrar",
        "updateState": "Actualizar",
        "csv": "CSV",
        "excel": "Excel",
        "pdf": "PDF",
        "collection": "Colección",
        "colvis": "Visibilidad Columna",
        "colvisRestore": "Restaurar Visibilidad",
        "copyKeys": "Presione Inicio + C para copiar la información de la tabla.  Para Cancelar hacer click en este mensaje para o ESC",
        "print": "Imprimir",
        "removeAllStates": "Eliminar todos los estados",
        "removeState": "Eliminar",
        "savedStates": "Estados Guardados",
        "stateRestore": "Estado %d"
    },
    "datetime": {
        "months": {
            "0": "Enero",
            "1": "Febrero",
            "10": "Noviembre",
            "11": "Diciembre",
            "2": "Marzo",
            "3": "Abril",
            "4": "Mayo",
            "5": "Junio",
            "6": "Julio",
            "7": "Agosto",
            "8": "Septiembre",
            "9": "Octubre"
        },
        "weekdays": {
            "0": "Dom",
            "1": "Lun",
            "2": "Mar",
            "4": "Jue",
            "5": "Vie",
            "3": "Mié",
            "6": "Sáb"
        },
        "amPm": [
            "am",
            "pm"
        ],
        "previous": "Anterior",
        "next": "Siguiente",
        "hours": "Hora",
        "minutes": "Minuto",
        "seconds": "Segundo",
        "unknown": "Desconocido"
    },
    "editor": {
        "close": "Cerrar",
        "create": {
            "button": "Nuevo",
            "submit": "Crear",
            "title": "Crear nueva entrada"
        },
        "edit": {
            "button": "Editar",
            "submit": "Actualizar",
            "title": "Editar Registro"
        },
        "remove": {
            "button": "Borrar",
            "submit": "Borrar",
            "title": "Borrar",
            "confirm": {
                "_": "Esta seguro de eliminar %d registros",
                "1": "Esta seguro de eliminar 1 registro"
            }
        },
        "multi": {
            "info": "Los elementos seleccionados contienen diferentes valores para esta entrada. Para editar y configurar todos los elementos de esta entrada en el mismo valor, haga clic o toque aquí, de lo contrario, conservar sus valores individuales.",
            "noMulti": "Múltiples valores",
            "title": "Valores multiples",
            "restore": "Deshacer cambios"
        },
        "error": {
            "system": "Ha ocurrido un error del sistema ( Mas Información)"
        }
    },
    "emptyTable": "Tabla Vacia",
    "infoEmpty": "Sin informacion",
    "lengthMenu": "Entradas",
    "loadingRecords": "Cargando...",
    "searchBuilder": {
        "button": {
            "_": "Creador de búsquedas (%d)",
            "0": "Creador de búsquedas"
        },
        "clearAll": "Quitar filtro",
        "data": "Datos",
        "logicAnd": "Y",
        "logicOr": "O",
        "value": "Valor",
        "add": "Agragar condición",
        "condition": "Condición",
        "conditions": {
            "date": {
                "after": "Después",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual",
                "not": "No",
                "notBetween": "No Entre",
                "notEmpty": "No Vacío"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual",
                "gt": "Mayor",
                "gte": "Mayor o Igual",
                "lt": "Menor",
                "lte": "Menor o Igual",
                "not": "No",
                "notBetween": "No Entre",
                "notEmpty": "No vacío"
            },
            "string": {
                "contains": "Contine",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Iguales",
                "not": "No",
                "notEmpty": "No Vacío",
                "startsWith": "Empieza en",
                "notContains": "No Contiene",
                "notStartsWith": "No empieza en",
                "notEndsWith": "No finaliza en"
            },
            "array": {
                "equals": "Iguales",
                "empty": "Vacío",
                "contains": "Contiene",
                "not": "No",
                "notEmpty": "No Vacío",
                "without": "Con"
            }
        },
        "deleteTitle": "Eliminar regla",
        "leftTitle": "Izquierda",
        "rightTitle": "Derecha",
        "title": {
            "0": "Generador de Consultas",
            "_": "Generador de Consultas (%d)"
        }
    },
    "searchPanes": {
        "clearMessage": "Borrar Filtro",
        "collapseMessage": "desplegar todo",
        "loadMessage": "Cargando informacion",
        "showMessage": "Mostrar todos",
        "title": "Filtros Activos - %d",
        "collapse": {
            "0": "Paneles de Búsqueda",
            "_": "Paneles de Búsqueda (%d)"
        },
        "count": "Cuenta",
        "countFiltered": "Cuenta Filtro",
        "emptyPanes": "No hay información"
    },
    "searchPlaceholder": "Busqueda en tabla",
    "select": {
        "cells": {
            "_": "%d celdas seleccionadas",
            "1": "1 celda seleccionada"
        },
        "columns": {
            "_": "%d columnas seleccionadas",
            "1": "1 columna seleccionada"
        },
        "rows": {
            "1": "Fila seleccionada",
            "_": "Filas Seleccionadas"
        }
    },
    "aria": {
        "sortAscending": "Activar para ordenar ascendente",
        "sortDescending": "Activar para ordenar descendente"
    },
    "decimal": ".",
    "infoFiltered": "filtrado de _MAX_ entradas totales",
    "infoThousands": ",",
    "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "processing": "Procesando...",
    "search": "Buscar:",
    "thousands": ",",
    "zeroRecords": "No se encontro información",
    "stateRestore": {
        "creationModal": {
            "button": "Crear",
            "columns": {
                "search": "Búsqueda columnas",
                "visible": "Visibilidad de columa"
            },
            "name": "Nombre:",
            "order": "Ordenar",
            "paging": "Paginado",
            "scroller": "Posición desplazamiento",
            "search": "Buscar",
            "searchBuilder": "Generador de Consultas",
            "select": "Seleccionar",
            "title": "Crear Nuevo Estado",
            "toggleLabel": "Incluir:"
        },
        "duplicateError": "Ya existe un estado con este nombre",
        "emptyError": "El nombre no puede estar vacío",
        "emptyStates": "Estado sin Guardar",
        "removeConfirm": "Esta seguro de eliminar el estado %d?",
        "removeError": "Error al eliminar el estado",
        "removeJoiner": "y",
        "removeSubmit": "Eliminar",
        "removeTitle": "Eliminar Estado",
        "renameButton": "Eliminar",
        "renameLabel": "Nuevo nombre para %s",
        "renameTitle": "Renombrar Estado"
    },
    "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
    "infoPostFix": ""
};