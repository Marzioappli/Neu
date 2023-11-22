-- MariaDB dump 10.19-11.2.0-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: krankenhausdb
-- ------------------------------------------------------
-- Server version	11.2.0-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abteilungen`
--

DROP TABLE IF EXISTS `abteilungen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `abteilungen` (
  `AbteilungsID` int(11) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`AbteilungsID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abteilungen`
--

LOCK TABLES `abteilungen` WRITE;
/*!40000 ALTER TABLE `abteilungen` DISABLE KEYS */;
INSERT INTO `abteilungen` VALUES
(201,'Innere Medizin'),
(202,'Chirurgie'),
(203,'Angiologie'),
(204,'Diabetologie'),
(205,'Orthopädie'),
(206,'Anästhesiologie');
/*!40000 ALTER TABLE `abteilungen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `behandlungen`
--

DROP TABLE IF EXISTS `behandlungen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `behandlungen` (
  `BehandlungsID` int(11) NOT NULL,
  `Art` varchar(50) DEFAULT NULL,
  `Datum` date DEFAULT NULL,
  PRIMARY KEY (`BehandlungsID`),
  CONSTRAINT `fk_behandlung_behandlungen_ärzte` FOREIGN KEY (`BehandlungsID`) REFERENCES `behandlungen_ärzte` (`BehandlungsID`),
  CONSTRAINT `fk_behandlungen_patienten_behandlungsID` FOREIGN KEY (`BehandlungsID`) REFERENCES `behandlungen_patienten` (`BehandlungsID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `behandlungen`
--

LOCK TABLES `behandlungen` WRITE;
/*!40000 ALTER TABLE `behandlungen` DISABLE KEYS */;
INSERT INTO `behandlungen` VALUES
(401,'Röntgen','2023-08-10'),
(402,'Bluuntersuchungt','2023-08-11'),
(403,'Operation','2023-08-11'),
(404,'Hirnuntersuchung','2023-08-12'),
(405,'Röntgen','2023-08-13'),
(406,'Herzuntersuchung','2023-08-10'),
(407,'Routinendurchsuchung','2023-08-12'),
(408,'Operation','2023-08-13'),
(409,'Röntgen','2023-08-10'),
(410,'Routinendurchsuchung','2023-08-11');
/*!40000 ALTER TABLE `behandlungen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `behandlungen_patienten`
--

DROP TABLE IF EXISTS `behandlungen_patienten`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `behandlungen_patienten` (
  `BehandlungsID` int(11) NOT NULL,
  `PatientID` int(11) NOT NULL,
  PRIMARY KEY (`BehandlungsID`,`PatientID`),
  KEY `fk_patienten_patienten_patientID` (`PatientID`),
  CONSTRAINT `behandlungen_patienten_ibfk_1` FOREIGN KEY (`BehandlungsID`) REFERENCES `behandlungen` (`BehandlungsID`),
  CONSTRAINT `behandlungen_patienten_ibfk_2` FOREIGN KEY (`PatientID`) REFERENCES `patienten` (`PatientID`),
  CONSTRAINT `fk_behandlungen_behandlungen_behandlungsID` FOREIGN KEY (`BehandlungsID`) REFERENCES `behandlungen` (`BehandlungsID`),
  CONSTRAINT `fk_patienten_id` FOREIGN KEY (`PatientID`) REFERENCES `patienten` (`PatientID`),
  CONSTRAINT `fk_patienten_patienten_patientID` FOREIGN KEY (`PatientID`) REFERENCES `patienten` (`PatientID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `behandlungen_patienten`
--

LOCK TABLES `behandlungen_patienten` WRITE;
/*!40000 ALTER TABLE `behandlungen_patienten` DISABLE KEYS */;
INSERT INTO `behandlungen_patienten` VALUES
(401,1),
(402,2),
(403,3),
(404,4),
(405,5),
(406,6),
(407,7),
(408,8),
(409,9),
(410,10);
/*!40000 ALTER TABLE `behandlungen_patienten` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `behandlungen_ärzte`
--

DROP TABLE IF EXISTS `behandlungen_ärzte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `behandlungen_ärzte` (
  `BehandlungsID` int(11) NOT NULL,
  `ArztID` int(11) NOT NULL,
  PRIMARY KEY (`BehandlungsID`,`ArztID`),
  KEY `fk_behandlungen_ärzte_ärzte_ArztID` (`ArztID`),
  CONSTRAINT `behandlungen_ärzte_ibfk_1` FOREIGN KEY (`BehandlungsID`) REFERENCES `behandlungen` (`BehandlungsID`),
  CONSTRAINT `behandlungen_ärzte_ibfk_2` FOREIGN KEY (`ArztID`) REFERENCES `ärzte` (`ArztID`),
  CONSTRAINT `fk_behandlungen_ärzte_behandlungsID` FOREIGN KEY (`BehandlungsID`) REFERENCES `behandlungen` (`BehandlungsID`),
  CONSTRAINT `fk_behandlungen_ärzte_ärzte_ArztID` FOREIGN KEY (`ArztID`) REFERENCES `ärzte` (`ArztID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `behandlungen_ärzte`
--

LOCK TABLES `behandlungen_ärzte` WRITE;
/*!40000 ALTER TABLE `behandlungen_ärzte` DISABLE KEYS */;
INSERT INTO `behandlungen_ärzte` VALUES
(401,101),
(402,102),
(403,103),
(404,104),
(405,105),
(406,106),
(407,107),
(408,108),
(409,109),
(410,110);
/*!40000 ALTER TABLE `behandlungen_ärzte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patienten`
--

DROP TABLE IF EXISTS `patienten`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patienten` (
  `PatientID` int(11) NOT NULL,
  `Vorname` varchar(50) DEFAULT NULL,
  `Nachname` varchar(50) DEFAULT NULL,
  `Geburtsdatum` date DEFAULT NULL,
  `Geschlecht` char(1) DEFAULT NULL,
  PRIMARY KEY (`PatientID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patienten`
--

LOCK TABLES `patienten` WRITE;
/*!40000 ALTER TABLE `patienten` DISABLE KEYS */;
INSERT INTO `patienten` VALUES
(1,'Max','Mustermann','1990-01-15','M'),
(2,'Lisa','Källin','1985-07-30','F'),
(3,'Nico','Fischer','1998-08-19','M'),
(4,'Lena','Meyer','2001-04-04','F'),
(5,'Marco','Linoso','2010-11-27','M'),
(6,'Sophia','Schulz','2000-01-01','F'),
(7,'Mateo','Wagner','1993-06-24','M'),
(8,'Ella','Schulze','1988-07-26','F'),
(9,'Luis','Gonçalo','2005-12-11','M'),
(10,'Emilia','Romagna','2008-02-15','F');
/*!40000 ALTER TABLE `patienten` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zimmer`
--

DROP TABLE IF EXISTS `zimmer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zimmer` (
  `ZimmerID` int(11) NOT NULL,
  `Typ` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zimmer`
--

LOCK TABLES `zimmer` WRITE;
/*!40000 ALTER TABLE `zimmer` DISABLE KEYS */;
INSERT INTO `zimmer` VALUES
(301,'Einzelzimmer'),
(302,'Mehrbettzimmer'),
(303,'Einzelzimmer'),
(304,'Einzelzimmer'),
(305,'Mehrbettzimmer'),
(306,'Mehrbettzimmer'),
(307,'Einzelzimmer'),
(308,'Mehrbettzimmer'),
(309,'Einzelzimmer'),
(310,'Einzelzimmer');
/*!40000 ALTER TABLE `zimmer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ärzte`
--

DROP TABLE IF EXISTS `ärzte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ärzte` (
  `ArztID` int(11) NOT NULL,
  `Vorname` varchar(50) DEFAULT NULL,
  `Nachname` varchar(50) DEFAULT NULL,
  `Fachgebiet` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ArztID`),
  CONSTRAINT `fk_ärzte_behandlungen_ärzte` FOREIGN KEY (`ArztID`) REFERENCES `behandlungen_ärzte` (`ArztID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ärzte`
--

LOCK TABLES `ärzte` WRITE;
/*!40000 ALTER TABLE `ärzte` DISABLE KEYS */;
INSERT INTO `ärzte` VALUES
(101,'Dr.','Müller','Innere Medizin'),
(102,'Dr.','Schmidt','Chirurgie'),
(103,'Dr.','Meier','Angiologie'),
(104,'Dr.','Fritz','Diabetologie'),
(105,'Dr.','Strauss','Orthopädie'),
(106,'Dr.','Sowas','Anästhesiologie'),
(107,'Dr.','Hallo','Angiologie'),
(108,'Dr.','Noris','Diabetologie'),
(109,'Dr.','Mars','Chirurgie'),
(110,'Dr.','Super','Orthopädie');
/*!40000 ALTER TABLE `ärzte` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17  8:47:54
