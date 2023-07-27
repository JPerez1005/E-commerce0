<?php
include_once '../util/config/config.php';
include_once '../models/Marca.php';
include_once '../models/SolicitudMarca.php';
include_once '../models/Historial.php';
$marca = new Marca();
$solicitud_marca = new SolicitudMarca();
$historial = new Historial();
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
            echo 'Error_Marca';
        }
    } else {
        echo 'Error_Marca';
    }
}

if($_POST['funcion']=='read_solicitudes'){
    $id_usuario = $_SESSION['id'];
    $solicitud_marca->read_solicitudes($id_usuario);
    var_dump($solicitud_marca);
    // $json=array();
    // foreach ($marca->objetos as $objeto) {
    //     $json[]=array(
    //         'id'=>openssl_encrypt($objeto->id,CODE,KEY),
    //         'nombre'=>$objeto->nombre,
    //         'descripcion'=>$objeto->descripcion,
    //         'imagen'=>$objeto->imagen,
    //         'fecha_creacion'=>$objeto->fecha_creacion,
    //         'estado'=>$objeto->estado,
    //         'tipo_usuario'=>$_SESSION['tipo_usuario']
    //     );
    // }
    // $jsonstring=json_encode($json);
    // echo $jsonstring;
}