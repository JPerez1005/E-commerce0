<?php
include_once '../models/Historial.php';
$historial = new Historial();
session_start();


if($_POST['funcion']=='mostrar_historial'){
    $id_usuario = $_SESSION['id'];
    $historial->mostrar_historial($id_usuario);
    $bandera='';
    $cont=0;
    $fechas=array();//declaramos el arreglo como vacio
    // var_dump($historial);
    foreach ($historial->objetos as $objeto) {
        $fecha_hora=date_create($objeto->fecha);
        $hora=$fecha_hora->format('H:i:s');//horas minutos y segundos
        $fecha=date_format($fecha_hora, 'd-m-Y'/**día, mes , año */);//el indice es día pero se puede cambiar el formato
        //'y-m-d' con la funcion mostrar histroial cambia a apartir de los ultimos tres años y no de los tres dias
        // echo $hora.' '.$fecha;
        if ($fecha!=$bandera) {//si entran cuatro fechas y son todas diferentes, entonces solo entran las tres primeras fechas
            //cabe recordar que entran las mas actuales current_date
            $cont++;
            $bandera=$fecha;//se compara la fecha guardada con la que acaba de entrar al if
            //se hace para ver si son iguales y meterlas en un mismo grupo
        }
        if ($cont==3) {//apartir de los ultimos tres días se muestra la información de esos dias
            $fechas[$cont-1][]=array(//se colocó un menos uno para que en mi perfil.js la funcion
                //mostrar historial reciba los foreach desde 0 y no desde uno
                //esto se hace debido a que los foreach no admiten numeros desde 1
                'id'=>$objeto->id,
                'descripcion'=>$objeto->descripcion,
                'fecha'=>$fecha,
                'hora'=>$hora,
                'tipo_historial'=>$objeto->tipo_historial,
                'th_icono'=>$objeto->th_icono,
                'modulo'=>$objeto->modulo,
                'm_icono'=>$objeto->m_icono
            );
        } else {
            if ($cont==4) {//si nos pasamos a 4 dias se rompe
                break;//all todo se para y no agregamos nada más
            } else {
                $fechas[$cont-1][]=array(//se colocó un menos uno para que en mi perfil.js la funcion
                    //mostrar historial reciba los foreach desde 0 y no desde uno
                    //esto se hace debido a que los foreach no admiten numeros desde 1
                    'id'=>$objeto->id,
                    'descripcion'=>$objeto->descripcion,
                    'fecha'=>$fecha,
                    'hora'=>$hora,
                    'tipo_historial'=>$objeto->tipo_historial,
                    'th_icono'=>$objeto->th_icono,
                    'modulo'=>$objeto->modulo,
                    'm_icono'=>$objeto->m_icono
                );
            }
        }
    }
    $jsonstring=json_encode($fechas);//codificamos a formato json para enviarlo
    echo $jsonstring;
}//me indica si el usuario que se digito tiene datos ya registrados
//solo se puede ingresar con datos ya registrados
