<?php
include_once '../util/config/config.php';
include_once '../models/Marca.php';
include_once '../models/SolicitudMarca.php';
include_once '../models/Historial.php';
include_once '../models/Usuario.php';
$marca = new Marca();
$solicitud_marca = new SolicitudMarca();
$historial = new Historial();
$usuario = new Usuario();
session_start();
date_default_timezone_set('America/Bogota');
$fecha_actual = date('d-m-Y');

if ($_POST['funcion'] == 'crear_solicitud_marca') {
    $id_usuario = $_SESSION['id'];
    $nombre = $_POST['nom_marc_sol'];
    $desc = $_POST['desc_sol'];
    $img = $_FILES['img_marc_sol']['name'];
    $marca->parecido($nombre); //nos conectamos con la función de ese modelo
    if (empty($marca->objetos)) {
        $solicitud_marca->parecido($nombre);
        if (empty($solicitud_marca->objetos)) {
            //Creacion solicitud marca
            $nombre_imagen = uniqid() . '-' . $img;
            $ruta = '../util/img/marca/' . $nombre_imagen;
            // el contenido de la img es el archivo temporal q se guarda en el navegador
            // eso se guarda en la ruta
            move_uploaded_file($_FILES['img_marc_sol']['tmp_name'], $ruta);
            // guardamos en la base de datos
            $solicitud_marca->solicitud($nombre, $desc, $nombre_imagen, $id_usuario);
            //mandamos informacion al historial
            $descripcion = 'Se ah enviado una solicitud de creación de la marca: ' . $nombre;
            $historial->crear_historial($descripcion, 2, 6, $id_usuario);
            $mensaje = 'Solicitud Marca Enviada';
            $json = array(
                'mensaje' => $mensaje
            );
            $jsonstring = json_encode($json);
            echo $jsonstring;
        } else {
            echo 'error_sol';
        }
    } else {
        echo 'error_marca';
    }
}

