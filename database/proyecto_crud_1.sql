-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2023 at 05:04 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyecto_crud_1`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `rol` varchar(20) NOT NULL,
  `procedencia` varchar(20) NOT NULL,
  `recurso` varchar(20) NOT NULL,
  `golpe` varchar(20) NOT NULL,
  `imagen` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nombre`, `rol`, `procedencia`, `recurso`, `golpe`, `imagen`) VALUES
(102, 'Hecarim', 'Medio', 'Islas de las Sombras', 'Mana', 'Cuerpo a cuerpo', 'e54000c8797e7b51d43857313aec2b52.jpg'),
(103, 'Richi', 'Bot', 'Ciudad de Bandle', 'Vida', 'A distancia', '9e36d9a1207476b413a88ad29433736e.jpg'),
(113, 'Oliver', 'Jungla', 'Zaun', 'Escudo', 'Cuerpo a cuerpo', 'ea98b16729ab76aeef08a01df3c675cc.jpg'),
(114, 'Sandra', 'Support', 'Noxus', 'Furia', 'A distancia', '8532ff295863148e40df020409d3a887.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
