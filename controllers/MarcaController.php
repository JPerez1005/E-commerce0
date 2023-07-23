<?php
include_once '../util/config/config.php';
include_once '../models/Marca.php';
include_once '../models/Historial.php';
$marca = new Marca();
$historial = new Historial();
session_start();
date_default_timezone_set('America/Bogota');
$fecha_actual=date('d-m-Y');
if($_POST['funcion']=='read_all_marcas'){
    $marca->read_all_marcas();
    $json=array();
    foreach ($marca->objetos as $objeto) {
        $json[]=array(
            'id'=>openssl_encrypt($objeto->id,CODE,KEY),
            'nombre'=>$objeto->nombre,
            'imagen'=>$objeto->imagen,
            'fecha_creacion'=>$objeto->fecha_creacion,
            'estado'=>$objeto->estado,
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}

if($_POST['funcion']=='crear_marca'){
    $id_usuario=$_SESSION['id'];
    $nombre=$_POST['nom_marc'];
    $img=$_FILES['img_marc']['name'];
    // nombre de la imagen concatenada con la extension
    $nombre_imagen=uniqid().'-'.$img;
    $ruta='../util/img/marca/'.$nombre_imagen;
    // el contenido de la img es el archivo temporal q se guarda en el navegador
    // eso se guarda en la ruta
    move_uploaded_file($_FILES['img_marc']['tmp_name'],$ruta);
    // guardamos en la base de datos
    $marca->crear($nombre,$nombre_imagen);
    //mandamos informacion al historial
    $descripcion='Has creado una marca: '.$nombre; 
    $historial->crear_historial($descripcion,2,6,$id_usuario);
    $mensaje='Marca Creada';
    $json=array(
        'mensaje'=>$mensaje
    );
    $jsonstring=json_encode($json);
    echo $jsonstring;
}

if($_POST['funcion']=='editar_marca'){
    $id_usuario=$_SESSION['id'];
    $mensaje='Marca Editada';
    $json=array(
        'mensaje'=>$mensaje
    );
    $jsonstring=json_encode($json);
    echo $jsonstring;
}