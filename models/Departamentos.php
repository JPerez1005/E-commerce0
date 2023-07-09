<?php
    include_once 'Conexion.php';
    class Departamentos{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function llenar_departamentos(){//no necesitamos ningun parametro porque solo queremos
            //traer todos los departamentos
            $sql="SELECT * FROM departamentos";
            $query=$this->acceso->prepare($sql);
            $query->execute();
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        
    }