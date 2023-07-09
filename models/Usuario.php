<?php
    include_once 'Conexion.php';
    class Usuario{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }
        // function loguearse($user, $pass){
        //     $sql="SELECT * FROM usuario
        //             WHERE user=:user and pass=:pass";
        //     $query=$this->acceso->prepare($sql);
        //     $query->execute(array(':user'=>$user, ':pass'=>$pass));
        //     $this->objetos = $query->fetchAll();
        //     return $this->objetos;
        // }
        
        function verificar_usuario($user){
            $sql="SELECT * FROM usuario
                    WHERE user=:user";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':user'=>$user));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }

        function registrar_usuario($username,$pass,$nombres,$apellidos,$dni,$email,$telefono){
            $sql="INSERT INTO usuario(user,pass,nombres,apellidos,dni,email,telefono,id_tipo) VALUES(:user,:pass,:nombres,:apellidos,:dni,:email,:telefono,:id_tipo)";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':user'=>$username,':pass'=>$pass,':nombres'=>$nombres,':apellidos'=>$apellidos,':dni'=>$dni,':email'=>$email,':telefono'=>$telefono,':id_tipo'=>2));
        }

        function obtener_datos($user){
            $sql="SELECT * FROM usuario
                    JOIN tipo_usuario ON usuario.id_tipo = tipo_usuario.id
                    WHERE usuario.id=:user";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':user'=>$user));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }

        function editar_datos($id_usuario,$nombres,$apellidos,$dni,$email,$telefono,$nombre){
            if ($nombre!='') {//por si se coloca una img
                $sql="UPDATE usuario SET nombres=:nombres,
                                            apellidos=:apellidos,
                                            dni=:dni,
                                            email=:email,
                                            telefono=:telefono,
                                            avatar=:avatar
                        WHERE id=:id_usuario";
                $query=$this->acceso->prepare($sql);
                $variables = array(
                    ':id_usuario'=>$id_usuario,
                    ':nombres'=>$nombres,
                    ':apellidos'=>$apellidos,
                    ':dni'=>$dni,
                    ':email'=>$email,
                    ':telefono'=>$telefono,
                    ':avatar'=>$nombre,
                );
                $query->execute($variables);
            } else {//por si no se coloca una img
                $sql="UPDATE usuario SET nombres=:nombres,
                                            apellidos=:apellidos,
                                            dni=:dni,
                                            email=:email,
                                            telefono=:telefono
                        WHERE id=:id_usuario";
                $query=$this->acceso->prepare($sql);
                $variables = array(
                    ':id_usuario'=>$id_usuario,
                    ':nombres'=>$nombres,
                    ':apellidos'=>$apellidos,
                    ':dni'=>$dni,
                    ':email'=>$email,
                    ':telefono'=>$telefono
                );
                $query->execute($variables);
            }
        }

        // function comprobar_pass($id_usuario,$pass_old){
        //     $sql="SELECT * FROM usuario
        //             WHERE id=:id_usuario AND pass=:pass_old";
        //     $query=$this->acceso->prepare($sql);
        //     $query->execute(array(':id_usuario'=>$id_usuario,':pass_old'=>$pass_old));
        //     $this->objetos = $query->fetchAll();
        //     return $this->objetos;
        // }

        function cambiar_contra($id_usuario, $pass_new){
            $sql="UPDATE usuario SET pass=:pass_new
                    WHERE id=:id_usuario";
            $query=$this->acceso->prepare($sql);
            $variables = array(
                ':id_usuario'=>$id_usuario,
                ':pass_new'=>$pass_new
            );
            $query->execute($variables);
            
        }

    }