$(document).ready(function(){

    // var datatable;
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
    $('#active_nav_favoritos').addClass('active bg-black');

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
                    read_all_favoritos();
                    CloseLoader();
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

    async function read_all_favoritos(id_usuario){
        funcion="read_all_favoritos";
        let data = await fetch('../controllers/FavoritoController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion
        })
        if (data.ok) {
            let response = await data.text();
            console.log(response);
            try {
                let favoritos = JSON.parse(response);
                console.log(favoritos);
                
                let template='';
                let favorites = [];
                favoritos.forEach(favorito=>{
                    let template='';
                    template+=`
                        <div class="row">
                            <div class="col-sm-1 d-flex align-items-center justify-content-center">
                                <button type="button" class="btn eliminar_fav" attrid="${favorito.id}">
                                    <i class="fa-solid fa-trash" style="color: #bd0000;"></i>
                                </button>
                            </div>
                            <div class="col-sm-11">
                                <a href="../${favorito.url}" class="dropdown-item">
                                    <div class="media">
                                    <img src="../util/img/producto/${favorito.imagen}" alt="User Avatar" class="img-size-50 mr-3">
                                        <div class="media-body">
                                            <h3 class="dropdown-item-title">
                                                ${favorito.titulo}
                                            `;
                        
                        template+=`
                                            </h3>
                                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i>${favorito.precio}</p>
                                            <span class=" text-sm">${favorito.fecha_creacion}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `;
                    favorites.push({celda: template});
                });
                datatable=$('#fav').DataTable({
                    data: favorites,
                    "aaSorting":[],
                    "searching":true,
                    "scrollX":true,
                    "autoWidth":false,
                    columns: [
                        {data: "celda"}
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

    async function eliminar_favorito(id_favorito){
        funcion="eliminar_favorito";
        let data = await fetch('../controllers/FavoritoController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id_favorito='+id_favorito
        })
        if (data.ok) {
            let response = await data.text();
            // console.log(response);
            try {
                let respuesta = JSON.parse(response);
                console.log(respuesta.mensaje);
                if (respuesta.mensaje=="favorito eliminado") {
                    toastr.success('El producto se eliminó de sus favoritos');
                }
                else if(respuesta.mensaje=="error al eliminar"){
                    toastr.error('No intente vulnerar el sistema');
                }
                read_all_favoritos();
                read_favoritos();
                

            } catch (error) {
                console.error(error);
                console.log(response);
                toastr.error('Comuniquese con el area de sistemas');
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo algún error!!',
                text: 'Por favor verifique su conexión '+data.status,
              })
        }
    }

    $(document).on('click', '.eliminar_fav',(e)=>{
        let elemento = $(this)[0].activeElement;//capturamos el elemento o boton
        let id = $(elemento).attr('attrid');
        console.log(id);
        eliminar_favorito(id);
        // eliminar_notificacion(id);
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