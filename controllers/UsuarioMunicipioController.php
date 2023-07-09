<?php
include_once '../models/UsuarioMunicipio.php';//nos comunicamos con el modelo Municipios.php
include_once '../util/config/config.php';
include_once '../models/Historial.php';//nos conectamos con el modelo historial
$usuario_municipio = new UsuarioMunicipio();
$historial=new Historial();//ahora podemos usar variables del modelo historial.php
session_start();

if($_POST['funcion']=='crear_direccion'){
    $id_usuario = $_SESSION['id'];//detecta el id en el usuario que está
    $id_municipio=$_POST['id_municipio'];//recibimos la variable creada anteriormente de la funcion llenar_municipos
    //de mi_perfil.js
    $direccion=$_POST['direccion'];
    $referencia=$_POST['referencia'];
    $usuario_municipio->crear_direccion($id_usuario, $id_municipio, $direccion, $referencia);
    $descripcion='Ha creado una nueva dirección: '.$direccion;
    // $descripcion+='Con referencia: '.$referencia;
    $historial->crear_historial($descripcion,2/*crear*/,1/*mi perfil*/,$id_usuario);
    echo 'success';
}


if($_POST['funcion']=='mostrar_direcciones'){
    $id_usuario=$_SESSION['id'];
    $usuario_municipio->mostrar_direcciones($id_usuario);
    $json=array();
    foreach ($usuario_municipio->objetos as $objeto) {
        $json[]=array(
            'id'=>openssl_encrypt($objeto->id,CODE,KEY),//aquí encriptamos
            'direccion' =>$objeto->direccion,
            'referencia' =>$objeto->referencia,
            'departamento' =>$objeto->departamento,
            'municipio' =>$objeto->municipio
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}


if($_POST['funcion']=='eliminar_direccion'){
    $id_direccion= openssl_decrypt($_POST['id'],CODE,KEY);//aquí estamos desencriptando
    if(is_numeric($id_direccion)){
        $usuario_municipio->recuperar_direccion($id_direccion);
        // var_dump($usuario_municipio);
        $direccion_borrada=$usuario_municipio->objetos[0]->direccion.' Municipio: '.$usuario_municipio->objetos[0]->direccion.', Departamento: '.$usuario_municipio->objetos[0]->departamento;
        $usuario_municipio->eliminar_direccion($id_direccion);//justo aquí eliminamos la dirección
        $descripcion='Ha eliminado la dirección: '.$direccion_borrada;
        $historial->crear_historial($descripcion,3,1,$_SESSION['id']);
        echo 'success';
    }else{
        echo 'error';
    }
    
}

