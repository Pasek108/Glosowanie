-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 03 Sty 2021, 20:53
-- Wersja serwera: 10.1.38-MariaDB
-- Wersja PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `glosowania`
--
CREATE DATABASE IF NOT EXISTS `glosowania` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;
USE `glosowania`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `glosowania`
--

CREATE TABLE `glosowania` (
  `id` int(11) NOT NULL,
  `nazwa` varchar(20) COLLATE utf8mb4_polish_ci NOT NULL,
  `priv` int(11) NOT NULL,
  `haslo` varchar(30) COLLATE utf8mb4_polish_ci NOT NULL,
  `wiele` int(11) NOT NULL,
  `haslo_admin` varchar(33) COLLATE utf8mb4_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Zrzut danych tabeli `glosowania`
--

INSERT INTO `glosowania` (`id`, `nazwa`, `priv`, `haslo`, `wiele`, `haslo_admin`) VALUES
(1, 'mb290k4nan5h8jzhqdkj', 0, '', 0, '16fbd5434c30a0e4e6f68929fd35e455'),
(2, 'xfa2ojkxstj5hrdb4ysp', 1, 'test', 1, '21d6a860087800df41405041d4e53762'),
(3, 'ol1vw2jgmnr0up5v0znk', 0, '', 1, '3cfb5a1aaf875d7ddaec1ac87ceb7c13'),
(4, 'f6ady4l0etu352ny6upz', 0, '', 0, '146926f485ed05e0fdc548456b732ab5');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `glosowania`
--
ALTER TABLE `glosowania`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `glosowania`
--
ALTER TABLE `glosowania`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
