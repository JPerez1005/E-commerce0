<?php
include_once '../models/Usuario.php';
include_once '../util/config/config.php';
include_once '../models/Historial.php';
$usuario = new Usuario();
$historial = new Historial();
session_start();
if($_POST['funcion']=='login'){
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $usuario->verificar_usuario($user);
    // var_dump($usuario);
    // echo openssl_decrypt( $usuario->objetos[0]->pass,CODE,KEY);//VER CONTRASEÑA DESENCRIPTADA
    if ($usuario->objetos!=null) {
        $pass_bd=openssl_decrypt( $usuario->objetos[0]->pass,CODE,KEY);
        if ($pass_bd==$pass) {
            //variables globales que se crean al iniciar session
            $_SESSION['id']=$usuario->objetos[0]->id;
            $_SESSION['user']=$usuario->objetos[0]->user;
            $_SESSION['tipo_usuario']=$usuario->objetos[0]->id_tipo;
            $_SESSION['avatar']=$usuario->objetos[0]->avatar;
            echo 'usuario logueado';
        }
    }
}//me indica si el usuario que se digito tiene datos ya registrados
//solo se puede ingresar con datos ya registrados

if($_POST['funcion']=='verificar_sesion'){
    if (!empty($_SESSION['id'])) {
        $json[]=array(
            'id'=>$_SESSION['id'],
            'user'=>$_SESSION['user'],
            'tipo_usuario'=>$_SESSION['tipo_usuario'],
            'avatar'=>$_SESSION['avatar']
        );
        $jsonstring = json_encode($json[0]);
        echo $jsonstring;
    }else{
        echo '';
    }
}//cuando ya hay una sesion verificada no se puede volver a iniciar sesion


if($_POST['funcion']=='verificar_usuario'){
    $username = $_POST['value'];
    $usuario->verificar_usuario($username);
    if ($usuario->objetos!=null) {
        echo 'success';
    }
}


if($_POST['funcion']=='registrar_usuario'){
    $username = $_POST['username'];
    $pass = openssl_encrypt($_POST['pass'],CODE,KEY);;
    $nombres = $_POST['nombres'];
    $apellidos = $_POST['apellidos'];
    $dni = $_POST['dni'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];

    $usuario->registrar_usuario($username,$pass,$nombres,$apellidos,$dni,$email,$telefono);
    echo 'success';
}


if($_POST['funcion']=='obtener_datos'){
    $usuario->obtener_datos($_SESSION['id']);
    foreach ($usuario->objetos as $objeto) {
        $json[]=array(//despues codificamos este array a string
            // procedemos a asignar los datos de la db
            // recordar que los nombres de la derecha son los de la db
            // los nombres de la izquierda son como los llamamos en el js
            'username'=>$objeto->user,
            'nombres'=>$objeto->nombres,
            'apellidos'=>$objeto->apellidos,
            'dni'=>$objeto->dni,
            'email'=>$objeto->email,
            'telefono'=>$objeto->telefono,
            'avatar'=>$objeto->avatar,
            'tipo_usuario'=>$objeto->tipo,
        );
    }
    //codificamos el array a string
$jsonstring = json_encode($json[0]/*como solo es un dato es 0*/);
echo $jsonstring;
}

