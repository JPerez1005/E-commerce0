<?php
    include_once 'Conexion.php';
    class Marca{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function read_all_marcas(){//no necesitamos ningun parametro porque solo queremos
            //traer todos los departamentos
            $sql="SELECT *
                    FROM marca
                    WHERE estado='A' ORDER BY fecha_creacion DESC";
            $query=$this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }

        function crear($nombre,$nombre_imagen){
            $sql="INSERT INTO marca(nombre,imagen)
                    VALUES(:nombre, :imagen)";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':nombre'=>$nombre,
                ':imagen'=>$nombre_imagen,
            );
            $query->execute($variables);
        }
    }