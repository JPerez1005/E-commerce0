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

        function crear($nombre,$desc,$nombre_imagen){
            $sql="INSERT INTO marca(nombre,descripcion,imagen)
                    VALUES(:nombre, :descripcion, :imagen)";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':nombre'=>$nombre,
                ':descripcion'=>$desc,
                ':imagen'=>$nombre_imagen,
            );
            $query->execute($variables);
        }

        function obtener_marca($id_marca){//no necesitamos ningun parametro porque solo queremos
            //traer todos los departamentos
            $sql="SELECT *
                    FROM marca
                    WHERE marca.id=:id_marca AND estado='A'";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':id_marca'=>$id_marca
            );
            $query->execute($variables);
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }

        function editar($id_marca,$nombre,$desc,$nombre_imagen){
            if ($nombre_imagen!='') {
                $sql="UPDATE marca SET nombre=:nombre,descripcion=:descripcion, imagen=:img
                        WHERE id=:id_marca";
                $query=$this->acceso->prepare($sql);
                $variables=array(
                    ':nombre'=>$nombre,
                    ':descripcion'=>$desc,
                    ':img'=>$nombre_imagen,
                    ':id_marca'=>$id_marca
                );
                $query->execute($variables);
            } else {
                $sql="UPDATE marca SET nombre=:nombre,descripcion=:descripcion
                        WHERE id=:id_marca";
                $query=$this->acceso->prepare($sql);
                $variables=array(
                    ':nombre'=>$nombre,
                    ':descripcion'=>$desc,
                    ':id_marca'=>$id_marca
                );
                $query->execute($variables);
            }
        }

        function eliminar_marca($id_marca){//no necesitamos ningun parametro porque solo queremos
            //traer todos los departamentos
            $sql="UPDATE marca SET estado=:estado
                    WHERE id=:id_marca";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':id_marca'=>$id_marca,
                ':estado'=>'I'
            );
            $query->execute($variables);
            // $this->objetos = $query->fetchAll();
            // return $this->objetos;
        }
    }