<?php
    include_once 'Conexion.php';
    class Tienda{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function contar_resenas($id_tienda){
            $sql="SELECT COUNT(*) as numero_resenas,
                    AVG(calificacion) as sumatoria
                    FROM tienda t
                    JOIN producto_tienda pt ON t.id=pt.id_tienda
                    JOIN resena r ON pt.id=r.id_producto_tienda
                    AND t.id=:id_tienda";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_tienda'=>$id_tienda));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        
    }