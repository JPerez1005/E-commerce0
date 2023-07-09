<?php
include_once '../util/config/config.php';
include_once '../models/Notificacion.php';
include_once '../models/Historial.php';
$notificacion = new Notificacion();
$historial = new Historial();
session_start();

if($_POST['funcion']=='read_notificaciones'){
    if (!empty($_SESSION['id'])) {
        $id_usuario=$_SESSION['id'];
        $notificacion->read($id_usuario);
        // var_dump($notificacion);
        $json=array();
        foreach ($notificacion->objetos as $objeto) {
            $json[]=array(
                'id'=>openssl_encrypt($objeto->id,CODE,KEY),
                'titulo'=>$objeto->titulo,
                'contenido'=>$objeto->contenido,
                'imagen'=>$objeto->imagen,
                'url_1'=>$objeto->url_1,
                'fecha_creacion'=>$objeto->fecha_creacion,
            );
        }
        //codificamos el array a string
        $jsonstring = json_encode($json/*esta vez envia todos los datos*/);
        echo $jsonstring;
    } else {
        echo 'error, el usuario no está en session';
    }
    
}

if($_POST['funcion']=='read_all_notificaciones'){
    if (!empty($_SESSION['id'])) {
        $id_usuario=$_SESSION['id'];
        $notificacion->read_all_notificaciones($id_usuario);
        // var_dump($notificacion);
        $json=array();
        foreach ($notificacion->objetos as $objeto) {
            $json[]=array(
                'id'=>openssl_encrypt($objeto->id,CODE,KEY),
                'titulo'=>$objeto->titulo,
                'asunto'=>$objeto->asunto,
                'contenido'=>$objeto->contenido,
                'imagen'=>$objeto->imagen,
                'url_1'=>$objeto->url_1,
                'fecha_creacion'=>$objeto->fecha_creacion,
                'estado_abierto'=>$objeto->estado_abierto
            );
        }
        //codificamos el array a string
        $jsonstring = json_encode($json/*esta vez envia todos los datos*/);
        echo $jsonstring;
    } else {
        echo 'error, el usuario no está en session';
    }
    
}

if($_POST['funcion']=='eliminar_notificacion'){
    if (!empty($_SESSION['id'])) {
        $id_usuario=$_SESSION['id'];
        $id_notificacion_encryted = $_POST['id_notificacion'];
        $formateado = str_replace(" ","+",$id_notificacion_encryted);
        $id_notificacion = openssl_decrypt($formateado,CODE,KEY);
        $mensaje='';

        if (is_numeric($id_notificacion)) {
            $notificacion->update_remove($id_notificacion);
            $descripcion='Eliminaste una notificación: '; 
            $historial->crear_historial($descripcion,3,4,$id_usuario);
            $mensaje='notificacion eliminada';
        } else {
            $mensaje='error al eliminar';
        }
        $json=array(
            'mensaje1'=>$mensaje,
        );
        $jsonstring = json_encode($json);
        echo $jsonstring;

        // var_dump($notificacion);
        
    } else {
        echo 'error, el usuario no está en session';
    }
    
}