if($_POST['funcion']=='read_solicitudes'){
    $id_usuario = $_SESSION['id'];
    $solicitud_marca->read_solicitudes($id_usuario);
    // var_dump($solicitud_marca);
    $json=array();
    foreach ($solicitud_marca->objetos as $objeto) {
        if (!empty($objeto->aprobado_por)) {
            $usuario->obtener_datos($objeto->aprobado_por);
            $aprobado_por=$usuario->objetos[0]->nombres.' '.$usuario->objetos[0]->apellidos;
        } else {
            $aprobado_por='';
        }
        
        $json[]=array(
            'id'=>openssl_encrypt($objeto->id,CODE,KEY),
            'nombre'=>$objeto->nombre,
            'descripcion'=>$objeto->descripcion,
            'imagen'=>$objeto->imagen,
            'fecha_creacion'=>$objeto->fecha_creacion,
            'estado'=>$objeto->estado,
            'estado_envio'=>$objeto->estado_solicitud,
            'estado_aprobado'=>$aprobado_por,
            'observacion'=>$objeto->observacion,
            'tipo_usuario'=>$_SESSION['tipo_usuario']
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}

if($_POST['funcion']=='editar_solicitud'){
    $id_usuario=$_SESSION['id'];
    $nombre=$_POST['nom_marc_mod_sol'];
    $desc=$_POST['desc_mod_sol'];
    $img=$_FILES['img_marc_mod_sol']['name'];
    $formateado = str_replace(" ","+",$_POST['id_marc_mod_sol']);
    $id_solicitud = openssl_decrypt($formateado,CODE,KEY);
    $mensaje='';
    $nombre_imagen='';
    $datos_cambiados='ha hecho los siguientes cambios: ';
    if(is_numeric($id_solicitud)){
        $solicitud_marca->obtener_solicitud($id_solicitud);
        // var_dump($marca);//var_dump daña la conversion a json
        if($nombre!=$solicitud_marca->objetos[0]->nombre || $img!='' || $desc!=$solicitud_marca->objetos[0]->descripcion){
            if ($nombre!=$solicitud_marca->objetos[0]->nombre) {
                $datos_cambiados.='Una marca cambió su nombre de '.$solicitud_marca->objetos[0]->nombre.' a '.$nombre.','; 
            }
            if ($desc!=$solicitud_marca->objetos[0]->descripcion) {
                $datos_cambiados.='Una marca cambió su descripción de '.$solicitud_marca->objetos[0]->descripcion.' a '.$desc.','; 
            }
            if ($img!='') {
                $datos_cambiados.='La imagen de la marca fue cambiada';
                $nombre_imagen=uniqid().'-'.$img;//uniquid crea un numero aleatorio
                $ruta='../util/img/marca/'.$nombre_imagen;
                // el contenido de la img es el archivo temporal q se guarda en el navegador
                // eso se guarda en la ruta
                move_uploaded_file($_FILES['img_marc_mod_sol']['tmp_name'],$ruta);
                //ya que es diferente de vacio borramos la img y colocamos la otra
                $avatar_actual=$solicitud_marca->objetos[0]->imagen;
                if ($avatar_actual!='marca_default.png') {//si la imagen es diferente de la acutal....
                    unlink('../util/img/marca/'.$avatar_actual);//entonces remplaza esa imagen eliminando la anterior
                }
            }
            $solicitud_marca->editar($id_solicitud,$nombre,$desc,$nombre_imagen);
            $descripcion='Has editado una solicitud de una marca: '.$datos_cambiados; 
            $historial->crear_historial($descripcion,1,6,$id_usuario);
            $mensaje='success';
        }else{
            $mensaje='danger';//no alteró nada
        }
        $json=array(
            'mensaje'=>$mensaje,
            'nombre_marca_sol'=>$nombre,
            'desc_marca_sol'=>$desc,
            'img_sol'=>$nombre_imagen
        );
        $jsonstring=json_encode($json);
        echo $jsonstring;
    }else{
        echo 'error';
    }
    
}

if($_POST['funcion']=='eliminar_solicitud'){
    $id_usuario=$_SESSION['id'];
    $nombre=$_POST['nombre'];
    $formateado = str_replace(" ","+",$_POST['id']);
    $id_solicitud = openssl_decrypt($formateado,CODE,KEY);
    if (is_numeric($id_solicitud)) {
        $solicitud_marca->eliminar_solicitud($id_solicitud);
        $descripcion='Has eliminado una solicitud de una marca: '.$nombre;
        $historial->crear_historial($descripcion,3,6,$id_usuario);
        $mensaje='success';
        $json=array(
            'mensaje'=>$mensaje,
        );
        $jsonstring=json_encode($json);
        echo $jsonstring;
    } else {
        echo 'error';
    }
}

if($_POST['funcion']=='enviar_solicitud'){
    $id_usuario=$_SESSION['id'];
    $nombre=$_POST['nombre'];
    $formateado = str_replace(" ","+",$_POST['id']);
    $id_solicitud = openssl_decrypt($formateado,CODE,KEY);
    if (is_numeric($id_solicitud)) {
        $solicitud_marca->enviar_solicitud($id_solicitud);
        // Envio de mensajes
        // $descripcion='Has enviado una solicitud de una marca: '.$nombre;
        // $historial->crear_historial($descripcion,3,6,$id_usuario);
        $mensaje='success';
        $json=array(
            'mensaje'=>$mensaje,
        );
        $jsonstring=json_encode($json);
        echo $jsonstring;
    } else {
        echo 'error';
    }
}

if($_POST['funcion']=='read_solicitudes_por_aprobar'){
    $id_usuario = $_SESSION['id'];
    $solicitud_marca->read_solicitudes_por_aprobar();
    // var_dump($solicitud_marca);
    $json=array();
    foreach ($solicitud_marca->objetos as $objeto) {
        $json[]=array(
            'id'=>openssl_encrypt($objeto->id,CODE,KEY),
            'nombre'=>$objeto->nombre,
            'descripcion'=>$objeto->descripcion,
            'imagen'=>$objeto->imagen,
            'fecha_creacion'=>$objeto->fecha_creacion,
            'solicitante'=>$objeto->nombres.' '.$objeto->apellidos,
            'tipo_usuario'=>$_SESSION['tipo_usuario']
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}

if($_POST['funcion']=='aprobar_solicitud'){
    $id_usuario=$_SESSION['id'];
    $nombre=$_POST['nombre'];
    $formateado = str_replace(" ","+",$_POST['id']);
    $id_solicitud = openssl_decrypt($formateado,CODE,KEY);
    if (is_numeric($id_solicitud)) {
        $marca->parecido($nombre); //nos conectamos con la función de ese modelo
        if (empty($marca->objetos)) {
            //se aprueba la marca
            $solicitud_marca->aprobar_solicitud($id_solicitud,$id_usuario);
            //se crea la marca
            $solicitud_marca->obtener_solicitud($id_solicitud);
            $desc=$solicitud_marca->objetos[0]->descripcion;
            $imagen=$solicitud_marca->objetos[0]->imagen;
            $marca->crear($nombre,$desc,$imagen);
            $descripcion='Has aprobado una solicitud de una marca: '.$nombre;
            $historial->crear_historial($descripcion,1,6,$id_usuario);
            $mensaje='success';
        }
        else{
            //la marca ya existe y no se puede crear
            //rechazar la solicitud marca
            $observacion='No se aprobó la solicitud debido a la existencia de una marca con el mismo nombre: '.$nombre;
            $solicitud_marca->rechazar_solicitud($id_solicitud,$id_usuario,$observacion);
            $descripcion='Has rechazado una solicitud de una marca: '.$nombre;
            $historial->crear_historial($descripcion,1,6,$id_usuario);
            $mensaje="danger";
        }

        $json=array(
            'mensaje'=>$mensaje,
        );
        $jsonstring=json_encode($json);
        echo $jsonstring;
    } else {
        echo 'error';
    }
}