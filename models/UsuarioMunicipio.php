<?php
    include_once 'Conexion.php';
    class UsuarioMunicipio{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function crear_direccion($id_usuario, $id_municipio, $direccion, $referencia){//dependiendo del id del departamento hacemos la consulta
            $sql="INSERT INTO usuario_municipio(direccion,referencia,id_municipio,id_usuario) VALUES(:direccion,:referencia,:id_municipio,:id_usuario)";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':direccion'=>$direccion, ':referencia'=>$referencia, ':id_municipio'=>$id_municipio, ':id_usuario'=>$id_usuario));
        }
        
        function mostrar_direcciones($id_usuario){//no necesitamos ningun parametro porque solo queremos
            //traer todos los departamentos
            $sql="SELECT um.id as id,direccion,referencia,m.municipio as municipio, d.departamento as departamento FROM usuario_municipio um
                    JOIN municipios m ON m.id_municipio=um.id_municipio
                    JOIN departamentos d ON d.id_departamento=m.departamento_id
                    WHERE id_usuario=:id and estado_d='A'";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id_usuario));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
  
        function eliminar_direccion($id_direccion){//dependiendo del id del departamento hacemos la consulta
            $sql="UPDATE usuario_municipio SET estado_d='I' WHERE id=:id_direccion";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id_direccion'=>$id_direccion));
        }

        function recuperar_direccion($id_direccion){//no necesitamos ningun parametro porque solo queremos
            //traer todos los departamentos
            $sql="SELECT um.id as id,direccion,referencia,m.municipio as municipio, d.departamento as departamento FROM usuario_municipio um
                    JOIN municipios m ON m.id_municipio=um.id_municipio
                    JOIN departamentos d ON d.id_departamento=m.departamento_id
                    WHERE um.id=:id and estado_d='A'";
            $query=$this->acceso->prepare($sql);
            $query->execute(array(':id'=>$id_direccion));
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
    }