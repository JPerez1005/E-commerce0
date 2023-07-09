<?php
    include_once 'Conexion.php';
    class Caracteristica{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function capturar_caracteristicas($id_producto){
            $sql="SELECT *
                    FROM caracteristica c
                    WHERE c.id_producto=:id_producto
                    AND c.estado='A'";//capturamos todas las caracteristicas en estado activo
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_producto'=>$id_producto));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        
    }