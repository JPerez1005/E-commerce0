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
            'descripcion'=>$objeto->descripcion,
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
    $desc=$_POST['desc'];
    $img=$_FILES['img_marc']['name'];
    // nombre de la imagen concatenada con la extension
    $nombre_imagen=uniqid().'-'.$img;
    $ruta='../util/img/marca/'.$nombre_imagen;
    // el contenido de la img es el archivo temporal q se guarda en el navegador
    // eso se guarda en la ruta
    move_uploaded_file($_FILES['img_marc']['tmp_name'],$ruta);
    // guardamos en la base de datos
    $marca->crear($nombre,$desc,$nombre_imagen);
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
    $nombre=$_POST['nom_marc_mod'];
    $desc=$_POST['desc_mod'];
    $img=$_FILES['img_marc_mod']['name'];
    $formateado = str_replace(" ","+",$_POST['id_marc_mod']);
    $id_marca = openssl_decrypt($formateado,CODE,KEY);
    $mensaje='';
    $nombre_imagen='';
    $datos_cambiados='ha hecho los siguientes cambios: ';
    if(is_numeric($id_marca)){
        $marca->obtener_marca($id_marca);
        // var_dump($marca);//var_dump daña la conversion a json
        if($nombre!=$marca->objetos[0]->nombre || $img!='' || $desc!=$marca->objetos[0]->descripcion){
            if ($nombre!=$marca->objetos[0]->nombre) {
                $datos_cambiados.='Una marca cambió su nombre de '.$marca->objetos[0]->nombre.' a '.$nombre.','; 
            }
            if ($desc!=$marca->objetos[0]->descripcion) {
                $datos_cambiados.='Una marca cambió su descripción de '.$marca->objetos[0]->descripcion.' a '.$desc.','; 
            }
            if ($img!='') {
                $datos_cambiados.='La imagen de la marca fue cambiada';
                $nombre_imagen=uniqid().'-'.$img;
                $ruta='../util/img/marca/'.$nombre_imagen;
                // el contenido de la img es el archivo temporal q se guarda en el navegador
                // eso se guarda en la ruta
                move_uploaded_file($_FILES['img_marc_mod']['tmp_name'],$ruta);
                //ya que es diferente de vacio borramos la img y colocamos la otra
                $avatar_actual=$marca->objetos[0]->imagen;
                if ($avatar_actual!='marca_default.png') {
                    unlink('../util/img/marca/'.$avatar_actual);
                }
            }
            $marca->editar($id_marca,$nombre,$desc,$nombre_imagen);
            $descripcion='Has editado una marca: '.$datos_cambiados; 
            $historial->crear_historial($descripcion,1,6,$id_usuario);
            $mensaje='success';
        }else{
            $mensaje='danger';
        }
        $json=array(
            'mensaje'=>$mensaje,
            'nombre_marca'=>$nombre,
            'desc_marca'=>$desc,
            'img'=>$nombre_imagen
        );
        $jsonstring=json_encode($json);
        echo $jsonstring;
    }else{
        echo 'error';
    }
    
}

if($_POST['funcion']=='eliminar_marca'){
    $id_usuario=$_SESSION['id'];
    $nombre=$_POST['nombre'];
    $formateado = str_replace(" ","+",$_POST['id']);
    $id_marca = openssl_decrypt($formateado,CODE,KEY);
    if (is_numeric($id_marca)) {
        $marca->eliminar_marca($id_marca);
        $descripcion='Has eliminado una marca: '.$nombre;
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