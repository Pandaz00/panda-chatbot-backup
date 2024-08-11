-- MySQL dump 10.13  Distrib 8.0.36, for Linux (aarch64)
--
-- Host: localhost    Database: registration_login
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ChatHistory`
--

DROP TABLE IF EXISTS `ChatHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChatHistory` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `UserID` varchar(255) DEFAULT NULL,
  `Timestamp` datetime DEFAULT NULL,
  `UserMessage` text,
  `BotResponse` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatHistory`
--

LOCK TABLES `ChatHistory` WRITE;
/*!40000 ALTER TABLE `ChatHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `ChatHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'gliu@sfsu.edu','$2a$10$oF40bWKfjK/3/UNQcjmE1.s7yRlY06iGwNdevZaPCOx2WKKA5Vipe'),(2,'gliu2@sfsu.edu','$2a$10$vK9uuUnFrrB4TwdLpy39U.jxEPdDc/spXjZznWHxotJtmLcfuUNzu'),(3,'bin@sfsu.edu','$2a$10$rq3rUH9fjFdeQ.wkCPJE6eeFgwmOx1zLyGhWA2TXcRJ1iol3SFX5W'),(4,'bin@sfsu.edu','$2a$10$C6L1V0oe.BeE4NYKguB7WO.SSfV3TEuvdcwhDGU4pslqYyXWtzNju'),(5,'clark@sfsu.edu','$2a$10$Dutf1DF5V7LyAXRJmXjK7uXfRT/CFrwDj35kV8Y3YJfBVHAf2bESi'),(6,'Thor@sfsu.edu','$2a$10$g.dJFryV5GbCu7aacoVgIOTd0ugizXSsFfULgRs45UyJXCkmsGWhC'),(7,'gui2@sfsu.edu','$2a$10$hcHUOIJ/zu/Ny8ev6/fJ7Op.5vREH3A8wo.5sBP1r89nl5ULOaeAu'),(8,'demo513@sfsu.edu','$2a$10$dVq1kqv8ABRaEzSSGcxm..0ff9D.Ytjbj5dUzV6v7jlCEmAlccXnq');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-21 21:33:05
