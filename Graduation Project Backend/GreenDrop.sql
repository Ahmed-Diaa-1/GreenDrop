-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2024 at 10:48 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `greendrop`
--

-- --------------------------------------------------------

--
-- Table structure for table `deliveryblock`
--

CREATE TABLE `deliveryblock` (
  `b_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `b_status` varchar(60) NOT NULL,
  `fee` int(11) NOT NULL,
  `time_allocated` int(11) NOT NULL,
  `d_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `d_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `phone` int(11) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(256) NOT NULL,
  `address` varchar(500) NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`d_id`, `name`, `phone`, `email`, `password`, `address`, `dob`) VALUES
(1, 'mohamed', 1010101564, '1@2.com', '123', '123', '2024-04-10');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `UID` int(11) NOT NULL,
  `CustomerName` varchar(25) NOT NULL,
  `Comment` varchar(500) DEFAULT NULL,
  `Rating` int(1) NOT NULL,
  `DriverID` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`UID`, `CustomerName`, `Comment`, `Rating`, `DriverID`, `id`) VALUES
(7, 'Ahmed', 'hello this is A1 i modified a2', 4, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `userID`, `latitude`, `longitude`) VALUES
(1, 1, 40.71234500, -74.01234500);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `content`) VALUES
(1, '444'),
(2, '444'),
(3, '444'),
(4, '444'),
(5, '444'),
(6, '444'),
(7, '444'),
(8, '444'),
(9, 'kkk'),
(10, 'kkk'),
(11, 'kkk'),
(12, '13'),
(13, '13'),
(14, '666'),
(15, '777'),
(16, '777'),
(17, '888'),
(18, '888'),
(19, 'Hello'),
(20, 'hello disc'),
(21, 'jjnjnjnjnj'),
(22, 'Testing Msg 1 '),
(23, 'testing 2');

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

CREATE TABLE `shipment` (
  `s_no` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `price` int(11) NOT NULL,
  `s_date` date NOT NULL,
  `weight` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `d_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `type` int(10) NOT NULL DEFAULT 0 COMMENT '0= Customer,\r\n 1= Driver,\r\n 2= Admin',
  `name` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `password` varchar(256) NOT NULL,
  `address` varchar(500) NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `type`, `name`, `email`, `phone`, `password`, `address`, `dob`) VALUES
(1, 0, 'Ahmed', 'A1@gmail.com', '', '$2b$10$rASwwgo8N68PGWcWNhCFRuv9IEtwena/4chBtTtEf/MGCbbSGBNoq', '', '0000-00-00'),
(2, 0, '11', '11@11.com', '', '$2b$10$5T6Chhaxvau7Kk4WDM01WeDfxEWjv.4KEd0nInfWIhTVoO3VgINTu', '', '0000-00-00'),
(3, 0, '111', '111@11.com', '', '$2b$10$yRiV1Idxv7PlIWbXDcqpjOmOvlvwzh008xKPKvFO1kiBEK07xywHW', '', '0000-00-00'),
(4, 0, '111', '111@11.com', '', '$2b$10$FYGbpV3sZglXQrXNT97biOqICEpCBvQ8LNaVro4t7ga4Hq0GoZNUm', '', '0000-00-00'),
(5, 0, '111', '1111@11.com', '', '$2b$10$zpuHVkByr4lCSGWEzNCI5.GET8Qt9g21CQ1BoEJ0YbBFrK/R96SpC', '', '0000-00-00'),
(6, 0, '111', '11111@1111.com', '', '$2b$10$Os98ig5tcE3w78hjGL/x2eHag2P56QOhVpI09cEbmY7vNavma7fOG', '', '0000-00-00'),
(7, 0, 'Ahmed', 'A2@gmail.com', '', '$2b$10$XMrbTAvdL2AsVGy1zYEKLOLiZf8opreqKPP0zyEfM89gfRM6aeJX2', '', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `deliveryblock`
--
ALTER TABLE `deliveryblock`
  ADD PRIMARY KEY (`b_id`),
  ADD KEY `d_id` (`d_id`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userID` (`UID`),
  ADD KEY `driverID` (`DriverID`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UID` (`userID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`s_no`),
  ADD KEY `u_id` (`u_id`),
  ADD KEY `d_id` (`d_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `deliveryblock`
--
ALTER TABLE `deliveryblock`
  MODIFY `b_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `d_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `shipment`
--
ALTER TABLE `shipment`
  MODIFY `s_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `deliveryblock`
--
ALTER TABLE `deliveryblock`
  ADD CONSTRAINT `deliveryblock_ibfk_1` FOREIGN KEY (`d_id`) REFERENCES `driver` (`d_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `driverID` FOREIGN KEY (`DriverID`) REFERENCES `driver` (`d_id`),
  ADD CONSTRAINT `userID` FOREIGN KEY (`UID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `UID` FOREIGN KEY (`userID`) REFERENCES `user` (`id`);

--
-- Constraints for table `shipment`
--
ALTER TABLE `shipment`
  ADD CONSTRAINT `shipment_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shipment_ibfk_2` FOREIGN KEY (`d_id`) REFERENCES `driver` (`d_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
