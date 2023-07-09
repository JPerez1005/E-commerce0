<?php
    include_once 'Conexion.php';
    class Municipios{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function llenar_municipios($id_departamento){//dependiendo del id del departamento hacemos la consulta
            $sql="SELECT * FROM municipios
                    WHERE departamento_id=:id_municipio";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_municipio'=>$id_departamento));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        
    }