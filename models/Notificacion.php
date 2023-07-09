<?php
    include_once 'Conexion.php';
    class Notificacion{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function create($titulo,$asunto,$pgt,$imagen,$url,$id_propietario_tienda){
            $sql="INSERT INTO notificacion(titulo,asunto,contenido,imagen,url_1,id_usuario)
                    VALUES(:titulo,:asunto,:contenido,:imagen,:url_1,:id_usuario)";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':titulo'=>$titulo,
                ':asunto'=>$asunto,
                ':contenido'=>$pgt,
                ':imagen'=>$imagen,
                ':url_1'=>$url,
                ':id_usuario'=>$id_propietario_tienda,
            );
            $query->execute($variables);
        }

        function read($id_usuario){
            $sql="SELECT *
                    FROM notificacion n
                    WHERE n.id_usuario=:id_usuario
                    AND n.estado='A'
                    AND n.estado_abierto=0 ORDER BY n.fecha_creacion DESC";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_usuario'=>$id_usuario));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }

        function update_estado_abierto($id_noti){
            $sql="UPDATE notificacion
                    SET estado_abierto=1
                    WHERE id=:id_noti";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':id_noti'=>$id_noti,
            );
            $query->execute($variables);
        }

        function read_all_notificaciones($id_usuario){
            $sql="SELECT *
                    FROM notificacion n
                    WHERE n.id_usuario=:id_usuario
                    AND n.estado='A' 
                    ORDER BY n.fecha_creacion DESC";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_usuario'=>$id_usuario));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        function update_remove($id_notificacion){
            $sql="UPDATE notificacion
                    SET estado=:estado
                    WHERE id=:id_notificacion";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':id_notificacion'=>$id_notificacion,
                ':estado'=>'I',
            );
            $query->execute($variables);
        }

    }