<?php
    include_once 'Conexion.php';
    class Favorito{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function read_favorito_usuario_protienda($usuario_sesion,$id_producto_tienda){//no necesitamos ningun parametro porque solo queremos
            //traer todos los departamentos
            $sql="SELECT *
                    FROM favorito
                    WHERE id_usuario=:id_usuario
                    AND id_producto_tienda=:id_producto_tienda";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':id_usuario'=> $usuario_sesion,
                ':id_producto_tienda' => $id_producto_tienda
            );
            $query->execute($variables);
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        
        function update_remove($id_favorito){
            $sql="UPDATE favorito
                    SET estado=:estado
                    WHERE id=:id_favorito";
            $query = $this->acceso->prepare($sql);
            $variables=array(
                ':id_favorito'=> $id_favorito,
                ':estado' => 'I'
            );
            $query->execute($variables);
        }
        function update_add($id_usuario,$id_producto_tienda,$id_favorito,$url){
            if ($id_favorito!=null) {
                $sql="UPDATE favorito
                        SET estado=:estado
                        WHERE id=:id_favorito";
                $query = $this->acceso->prepare($sql);
                $variables=array(
                    ':id_favorito'=> $id_favorito,
                    ':estado' => 'A'
                );
                $query->execute($variables);
            }else {
                $sql="INSERT INTO favorito(url,id_usuario,id_producto_tienda)
                        VALUES(:url,:id_usuario,:id_producto_tienda)";
                $query = $this->acceso->prepare($sql);
                $variables=array(
                    ':url'=> $url,
                    ':id_usuario' => $id_usuario,
                    ':id_producto_tienda' => $id_producto_tienda
                );
                $query->execute($variables);
                
            }
        }

        function read($id_usuario){//no necesitamos ningun parametro porque solo queremos
            //traer todos los departamentos
            $sql="SELECT f.id as id,
                         p.nombre as titulo,
                         pt.precio as precio,
                         p.imagen_principal as imagen,
                         f.url as url,
                         f.fecha_creacion as fecha_creacion
                    FROM favorito f
                    JOIN producto_tienda pt ON f.id_producto_tienda = pt.id
                    JOIN producto p ON pt.id_producto = p.id
                    WHERE f.id_usuario=:id_usuario
                    AND f.estado='A' ORDER BY f.fecha_creacion DESC LIMIT 5
                    ";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':id_usuario'=> $id_usuario
            );
            $query->execute($variables);
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        function read_all_favoritos($id_usuario){//no necesitamos ningun parametro porque solo queremos
            //traer todos los departamentos
            $sql="SELECT f.id as id,
                         p.nombre as titulo,
                         pt.precio as precio,
                         p.imagen_principal as imagen,
                         f.url as url,
                         f.fecha_creacion as fecha_creacion
                    FROM favorito f
                    JOIN producto_tienda pt ON f.id_producto_tienda = pt.id
                    JOIN producto p ON pt.id_producto = p.id
                    WHERE f.id_usuario=:id_usuario
                    AND f.estado='A' ORDER BY f.fecha_creacion DESC
                    ";
            $query=$this->acceso->prepare($sql);
            $variables=array(
                ':id_usuario'=> $id_usuario
            );
            $query->execute($variables);
            $this->objetos = $query->fetchAll();
            return $this->objetos;
        }
        
    }