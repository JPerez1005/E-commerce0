<?php
    include_once 'Conexion.php';
    class ProductoTienda{
        var $objetos;
        public function __construct(){
            $db = new conexion();
            $this->acceso = $db->pdo;
        }

        function mostrar_productos($id=null){
            if ($id) {
                $sql="SELECT pt.id as id,
                                p.id as id_producto,
                                p.nombre as producto,
                                p.sku as sku,
                                p.imagen_principal as imagen,
                                p.detalles as detalles,
                                m.nombre as marca,
                                pt.estado_envio as envio,
                                pt.precio as precio,
                                pt.descuento as descuento,
                                pt.precio - (pt.precio*(pt.descuento*0.01)) as precio_descuento,
                                t.id as id_tienda,
                                t.nombre as tienda,
                                t.direccion as direccion,
                                u.id as id_usuario,
                                u.user as username,
                                u.avatar as avatar
                        FROM producto_tienda pt
                        JOIN producto p ON p.id=pt.id_producto
                        JOIN marca m ON m.id=p.id_marca
                        JOIN tienda t ON t.id=pt.id_tienda
                        JOIN usuario u ON u.id=t.id_usuario
                        AND pt.estado='A' AND pt.id=:id";
                $query=$this->acceso->prepare($sql);
                $query->execute(array(':id'=>$id));
                $this->objetos = $query->fetchAll();
                return $this->objetos;
            } else {
                $sql="SELECT pt.id as id,
                                p.id as id_producto,
                                p.nombre as producto,
                                p.sku as sku,
                                p.imagen_principal as imagen,
                                p.detalles as detalles,
                                m.nombre as marca,
                                pt.estado_envio as envio,
                                pt.precio as precio,
                                pt.descuento as descuento,
                                pt.precio - (pt.precio*(pt.descuento*0.01)) as precio_descuento,
                                t.id as id_tienda,
                                t.nombre as tienda,
                                t.direccion as direccion,
                                u.id as id_usuario,
                                u.user as username,
                                u.avatar as avatar
                        FROM producto_tienda pt
                        JOIN producto p ON p.id=pt.id_producto
                        JOIN marca m ON m.id=p.id_marca
                        JOIN tienda t ON t.id=pt.id_tienda
                        JOIN usuario u ON u.id=t.id_usuario
                        AND pt.estado='A'";
                $query=$this->acceso->prepare($sql);
                $query->execute();
                $this->objetos = $query->fetchAll();
                return $this->objetos;
            }
            
        }

        
    }