if($_POST['funcion']=='editar_datos'){
    //que usuario voy a editar?, para eso necesitamos el id
    $id_usuario=$_SESSION['id'];//aquí recolectamos todos los datos del usuario que está en session
    $nombres = $_POST['nombres_mod'];
    $apellidos = $_POST['apellidos_mod'];
    $dni = $_POST['dni_mod'];
    $email = $_POST['email_mod'];
    $telefono = $_POST['telefono_mod'];
    $avatar = $_FILES['avatar_mod']['name'];
    $usuario->obtener_datos($id_usuario);
    $mensaje='';
    $datos_cambiados='ha hecho los siguientes cambios: ';
    // var_dump($usuario);
    if ($nombres!=$usuario->objetos[0]->nombres||$apellidos!=$usuario->objetos[0]->apellidos||$dni!=$usuario->objetos[0]->dni||$email!=$usuario->objetos[0]->email||$telefono!=$usuario->objetos[0]->telefono||$avatar!='') {
        if ($nombres!=$usuario->objetos[0]->nombres) {
            $datos_cambiados.='Su nombre cambio de '.$usuario->objetos[0]->nombres.' a '.$nombres.', ';
        }
        if ($apellidos!=$usuario->objetos[0]->apellidos) {
            $datos_cambiados.='Su apellido cambio de '.$usuario->objetos[0]->apellidos.' a '.$apellidos.', ';
        }
        if ($dni!=$usuario->objetos[0]->dni) {
            $datos_cambiados.='Su dni cambio de '.$usuario->objetos[0]->dni.' a '.$dni.', ';
        }
        if ($email!=$usuario->objetos[0]->email) {
            $datos_cambiados.='Su email cambio de '.$usuario->objetos[0]->email.' a '.$email.', ';
        }
        if ($telefono!=$usuario->objetos[0]->telefono) {
            $datos_cambiados.='Su telefono cambio de '.$usuario->objetos[0]->telefono.' a '.$telefono.'.';
        }
        if ($avatar!='') {//si el input no está vacio, entonces....
            $datos_cambiados.='Su avatar fue cambiado. ';
            //lo siguiente que se hará es concatenar un codigo unico a cada img de usuario
            $nombre = uniqid().'-'.$avatar;//en este caso los puntos significan concatenación
            $ruta = '../util/img/users/'.$nombre;
            move_uploaded_file($_FILES['avatar_mod']['tmp_name'],$ruta);
            $usuario->obtener_datos($id_usuario);//nos comunicamos con la funcion obtener datos del modelo usuario.php
            foreach ($usuario->objetos as $objeto) {
                $avatar_actual=$objeto->avatar;
                if ($avatar_actual!='default.jpg') {
                    unlink('../util/img/users/'.$avatar_actual);
                }
            }
            $_SESSION['avatar']=$nombre;//con esto hacemos que la variable session se vuelva a reasignar

        }else {
            $nombre='';
        }
        $usuario->editar_datos($id_usuario,$nombres,$apellidos,$dni,$email,$telefono,$nombre);
        $descripcion='Ha editado sus datos personales, '.$datos_cambiados;
        $historial->crear_historial($descripcion,1,1,$id_usuario);
        $mensaje= 'success';
    } else {
        $mensaje= 'danger';
    }
    $json=array(
        'mensaje'=>  $mensaje
    );
    $jsonstring=json_encode($json);
    echo $jsonstring;
}

if($_POST['funcion']=='cambiar_contra'){
    $id_usuario = $_SESSION['id'];//_session id es una varible global de la funcion 'login' linea 5
    $user=$_SESSION['user'];
    $pass_old = $_POST['pass_old'];
    $pass_new = $_POST['pass_new'];

    $usuario->verificar_usuario($user);
    $mensaje='';
    // var_dump($usuario);
    if (!empty/*si está vacio*/
    ($usuario->objetos)) {
        $pass_bd=openssl_decrypt( $usuario->objetos[0]->pass,CODE,KEY);//desencriptamos
        if ($pass_bd==$pass_old) {
            $pass_new_encriptada=openssl_encrypt($pass_new,CODE,KEY);//encriptamos la nueva contraseña
            $usuario->cambiar_contra($id_usuario, $pass_new_encriptada);//mandamos la información al modelo
            $descripcion='Ha cambiado su contraseña';
            $historial->crear_historial($descripcion,1,1,$id_usuario);
            $mensaje='success';
        }else {
            $mensaje='error';
        }
    }else {
        $mensaje= 'error';
    }
    $json=array(
        'mensaje'=>$mensaje
    );
    echo $jsonstring;
    // echo 'success';
}
