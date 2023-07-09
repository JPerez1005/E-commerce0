<?php
include_once '../models/ProductoTienda.php';
include_once '../util/config/config.php';
include_once '../models/Pregunta.php';
include_once '../models/Notificacion.php';
include_once '../models/Historial.php';
include_once '../models/Respuesta.php';
$producto_tienda = new ProductoTienda();
$pregunta = new Pregunta();
$notificacion = new Notificacion();
$historial = new Historial();
$respuesta=new Respuesta();
session_start();

if($_POST['funcion']=='realizar_pregunta'){
    if (!empty($_SESSION['id'])) {
        $pgt=$_POST['pregunta'];
        $id_usuario=$_SESSION['id'];
        $formateado=str_replace(" ","+",$_SESSION['product-verification']);//aquí está encriptado
        $id_producto_tienda=openssl_decrypt($formateado,CODE,KEY);
        $pregunta->create($pgt,$id_producto_tienda,$id_usuario);
        //----------------notificaciones-------------------------------
        $producto_tienda->mostrar_productos($id_producto_tienda);
        $id_propietario_tienda=$producto_tienda->objetos[0]->id_usuario;
        $titulo=$producto_tienda->objetos[0]->producto;
        $imagen=$producto_tienda->objetos[0]->imagen;
        $asunto= 'Alguién Realizó una pregunta en tu producto';
        $url='views/descripcion.php?name='.$titulo.'&&id='.$formateado;
        $notificacion->create($titulo,$asunto,$pgt,$imagen,$url,$id_propietario_tienda);
        $descripcion='Ha realizado una pregunta: '.$pgt.'. |En el producto: '.$titulo; 
        $historial->crear_historial($descripcion,2,3,$id_usuario);
        $json=array(
            'mensaje1'=>'pregunta creada',
            'mensaje2'=>'notificación creada',
            'mensaje3'=>'historial creado',
        );
        //codificamos el array a string
        $jsonstring = json_encode($json/*esta vez envia todos los datos*/);
        echo $jsonstring;
    } else {
        echo 'error, el usuario no está en session';
    }
    
}
if($_POST['funcion']=='mostrar_comentarios'){
    $formateado=str_replace(" ","+",$_SESSION['product-verification']);
    $id_producto_tienda=openssl_decrypt($formateado,CODE,KEY);
    $producto_tienda->mostrar_productos($id_producto_tienda);    
    $id_usuario = $producto_tienda ->objetos[0]->id_usuario;
    $username = $producto_tienda ->objetos[0]->username;
    $avatar = $producto_tienda ->objetos[0]->avatar;
    $id_usuario_session=0;
    $usuario_sesion='';
    $avatar_sesion='';
    $bandera=0;
    if (!empty($_SESSION['id'])) {
        $id_usuario_session=1;
        $usuario_sesion=$_SESSION['id'];
        $avatar_sesion=$_SESSION['avatar'];
    } 
    if($id_usuario_session==1){
        if ($id_usuario==$_SESSION['id']) {
            // el usuario en session es el dueño de la tienda o producto
            // puedo responder preguntas
            // no puedo hacer preguntas
            $bandera='1';
            
        } else {
            // el usuario en session es cualquiera menos el dueño
            // no puedo responder preguntas
            // puedo hacer preguntas
            $bandera='2';
        }
        
    }else {
        // el usuario no tiene session
        // no puedo responder preguntas
        // no puedo hacer preguntas
        $bandera='0';
    }

    $pregunta->read($id_producto_tienda);
    $preguntas=array();
    foreach ($pregunta->objetos as $objeto) {
        $respuesta->read($objeto->id);
        $rpst=array();
        if (!empty($respuesta)) {
            foreach($respuesta->objetos as $objeto1){
                $rpst=array(
                    'id'=>$objeto1->id,
                    'contenido'=>$objeto1->contenido,
                    'fecha_creacion'=>$objeto1->fecha_creacion,
                );
            }
        }
        $preguntas[]=array(
            'id'=>$objeto->id,
            'contenido'=>$objeto->contenido,
            'fecha_creacion'=>$objeto->fecha_creacion,
            'estado_respuesta'=>$objeto->estado_respuesta,
            'username'=>$objeto->username,
            'avatar'=>$objeto->avatar,
            'respuesta'=>$rpst
        );
    }

    $data=array(
        'bandera'=>$bandera,
        'avatar_sesion'=>$avatar_sesion,
        'username'=>$username,
        'avatar'=>$avatar,
        'preguntas'=>$preguntas,
    );

    $jsonstring=json_encode($data);
    echo $jsonstring;

}