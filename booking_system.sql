-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2023 at 05:31 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE `admin_info` (
  `id` int(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`id`, `email`, `password`) VALUES
(25, 'admin@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `booking_meeting`
--

CREATE TABLE `booking_meeting` (
  `id` int(100) NOT NULL,
  `user_id` int(100) NOT NULL,
  `meeting_id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking_meeting`
--

INSERT INTO `booking_meeting` (`id`, `user_id`, `meeting_id`) VALUES
(1, 1, 8),
(3, 2, 19),
(4, 2, 18),
(5, 1, 17),
(6, 1, 20),
(7, 1, 16),
(8, 2, 21);

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `id` int(100) NOT NULL,
  `mtitle` varchar(500) NOT NULL,
  `mdate` varchar(500) NOT NULL,
  `mtime` varchar(100) NOT NULL,
  `mshift` varchar(100) NOT NULL,
  `booking` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`id`, `mtitle`, `mdate`, `mtime`, `mshift`, `booking`) VALUES
(1, 'Meeting 1', 'Jan 20 2023', '3', 'pm', '0'),
(8, 'Meeting 2', 'Jan 20 2023', '5', 'am', '1'),
(9, 'Meeting 4', 'Jan 20 2023', '12', 'pm', '0'),
(13, 'meting 3', '2023-01-19', '1', 'pm', '0'),
(16, 'meting 1', '2023-01-19', '4', 'pm', '1'),
(17, 'meting 1', '2023-01-20', '1', 'am', '1'),
(18, 'meting 1', '2023-01-20', '1', 'pm', '1'),
(19, 'meting 1', '2023-01-20', '7', 'pm', '1'),
(20, 'Developer Meetup', '2023-01-20', '8', 'pm', '1'),
(21, 'Zoom Meeting', '2023-01-20', '3', 'pm', '1');

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `email`, `password`) VALUES
(1, 'user1@gmail.com', '123456'),
(2, 'user2@gmail.com', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_info`
--
ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_meeting`
--
ALTER TABLE `booking_meeting`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `meeting_id` (`meeting_id`) USING BTREE;

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_info`
--
ALTER TABLE `admin_info`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `booking_meeting`
--
ALTER TABLE `booking_meeting`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking_meeting`
--
ALTER TABLE `booking_meeting`
  ADD CONSTRAINT `booking_meeting_ibfk_1` FOREIGN KEY (`meeting_id`) REFERENCES `meeting` (`id`),
  ADD CONSTRAINT `booking_meeting_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
