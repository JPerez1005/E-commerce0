<?php
    include_once 'Conexion.php';
    class Pregunta{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function read($id_producto_tienda){
            $sql="SELECT p.id as id,
                            contenido,
                            p.fecha_creacion as fecha_creacion,
                            p.respuesta as estado_respuesta,
                            u.id as id_usuario,
                            u.user as username,
                            u.avatar as avatar
                    FROM pregunta p
                    JOIN producto_tienda pt ON p.id_producto_tienda=pt.id
                    JOIN usuario u ON p.id_usuario=u.id
                    WHERE pt.id=:id_producto_tienda
                    AND p.estado='A' ORDER BY p.fecha_creacion DESC";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_producto_tienda'=>$id_producto_tienda));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }

        function create($pgt,$id_producto_tienda,$id_usuario){
            $sql="INSERT INTO pregunta(contenido,id_producto_tienda,id_usuario)
                    VALUES(:pgt,:id_producto_tienda,:id_usuario)";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':pgt'=>$pgt,
                ':id_producto_tienda'=>$id_producto_tienda,
                ':id_usuario'=>$id_usuario
            );
            $query->execute($variables);
        }

        function read_propietario_pregunta($id_pregunta){
            $sql="SELECT p.id_usuario as id
                    FROM pregunta p
                    WHERE p.id=:id_pregunta
                    AND p.estado='A'";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_pregunta'=>$id_pregunta));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
    }