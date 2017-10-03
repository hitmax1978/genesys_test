-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Час створення: Жов 03 2017 р., 16:03
-- Версія сервера: 5.7.17-log
-- Версія PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `miratech_test`
--

-- --------------------------------------------------------

--
-- Структура таблиці `s_person`
--

CREATE TABLE `s_person` (
  `s_person_id` int(11) NOT NULL,
  `s_person_first_name` varchar(255) NOT NULL,
  `s_person_last_name` varchar(255) DEFAULT NULL,
  `s_person_tel_mob` varchar(14) DEFAULT NULL,
  `s_person_tel_home` varchar(14) DEFAULT NULL,
  `s_person_tel_work` varchar(14) DEFAULT NULL,
  `s_person_company` varchar(255) DEFAULT NULL,
  `s_person_note` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп даних таблиці `s_person`
--

INSERT INTO `s_person` (`s_person_id`, `s_person_first_name`, `s_person_last_name`, `s_person_tel_mob`, `s_person_tel_home`, `s_person_tel_work`, `s_person_company`, `s_person_note`) VALUES
(1, 'Alexandra', 'Galton', '+380670000000', '+380670000001', '+380670000002', 'Google', ''),
(2, 'Angela!', 'Oscar!', '+380971111111', '+380971111112', '380971111113', 'Apple', '');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `s_person`
--
ALTER TABLE `s_person`
  ADD PRIMARY KEY (`s_person_id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `s_person`
--
ALTER TABLE `s_person`
  MODIFY `s_person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
