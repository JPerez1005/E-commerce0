<?php
include_once '../models/Municipios.php';//nos comunicamos con el modelo Municipios.php
include_once '../util/config/config.php';
$municipios = new Municipios();
session_start();

if($_POST['funcion']=='llenar_municipios'){
    $formateado=str_replace(" ","+",$_POST['id_departamento']);
    $id_departamento=openssl_decrypt($formateado,CODE,KEY);
    // $municipios->llenar_municipios($id_departamento);
    $json=array();//definimos una respuesta vacia por defecto, no es necesario
    //pero si tal vez hay un valor vacio, que lo estmos haciendo intencionalmente
    // en mi_perfil.js para mostrar el placeholder, entonces si es necesario un vacio
    // por defecto
    if ($_POST['id_departamento']!='') {
        if (is_numeric($id_departamento)) {
            $municipios->llenar_municipios($id_departamento);
            foreach ($municipios->objetos/*objetos nos lo devuelve el modelo Municipios.php*/ as $objeto) {
                $json[]=array(//despues codificamos este array a string
                    // procedemos a asignar los datos de la db
                    // recordar que los nombres de la derecha son los de la db
                    // los nombres de la izquierda son como los llamamos en el js
                    'id_municipio'=>openssl_encrypt($objeto->id_municipio,CODE,KEY),
                    'municipio'=>$objeto->municipio
                );
            }//alguno de los dos json pasaran , ya sea el vacio o el que contiene los datos
            //codificamos el array a string
            $jsonstring = json_encode($json/*esta vez envia todos los datos*/);
            //los datos del json vacio se pueden rellenar justo cuando el usuario seleccione una opcion
            echo $jsonstring;
        } else {
            echo 'error';
        }
    } else {
        $jsonstring = json_encode($json/*esta vez envia todos los datos*/);
        //los datos del json vacio se pueden rellenar justo cuando el usuario seleccione una opcion
        echo $jsonstring;
    }
}
