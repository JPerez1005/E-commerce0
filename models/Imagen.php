<?php
    include_once 'Conexion.php';
    class Imagen{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function capturar_imagenes($id_producto){
            $sql="SELECT *
                    FROM imagen
                    WHERE imagen.id_producto=:id_producto
                    AND imagen.estado='A'";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_producto'=>$id_producto));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        
    }