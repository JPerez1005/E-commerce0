<?php
    include_once 'Conexion.php';
    class Resena{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function evaluar_calificaciones($id_producto_tienda){
            $sql="SELECT AVG(calificacion) as promedio
                    FROM resena r
                    WHERE r.id_producto_tienda= :id_producto_tienda
                    AND r.estado='A'";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_producto_tienda'=>$id_producto_tienda));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        
        function capturar_resenas($id_producto_tienda){
            $sql="SELECT r.id as id,
                            calificacion,
                            descripcion,
                            fecha_creacion,
                            u.user as user,
                            u.avatar as avatar
                    FROM resena r
                    JOIN usuario u ON u.id=r.id_usuario
                    WHERE r.id_producto_tienda=:id_producto_tienda
                    AND r.estado='A' ORDER BY r.fecha_creacion DESC";//capturamos todas las caracteristicas en estado activo
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_producto_tienda'=>$id_producto_tienda));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
    }