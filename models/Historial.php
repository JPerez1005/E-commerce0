<?php
    include_once 'Conexion.php';
    class Historial{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }
        
        function mostrar_historial($user){
            $sql="SELECT h.id as id,descripcion,fecha,th.nombre as tipo_historial,th.icono as th_icono,m.nombre as modulo,m.icono as m_icono FROM historial h 
            JOIN tipo_historial th ON h.id_tipo_historial=th.id 
            JOIN modulo m ON h.id_modulo=m.id 
            WHERE id_usuario=:user
            ORDER BY fecha desc;";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':user'=>$user));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        function crear_historial($descripcion,$tipo_historial,$modulo,$id_usuario){
            $sql="INSERT INTO historial(descripcion,id_tipo_historial,id_modulo,id_usuario) VALUES(:descripcion,:id_tipo_historial,:id_modulo,:id_usuario)";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':descripcion'=>$descripcion,
                ':id_tipo_historial'=>$tipo_historial,
                ':id_modulo'=>$modulo,
                ':id_usuario'=>$id_usuario
            );
            $query->execute($variables);
        }

    }