<?php
include_once '../models/Departamentos.php';//nos comunicamos con el modelo Departamentos.php
include_once '../util/config/config.php';

$departamentos = new Departamentos();
session_start();

if($_POST['funcion']=='llenar_departamentos'){
    $departamentos->llenar_departamentos();
    foreach ($departamentos->objetos/*objetos nos lo devuelve el modelo Departamentos.php*/ as $objeto) {
        $json[]=array(//despues codificamos este array a string
            // procedemos a asignar los datos de la db
            // recordar que los nombres de la derecha son los de la db
            // los nombres de la izquierda son como los llamamos en el js
            'id_departamento'=>openssl_encrypt($objeto->id_departamento,CODE,KEY),
            'departamento'=>$objeto->departamento
        );
    }
    //codificamos el array a string
$jsonstring = json_encode($json/*esta vez envia todos los datos*/);
echo $jsonstring;
}
