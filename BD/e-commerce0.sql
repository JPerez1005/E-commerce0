-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-07-2023 a las 06:23:18
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `e-commerce0`
--
CREATE DATABASE IF NOT EXISTS `e-commerce0` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `e-commerce0`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristica`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `caracteristica` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `fecha_creacion` date NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` date NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `caracteristica`
--

INSERT INTO `caracteristica` (`id`, `titulo`, `descripcion`, `fecha_creacion`, `fecha_edicion`, `estado`, `id_producto`) VALUES
(1, 'tamaño', '750ml', '2023-05-18', '2023-05-18', 'A', 2),
(2, 'tamaño', '750ml', '2023-05-18', '2023-05-18', 'A', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`, `fecha_creacion`, `fecha_edicion`, `estado`) VALUES
(1, 'Gaseosas', '2023-05-18 16:50:04', '2023-05-18 16:50:04', 'A'),
(2, 'Whiskies', '2023-05-18 16:50:04', '2023-05-18 16:50:04', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `departamentos` (
  `id_departamento` int(2) NOT NULL,
  `departamento` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`id_departamento`, `departamento`) VALUES
(5, 'ANTIOQUIA'),
(8, 'ATLÁNTICO'),
(11, 'BOGOTÁ, D.C.'),
(13, 'BOLÍVAR'),
(15, 'BOYACÁ'),
(17, 'CALDAS'),
(18, 'CAQUETÁ'),
(19, 'CAUCA'),
(20, 'CESAR'),
(23, 'CÓRDOBA'),
(25, 'CUNDINAMARCA'),
(27, 'CHOCÓ'),
(41, 'HUILA'),
(44, 'LA GUAJIRA'),
(47, 'MAGDALENA'),
(50, 'META'),
(52, 'NARIÑO'),
(54, 'NORTE DE SANTANDER'),
(63, 'QUINDIO'),
(66, 'RISARALDA'),
(68, 'SANTANDER'),
(70, 'SUCRE'),
(73, 'TOLIMA'),
(76, 'VALLE DEL CAUCA'),
(81, 'ARAUCA'),
(85, 'CASANARE'),
(86, 'PUTUMAYO'),
(88, 'ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA'),
(91, 'AMAZONAS'),
(94, 'GUAINÍA'),
(95, 'GUAVIARE'),
(97, 'VAUPÉS'),
(99, 'VICHADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `favorito` (
  `id` int(11) NOT NULL,
  `url` varchar(500) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_usuario` int(11) NOT NULL,
  `id_producto_tienda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favorito`
--

INSERT INTO `favorito` (`id`, `url`, `fecha_creacion`, `estado`, `id_usuario`, `id_producto_tienda`) VALUES
(1, 'views/descripcion.php?name=Whisky Buchanan\'s Deluxe&&id=bB9Rph+GtfM4URyyszp2Gw==', '2023-05-25 23:19:28', 'A', 1, 2),
(2, 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', '2023-05-26 21:28:15', 'A', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `id_tipo_historial` int(11) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`id`, `descripcion`, `fecha`, `id_tipo_historial`, `id_modulo`, `id_usuario`) VALUES
(1, 'Cambiaste tu avatar de usuario', '2023-05-15 22:48:51', 1, 1, 1),
(2, 'Compraste un celular iphone x', '2023-05-16 22:48:51', 2, 2, 1),
(3, 'Se eliminó una dirección', '2023-05-15 00:00:00', 3, 1, 1),
(4, 'Se creó una dirección', '2023-05-16 22:56:23', 2, 1, 1),
(5, 'Cambiaste de nombre', '2023-01-16 22:56:23', 1, 1, 1),
(6, 'Cambiaste de numero de celular', '2021-12-16 22:56:23', 1, 1, 1),
(7, 'Cambiaste de avatar', '2023-01-16 22:56:23', 1, 1, 1),
(8, 'Compraste una licuadora', '2021-05-16 22:56:23', 2, 2, 1),
(9, 'Ha creado una nueva dirección: quebrada uno', '2023-05-17 11:33:03', 2, 1, 1),
(10, 'Ha creado una nueva dirección: playa\\nCon referencia: cerca de la casa de shakira', '2023-05-17 11:41:04', 2, 1, 1),
(11, 'Ha creado una nueva dirección: en un jardín\\nCon referencia: cerca de una rosa', '2023-05-17 11:44:09', 2, 1, 1),
(12, 'Ha creado una nueva dirección: la cumbre\nCon referencia: allá matan', '2023-05-17 11:53:48', 2, 1, 1),
(13, 'Ha eliminado la dirección: de chileMunicipio: , Departamento: PUTUMAYO', '2023-05-17 12:41:27', 3, 1, 1),
(14, 'Ha eliminado la dirección: de chileMunicipio: , Departamento: PUTUMAYO', '2023-05-17 12:42:55', 3, 1, 1),
(15, 'Ha eliminado la dirección: la cumbreMunicipio: la cumbre, Departamento: SANTANDER', '2023-05-17 12:44:34', 3, 1, 1),
(16, 'Ha creado una nueva dirección: sapo', '2023-05-17 18:31:26', 2, 1, 9),
(17, 'Ha editado sus datos personales, ha hecho los siguientes cambios: Su avatar fue cambiado. ', '2023-05-18 10:43:33', 1, 1, 1),
(18, 'Ha editado sus datos personales, ha hecho los siguientes cambios: Su email cambio de seiitoshi@gmail.com a seiitoshi123@gmail.com, Su telefono cambio de 3158163844 a 3118541945.Su avatar fue cambiado. ', '2023-05-18 10:44:54', 1, 1, 1),
(19, 'Ha editado sus datos personales, ha hecho los siguientes cambios: Su email cambio de seiitoshi123@gmail.com a notengo@gmail.com, ', '2023-05-18 10:45:54', 1, 1, 1),
(20, 'Ha cambiado su contraseña', '2023-05-18 11:01:23', 1, 1, 1),
(21, 'Ha cambiado su contraseña', '2023-05-18 11:01:50', 1, 1, 1),
(22, 'Ha editado sus datos personales, ha hecho los siguientes cambios: Su apellido cambio de Ortega Navas a Ortega, Su avatar fue cambiado. ', '2023-05-19 16:33:16', 1, 1, 10),
(23, 'Ha editado sus datos personales, ha hecho los siguientes cambios: Su avatar fue cambiado. ', '2023-05-19 16:33:24', 1, 1, 10),
(24, 'Ha creado una nueva dirección: Calle 4', '2023-05-19 16:34:32', 2, 1, 10),
(25, 'Ha eliminado la dirección: Calle 4 Municipio: Calle 4, Departamento: ATLÁNTICO', '2023-05-19 16:34:57', 3, 1, 10),
(26, 'Ha editado sus datos personales, ha hecho los siguientes cambios: Su dni cambio de 987654321 a 9876543210, Su avatar fue cambiado. ', '2023-05-21 14:12:18', 1, 1, 3),
(27, 'Ha cambiado su contraseña', '2023-05-21 15:32:26', 1, 1, 3),
(28, 'Ha realizado una pregunta: todavía tiene más productos de estos?. |En el producto: Gaseosa Coca Cola sabor original', '2023-05-22 23:05:43', 2, 3, 3),
(29, 'Ha respondido una pregunta: sí, claro. |En el producto: Gaseosa Coca Cola sabor original', '2023-05-22 23:13:13', 2, 3, 1),
(30, 'Ha realizado una pregunta: . |En el producto: ', '2023-05-23 12:11:48', 3, 4, 1),
(31, 'Eliminaste una notificación: ', '2023-05-23 12:19:28', 3, 4, 1),
(32, 'Eliminaste una notificación: ', '2023-05-23 12:34:45', 3, 4, 1),
(33, 'Eliminaste una notificación: ', '2023-05-23 12:35:19', 3, 4, 1),
(34, 'Eliminaste una notificación: ', '2023-05-23 12:35:35', 3, 4, 1),
(35, 'Eliminaste una notificación: ', '2023-05-23 18:58:51', 3, 4, 1),
(36, 'Eliminaste una notificación: ', '2023-05-23 18:59:43', 3, 4, 1),
(37, 'Eliminaste una notificación: ', '2023-05-23 19:00:39', 3, 4, 1),
(38, 'Eliminaste una notificación: ', '2023-05-23 19:01:23', 3, 4, 1),
(39, 'Eliminaste una notificación: ', '2023-05-23 19:03:42', 3, 4, 1),
(40, 'Ha editado sus datos personales, ha hecho los siguientes cambios: Su avatar fue cambiado. ', '2023-05-24 11:48:19', 1, 1, 12),
(41, 'Ha creado una nueva dirección: trv135#879', '2023-05-24 11:49:19', 2, 1, 12),
(42, 'Ha realizado una pregunta: que marca es?. |En el producto: Gaseosa Coca Cola sabor original', '2023-05-24 11:50:14', 2, 3, 12),
(43, 'Ha respondido una pregunta: postobon. |En el producto: Gaseosa Coca Cola sabor original', '2023-05-24 11:51:04', 2, 3, 1),
(44, 'Ha realizado una pregunta: Pq están dañina. |En el producto: Gaseosa Coca Cola sabor original', '2023-05-24 18:01:11', 2, 3, 4),
(45, 'Ha respondido una pregunta: no sea sapo. |En el producto: Gaseosa Coca Cola sabor original', '2023-05-24 18:01:39', 2, 3, 1),
(46, 'Ha editado sus datos personales, ha hecho los siguientes cambios: Su avatar fue cambiado. ', '2023-05-24 18:07:24', 1, 1, 4),
(47, 'Ha cambiado su contraseña', '2023-05-24 18:07:55', 1, 1, 4),
(48, 'Ha realizado una pregunta: su bebida es un asco. |En el producto: Gaseosa Coca Cola sabor original', '2023-05-24 18:09:25', 2, 3, 4),
(49, 'Ha respondido una pregunta: si no la quiere no la compre, gracias ;). |En el producto: Gaseosa Coca Cola sabor original', '2023-05-24 18:09:55', 2, 3, 1),
(50, 'Eliminaste una notificación: ', '2023-05-24 18:11:30', 3, 4, 4),
(51, 'Eliminaste una notificación: ', '2023-05-24 18:11:34', 3, 4, 4),
(52, 'Eliminaste una notificación: ', '2023-05-24 18:11:36', 3, 4, 4),
(53, 'Ha respondido una pregunta: no. |En el producto: Gaseosa Coca Cola sabor original', '2023-05-24 18:42:21', 2, 3, 1),
(54, 'Se agregó a favoritos el producto: Whisky Buchanan\'s Deluxe', '2023-05-27 09:36:46', 2, 5, 1),
(55, 'Se agregó a favoritos el producto: Whisky Buchanan\'s Deluxe', '2023-05-27 09:40:03', 2, 5, 1),
(56, 'Se removió de favoritos el producto: Whisky Buchanan\'s Deluxe', '2023-05-27 09:40:07', 3, 5, 1),
(57, 'Se agregó a favoritos el producto: Whisky Buchanan\'s Deluxe', '2023-05-27 09:40:31', 2, 5, 1),
(58, 'Se removió de favoritos el producto: Whisky Buchanan\'s Deluxe', '2023-05-27 09:40:32', 3, 5, 1),
(59, 'Se agregó a favoritos el producto: Whisky Buchanan\'s Deluxe', '2023-05-27 17:39:02', 2, 5, 1),
(60, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 22:14:48', 2, 5, 1),
(61, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 22:14:51', 3, 5, 1),
(62, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 22:15:01', 2, 5, 1),
(63, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 22:15:09', 3, 5, 1),
(64, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 22:15:11', 2, 5, 1),
(65, 'Eliminaste una notificación: ', '2023-05-27 22:24:18', 3, 4, 1),
(66, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:07:41', 3, 5, 1),
(67, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:07:44', 2, 5, 1),
(68, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:07:47', 3, 5, 1),
(69, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:07:49', 2, 5, 1),
(70, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:07:51', 3, 5, 1),
(71, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:07:52', 2, 5, 1),
(72, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:07:53', 3, 5, 1),
(73, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:09:51', 2, 5, 1),
(74, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:09:52', 3, 5, 1),
(75, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:09:54', 2, 5, 1),
(76, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:09:55', 3, 5, 1),
(77, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:09:56', 2, 5, 1),
(78, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-05-27 23:09:57', 3, 5, 1),
(79, 'Ha eliminado la dirección: la casa blanca Municipio: la casa blanca, Departamento: BOGOTÁ, D.C.', '2023-06-02 08:43:20', 3, 1, 1),
(80, 'Ha eliminado la dirección: quebrada uno Municipio: quebrada uno, Departamento: RISARALDA', '2023-06-02 08:43:24', 3, 1, 1),
(81, 'Ha eliminado la dirección: playa Municipio: playa, Departamento: ATLÁNTICO', '2023-06-02 08:43:27', 3, 1, 1),
(82, 'Ha eliminado la dirección: en un jardín Municipio: en un jardín, Departamento: HUILA', '2023-06-02 08:43:32', 3, 1, 1),
(83, 'Ha eliminado la dirección:  Municipio: , Departamento: ', '2023-06-02 08:43:39', 3, 1, 1),
(84, 'Ha creado una nueva dirección: al lado de un palo', '2023-06-02 08:44:19', 2, 1, 1),
(85, 'Ha realizado una pregunta: Hola. |En el producto: Gaseosa Coca Cola sabor original', '2023-06-02 08:48:03', 2, 3, 14),
(86, 'Ha respondido una pregunta: hello. |En el producto: Gaseosa Coca Cola sabor original', '2023-06-02 08:48:19', 2, 3, 1),
(87, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:20:25', 2, 5, 1),
(88, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:20:27', 3, 5, 1),
(89, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:20:28', 2, 5, 1),
(90, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:20:29', 3, 5, 1),
(91, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:20:30', 2, 5, 1),
(92, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:20:31', 3, 5, 1),
(93, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:20:34', 2, 5, 1),
(94, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:20:36', 3, 5, 1),
(95, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:45:27', 2, 5, 1),
(96, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-02 21:45:28', 3, 5, 1),
(97, 'Ha respondido una pregunta: aveces. |En el producto: Whisky Buchanan\'s Deluxe', '2023-06-03 16:28:47', 2, 3, 1),
(98, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-04 08:23:03', 2, 5, 1),
(99, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-06-04 08:23:05', 3, 5, 1),
(100, 'Ha creado una nueva dirección: estacion del 12 3', '2023-07-18 12:34:23', 2, 1, 1),
(101, 'Ha creado una nueva dirección: trv 135 44 12', '2023-07-18 12:57:49', 2, 1, 1),
(102, 'Ha creado una nueva dirección: nose', '2023-07-18 21:04:26', 2, 1, 1),
(103, 'Ha creado una nueva dirección: la casa de shakira', '2023-07-18 21:11:39', 2, 1, 1),
(104, 'Ha creado una nueva dirección: bog', '2023-07-18 21:14:35', 2, 1, 1),
(105, 'Ha creado una nueva dirección: altos de rosario edf 87', '2023-07-18 21:18:24', 2, 1, 1),
(106, 'Ha eliminado la dirección: al lado de un palo Municipio: al lado de un palo, Departamento: SANTANDER', '2023-07-18 21:20:36', 3, 1, 1),
(107, 'Ha eliminado la dirección:  Municipio: , Departamento: ', '2023-07-18 21:20:39', 3, 1, 1),
(108, 'Ha eliminado la dirección: estacion del 12 3 Municipio: estacion del 12 3, Departamento: BOGOTÁ, D.C.', '2023-07-18 21:20:50', 3, 1, 1),
(109, 'Ha eliminado la dirección: trv 135 44 12 Municipio: trv 135 44 12, Departamento: GUAVIARE', '2023-07-18 21:20:53', 3, 1, 1),
(110, 'Ha eliminado la dirección: nose Municipio: nose, Departamento: MAGDALENA', '2023-07-18 21:20:57', 3, 1, 1),
(111, 'Ha eliminado la dirección: la casa de shakira Municipio: la casa de shakira, Departamento: ATLÁNTICO', '2023-07-18 21:21:00', 3, 1, 1),
(112, 'Ha creado una nueva dirección: edif 43', '2023-07-18 21:23:17', 2, 1, 1),
(113, 'Ha creado una nueva dirección: a', '2023-07-18 21:32:33', 2, 1, 1),
(114, 'Ha eliminado la dirección: a Municipio: a, Departamento: ATLÁNTICO', '2023-07-18 22:04:17', 3, 1, 1),
(115, 'Ha creado una nueva dirección: nose', '2023-07-19 09:34:51', 2, 1, 1),
(116, 'Ha creado una nueva dirección: trv 135 44 12', '2023-07-19 10:44:16', 2, 1, 1),
(117, 'Ha creado una nueva dirección: europa', '2023-07-19 10:53:06', 2, 1, 1),
(118, 'Ha creado una nueva dirección: una casa', '2023-07-19 10:58:44', 2, 1, 1),
(119, 'Ha creado una nueva dirección: la casa de calamardo', '2023-07-19 11:02:54', 2, 1, 1),
(120, 'Ha eliminado la dirección: la casa de calamardo Municipio: la casa de calamardo, Departamento: GUAVIARE', '2023-07-19 11:14:13', 3, 1, 1),
(121, 'Ha eliminado la dirección: una casa Municipio: una casa, Departamento: SUCRE', '2023-07-19 11:14:16', 3, 1, 1),
(122, 'Ha eliminado la dirección: europa Municipio: europa, Departamento: ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA', '2023-07-19 11:14:20', 3, 1, 1),
(123, 'Ha eliminado la dirección: trv 135 44 12 Municipio: trv 135 44 12, Departamento: ATLÁNTICO', '2023-07-19 11:14:23', 3, 1, 1),
(124, 'Ha eliminado la dirección: nose Municipio: nose, Departamento: ATLÁNTICO', '2023-07-19 11:14:27', 3, 1, 1),
(125, 'Ha eliminado la dirección: edif 43 Municipio: edif 43, Departamento: BOLÍVAR', '2023-07-19 11:14:30', 3, 1, 1),
(126, 'Ha eliminado la dirección: altos de rosario edf 87 Municipio: altos de rosario edf 87, Departamento: BOLÍVAR', '2023-07-19 11:14:34', 3, 1, 1),
(127, 'Ha eliminado la dirección: bog Municipio: bog, Departamento: BOGOTÁ, D.C.', '2023-07-19 11:14:38', 3, 1, 1),
(128, 'Ha eliminado la dirección:  Municipio: , Departamento: ', '2023-07-19 11:14:46', 3, 1, 1),
(129, 'Ha creado una nueva dirección: narnia', '2023-07-19 11:16:39', 2, 1, 1),
(130, 'Ha creado una nueva dirección: estacion del 12 3', '2023-07-19 11:18:39', 2, 1, 1),
(131, 'Ha creado una nueva dirección: bog', '2023-07-19 11:27:20', 2, 1, 1),
(132, 'Ha creado una nueva dirección: la casa de shakira', '2023-07-20 09:56:42', 2, 1, 1),
(133, 'Ha eliminado la dirección: la casa de shakira Municipio: la casa de shakira, Departamento: ATLÁNTICO', '2023-07-20 11:17:56', 3, 1, 1),
(134, 'Ha eliminado la dirección:  Municipio: , Departamento: ', '2023-07-20 11:18:11', 3, 1, 1),
(135, 'Ha eliminado la dirección: bog Municipio: bog, Departamento: ATLÁNTICO', '2023-07-20 11:30:38', 3, 1, 1),
(136, 'Ha eliminado la dirección: estacion del 12 3 Municipio: estacion del 12 3, Departamento: ATLÁNTICO', '2023-07-20 11:33:46', 3, 1, 1),
(137, 'Ha eliminado la dirección: narnia Municipio: narnia, Departamento: TOLIMA', '2023-07-20 11:36:13', 3, 1, 1),
(138, 'Ha eliminado la dirección:  Municipio: , Departamento: ', '2023-07-20 11:36:19', 3, 1, 1),
(139, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:27', 2, 5, 1),
(140, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:29', 3, 5, 1),
(141, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:29', 2, 5, 1),
(142, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:30', 3, 5, 1),
(143, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:30', 2, 5, 1),
(144, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:30', 3, 5, 1),
(145, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:31', 2, 5, 1),
(146, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:33', 3, 5, 1),
(147, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:34', 2, 5, 1),
(148, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:35', 3, 5, 1),
(149, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:36', 2, 5, 1),
(150, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:37', 3, 5, 1),
(151, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:38', 2, 5, 1),
(152, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:39', 3, 5, 1),
(153, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:39', 2, 5, 1),
(154, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:39', 3, 5, 1),
(155, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:39', 2, 5, 1),
(156, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:39', 3, 5, 1),
(157, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:40', 2, 5, 1),
(158, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:40', 3, 5, 1),
(159, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:40', 2, 5, 1),
(160, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:40', 3, 5, 1),
(161, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:40', 2, 5, 1),
(162, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:41', 3, 5, 1),
(163, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:41', 2, 5, 1),
(164, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:41', 3, 5, 1),
(165, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:41', 2, 5, 1),
(166, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:41', 3, 5, 1),
(167, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:42', 2, 5, 1),
(168, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:42', 3, 5, 1),
(169, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:51', 2, 5, 1),
(170, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:51', 3, 5, 1),
(171, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:52', 2, 5, 1),
(172, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:53', 3, 5, 1),
(173, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:53', 2, 5, 1),
(174, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:54', 3, 5, 1),
(175, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:55', 2, 5, 1),
(176, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:37:55', 3, 5, 1),
(177, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:38:06', 2, 5, 1),
(178, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:38:07', 3, 5, 1),
(179, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:38:08', 2, 5, 1),
(180, 'Se removió de favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 11:38:15', 3, 5, 1),
(181, 'Ha editado sus datos personales, ha hecho los siguientes cambios: Su telefono cambio de 3118541945 a 3118541948.', '2023-07-20 13:30:27', 1, 1, 1),
(182, 'Se agregó a favoritos el producto: Gaseosa Coca Cola sabor original', '2023-07-20 21:02:56', 2, 5, 1),
(183, 'Has creado una marca: louis vuitton', '2023-07-22 13:51:14', 2, 6, 1),
(184, 'Has creado una marca: Jordan', '2023-07-22 14:07:37', 2, 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `imagen` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_producto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagen`
--

INSERT INTO `imagen` (`id`, `nombre`, `fecha_creacion`, `fecha_edicion`, `estado`, `id_producto`) VALUES
(1, 'coca.jpg', '2023-05-20 08:18:48', '2023-05-20 08:18:48', 'A', 2),
(2, 'fresh-cola-drink-glass.jpg', '2023-05-20 08:18:48', '2023-05-20 08:18:48', 'A', 2),
(3, 'Whisky Buchanans Master Blended 750ml.png', '2023-05-20 11:03:59', '2023-05-20 11:03:59', 'A', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `marca` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `imagen` varchar(100) NOT NULL DEFAULT 'producto_default.jpg',
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`id`, `nombre`, `imagen`, `fecha_creacion`, `fecha_edicion`, `estado`) VALUES
(1, 'Coca-Cola', 'producto_default.jpg', '2023-05-18 16:20:48', '2023-05-18 16:20:48', 'A'),
(2, 'Buchanan\'s', 'producto_default.jpg', '2023-05-18 16:21:48', '2023-05-18 16:21:48', 'A'),
(3, 'nike', '64bc12a0c7509-nikeLogo.jpg', '2023-07-22 12:32:16', '2023-07-22 12:32:16', 'I'),
(4, 'nike', '64bc131f1bef9-nikeLogo.jpg', '2023-07-22 12:34:23', '2023-07-22 12:34:23', 'I'),
(5, 'Nike', '64bc13abbc78d-nikeLogo.jpg', '2023-07-22 12:36:43', '2023-07-22 12:36:43', 'A'),
(6, 'Adidas', '64bc14e06e0d1-adidasLogo.jpg', '2023-07-22 12:41:52', '2023-07-22 12:41:52', 'I'),
(7, 'Adidas', '64bc15395810a-adidas originals.jpg', '2023-07-22 12:43:21', '2023-07-22 12:43:21', 'A'),
(8, 'louis vuitton', '64bc2522483e0-louis vouton.jpg', '2023-07-22 13:51:14', '2023-07-22 13:51:14', 'A'),
(9, 'Jordan', '64bc28f98827d-Jordan.jpg', '2023-07-22 14:07:37', '2023-07-22 14:07:37', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `modulo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `icono` varchar(100) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modulo`
--

INSERT INTO `modulo` (`id`, `nombre`, `icono`, `estado`) VALUES
(1, 'Mi perfil', '<i class=\"fa-solid fa-user\" style=\"color: #001eff;\"></i>', 'A'),
(2, 'Mis compras', '<i class=\"fa-solid fa-cart-shopping\" style=\"color: #04c825;\"></i>', 'A'),
(3, 'Producto', '<i class=\"fa-solid fa-box\" style=\"color: #00ffe1;\"></i>', 'A'),
(4, 'Notificaciones', '<i class=\"fa-solid fa-bell\" style=\"color: #ffdd00;\"></i>', 'A'),
(5, 'Favoritos', '<i class=\"fa-solid fa-heart\" style=\"color: #d10000;\"></i>', 'A'),
(6, 'Marcas', '<i class=\"fa-solid fa-tags\" style=\"color: #005eff;\"></i>', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `municipios` (
  `id_municipio` int(6) NOT NULL,
  `municipio` varchar(255) NOT NULL DEFAULT '',
  `estado` int(1) NOT NULL,
  `departamento_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`id_municipio`, `municipio`, `estado`, `departamento_id`) VALUES
(1, 'Abriaquí', 1, 5),
(2, 'Acacías', 1, 50),
(3, 'Acandí', 1, 27),
(4, 'Acevedo', 1, 41),
(5, 'Achí', 1, 13),
(6, 'Agrado', 1, 41),
(7, 'Agua de Dios', 1, 25),
(8, 'Aguachica', 1, 20),
(9, 'Aguada', 1, 68),
(10, 'Aguadas', 1, 17),
(11, 'Aguazul', 1, 85),
(12, 'Agustín Codazzi', 1, 20),
(13, 'Aipe', 1, 41),
(14, 'Albania', 1, 18),
(15, 'Albania', 1, 44),
(16, 'Albania', 1, 68),
(17, 'Albán', 1, 25),
(18, 'Albán (San José)', 1, 52),
(19, 'Alcalá', 1, 76),
(20, 'Alejandria', 1, 5),
(21, 'Algarrobo', 1, 47),
(22, 'Algeciras', 1, 41),
(23, 'Almaguer', 1, 19),
(24, 'Almeida', 1, 15),
(25, 'Alpujarra', 1, 73),
(26, 'Altamira', 1, 41),
(27, 'Alto Baudó (Pie de Pato)', 1, 27),
(28, 'Altos del Rosario', 1, 13),
(29, 'Alvarado', 1, 73),
(30, 'Amagá', 1, 5),
(31, 'Amalfi', 1, 5),
(32, 'Ambalema', 1, 73),
(33, 'Anapoima', 1, 25),
(34, 'Ancuya', 1, 52),
(35, 'Andalucía', 1, 76),
(36, 'Andes', 1, 5),
(37, 'Angelópolis', 1, 5),
(38, 'Angostura', 1, 5),
(39, 'Anolaima', 1, 25),
(40, 'Anorí', 1, 5),
(41, 'Anserma', 1, 17),
(42, 'Ansermanuevo', 1, 76),
(43, 'Anzoátegui', 1, 73),
(44, 'Anzá', 1, 5),
(45, 'Apartadó', 1, 5),
(46, 'Apulo', 1, 25),
(47, 'Apía', 1, 66),
(48, 'Aquitania', 1, 15),
(49, 'Aracataca', 1, 47),
(50, 'Aranzazu', 1, 17),
(51, 'Aratoca', 1, 68),
(52, 'Arauca', 1, 81),
(53, 'Arauquita', 1, 81),
(54, 'Arbeláez', 1, 25),
(55, 'Arboleda (Berruecos)', 1, 52),
(56, 'Arboledas', 1, 54),
(57, 'Arboletes', 1, 5),
(58, 'Arcabuco', 1, 15),
(59, 'Arenal', 1, 13),
(60, 'Argelia', 1, 5),
(61, 'Argelia', 1, 19),
(62, 'Argelia', 1, 76),
(63, 'Ariguaní (El Difícil)', 1, 47),
(64, 'Arjona', 1, 13),
(65, 'Armenia', 1, 5),
(66, 'Armenia', 1, 63),
(67, 'Armero (Guayabal)', 1, 73),
(68, 'Arroyohondo', 1, 13),
(69, 'Astrea', 1, 20),
(70, 'Ataco', 1, 73),
(71, 'Atrato (Yuto)', 1, 27),
(72, 'Ayapel', 1, 23),
(73, 'Bagadó', 1, 27),
(74, 'Bahía Solano (Mútis)', 1, 27),
(75, 'Bajo Baudó (Pizarro)', 1, 27),
(76, 'Balboa', 1, 19),
(77, 'Balboa', 1, 66),
(78, 'Baranoa', 1, 8),
(79, 'Baraya', 1, 41),
(80, 'Barbacoas', 1, 52),
(81, 'Barbosa', 1, 5),
(82, 'Barbosa', 1, 68),
(83, 'Barichara', 1, 68),
(84, 'Barranca de Upía', 1, 50),
(85, 'Barrancabermeja', 1, 68),
(86, 'Barrancas', 1, 44),
(87, 'Barranco de Loba', 1, 13),
(88, 'Barranquilla', 1, 8),
(89, 'Becerríl', 1, 20),
(90, 'Belalcázar', 1, 17),
(91, 'Bello', 1, 5),
(92, 'Belmira', 1, 5),
(93, 'Beltrán', 1, 25),
(94, 'Belén', 1, 15),
(95, 'Belén', 1, 52),
(96, 'Belén de Bajirá', 1, 27),
(97, 'Belén de Umbría', 1, 66),
(98, 'Belén de los Andaquíes', 1, 18),
(99, 'Berbeo', 1, 15),
(100, 'Betania', 1, 5),
(101, 'Beteitiva', 1, 15),
(102, 'Betulia', 1, 5),
(103, 'Betulia', 1, 68),
(104, 'Bituima', 1, 25),
(105, 'Boavita', 1, 15),
(106, 'Bochalema', 1, 54),
(107, 'Bogotá D.C.', 1, 11),
(108, 'Bojacá', 1, 25),
(109, 'Bojayá (Bellavista)', 1, 27),
(110, 'Bolívar', 1, 5),
(111, 'Bolívar', 1, 19),
(112, 'Bolívar', 1, 68),
(113, 'Bolívar', 1, 76),
(114, 'Bosconia', 1, 20),
(115, 'Boyacá', 1, 15),
(116, 'Briceño', 1, 5),
(117, 'Briceño', 1, 15),
(118, 'Bucaramanga', 1, 68),
(119, 'Bucarasica', 1, 54),
(120, 'Buenaventura', 1, 76),
(121, 'Buenavista', 1, 15),
(122, 'Buenavista', 1, 23),
(123, 'Buenavista', 1, 63),
(124, 'Buenavista', 1, 70),
(125, 'Buenos Aires', 1, 19),
(126, 'Buesaco', 1, 52),
(127, 'Buga', 1, 76),
(128, 'Bugalagrande', 1, 76),
(129, 'Burítica', 1, 5),
(130, 'Busbanza', 1, 15),
(131, 'Cabrera', 1, 25),
(132, 'Cabrera', 1, 68),
(133, 'Cabuyaro', 1, 50),
(134, 'Cachipay', 1, 25),
(135, 'Caicedo', 1, 5),
(136, 'Caicedonia', 1, 76),
(137, 'Caimito', 1, 70),
(138, 'Cajamarca', 1, 73),
(139, 'Cajibío', 1, 19),
(140, 'Cajicá', 1, 25),
(141, 'Calamar', 1, 13),
(142, 'Calamar', 1, 95),
(143, 'Calarcá', 1, 63),
(144, 'Caldas', 1, 5),
(145, 'Caldas', 1, 15),
(146, 'Caldono', 1, 19),
(147, 'California', 1, 68),
(148, 'Calima (Darién)', 1, 76),
(149, 'Caloto', 1, 19),
(150, 'Calí', 1, 76),
(151, 'Campamento', 1, 5),
(152, 'Campo de la Cruz', 1, 8),
(153, 'Campoalegre', 1, 41),
(154, 'Campohermoso', 1, 15),
(155, 'Canalete', 1, 23),
(156, 'Candelaria', 1, 8),
(157, 'Candelaria', 1, 76),
(158, 'Cantagallo', 1, 13),
(159, 'Cantón de San Pablo', 1, 27),
(160, 'Caparrapí', 1, 25),
(161, 'Capitanejo', 1, 68),
(162, 'Caracolí', 1, 5),
(163, 'Caramanta', 1, 5),
(164, 'Carcasí', 1, 68),
(165, 'Carepa', 1, 5),
(166, 'Carmen de Apicalá', 1, 73),
(167, 'Carmen de Carupa', 1, 25),
(168, 'Carmen de Viboral', 1, 5),
(169, 'Carmen del Darién (CURBARADÓ)', 1, 27),
(170, 'Carolina', 1, 5),
(171, 'Cartagena', 1, 13),
(172, 'Cartagena del Chairá', 1, 18),
(173, 'Cartago', 1, 76),
(174, 'Carurú', 1, 97),
(175, 'Casabianca', 1, 73),
(176, 'Castilla la Nueva', 1, 50),
(177, 'Caucasia', 1, 5),
(178, 'Cañasgordas', 1, 5),
(179, 'Cepita', 1, 68),
(180, 'Cereté', 1, 23),
(181, 'Cerinza', 1, 15),
(182, 'Cerrito', 1, 68),
(183, 'Cerro San Antonio', 1, 47),
(184, 'Chachaguí', 1, 52),
(185, 'Chaguaní', 1, 25),
(186, 'Chalán', 1, 70),
(187, 'Chaparral', 1, 73),
(188, 'Charalá', 1, 68),
(189, 'Charta', 1, 68),
(190, 'Chigorodó', 1, 5),
(191, 'Chima', 1, 68),
(192, 'Chimichagua', 1, 20),
(193, 'Chimá', 1, 23),
(194, 'Chinavita', 1, 15),
(195, 'Chinchiná', 1, 17),
(196, 'Chinácota', 1, 54),
(197, 'Chinú', 1, 23),
(198, 'Chipaque', 1, 25),
(199, 'Chipatá', 1, 68),
(200, 'Chiquinquirá', 1, 15),
(201, 'Chiriguaná', 1, 20),
(202, 'Chiscas', 1, 15),
(203, 'Chita', 1, 15),
(204, 'Chitagá', 1, 54),
(205, 'Chitaraque', 1, 15),
(206, 'Chivatá', 1, 15),
(207, 'Chivolo', 1, 47),
(208, 'Choachí', 1, 25),
(209, 'Chocontá', 1, 25),
(210, 'Chámeza', 1, 85),
(211, 'Chía', 1, 25),
(212, 'Chíquiza', 1, 15),
(213, 'Chívor', 1, 15),
(214, 'Cicuco', 1, 13),
(215, 'Cimitarra', 1, 68),
(216, 'Circasia', 1, 63),
(217, 'Cisneros', 1, 5),
(218, 'Ciénaga', 1, 15),
(219, 'Ciénaga', 1, 47),
(220, 'Ciénaga de Oro', 1, 23),
(221, 'Clemencia', 1, 13),
(222, 'Cocorná', 1, 5),
(223, 'Coello', 1, 73),
(224, 'Cogua', 1, 25),
(225, 'Colombia', 1, 41),
(226, 'Colosó (Ricaurte)', 1, 70),
(227, 'Colón', 1, 86),
(228, 'Colón (Génova)', 1, 52),
(229, 'Concepción', 1, 5),
(230, 'Concepción', 1, 68),
(231, 'Concordia', 1, 5),
(232, 'Concordia', 1, 47),
(233, 'Condoto', 1, 27),
(234, 'Confines', 1, 68),
(235, 'Consaca', 1, 52),
(236, 'Contadero', 1, 52),
(237, 'Contratación', 1, 68),
(238, 'Convención', 1, 54),
(239, 'Copacabana', 1, 5),
(240, 'Coper', 1, 15),
(241, 'Cordobá', 1, 63),
(242, 'Corinto', 1, 19),
(243, 'Coromoro', 1, 68),
(244, 'Corozal', 1, 70),
(245, 'Corrales', 1, 15),
(246, 'Cota', 1, 25),
(247, 'Cotorra', 1, 23),
(248, 'Covarachía', 1, 15),
(249, 'Coveñas', 1, 70),
(250, 'Coyaima', 1, 73),
(251, 'Cravo Norte', 1, 81),
(252, 'Cuaspud (Carlosama)', 1, 52),
(253, 'Cubarral', 1, 50),
(254, 'Cubará', 1, 15),
(255, 'Cucaita', 1, 15),
(256, 'Cucunubá', 1, 25),
(257, 'Cucutilla', 1, 54),
(258, 'Cuitiva', 1, 15),
(259, 'Cumaral', 1, 50),
(260, 'Cumaribo', 1, 99),
(261, 'Cumbal', 1, 52),
(262, 'Cumbitara', 1, 52),
(263, 'Cunday', 1, 73),
(264, 'Curillo', 1, 18),
(265, 'Curití', 1, 68),
(266, 'Curumaní', 1, 20),
(267, 'Cáceres', 1, 5),
(268, 'Cáchira', 1, 54),
(269, 'Cácota', 1, 54),
(270, 'Cáqueza', 1, 25),
(271, 'Cértegui', 1, 27),
(272, 'Cómbita', 1, 15),
(273, 'Córdoba', 1, 13),
(274, 'Córdoba', 1, 52),
(275, 'Cúcuta', 1, 54),
(276, 'Dabeiba', 1, 5),
(277, 'Dagua', 1, 76),
(278, 'Dibulla', 1, 44),
(279, 'Distracción', 1, 44),
(280, 'Dolores', 1, 73),
(281, 'Don Matías', 1, 5),
(282, 'Dos Quebradas', 1, 66),
(283, 'Duitama', 1, 15),
(284, 'Durania', 1, 54),
(285, 'Ebéjico', 1, 5),
(286, 'El Bagre', 1, 5),
(287, 'El Banco', 1, 47),
(288, 'El Cairo', 1, 76),
(289, 'El Calvario', 1, 50),
(290, 'El Carmen', 1, 54),
(291, 'El Carmen', 1, 68),
(292, 'El Carmen de Atrato', 1, 27),
(293, 'El Carmen de Bolívar', 1, 13),
(294, 'El Castillo', 1, 50),
(295, 'El Cerrito', 1, 76),
(296, 'El Charco', 1, 52),
(297, 'El Cocuy', 1, 15),
(298, 'El Colegio', 1, 25),
(299, 'El Copey', 1, 20),
(300, 'El Doncello', 1, 18),
(301, 'El Dorado', 1, 50),
(302, 'El Dovio', 1, 76),
(303, 'El Espino', 1, 15),
(304, 'El Guacamayo', 1, 68),
(305, 'El Guamo', 1, 13),
(306, 'El Molino', 1, 44),
(307, 'El Paso', 1, 20),
(308, 'El Paujil', 1, 18),
(309, 'El Peñol', 1, 52),
(310, 'El Peñon', 1, 13),
(311, 'El Peñon', 1, 68),
(312, 'El Peñón', 1, 25),
(313, 'El Piñon', 1, 47),
(314, 'El Playón', 1, 68),
(315, 'El Retorno', 1, 95),
(316, 'El Retén', 1, 47),
(317, 'El Roble', 1, 70),
(318, 'El Rosal', 1, 25),
(319, 'El Rosario', 1, 52),
(320, 'El Tablón de Gómez', 1, 52),
(321, 'El Tambo', 1, 19),
(322, 'El Tambo', 1, 52),
(323, 'El Tarra', 1, 54),
(324, 'El Zulia', 1, 54),
(325, 'El Águila', 1, 76),
(326, 'Elías', 1, 41),
(327, 'Encino', 1, 68),
(328, 'Enciso', 1, 68),
(329, 'Entrerríos', 1, 5),
(330, 'Envigado', 1, 5),
(331, 'Espinal', 1, 73),
(332, 'Facatativá', 1, 25),
(333, 'Falan', 1, 73),
(334, 'Filadelfia', 1, 17),
(335, 'Filandia', 1, 63),
(336, 'Firavitoba', 1, 15),
(337, 'Flandes', 1, 73),
(338, 'Florencia', 1, 18),
(339, 'Florencia', 1, 19),
(340, 'Floresta', 1, 15),
(341, 'Florida', 1, 76),
(342, 'Floridablanca', 1, 68),
(343, 'Florián', 1, 68),
(344, 'Fonseca', 1, 44),
(345, 'Fortúl', 1, 81),
(346, 'Fosca', 1, 25),
(347, 'Francisco Pizarro', 1, 52),
(348, 'Fredonia', 1, 5),
(349, 'Fresno', 1, 73),
(350, 'Frontino', 1, 5),
(351, 'Fuente de Oro', 1, 50),
(352, 'Fundación', 1, 47),
(353, 'Funes', 1, 52),
(354, 'Funza', 1, 25),
(355, 'Fusagasugá', 1, 25),
(356, 'Fómeque', 1, 25),
(357, 'Fúquene', 1, 25),
(358, 'Gachalá', 1, 25),
(359, 'Gachancipá', 1, 25),
(360, 'Gachantivá', 1, 15),
(361, 'Gachetá', 1, 25),
(362, 'Galapa', 1, 8),
(363, 'Galeras (Nueva Granada)', 1, 70),
(364, 'Galán', 1, 68),
(365, 'Gama', 1, 25),
(366, 'Gamarra', 1, 20),
(367, 'Garagoa', 1, 15),
(368, 'Garzón', 1, 41),
(369, 'Gigante', 1, 41),
(370, 'Ginebra', 1, 76),
(371, 'Giraldo', 1, 5),
(372, 'Girardot', 1, 25),
(373, 'Girardota', 1, 5),
(374, 'Girón', 1, 68),
(375, 'Gonzalez', 1, 20),
(376, 'Gramalote', 1, 54),
(377, 'Granada', 1, 5),
(378, 'Granada', 1, 25),
(379, 'Granada', 1, 50),
(380, 'Guaca', 1, 68),
(381, 'Guacamayas', 1, 15),
(382, 'Guacarí', 1, 76),
(383, 'Guachavés', 1, 52),
(384, 'Guachené', 1, 19),
(385, 'Guachetá', 1, 25),
(386, 'Guachucal', 1, 52),
(387, 'Guadalupe', 1, 5),
(388, 'Guadalupe', 1, 41),
(389, 'Guadalupe', 1, 68),
(390, 'Guaduas', 1, 25),
(391, 'Guaitarilla', 1, 52),
(392, 'Gualmatán', 1, 52),
(393, 'Guamal', 1, 47),
(394, 'Guamal', 1, 50),
(395, 'Guamo', 1, 73),
(396, 'Guapota', 1, 68),
(397, 'Guapí', 1, 19),
(398, 'Guaranda', 1, 70),
(399, 'Guarne', 1, 5),
(400, 'Guasca', 1, 25),
(401, 'Guatapé', 1, 5),
(402, 'Guataquí', 1, 25),
(403, 'Guatavita', 1, 25),
(404, 'Guateque', 1, 15),
(405, 'Guavatá', 1, 68),
(406, 'Guayabal de Siquima', 1, 25),
(407, 'Guayabetal', 1, 25),
(408, 'Guayatá', 1, 15),
(409, 'Guepsa', 1, 68),
(410, 'Guicán', 1, 15),
(411, 'Gutiérrez', 1, 25),
(412, 'Guática', 1, 66),
(413, 'Gámbita', 1, 68),
(414, 'Gámeza', 1, 15),
(415, 'Génova', 1, 63),
(416, 'Gómez Plata', 1, 5),
(417, 'Hacarí', 1, 54),
(418, 'Hatillo de Loba', 1, 13),
(419, 'Hato', 1, 68),
(420, 'Hato Corozal', 1, 85),
(421, 'Hatonuevo', 1, 44),
(422, 'Heliconia', 1, 5),
(423, 'Herrán', 1, 54),
(424, 'Herveo', 1, 73),
(425, 'Hispania', 1, 5),
(426, 'Hobo', 1, 41),
(427, 'Honda', 1, 73),
(428, 'Ibagué', 1, 73),
(429, 'Icononzo', 1, 73),
(430, 'Iles', 1, 52),
(431, 'Imúes', 1, 52),
(432, 'Inzá', 1, 19),
(433, 'Inírida', 1, 94),
(434, 'Ipiales', 1, 52),
(435, 'Isnos', 1, 41),
(436, 'Istmina', 1, 27),
(437, 'Itagüí', 1, 5),
(438, 'Ituango', 1, 5),
(439, 'Izá', 1, 15),
(440, 'Jambaló', 1, 19),
(441, 'Jamundí', 1, 76),
(442, 'Jardín', 1, 5),
(443, 'Jenesano', 1, 15),
(444, 'Jericó', 1, 5),
(445, 'Jericó', 1, 15),
(446, 'Jerusalén', 1, 25),
(447, 'Jesús María', 1, 68),
(448, 'Jordán', 1, 68),
(449, 'Juan de Acosta', 1, 8),
(450, 'Junín', 1, 25),
(451, 'Juradó', 1, 27),
(452, 'La Apartada y La Frontera', 1, 23),
(453, 'La Argentina', 1, 41),
(454, 'La Belleza', 1, 68),
(455, 'La Calera', 1, 25),
(456, 'La Capilla', 1, 15),
(457, 'La Ceja', 1, 5),
(458, 'La Celia', 1, 66),
(459, 'La Cruz', 1, 52),
(460, 'La Cumbre', 1, 76),
(461, 'La Dorada', 1, 17),
(462, 'La Esperanza', 1, 54),
(463, 'La Estrella', 1, 5),
(464, 'La Florida', 1, 52),
(465, 'La Gloria', 1, 20),
(466, 'La Jagua de Ibirico', 1, 20),
(467, 'La Jagua del Pilar', 1, 44),
(468, 'La Llanada', 1, 52),
(469, 'La Macarena', 1, 50),
(470, 'La Merced', 1, 17),
(471, 'La Mesa', 1, 25),
(472, 'La Montañita', 1, 18),
(473, 'La Palma', 1, 25),
(474, 'La Paz', 1, 68),
(475, 'La Paz (Robles)', 1, 20),
(476, 'La Peña', 1, 25),
(477, 'La Pintada', 1, 5),
(478, 'La Plata', 1, 41),
(479, 'La Playa', 1, 54),
(480, 'La Primavera', 1, 99),
(481, 'La Salina', 1, 85),
(482, 'La Sierra', 1, 19),
(483, 'La Tebaida', 1, 63),
(484, 'La Tola', 1, 52),
(485, 'La Unión', 1, 5),
(486, 'La Unión', 1, 52),
(487, 'La Unión', 1, 70),
(488, 'La Unión', 1, 76),
(489, 'La Uvita', 1, 15),
(490, 'La Vega', 1, 19),
(491, 'La Vega', 1, 25),
(492, 'La Victoria', 1, 15),
(493, 'La Victoria', 1, 17),
(494, 'La Victoria', 1, 76),
(495, 'La Virginia', 1, 66),
(496, 'Labateca', 1, 54),
(497, 'Labranzagrande', 1, 15),
(498, 'Landázuri', 1, 68),
(499, 'Lebrija', 1, 68),
(500, 'Leiva', 1, 52),
(501, 'Lejanías', 1, 50),
(502, 'Lenguazaque', 1, 25),
(503, 'Leticia', 1, 91),
(504, 'Liborina', 1, 5),
(505, 'Linares', 1, 52),
(506, 'Lloró', 1, 27),
(507, 'Lorica', 1, 23),
(508, 'Los Córdobas', 1, 23),
(509, 'Los Palmitos', 1, 70),
(510, 'Los Patios', 1, 54),
(511, 'Los Santos', 1, 68),
(512, 'Lourdes', 1, 54),
(513, 'Luruaco', 1, 8),
(514, 'Lérida', 1, 73),
(515, 'Líbano', 1, 73),
(516, 'López (Micay)', 1, 19),
(517, 'Macanal', 1, 15),
(518, 'Macaravita', 1, 68),
(519, 'Maceo', 1, 5),
(520, 'Machetá', 1, 25),
(521, 'Madrid', 1, 25),
(522, 'Magangué', 1, 13),
(523, 'Magüi (Payán)', 1, 52),
(524, 'Mahates', 1, 13),
(525, 'Maicao', 1, 44),
(526, 'Majagual', 1, 70),
(527, 'Malambo', 1, 8),
(528, 'Mallama (Piedrancha)', 1, 52),
(529, 'Manatí', 1, 8),
(530, 'Manaure', 1, 44),
(531, 'Manaure Balcón del Cesar', 1, 20),
(532, 'Manizales', 1, 17),
(533, 'Manta', 1, 25),
(534, 'Manzanares', 1, 17),
(535, 'Maní', 1, 85),
(536, 'Mapiripan', 1, 50),
(537, 'Margarita', 1, 13),
(538, 'Marinilla', 1, 5),
(539, 'Maripí', 1, 15),
(540, 'Mariquita', 1, 73),
(541, 'Marmato', 1, 17),
(542, 'Marquetalia', 1, 17),
(543, 'Marsella', 1, 66),
(544, 'Marulanda', 1, 17),
(545, 'María la Baja', 1, 13),
(546, 'Matanza', 1, 68),
(547, 'Medellín', 1, 5),
(548, 'Medina', 1, 25),
(549, 'Medio Atrato', 1, 27),
(550, 'Medio Baudó', 1, 27),
(551, 'Medio San Juan (ANDAGOYA)', 1, 27),
(552, 'Melgar', 1, 73),
(553, 'Mercaderes', 1, 19),
(554, 'Mesetas', 1, 50),
(555, 'Milán', 1, 18),
(556, 'Miraflores', 1, 15),
(557, 'Miraflores', 1, 95),
(558, 'Miranda', 1, 19),
(559, 'Mistrató', 1, 66),
(560, 'Mitú', 1, 97),
(561, 'Mocoa', 1, 86),
(562, 'Mogotes', 1, 68),
(563, 'Molagavita', 1, 68),
(564, 'Momil', 1, 23),
(565, 'Mompós', 1, 13),
(566, 'Mongua', 1, 15),
(567, 'Monguí', 1, 15),
(568, 'Moniquirá', 1, 15),
(569, 'Montebello', 1, 5),
(570, 'Montecristo', 1, 13),
(571, 'Montelíbano', 1, 23),
(572, 'Montenegro', 1, 63),
(573, 'Monteria', 1, 23),
(574, 'Monterrey', 1, 85),
(575, 'Morales', 1, 13),
(576, 'Morales', 1, 19),
(577, 'Morelia', 1, 18),
(578, 'Morroa', 1, 70),
(579, 'Mosquera', 1, 25),
(580, 'Mosquera', 1, 52),
(581, 'Motavita', 1, 15),
(582, 'Moñitos', 1, 23),
(583, 'Murillo', 1, 73),
(584, 'Murindó', 1, 5),
(585, 'Mutatá', 1, 5),
(586, 'Mutiscua', 1, 54),
(587, 'Muzo', 1, 15),
(588, 'Málaga', 1, 68),
(589, 'Nariño', 1, 5),
(590, 'Nariño', 1, 25),
(591, 'Nariño', 1, 52),
(592, 'Natagaima', 1, 73),
(593, 'Nechí', 1, 5),
(594, 'Necoclí', 1, 5),
(595, 'Neira', 1, 17),
(596, 'Neiva', 1, 41),
(597, 'Nemocón', 1, 25),
(598, 'Nilo', 1, 25),
(599, 'Nimaima', 1, 25),
(600, 'Nobsa', 1, 15),
(601, 'Nocaima', 1, 25),
(602, 'Norcasia', 1, 17),
(603, 'Norosí', 1, 13),
(604, 'Novita', 1, 27),
(605, 'Nueva Granada', 1, 47),
(606, 'Nuevo Colón', 1, 15),
(607, 'Nunchía', 1, 85),
(608, 'Nuquí', 1, 27),
(609, 'Nátaga', 1, 41),
(610, 'Obando', 1, 76),
(611, 'Ocamonte', 1, 68),
(612, 'Ocaña', 1, 54),
(613, 'Oiba', 1, 68),
(614, 'Oicatá', 1, 15),
(615, 'Olaya', 1, 5),
(616, 'Olaya Herrera', 1, 52),
(617, 'Onzaga', 1, 68),
(618, 'Oporapa', 1, 41),
(619, 'Orito', 1, 86),
(620, 'Orocué', 1, 85),
(621, 'Ortega', 1, 73),
(622, 'Ospina', 1, 52),
(623, 'Otanche', 1, 15),
(624, 'Ovejas', 1, 70),
(625, 'Pachavita', 1, 15),
(626, 'Pacho', 1, 25),
(627, 'Padilla', 1, 19),
(628, 'Paicol', 1, 41),
(629, 'Pailitas', 1, 20),
(630, 'Paime', 1, 25),
(631, 'Paipa', 1, 15),
(632, 'Pajarito', 1, 15),
(633, 'Palermo', 1, 41),
(634, 'Palestina', 1, 17),
(635, 'Palestina', 1, 41),
(636, 'Palmar', 1, 68),
(637, 'Palmar de Varela', 1, 8),
(638, 'Palmas del Socorro', 1, 68),
(639, 'Palmira', 1, 76),
(640, 'Palmito', 1, 70),
(641, 'Palocabildo', 1, 73),
(642, 'Pamplona', 1, 54),
(643, 'Pamplonita', 1, 54),
(644, 'Pandi', 1, 25),
(645, 'Panqueba', 1, 15),
(646, 'Paratebueno', 1, 25),
(647, 'Pasca', 1, 25),
(648, 'Patía (El Bordo)', 1, 19),
(649, 'Pauna', 1, 15),
(650, 'Paya', 1, 15),
(651, 'Paz de Ariporo', 1, 85),
(652, 'Paz de Río', 1, 15),
(653, 'Pedraza', 1, 47),
(654, 'Pelaya', 1, 20),
(655, 'Pensilvania', 1, 17),
(656, 'Peque', 1, 5),
(657, 'Pereira', 1, 66),
(658, 'Pesca', 1, 15),
(659, 'Peñol', 1, 5),
(660, 'Piamonte', 1, 19),
(661, 'Pie de Cuesta', 1, 68),
(662, 'Piedras', 1, 73),
(663, 'Piendamó', 1, 19),
(664, 'Pijao', 1, 63),
(665, 'Pijiño', 1, 47),
(666, 'Pinchote', 1, 68),
(667, 'Pinillos', 1, 13),
(668, 'Piojo', 1, 8),
(669, 'Pisva', 1, 15),
(670, 'Pital', 1, 41),
(671, 'Pitalito', 1, 41),
(672, 'Pivijay', 1, 47),
(673, 'Planadas', 1, 73),
(674, 'Planeta Rica', 1, 23),
(675, 'Plato', 1, 47),
(676, 'Policarpa', 1, 52),
(677, 'Polonuevo', 1, 8),
(678, 'Ponedera', 1, 8),
(679, 'Popayán', 1, 19),
(680, 'Pore', 1, 85),
(681, 'Potosí', 1, 52),
(682, 'Pradera', 1, 76),
(683, 'Prado', 1, 73),
(684, 'Providencia', 1, 52),
(685, 'Providencia', 1, 88),
(686, 'Pueblo Bello', 1, 20),
(687, 'Pueblo Nuevo', 1, 23),
(688, 'Pueblo Rico', 1, 66),
(689, 'Pueblorrico', 1, 5),
(690, 'Puebloviejo', 1, 47),
(691, 'Puente Nacional', 1, 68),
(692, 'Puerres', 1, 52),
(693, 'Puerto Asís', 1, 86),
(694, 'Puerto Berrío', 1, 5),
(695, 'Puerto Boyacá', 1, 15),
(696, 'Puerto Caicedo', 1, 86),
(697, 'Puerto Carreño', 1, 99),
(698, 'Puerto Colombia', 1, 8),
(699, 'Puerto Concordia', 1, 50),
(700, 'Puerto Escondido', 1, 23),
(701, 'Puerto Gaitán', 1, 50),
(702, 'Puerto Guzmán', 1, 86),
(703, 'Puerto Leguízamo', 1, 86),
(704, 'Puerto Libertador', 1, 23),
(705, 'Puerto Lleras', 1, 50),
(706, 'Puerto López', 1, 50),
(707, 'Puerto Nare', 1, 5),
(708, 'Puerto Nariño', 1, 91),
(709, 'Puerto Parra', 1, 68),
(710, 'Puerto Rico', 1, 18),
(711, 'Puerto Rico', 1, 50),
(712, 'Puerto Rondón', 1, 81),
(713, 'Puerto Salgar', 1, 25),
(714, 'Puerto Santander', 1, 54),
(715, 'Puerto Tejada', 1, 19),
(716, 'Puerto Triunfo', 1, 5),
(717, 'Puerto Wilches', 1, 68),
(718, 'Pulí', 1, 25),
(719, 'Pupiales', 1, 52),
(720, 'Puracé (Coconuco)', 1, 19),
(721, 'Purificación', 1, 73),
(722, 'Purísima', 1, 23),
(723, 'Pácora', 1, 17),
(724, 'Páez', 1, 15),
(725, 'Páez (Belalcazar)', 1, 19),
(726, 'Páramo', 1, 68),
(727, 'Quebradanegra', 1, 25),
(728, 'Quetame', 1, 25),
(729, 'Quibdó', 1, 27),
(730, 'Quimbaya', 1, 63),
(731, 'Quinchía', 1, 66),
(732, 'Quipama', 1, 15),
(733, 'Quipile', 1, 25),
(734, 'Ragonvalia', 1, 54),
(735, 'Ramiriquí', 1, 15),
(736, 'Recetor', 1, 85),
(737, 'Regidor', 1, 13),
(738, 'Remedios', 1, 5),
(739, 'Remolino', 1, 47),
(740, 'Repelón', 1, 8),
(741, 'Restrepo', 1, 50),
(742, 'Restrepo', 1, 76),
(743, 'Retiro', 1, 5),
(744, 'Ricaurte', 1, 25),
(745, 'Ricaurte', 1, 52),
(746, 'Rio Negro', 1, 68),
(747, 'Rioblanco', 1, 73),
(748, 'Riofrío', 1, 76),
(749, 'Riohacha', 1, 44),
(750, 'Risaralda', 1, 17),
(751, 'Rivera', 1, 41),
(752, 'Roberto Payán (San José)', 1, 52),
(753, 'Roldanillo', 1, 76),
(754, 'Roncesvalles', 1, 73),
(755, 'Rondón', 1, 15),
(756, 'Rosas', 1, 19),
(757, 'Rovira', 1, 73),
(758, 'Ráquira', 1, 15),
(759, 'Río Iró', 1, 27),
(760, 'Río Quito', 1, 27),
(761, 'Río Sucio', 1, 17),
(762, 'Río Viejo', 1, 13),
(763, 'Río de oro', 1, 20),
(764, 'Ríonegro', 1, 5),
(765, 'Ríosucio', 1, 27),
(766, 'Sabana de Torres', 1, 68),
(767, 'Sabanagrande', 1, 8),
(768, 'Sabanalarga', 1, 5),
(769, 'Sabanalarga', 1, 8),
(770, 'Sabanalarga', 1, 85),
(771, 'Sabanas de San Angel (SAN ANGEL)', 1, 47),
(772, 'Sabaneta', 1, 5),
(773, 'Saboyá', 1, 15),
(774, 'Sahagún', 1, 23),
(775, 'Saladoblanco', 1, 41),
(776, 'Salamina', 1, 17),
(777, 'Salamina', 1, 47),
(778, 'Salazar', 1, 54),
(779, 'Saldaña', 1, 73),
(780, 'Salento', 1, 63),
(781, 'Salgar', 1, 5),
(782, 'Samacá', 1, 15),
(783, 'Samaniego', 1, 52),
(784, 'Samaná', 1, 17),
(785, 'Sampués', 1, 70),
(786, 'San Agustín', 1, 41),
(787, 'San Alberto', 1, 20),
(788, 'San Andrés', 1, 68),
(789, 'San Andrés Sotavento', 1, 23),
(790, 'San Andrés de Cuerquía', 1, 5),
(791, 'San Antero', 1, 23),
(792, 'San Antonio', 1, 73),
(793, 'San Antonio de Tequendama', 1, 25),
(794, 'San Benito', 1, 68),
(795, 'San Benito Abad', 1, 70),
(796, 'San Bernardo', 1, 25),
(797, 'San Bernardo', 1, 52),
(798, 'San Bernardo del Viento', 1, 23),
(799, 'San Calixto', 1, 54),
(800, 'San Carlos', 1, 5),
(801, 'San Carlos', 1, 23),
(802, 'San Carlos de Guaroa', 1, 50),
(803, 'San Cayetano', 1, 25),
(804, 'San Cayetano', 1, 54),
(805, 'San Cristobal', 1, 13),
(806, 'San Diego', 1, 20),
(807, 'San Eduardo', 1, 15),
(808, 'San Estanislao', 1, 13),
(809, 'San Fernando', 1, 13),
(810, 'San Francisco', 1, 5),
(811, 'San Francisco', 1, 25),
(812, 'San Francisco', 1, 86),
(813, 'San Gíl', 1, 68),
(814, 'San Jacinto', 1, 13),
(815, 'San Jacinto del Cauca', 1, 13),
(816, 'San Jerónimo', 1, 5),
(817, 'San Joaquín', 1, 68),
(818, 'San José', 1, 17),
(819, 'San José de Miranda', 1, 68),
(820, 'San José de Montaña', 1, 5),
(821, 'San José de Pare', 1, 15),
(822, 'San José de Uré', 1, 23),
(823, 'San José del Fragua', 1, 18),
(824, 'San José del Guaviare', 1, 95),
(825, 'San José del Palmar', 1, 27),
(826, 'San Juan de Arama', 1, 50),
(827, 'San Juan de Betulia', 1, 70),
(828, 'San Juan de Nepomuceno', 1, 13),
(829, 'San Juan de Pasto', 1, 52),
(830, 'San Juan de Río Seco', 1, 25),
(831, 'San Juan de Urabá', 1, 5),
(832, 'San Juan del Cesar', 1, 44),
(833, 'San Juanito', 1, 50),
(834, 'San Lorenzo', 1, 52),
(835, 'San Luis', 1, 73),
(836, 'San Luís', 1, 5),
(837, 'San Luís de Gaceno', 1, 15),
(838, 'San Luís de Palenque', 1, 85),
(839, 'San Marcos', 1, 70),
(840, 'San Martín', 1, 20),
(841, 'San Martín', 1, 50),
(842, 'San Martín de Loba', 1, 13),
(843, 'San Mateo', 1, 15),
(844, 'San Miguel', 1, 68),
(845, 'San Miguel', 1, 86),
(846, 'San Miguel de Sema', 1, 15),
(847, 'San Onofre', 1, 70),
(848, 'San Pablo', 1, 13),
(849, 'San Pablo', 1, 52),
(850, 'San Pablo de Borbur', 1, 15),
(851, 'San Pedro', 1, 5),
(852, 'San Pedro', 1, 70),
(853, 'San Pedro', 1, 76),
(854, 'San Pedro de Cartago', 1, 52),
(855, 'San Pedro de Urabá', 1, 5),
(856, 'San Pelayo', 1, 23),
(857, 'San Rafael', 1, 5),
(858, 'San Roque', 1, 5),
(859, 'San Sebastián', 1, 19),
(860, 'San Sebastián de Buenavista', 1, 47),
(861, 'San Vicente', 1, 5),
(862, 'San Vicente del Caguán', 1, 18),
(863, 'San Vicente del Chucurí', 1, 68),
(864, 'San Zenón', 1, 47),
(865, 'Sandoná', 1, 52),
(866, 'Santa Ana', 1, 47),
(867, 'Santa Bárbara', 1, 5),
(868, 'Santa Bárbara', 1, 68),
(869, 'Santa Bárbara (Iscuandé)', 1, 52),
(870, 'Santa Bárbara de Pinto', 1, 47),
(871, 'Santa Catalina', 1, 13),
(872, 'Santa Fé de Antioquia', 1, 5),
(873, 'Santa Genoveva de Docorodó', 1, 27),
(874, 'Santa Helena del Opón', 1, 68),
(875, 'Santa Isabel', 1, 73),
(876, 'Santa Lucía', 1, 8),
(877, 'Santa Marta', 1, 47),
(878, 'Santa María', 1, 15),
(879, 'Santa María', 1, 41),
(880, 'Santa Rosa', 1, 13),
(881, 'Santa Rosa', 1, 19),
(882, 'Santa Rosa de Cabal', 1, 66),
(883, 'Santa Rosa de Osos', 1, 5),
(884, 'Santa Rosa de Viterbo', 1, 15),
(885, 'Santa Rosa del Sur', 1, 13),
(886, 'Santa Rosalía', 1, 99),
(887, 'Santa Sofía', 1, 15),
(888, 'Santana', 1, 15),
(889, 'Santander de Quilichao', 1, 19),
(890, 'Santiago', 1, 54),
(891, 'Santiago', 1, 86),
(892, 'Santo Domingo', 1, 5),
(893, 'Santo Tomás', 1, 8),
(894, 'Santuario', 1, 5),
(895, 'Santuario', 1, 66),
(896, 'Sapuyes', 1, 52),
(897, 'Saravena', 1, 81),
(898, 'Sardinata', 1, 54),
(899, 'Sasaima', 1, 25),
(900, 'Sativanorte', 1, 15),
(901, 'Sativasur', 1, 15),
(902, 'Segovia', 1, 5),
(903, 'Sesquilé', 1, 25),
(904, 'Sevilla', 1, 76),
(905, 'Siachoque', 1, 15),
(906, 'Sibaté', 1, 25),
(907, 'Sibundoy', 1, 86),
(908, 'Silos', 1, 54),
(909, 'Silvania', 1, 25),
(910, 'Silvia', 1, 19),
(911, 'Simacota', 1, 68),
(912, 'Simijaca', 1, 25),
(913, 'Simití', 1, 13),
(914, 'Sincelejo', 1, 70),
(915, 'Sincé', 1, 70),
(916, 'Sipí', 1, 27),
(917, 'Sitionuevo', 1, 47),
(918, 'Soacha', 1, 25),
(919, 'Soatá', 1, 15),
(920, 'Socha', 1, 15),
(921, 'Socorro', 1, 68),
(922, 'Socotá', 1, 15),
(923, 'Sogamoso', 1, 15),
(924, 'Solano', 1, 18),
(925, 'Soledad', 1, 8),
(926, 'Solita', 1, 18),
(927, 'Somondoco', 1, 15),
(928, 'Sonsón', 1, 5),
(929, 'Sopetrán', 1, 5),
(930, 'Soplaviento', 1, 13),
(931, 'Sopó', 1, 25),
(932, 'Sora', 1, 15),
(933, 'Soracá', 1, 15),
(934, 'Sotaquirá', 1, 15),
(935, 'Sotara (Paispamba)', 1, 19),
(936, 'Sotomayor (Los Andes)', 1, 52),
(937, 'Suaita', 1, 68),
(938, 'Suan', 1, 8),
(939, 'Suaza', 1, 41),
(940, 'Subachoque', 1, 25),
(941, 'Sucre', 1, 19),
(942, 'Sucre', 1, 68),
(943, 'Sucre', 1, 70),
(944, 'Suesca', 1, 25),
(945, 'Supatá', 1, 25),
(946, 'Supía', 1, 17),
(947, 'Suratá', 1, 68),
(948, 'Susa', 1, 25),
(949, 'Susacón', 1, 15),
(950, 'Sutamarchán', 1, 15),
(951, 'Sutatausa', 1, 25),
(952, 'Sutatenza', 1, 15),
(953, 'Suárez', 1, 19),
(954, 'Suárez', 1, 73),
(955, 'Sácama', 1, 85),
(956, 'Sáchica', 1, 15),
(957, 'Tabio', 1, 25),
(958, 'Tadó', 1, 27),
(959, 'Talaigua Nuevo', 1, 13),
(960, 'Tamalameque', 1, 20),
(961, 'Tame', 1, 81),
(962, 'Taminango', 1, 52),
(963, 'Tangua', 1, 52),
(964, 'Taraira', 1, 97),
(965, 'Tarazá', 1, 5),
(966, 'Tarqui', 1, 41),
(967, 'Tarso', 1, 5),
(968, 'Tasco', 1, 15),
(969, 'Tauramena', 1, 85),
(970, 'Tausa', 1, 25),
(971, 'Tello', 1, 41),
(972, 'Tena', 1, 25),
(973, 'Tenerife', 1, 47),
(974, 'Tenjo', 1, 25),
(975, 'Tenza', 1, 15),
(976, 'Teorama', 1, 54),
(977, 'Teruel', 1, 41),
(978, 'Tesalia', 1, 41),
(979, 'Tibacuy', 1, 25),
(980, 'Tibaná', 1, 15),
(981, 'Tibasosa', 1, 15),
(982, 'Tibirita', 1, 25),
(983, 'Tibú', 1, 54),
(984, 'Tierralta', 1, 23),
(985, 'Timaná', 1, 41),
(986, 'Timbiquí', 1, 19),
(987, 'Timbío', 1, 19),
(988, 'Tinjacá', 1, 15),
(989, 'Tipacoque', 1, 15),
(990, 'Tiquisio (Puerto Rico)', 1, 13),
(991, 'Titiribí', 1, 5),
(992, 'Toca', 1, 15),
(993, 'Tocaima', 1, 25),
(994, 'Tocancipá', 1, 25),
(995, 'Toguí', 1, 15),
(996, 'Toledo', 1, 5),
(997, 'Toledo', 1, 54),
(998, 'Tolú', 1, 70),
(999, 'Tolú Viejo', 1, 70),
(1000, 'Tona', 1, 68),
(1001, 'Topagá', 1, 15),
(1002, 'Topaipí', 1, 25),
(1003, 'Toribío', 1, 19),
(1004, 'Toro', 1, 76),
(1005, 'Tota', 1, 15),
(1006, 'Totoró', 1, 19),
(1007, 'Trinidad', 1, 85),
(1008, 'Trujillo', 1, 76),
(1009, 'Tubará', 1, 8),
(1010, 'Tuchín', 1, 23),
(1011, 'Tulúa', 1, 76),
(1012, 'Tumaco', 1, 52),
(1013, 'Tunja', 1, 15),
(1014, 'Tunungua', 1, 15),
(1015, 'Turbaco', 1, 13),
(1016, 'Turbaná', 1, 13),
(1017, 'Turbo', 1, 5),
(1018, 'Turmequé', 1, 15),
(1019, 'Tuta', 1, 15),
(1020, 'Tutasá', 1, 15),
(1021, 'Támara', 1, 85),
(1022, 'Támesis', 1, 5),
(1023, 'Túquerres', 1, 52),
(1024, 'Ubalá', 1, 25),
(1025, 'Ubaque', 1, 25),
(1026, 'Ubaté', 1, 25),
(1027, 'Ulloa', 1, 76),
(1028, 'Une', 1, 25),
(1029, 'Unguía', 1, 27),
(1030, 'Unión Panamericana (ÁNIMAS)', 1, 27),
(1031, 'Uramita', 1, 5),
(1032, 'Uribe', 1, 50),
(1033, 'Uribia', 1, 44),
(1034, 'Urrao', 1, 5),
(1035, 'Urumita', 1, 44),
(1036, 'Usiacuri', 1, 8),
(1037, 'Valdivia', 1, 5),
(1038, 'Valencia', 1, 23),
(1039, 'Valle de San José', 1, 68),
(1040, 'Valle de San Juan', 1, 73),
(1041, 'Valle del Guamuez', 1, 86),
(1042, 'Valledupar', 1, 20),
(1043, 'Valparaiso', 1, 5),
(1044, 'Valparaiso', 1, 18),
(1045, 'Vegachí', 1, 5),
(1046, 'Venadillo', 1, 73),
(1047, 'Venecia', 1, 5),
(1048, 'Venecia (Ospina Pérez)', 1, 25),
(1049, 'Ventaquemada', 1, 15),
(1050, 'Vergara', 1, 25),
(1051, 'Versalles', 1, 76),
(1052, 'Vetas', 1, 68),
(1053, 'Viani', 1, 25),
(1054, 'Vigía del Fuerte', 1, 5),
(1055, 'Vijes', 1, 76),
(1056, 'Villa Caro', 1, 54),
(1057, 'Villa Rica', 1, 19),
(1058, 'Villa de Leiva', 1, 15),
(1059, 'Villa del Rosario', 1, 54),
(1060, 'Villagarzón', 1, 86),
(1061, 'Villagómez', 1, 25),
(1062, 'Villahermosa', 1, 73),
(1063, 'Villamaría', 1, 17),
(1064, 'Villanueva', 1, 13),
(1065, 'Villanueva', 1, 44),
(1066, 'Villanueva', 1, 68),
(1067, 'Villanueva', 1, 85),
(1068, 'Villapinzón', 1, 25),
(1069, 'Villarrica', 1, 73),
(1070, 'Villavicencio', 1, 50),
(1071, 'Villavieja', 1, 41),
(1072, 'Villeta', 1, 25),
(1073, 'Viotá', 1, 25),
(1074, 'Viracachá', 1, 15),
(1075, 'Vista Hermosa', 1, 50),
(1076, 'Viterbo', 1, 17),
(1077, 'Vélez', 1, 68),
(1078, 'Yacopí', 1, 25),
(1079, 'Yacuanquer', 1, 52),
(1080, 'Yaguará', 1, 41),
(1081, 'Yalí', 1, 5),
(1082, 'Yarumal', 1, 5),
(1083, 'Yolombó', 1, 5),
(1084, 'Yondó (Casabe)', 1, 5),
(1085, 'Yopal', 1, 85),
(1086, 'Yotoco', 1, 76),
(1087, 'Yumbo', 1, 76),
(1088, 'Zambrano', 1, 13),
(1089, 'Zapatoca', 1, 68),
(1090, 'Zapayán (PUNTA DE PIEDRAS)', 1, 47),
(1091, 'Zaragoza', 1, 5),
(1092, 'Zarzal', 1, 76),
(1093, 'Zetaquirá', 1, 15),
(1094, 'Zipacón', 1, 25),
(1095, 'Zipaquirá', 1, 25),
(1096, 'Zona Bananera (PRADO - SEVILLA)', 1, 47),
(1097, 'Ábrego', 1, 54),
(1098, 'Íquira', 1, 41),
(1099, 'Úmbita', 1, 15),
(1100, 'Útica', 1, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `notificacion` (
  `id` int(11) NOT NULL,
  `titulo` varchar(500) NOT NULL,
  `asunto` varchar(500) NOT NULL,
  `contenido` varchar(1000) NOT NULL,
  `imagen` varchar(500) NOT NULL,
  `url_1` varchar(1000) DEFAULT NULL,
  `url_2` varchar(1000) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado_abierto` int(10) NOT NULL DEFAULT 0,
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `notificacion`
--

INSERT INTO `notificacion` (`id`, `titulo`, `asunto`, `contenido`, `imagen`, `url_1`, `url_2`, `fecha_creacion`, `estado_abierto`, `estado`, `id_usuario`) VALUES
(1, 'Gaseosa Coca Cola sabor original', 'Alguién Realizó una pregunta en tu producto', 'me puede regalar el producto?', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-22 11:06:51', 1, 'A', 1),
(2, 'Gaseosa Coca Cola sabor original', 'El vendedor te ha respondido', 'aveces', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-22 11:24:27', 0, 'A', 8),
(3, 'Whisky Buchanan\'s Deluxe', 'Alguién Realizó una pregunta en tu producto', 'no le pueden hacer mas rebaja?', 'producto_default.jpg', 'views/descripcion.php?name=Whisky Buchanan\'s Deluxe&&id=bB9Rph+GtfM4URyyszp2Gw==', NULL, '2023-05-22 12:30:42', 1, 'I', 1),
(4, 'Whisky Buchanan\'s Deluxe', 'El vendedor te ha respondido', 'no', 'producto_default.jpg', 'views/descripcion.php?name=Whisky Buchanan\'s Deluxe&&id=bB9Rph+GtfM4URyyszp2Gw==', NULL, '2023-05-22 13:56:13', 1, 'I', 4),
(5, 'Gaseosa Coca Cola sabor original', 'Alguién Realizó una pregunta en tu producto', 'todavía tiene más productos de estos?', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-22 23:05:43', 1, 'I', 1),
(6, 'Gaseosa Coca Cola sabor original', 'El vendedor te ha respondido', 'sí, claro', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-22 23:13:13', 0, 'A', 3),
(7, 'Gaseosa Coca Cola sabor original', 'Alguién Realizó una pregunta en tu producto', 'que marca es?', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-24 11:50:14', 1, 'A', 1),
(8, 'Gaseosa Coca Cola sabor original', 'El vendedor te ha respondido', 'postobon', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-24 11:51:04', 1, 'A', 12),
(9, 'Gaseosa Coca Cola sabor original', 'Alguién Realizó una pregunta en tu producto', 'Pq están dañina', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-24 18:01:11', 1, 'A', 1),
(10, 'Gaseosa Coca Cola sabor original', 'El vendedor te ha respondido', 'no sea sapo', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-24 18:01:39', 1, 'I', 4),
(11, 'Gaseosa Coca Cola sabor original', 'Alguién Realizó una pregunta en tu producto', 'su bebida es un asco', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-24 18:09:25', 1, 'I', 1),
(12, 'Gaseosa Coca Cola sabor original', 'El vendedor te ha respondido', 'si no la quiere no la compre, gracias ;)', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-24 18:09:55', 1, 'I', 4),
(13, 'Gaseosa Coca Cola sabor original', 'El vendedor te ha respondido', 'no', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-05-24 18:42:21', 0, 'A', 8),
(14, 'Gaseosa Coca Cola sabor original', 'Alguién Realizó una pregunta en tu producto', 'Hola', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-06-02 08:48:03', 0, 'A', 1),
(15, 'Gaseosa Coca Cola sabor original', 'El vendedor te ha respondido', 'hello', 'producto_default.jpg', 'views/descripcion.php?name=Gaseosa Coca Cola sabor original&&id=oBNdnmI70tGU4vNlwJ7oDg==', NULL, '2023-06-02 08:48:19', 0, 'A', 14),
(16, 'Whisky Buchanan\'s Deluxe', 'El vendedor te ha respondido', 'aveces', 'producto_default.jpg', 'views/descripcion.php?name=Whisky Buchanan\'s Deluxe&&id=bB9Rph+GtfM4URyyszp2Gw==', NULL, '2023-06-03 16:28:47', 0, 'A', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL,
  `contenido` varchar(1000) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `respuesta` int(10) NOT NULL DEFAULT 0,
  `id_producto_tienda` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id`, `contenido`, `fecha_creacion`, `estado`, `respuesta`, `id_producto_tienda`, `id_usuario`) VALUES
(1, 'por que el producto no tiene envío gratis?', '2023-05-21 13:14:13', 'A', 1, 2, 3),
(2, 'por qué tan costoso compañero?', '2023-05-21 13:14:13', 'A', 1, 1, 4),
(3, 'la gaseosa es negra?', '2023-05-21 20:22:30', 'A', 0, 1, 3),
(4, 'le parece bien si compro el producto?', '2023-05-21 21:30:56', 'A', 1, 2, 3),
(5, 'usted me asegura que el producto me llegué en buen estado?', '2023-05-21 21:36:36', 'A', 1, 2, 3),
(6, 'aún tiene disponible esté producto?', '2023-05-22 11:03:57', 'A', 1, 1, 8),
(7, 'me puede regalar el producto?', '2023-05-22 11:06:51', 'A', 1, 1, 8),
(8, 'no le pueden hacer mas rebaja?', '2023-05-22 12:30:42', 'A', 1, 2, 4),
(9, 'todavía tiene más productos de estos?', '2023-05-22 23:05:43', 'A', 1, 1, 3),
(10, 'que marca es?', '2023-05-24 11:50:13', 'A', 1, 1, 12),
(11, 'Pq están dañina', '2023-05-24 18:01:11', 'A', 1, 1, 4),
(12, 'su bebida es un asco', '2023-05-24 18:09:25', 'A', 1, 1, 4),
(13, 'Hola', '2023-06-02 08:48:03', 'A', 1, 1, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `SKU` varchar(50) NOT NULL,
  `detalles` varchar(1000) NOT NULL,
  `imagen_principal` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_marca` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `SKU`, `detalles`, `imagen_principal`, `fecha_creacion`, `fecha_edicion`, `estado`, `id_marca`) VALUES
(1, 'Whisky Buchanan\'s Deluxe', 'BUC-DEL-750', 'whisky Buchanan\'s Deluxe es de origen escocés, lo cual representa una larga tradición en la producción de whisky de alta calidad.', 'producto_default.jpg', '2023-05-18 16:34:30', '2023-05-18 16:34:30', 'A', 2),
(2, 'Gaseosa Coca Cola sabor original', 'CC0015-ORIG', 'Disfruta de la refrescante Gaseosa Coca Cola en su clásico sabor original. Esta botella de 1.5 litros contiene la combinación perfecta de burbujas efervescentes y el inconfundible sabor a cola que ha conquistado a millones de personas en todo el mundo.', 'producto_default.jpg', '2023-05-18 16:34:30', '2023-05-18 16:34:30', 'A', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_subcategoria`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `producto_subcategoria` (
  `id` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_producto` int(11) NOT NULL,
  `id_subcategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_subcategoria`
--

INSERT INTO `producto_subcategoria` (`id`, `fecha_creacion`, `fecha_edicion`, `estado`, `id_producto`, `id_subcategoria`) VALUES
(1, '2023-05-18 16:56:03', '2023-05-18 16:56:03', 'A', 2, 2),
(2, '2023-05-18 16:56:03', '2023-05-18 16:56:03', 'A', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_tienda`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `producto_tienda` (
  `id` int(11) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int(11) NOT NULL,
  `descuento` int(11) NOT NULL,
  `garantia` varchar(100) NOT NULL,
  `estado_envio` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_producto` int(11) NOT NULL,
  `id_tienda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_tienda`
--

INSERT INTO `producto_tienda` (`id`, `precio`, `cantidad`, `descuento`, `garantia`, `estado_envio`, `fecha_creacion`, `fecha_edicion`, `estado`, `id_producto`, `id_tienda`) VALUES
(1, 2500, 50, 0, '3 días', 'gratis', '2023-05-18 17:11:01', '2023-05-18 17:11:01', 'A', 2, 1),
(2, 50000, 20, 10, '1 semana', '', '2023-05-18 17:11:01', '2023-05-18 17:11:01', 'A', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `resena` (
  `id` int(11) NOT NULL,
  `calificacion` int(10) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_producto_tienda` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resena`
--

INSERT INTO `resena` (`id`, `calificacion`, `descripcion`, `fecha_creacion`, `fecha_edicion`, `estado`, `id_producto_tienda`, `id_usuario`) VALUES
(1, 4, 'buena tienda, me llegó el producto en buen estado', '2023-05-18 17:19:10', '2023-05-18 17:19:10', 'A', 1, 2),
(2, 2, 'muy grosero el que trajo el pedido', '2023-05-18 17:19:10', '2023-05-18 17:19:10', 'A', 2, 3),
(3, 3, 'pueden mejorar el servicio de entrega', '2023-05-18 17:19:10', '2023-05-18 17:19:10', 'A', 1, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `respuesta` (
  `id` int(11) NOT NULL,
  `contenido` varchar(1000) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_pregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`id`, `contenido`, `fecha_creacion`, `estado`, `id_pregunta`) VALUES
(1, 'si no lo quiere no lo compre', '2023-05-21 13:16:14', 'A', 1),
(2, 'por qué tan tacaño compañero?', '2023-05-21 13:16:14', 'A', 2),
(3, 'sí, por supuesto', '2023-05-22 09:26:22', 'A', 5),
(4, 'aveces', '2023-05-22 11:24:27', 'A', 6),
(5, 'no', '2023-05-22 13:56:13', 'A', 8),
(6, 'sí, claro', '2023-05-22 23:13:13', 'A', 9),
(7, 'postobon', '2023-05-24 11:51:03', 'A', 10),
(8, 'no sea sapo', '2023-05-24 18:01:39', 'A', 11),
(9, 'si no la quiere no la compre, gracias ;)', '2023-05-24 18:09:55', 'A', 12),
(10, 'no', '2023-05-24 18:42:21', 'A', 7),
(11, 'hello', '2023-06-02 08:48:18', 'A', 13),
(12, 'aveces', '2023-06-03 16:28:47', 'A', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategoria`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `subcategoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subcategoria`
--

INSERT INTO `subcategoria` (`id`, `nombre`, `fecha_creacion`, `fecha_edicion`, `estado`, `id_categoria`) VALUES
(1, 'crédito', '2023-05-18 16:54:42', '2023-05-18 16:54:42', 'A', 2),
(2, 'efectivo', '2023-05-18 16:54:42', '2023-05-18 16:54:42', 'A', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `tienda` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `razon_social` varchar(200) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `RUC` varchar(12) NOT NULL,
  `imagen` varchar(100) NOT NULL DEFAULT 'default.jpg',
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_usuario` int(11) NOT NULL,
  `id_municipio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`id`, `nombre`, `razon_social`, `direccion`, `RUC`, `imagen`, `fecha_creacion`, `fecha_edicion`, `estado`, `id_usuario`, `id_municipio`) VALUES
(1, 'licorería narem ', 'tienda de bebidas', 'ni idea', '12345678912', 'default.jpg', '2023-05-18 17:06:46', '2023-05-18 17:06:46', 'A', 1, 118);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_historial`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `tipo_historial` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `icono` varchar(100) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_historial`
--

INSERT INTO `tipo_historial` (`id`, `nombre`, `icono`, `estado`) VALUES
(1, 'Editar', '<i class=\"fa-solid fa-pen-to-square fa-fade\" style=\"color: #00ff2a;\"></i>', 'A'),
(2, 'Crear', '<i class=\"fa-solid fa-circle-plus fa-fade\" style=\"color: #00ff04;\"></i>', 'A'),
(3, 'Borrar', '<i class=\"fa-solid fa-trash fa-fade\" style=\"color: #cc0000;\"></i>', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `tipo_usuario` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `estado` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id`, `tipo`, `estado`) VALUES
(1, 'Root', 'A'),
(2, 'Cliente', 'A'),
(3, 'Vendedor', 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `pass` varchar(155) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `referencia` varchar(100) DEFAULT 'no se ha registrado',
  `dni` int(12) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` bigint(50) DEFAULT NULL,
  `avatar` varchar(200) NOT NULL DEFAULT 'default.jpg',
  `estado` varchar(10) NOT NULL DEFAULT 'A',
  `id_tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `user`, `pass`, `nombres`, `apellidos`, `direccion`, `referencia`, `dni`, `email`, `telefono`, `avatar`, `estado`, `id_tipo`) VALUES
(1, 'Itoshi', 'JfO/uat5gkwbZo1vKJksyQ==', 'itoshi', 'seichiro', 'Terraria 0000', 'another world', 1005324417, 'notengo@gmail.com', 3118541948, '646647f66b09e-sae.jpg', 'A', 2),
(2, 'Diegonair', 'uX1eiOW8RO9xn6SNkAIXsg==', 'Diego', 'Suarez', NULL, NULL, 123456789, 'Diego@gmail.com', 1234567891, 'default.jpg', 'A', 2),
(3, 'Angelly', 'ssn0uEOcz86BM22vp2HObg==', 'Angelly', 'Osma', NULL, NULL, 2147483647, 'Angelly@gmail.com', 1234567890, '646a6d12ce18c-arquitecta.jpg', 'A', 2),
(4, 'sergioflorez422', 'iKRc1/OqQTNJj/yY8G1YXA==', 'sergio', 'florez', NULL, 'no se ha registrado', 1005282436, 'sergioflorez422@gmail.com', 3142019084, '646e98ac80c99-pim nn.jpg', 'A', 2),
(5, 'prueba1', 'uX1eiOW8RO9xn6SNkAIXsg==', 'prueba', 'Suarez', NULL, 'no se ha registrado', 123456789, 'prueba@gmail.com', 3142019084, 'default.jpg', 'A', 2),
(6, 'luzsuarez', 'uX1eiOW8RO9xn6SNkAIXsg==', 'luz', 'Suarez', NULL, 'no se ha registrado', 123456789, 'luz@gmail.com', 1234567891, 'default.jpg', 'A', 2),
(7, 'Camilol', 'uX1eiOW8RO9xn6SNkAIXsg==', 'Camilo', 'Perez', NULL, 'no se ha registrado', 1005497726, 'camilolperez1314@gmail.com', 3937484737, '6463b1987cd62-IMG-20230504-WA0019.jpg', 'A', 2),
(8, 'Karen Perez', 'uX1eiOW8RO9xn6SNkAIXsg==', 'Karen', 'Perez', NULL, 'no se ha registrado', 1005259682, 'ckaren.mperez23@gmail.com', 3142584526, 'default.jpg', 'A', 2),
(9, 'paquita', '3GUhNDOPnb4VcTZKKXyDGQ==', 'Edwin', 'Cru', NULL, 'no se ha registrado', 1234567890, 'julian@gmail.com', 2312323423, '6465634372216-sae.jpg', 'A', 2),
(10, 'AlexOrt', 'JfO/uat5gkwbZo1vKJksyQ==', 'Alexander', 'Ortega', NULL, 'no se ha registrado', 1005210948, 'A@hotmail.com', 3172684085, '6467eb24c52a3-IMG-20230517-WA0035.jpg', 'A', 2),
(12, 'Roberto Carlos', 'f4eydo2HE1M9/h7ed3lYQw==', 'Johanna', 'Orduz', NULL, 'no se ha registrado', 1234567890, 'robertocarlos@gmail.com', 3216843684, '646e3fd2df335-jperez_logo_de_fox_colores_azul_oscuro_y_gris_logo_44b47e7b-cd60-40c5-8d8c-6f67acf8100c.png', 'A', 2),
(13, 'Marlon', '9qsvvCtouhWom/6tOwdTyw==', 'Marlon', 'Hernandez', NULL, 'no se ha registrado', 1005165478, 'marlonyesid081937@gmail.com', 3102326645, 'default.jpg', 'A', 2),
(14, 'Kenia ', 'C1VeEViU4sLrZLvWeksQ2Q==', 'Kenia luengas ', 'Luengas', NULL, 'no se ha registrado', 1102714558, 'kenialuengas@gamil.com', 3118051334, 'default.jpg', 'A', 2),
(15, 'gata123', 'TJtp6cJ/6kDh4Je/H8YbUw==', 'gata', 'dayana', NULL, 'no se ha registrado', 1005259682, 'gata@gmail.com', 3142584526, 'default.jpg', 'A', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_municipio`
--
-- Creación: 09-07-2023 a las 00:16:28
--

CREATE TABLE `usuario_municipio` (
  `id` int(11) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `referencia` varchar(255) DEFAULT 'no se ha registrado',
  `id_municipio` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `estado_d` varchar(10) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_municipio`
--

INSERT INTO `usuario_municipio` (`id`, `direccion`, `referencia`, `id_municipio`, `id_usuario`, `estado_d`) VALUES
(3, 'el portal de isrrael', 'edificio amarillo', 291, 3, 'A'),
(4, 'trv135#879', 'cerca al gato echado ', 661, 4, 'A'),
(5, 'el cielo', 'al lado del árbol que esta en el cielo', 125, 4, 'A'),
(16, 'sapo', 'oe34', 374, 9, 'A'),
(17, 'Calle 4', 'Uwu ', 156, 10, 'I'),
(18, 'trv135#879', 'al lado de un palo', 374, 12, 'A'),
(19, 'al lado de un palo', 'el palo es negro', 863, 1, 'I'),
(20, 'estacion del 12 3', 'es un estacionamiento', 107, 1, 'I'),
(21, 'trv 135 44 12', 'al lado de un rio azul bonito', 315, 1, 'I'),
(22, 'nose', 'nose', 672, 1, 'I'),
(23, 'la casa de shakira', 'ya no vive con pique', 88, 1, 'I'),
(24, 'bog', 'bog', 107, 1, 'I'),
(25, 'altos de rosario edf 87', 'muy bonito el edificio y bonito jardin con piscina', 28, 1, 'I'),
(26, 'edif 43', 'bonito edificio tambien', 28, 1, 'I'),
(27, 'a', 'a', 362, 1, 'I'),
(32, 'nose', 'nose', 88, 1, 'I'),
(33, 'trv 135 44 12', 'bog', 88, 1, 'I'),
(34, 'europa', 'nose', 685, 1, 'I'),
(35, 'una casa', 'esta al lado del parque', 137, 1, 'I'),
(36, 'la casa de calamardo', 'al lado de una piña', 142, 1, 'I'),
(37, 'narnia', 'al lado del lago', 29, 1, 'I'),
(38, 'estacion del 12 3', 'es un estacionamiento', 88, 1, 'I'),
(39, 'bog', 'al lado de un rio azul bonito', 156, 1, 'I'),
(40, 'la casa de shakira', 'bog', 152, 1, 'I');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id_departamento`);

--
-- Indices de la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`,`id_producto_tienda`),
  ADD KEY `id_producto_tienda` (`id_producto_tienda`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo_historial` (`id_tipo_historial`,`id_modulo`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_modulo` (`id_modulo`);

--
-- Indices de la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `modulo`
--
ALTER TABLE `modulo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`id_municipio`),
  ADD KEY `departamento_id` (`departamento_id`);

--
-- Indices de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto_tienda` (`id_producto_tienda`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `producto_subcategoria`
--
ALTER TABLE `producto_subcategoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`,`id_subcategoria`),
  ADD KEY `id_subcategoria` (`id_subcategoria`);

--
-- Indices de la tabla `producto_tienda`
--
ALTER TABLE `producto_tienda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto` (`id_producto`,`id_tienda`),
  ADD KEY `id_tienda` (`id_tienda`);

--
-- Indices de la tabla `resena`
--
ALTER TABLE `resena`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto_tienda` (`id_producto_tienda`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pregunta` (`id_pregunta`);

--
-- Indices de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`,`id_municipio`),
  ADD KEY `id_municipio` (`id_municipio`);

--
-- Indices de la tabla `tipo_historial`
--
ALTER TABLE `tipo_historial`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo` (`id_tipo`);

--
-- Indices de la tabla `usuario_municipio`
--
ALTER TABLE `usuario_municipio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_municipio` (`id_municipio`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id_departamento` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `favorito`
--
ALTER TABLE `favorito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT de la tabla `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `modulo`
--
ALTER TABLE `modulo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `id_municipio` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1101;

--
-- AUTO_INCREMENT de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto_subcategoria`
--
ALTER TABLE `producto_subcategoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto_tienda`
--
ALTER TABLE `producto_tienda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `resena`
--
ALTER TABLE `resena`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tipo_historial`
--
ALTER TABLE `tipo_historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuario_municipio`
--
ALTER TABLE `usuario_municipio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  ADD CONSTRAINT `caracteristica_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD CONSTRAINT `favorito_ibfk_1` FOREIGN KEY (`id_producto_tienda`) REFERENCES `producto_tienda` (`id`),
  ADD CONSTRAINT `favorito_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`id_tipo_historial`) REFERENCES `tipo_historial` (`id`),
  ADD CONSTRAINT `historial_ibfk_3` FOREIGN KEY (`id_modulo`) REFERENCES `modulo` (`id`);

--
-- Filtros para la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD CONSTRAINT `imagen_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD CONSTRAINT `municipios_ibfk_1` FOREIGN KEY (`departamento_id`) REFERENCES `departamentos` (`id_departamento`);

--
-- Filtros para la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`id_producto_tienda`) REFERENCES `producto_tienda` (`id`),
  ADD CONSTRAINT `pregunta_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id`);

--
-- Filtros para la tabla `producto_subcategoria`
--
ALTER TABLE `producto_subcategoria`
  ADD CONSTRAINT `producto_subcategoria_ibfk_1` FOREIGN KEY (`id_subcategoria`) REFERENCES `subcategoria` (`id`),
  ADD CONSTRAINT `producto_subcategoria_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `producto_tienda`
--
ALTER TABLE `producto_tienda`
  ADD CONSTRAINT `producto_tienda_ibfk_1` FOREIGN KEY (`id_tienda`) REFERENCES `tienda` (`id`),
  ADD CONSTRAINT `producto_tienda_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `resena`
--
ALTER TABLE `resena`
  ADD CONSTRAINT `resena_ibfk_1` FOREIGN KEY (`id_producto_tienda`) REFERENCES `producto_tienda` (`id`),
  ADD CONSTRAINT `resena_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `respuesta_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id`);

--
-- Filtros para la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD CONSTRAINT `subcategoria_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`);

--
-- Filtros para la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD CONSTRAINT `tienda_ibfk_1` FOREIGN KEY (`id_municipio`) REFERENCES `municipios` (`id_municipio`),
  ADD CONSTRAINT `tienda_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_usuario` (`id`);

--
-- Filtros para la tabla `usuario_municipio`
--
ALTER TABLE `usuario_municipio`
  ADD CONSTRAINT `usuario_municipio_ibfk_1` FOREIGN KEY (`id_municipio`) REFERENCES `municipios` (`id_municipio`),
  ADD CONSTRAINT `usuario_municipio_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
