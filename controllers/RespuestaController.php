<?php
include_once '../models/ProductoTienda.php';
include_once '../util/config/config.php';
include_once '../models/Pregunta.php';
include_once '../models/Respuesta.php';
include_once '../models/Notificacion.php';
include_once '../models/Historial.php';
$producto_tienda = new ProductoTienda();
$pregunta = new Pregunta();
$respuesta = new Respuesta();
$notificacion = new Notificacion();
$historial = new Historial();
session_start();

if($_POST['funcion']=='realizar_respuesta'){
    if (!empty($_SESSION['id'])) {
        $resp=$_POST['respuesta'];
        $id_usuario = $_SESSION['id'];
        $id_pregunta=$_POST['id_pregunta'];
        $formateado=str_replace(" ","+",$_SESSION['product-verification']);//aquí está encriptado
        $id_producto_tienda=openssl_decrypt($formateado,CODE,KEY);
        $respuesta->create($resp,$id_pregunta);
        //------------------------------------notifiación---------------------
        $producto_tienda->mostrar_productos($id_producto_tienda);
        $titulo=$producto_tienda->objetos[0]->producto;
        $imagen=$producto_tienda->objetos[0]->imagen;
        $asunto= 'El vendedor te ha respondido';
        $url='views/descripcion.php?name='.$titulo.'&&id='.$formateado;
        $pregunta->read_propietario_pregunta($id_pregunta);
        $id_propietario_pregunta=$pregunta->objetos[0]->id;
        $notificacion->create($titulo,$asunto,$resp,$imagen,$url,$id_propietario_pregunta);
        $descripcion='Ha respondido una pregunta: '.$resp.'. |En el producto: '.$titulo; 
        $historial->crear_historial($descripcion,2,3,$id_usuario);
        $json=array(
            'mensaje1'=>'respuesta creada',
            'mensaje2'=>'notificacion creada',
            'mensaje3'=>'historial creado',
        );
        //codificamos el array a string
        $jsonstring = json_encode($json/*esta vez envia todos los datos*/);
        echo $jsonstring;
    } else {
        echo 'error, el usuario no está en session';
    }
    
}