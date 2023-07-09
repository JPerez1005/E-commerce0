$(document).ready(function(){

    var datatable;
    toastr.options={
        'debug': false,
        'positionClass': 'toast-bottom-right',
        'onclick':null,
        'fadeIn':300,
        'fadeOut':1000,
        'timeOut':5000,
        'extendedTimeOut':1000
    }

    verificar_sesion();
    $('#active_nav_notificaciones').addClass('active bg-black');

    async function read_notificaciones(id_usuario){
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
                if (notificaciones.length==0) {
                    template1+=`
                        <i class="fa-solid fa-bell" style="color: #ffdd00;"></i>
                    `;
                    template2+=`
                        Notificaciones
                    `;
                } else {
                    template1+=`
                        <i class="fa-solid fa-bell fa-shake" style="color: #ffdd00;"></i>
                        <span class="badge badge-warning navbar-badge">${notificaciones.length}</span>
                    `;
                    template2+=`
                        Notificaciones<span class="badge badge-warning right">${notificaciones.length}</span>
                    `;
                }
                $('#numero_notificacion').html(template1);
                $('#nav_cont_noti').html(template2);
                let template='';
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
                `;
                $('#notificaciones').html(template);
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
            console.log(response);
            try {
                let favoritos = JSON.parse(response);
                console.log(favoritos);
                let template1='';
                let template2='';
                if (favoritos.length==0) {
                    template1+=`
                        <i class="fa-solid fa-heart" style="color: #d10000;"></i>
                    `;
                    template2+=`
                        Favoritos
                    `;
                } else {
                    template1+=`
                        <i class="fa-solid fa-heart fa-beat" style="color: #d10000;"></i>
                        <span class="badge badge-warning navbar-badge">${favoritos.length}</span>
                    `;
                    template2+=`
                        Favoritos<span class="badge badge-warning right">${favoritos.length}</span>
                    `;
                }
                $('#numero_favorito').html(template1);
                $('#nav_cont_fav').html(template2);
                let template='';
                if (notificaciones.length==1) {
                    template+=`
                        <span class="dropdown-item dropdown-header">${favoritos.length} Favoritos</span>
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
                `;
                $('#favoritos').html(template);
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

    function verificar_sesion() {
        funcion = 'verificar_sesion';
        $.post('../controllers/UsuarioController.php', { funcion }, (response)=> {
            console.log(response);
            if (response !='') {//si estamos logueados entonces....
                let sesion=JSON.parse(response);
                $('#nav_login').hide();
                $('#nav_register').hide();
                $('#usuario_nav').text(sesion.user+ ' #' + sesion.id);
                $('#avatar_nav').attr('src','../util/img/users/' + sesion.avatar);
                $('#avatar_menu').attr('src','../util/img/users/' + sesion.avatar);
                $('#usuario_menu').text(sesion.user);
                read_notificaciones();//trae las notificaciones dependiendo del usuario
                read_all_notificaciones();
                $('#notificacion').show();
                $('#nav_notificaciones').show();
                read_favoritos();//
                $('#favorito').show();
                $('#nav_favoritos').show();
            }else{
                $('#nav_usuario').hide();
                $('#notificacion').hide();
                $('#nav_notificaciones').hide();
                $('#favorito').hide();
                $('#nav_favoritos').hide();
                location.href='login.php';
            }
        })
    }//cuando ya hay una sesion verificada, no se puede volver a iniciar sesion

    async function read_all_notificaciones(id_usuario){
        funcion="read_all_notificaciones";
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
                let template='';
                let notification = [];
                notificaciones.forEach(notificacion=>{
                    let template='';
                    template+=`
                        <div class="row">
                            <div class="col-sm-1 d-flex align-items-center justify-content-center">
                                <button type="button" class="btn eliminar_noti" attrid="${notificacion.id}">
                                    <i class="fa-solid fa-trash" style="color: #bd0000;"></i>
                                </button>
                            </div>
                            <div class="col-sm-11">
                                <a href="../${notificacion.url_1}&&noti=${notificacion.id}" class="dropdown-item">
                                    <div class="media">
                                    <img src="../util/img/producto/${notificacion.imagen}" alt="User Avatar" class="img-size-50 mr-3">
                                        <div class="media-body">
                                            <h3 class="dropdown-item-title">
                                                ${notificacion.titulo}
                                            `;
                        if (notificacion.estado_abierto=='0') {
                            template+=`<i class="fa-solid fa-bell fa-bounce float-right" style="color: #ffdd00;"></i>`;
                        } else {
                            template+=`<i class="fa-solid fa-bell float-right" style="color: #1eff00;"></i>`;
                        }
                        template+=`
                                            </h3>
                                            <p class="text-sm">${notificacion.asunto}</p>
                                            <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i>${notificacion.contenido}</p>
                                            <span class=" text-sm">${notificacion.fecha_creacion}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `;
                    notification.push({celda: template});
                });
                datatable=$('#noti').DataTable({
                    data: notification,
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


    async function eliminar_notificacion(id_notificacion){
        funcion="eliminar_notificacion";
        let data = await fetch('../controllers/NotificacionController.php',{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:'funcion='+funcion+'&&id_notificacion='+id_notificacion
        })
        if (data.ok) {
            let response = await data.text();
            console.log(response);
            try {
                let respuesta = JSON.parse(response);
                console.log(respuesta);
                if (respuesta.mensaje1=="notificacion eliminada") {
                    toastr.success('El item se eliminó de sus notificaciones');
                }
                else if(respuesta.mensaje1=="error al eliminar"){
                    toastr.error('No intente vulnerar el sistema');
                }else{
                    toastr.error('Comuniquese con el area de sistemas');
                }
                read_all_notificaciones();
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

    $(document).on('click', '.eliminar_noti',(e)=>{
        let elemento = $(this)[0].activeElement;
        let id = $(elemento).attr('attrid');
        eliminar_notificacion(id);
    })

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