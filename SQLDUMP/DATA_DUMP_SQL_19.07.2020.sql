-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: ssls
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `invitation`
--

CREATE DATABASE  IF NOT EXISTS 'ssls' /*!40100 DEFAULT CHARACTER SET utf8 */;
USE 'ssls';

DROP TABLE IF EXISTS `invitation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creation_date` datetime NOT NULL,
  `is_accepted` tinyint NOT NULL,
  `partyi_id` int NOT NULL,
  `target_user` int NOT NULL,
  `source_user` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_party` (`partyi_id`),
  KEY `FK_target_user` (`target_user`),
  KEY `FK_source_user` (`source_user`),
  CONSTRAINT `FK_party` FOREIGN KEY (`partyi_id`) REFERENCES `party` (`id`),
  CONSTRAINT `FK_source_user` FOREIGN KEY (`source_user`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_target_user` FOREIGN KEY (`target_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1201 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invitation`
--

LOCK TABLES `invitation` WRITE;
/*!40000 ALTER TABLE `invitation` DISABLE KEYS */;
INSERT INTO `invitation` VALUES (1,'2019-09-05 17:11:38',1,1,21,4),(2,'2019-12-16 16:21:48',1,3,21,4),(3,'2019-12-16 16:21:48',1,4,21,4),(4,'2019-12-16 16:21:48',1,2,21,10),(5,'2019-12-16 16:21:48',1,3,5,1),(6,'2019-12-16 16:21:48',1,1,5,1),(11,'2019-12-16 16:21:48',1,2,8,1),(13,'2020-07-16 10:57:15',0,8,1,1),(14,'2020-07-13 10:47:45',0,5,4,1),(15,'2020-07-15 15:06:41',0,9,1,1);
/*!40000 ALTER TABLE `invitation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=149 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Lychee - Canned','2019-12-23 09:12:18'),(2,'Island Oasis - Mango Daiquiri','2020-03-02 01:06:16'),(3,'Truffle Paste','2020-01-03 23:09:18'),(4,'Wine - Charddonnay Errazuriz','2019-07-04 03:30:23'),(5,'Hosen','2020-07-09 11:30:22'),(6,'Table Cloth 72x144 White','2019-07-30 12:08:37'),(7,'Lotus Root','2019-11-28 19:03:16'),(8,'Silicone Parch. 16.3x24.3','2019-06-07 04:37:17'),(9,'Rice - Wild','2019-12-26 19:07:25'),(10,'Wine - Chateau Aqueria Tavel','2019-05-17 07:19:53'),(11,'Pecan Raisin - Tarts','2019-07-14 09:37:02'),(12,'Chocolate - Liqueur Cups With Foil','2020-03-06 00:57:06'),(13,'Turnip - White, Organic','2019-11-05 22:10:56'),(14,'Rosatttitarul','2020-07-08 14:37:35'),(15,'Mace','2020-03-06 11:18:35'),(16,'Soup - Knorr, Classic Can. Chili','2020-01-19 09:49:06'),(17,'Amarula Cream','2019-06-09 15:56:21'),(18,'Beets - Candy Cane, Organic','2020-01-27 22:05:34'),(19,'Oranges','2020-05-06 07:36:58'),(20,'Longos - Penne With Pesto','2020-07-10 11:08:41'),(21,'Icecream - Dstk Strw Chseck','2019-06-01 19:49:37'),(22,'Soup Knorr Chili With Beans','2020-07-08 14:41:22'),(23,'Beef - Top Sirloin - Aaa','2019-06-12 02:02:02'),(24,'Southern Comfort','2019-08-15 05:17:12'),(25,'Bulgar','2019-08-29 13:42:06'),(26,'Longos - Greek Salad','2020-02-01 00:15:05'),(27,'Initation Crab Meat','2019-10-30 19:28:46'),(28,'Banana - Green','2019-06-14 17:42:43'),(29,'Sauce Tomato Pouch','2019-12-20 20:31:27'),(30,'Soup - French Onion','2019-05-27 12:15:12'),(31,'Rice Paper','2019-11-21 05:26:57'),(32,'Pants Custom Dry Clean','2020-04-25 23:32:08'),(33,'Chocolate - Unsweetened','2019-12-15 09:21:06'),(34,'Onions - White','2020-03-04 16:16:13'),(35,'Beer - Mill St Organic','2019-06-07 08:55:17'),(36,'Wine - Winzer Krems Gruner','2019-10-10 06:12:03'),(37,'Corn - Mini','2019-09-04 10:23:17'),(38,'Pork - Ham Hocks - Smoked','2019-05-19 15:10:52'),(39,'Wine - White, Gewurtzraminer','2020-01-11 09:26:28'),(40,'Cheese - Comtomme','2019-10-28 10:45:16'),(41,'Pepsi, 355 Ml','2019-10-09 02:11:26'),(42,'Juice - Lagoon Mango','2019-08-05 08:39:26'),(43,'Ecolab - Ster Bac','2019-09-03 14:26:26'),(44,'Fondant - Icing','2019-08-26 11:01:36'),(45,'Salmon - Atlantic, No Skin','2020-07-11 13:27:31'),(46,'Sour Cream','2019-09-02 23:33:53'),(47,'Wine - Sauvignon Blanc Oyster','2019-06-26 23:46:51'),(48,'Tray - Foam, Square 4 - S','2019-12-29 03:45:10'),(49,'Cheese - Manchego, Spanish','2020-03-31 13:41:13'),(50,'Soup - Tomato Mush. Florentine','2019-07-18 16:26:54'),(51,'Beef - Kindney, Whole','2019-08-02 20:48:06'),(52,'Plums - Red','2020-02-20 16:03:25'),(53,'Soup - Knorr, Classic Can. Chili','2019-07-23 23:17:00'),(54,'Table Cloth 62x114 Colour','2019-11-14 17:23:02'),(55,'Pork Ham Prager','2020-03-27 22:02:54'),(56,'Longos - Cheese Tortellini','2019-12-09 15:03:02'),(57,'Anisette - Mcguiness','2019-09-05 08:04:44'),(58,'Wine - Red, Marechal Foch','2019-12-25 20:48:36'),(59,'Shrimp - Black Tiger 6 - 8','2019-11-22 10:56:08'),(60,'Port - 74 Brights','2019-06-30 04:46:49'),(61,'The Pop Shoppe - Black Cherry','2019-06-06 05:19:56'),(62,'Apple - Delicious, Golden','2019-10-30 10:22:21'),(63,'Mayonnaise','2019-11-22 11:27:21'),(64,'Wine - Duboeuf Beaujolais','2020-04-26 09:27:55'),(65,'Pastry - Apple Large','2020-07-14 15:03:08'),(66,'Numi - Assorted Teas','2020-03-17 23:40:14'),(67,'Honey - Liquid','2019-06-06 23:59:41'),(68,'jokolo','2020-07-10 10:55:33'),(69,'Sour Puss Sour Apple','2019-05-20 03:16:14'),(70,'Beer - Steamwhistle','2020-07-11 13:15:37'),(71,'Shrimp - 16 - 20 Cooked, Peeled','2019-09-16 04:38:36'),(72,'Jerusalem Artichoke','2019-06-02 15:37:18'),(73,'Lettuce - California Mix','2020-01-10 09:36:02'),(74,'Jolt Cola - Red Eye','2019-11-24 12:19:27'),(75,'Nut - Almond, Blanched, Whole','2019-08-13 11:04:42'),(76,'Carbonated Water - White Grape','2020-02-09 16:22:34'),(77,'Raisin - Golden','2020-01-08 07:32:08'),(78,'Sauce - Roasted Red Pepper','2020-04-29 20:00:38'),(79,'Bread - Corn Muffaletta','2019-05-26 09:35:51'),(80,'Tumeric','2020-04-16 05:34:54'),(81,'Salmon - Atlantic, Fresh, Whole','2019-09-11 09:24:33'),(82,'Wine - Tio Pepe Sherry Fino','2019-12-18 15:15:49'),(83,'Goulash Seasoning','2019-07-16 13:05:48'),(84,'Chicken Giblets','2019-07-08 06:54:53'),(85,'Bread - Bistro Sour','2019-12-11 11:53:47'),(86,'Blackberries','2019-07-19 12:49:33'),(87,'Pastry - Raisin Muffin - Mini','2019-12-25 10:24:49'),(88,'Pomegranates','2020-01-04 06:13:10'),(89,'Beer - Sleemans Honey Brown','2020-05-07 15:14:49'),(90,'Bread Base - Toscano','2020-02-06 11:38:51'),(91,'Sauce - Hoisin','2020-02-29 12:09:53'),(92,'Wine - Red, Concha Y Toro','2020-01-15 10:29:41'),(93,'Soup - Campbells, Lentil','2019-08-02 04:51:33'),(94,'Chinese Foods - Pepper Beef','2019-10-04 10:54:21'),(95,'Soup - Campbells Beef Strogonoff','2019-06-07 15:44:42'),(96,'Wine - Two Oceans Cabernet','2019-10-04 23:03:12'),(97,'Sauce - Mint','2019-08-07 18:53:58'),(98,'Basil - Dry, Rubbed','2019-06-06 10:12:11'),(99,'Wine - Red, Cooking','2020-01-07 14:32:10'),(100,'Lotus Rootlets - Canned','2020-01-09 14:25:13'),(101,'Blumen','2020-07-09 09:30:21'),(102,'halloo','2020-07-09 09:33:16'),(103,'Brot','2020-07-09 09:35:52'),(104,'Hallooo','2020-07-09 09:42:01'),(105,'Schuhe','2020-07-09 09:51:58'),(106,'Schuhe','2020-07-09 09:54:26'),(107,'Schuhe','2020-07-09 10:00:43'),(108,'Schuhe','2020-07-09 10:01:16'),(109,'Schuhe','2020-07-09 10:07:23'),(110,'Schuhe','2020-07-09 10:09:19'),(111,'','2020-07-09 11:05:05'),(112,'Hallo','2020-07-09 11:08:15'),(113,'Hosen','2020-07-09 11:13:17'),(114,'Schuhe','2020-07-09 11:16:25'),(115,'Schuhe','2020-07-11 15:54:54'),(116,'Schuhe','2020-07-11 15:55:44'),(117,'Schuhe','2020-07-11 16:00:36'),(118,'Schuhe','2020-07-11 16:03:45'),(119,'Schuhe','2020-07-11 16:05:00'),(120,'Schuhe','2020-07-11 16:07:03'),(121,'Schuhe','2020-07-11 16:14:08'),(122,'Cola','2020-07-11 16:32:45'),(123,'Ferarri','2020-07-11 16:37:29'),(124,'Schuhe','2020-07-11 16:53:42'),(125,'Maserati','2020-07-11 16:57:29'),(126,'GTRS','2020-07-11 16:58:02'),(127,'Lego','2020-07-11 17:02:59'),(128,'Lami Füller','2020-07-11 17:03:40'),(129,'Halloo','2020-07-11 17:03:59'),(130,'Essen','2020-07-13 09:11:15'),(131,'Timberlands','2020-07-13 09:12:32'),(132,'Cola','2020-07-13 09:13:05'),(133,'Fanta','2020-07-13 09:15:11'),(134,'Cola Mix','2020-07-13 09:15:36'),(135,'Tomaten','2020-07-13 09:24:15'),(136,'Splinters Cell','2020-07-13 09:24:47'),(137,'Spielzeugauto','2020-07-13 09:25:38'),(138,'Flugzeug','2020-07-13 09:34:17'),(139,'Panzer','2020-07-14 14:59:37'),(140,'Jolo','2020-07-14 15:00:43'),(141,'Stifte','2020-07-14 15:07:03'),(142,'Schuhee','2020-07-13 10:13:31'),(143,'Koalabären','2020-07-13 10:15:18'),(144,'Schuhe','2020-07-14 15:21:07'),(145,'Schuhe','2020-07-14 22:21:06'),(146,'Porsche','2020-07-14 15:25:29'),(147,'Schuhe','2020-07-14 21:57:04'),(148,'Schuhe','2020-07-15 16:32:31');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `creation_date` datetime NOT NULL,
  `partyl_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_party_list` (`partyl_id`),
  CONSTRAINT `FK_party_list` FOREIGN KEY (`partyl_id`) REFERENCES `party` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (1,'Shooping','2019-12-16 10:00:54',2),(2,'Aldi Samstag','2019-08-11 20:04:14',5),(3,'Kaufland Montag','2019-12-25 10:32:10',3),(4,'Rewe Donnerstag','2020-03-07 12:04:48',1),(5,'Hamstern101','2019-06-07 19:14:23',1);
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listentry`
--

DROP TABLE IF EXISTS `listentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listentry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `creation_date` datetime NOT NULL,
  `item_id` int NOT NULL,
  `retailer_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `list_id` int NOT NULL,
  `checked` int DEFAULT '0',
  `amount` int DEFAULT NULL,
  `unit` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_item` (`item_id`),
  KEY `FK_retailer` (`retailer_id`),
  KEY `FK_user` (`user_id`),
  KEY `FK_list` (`list_id`),
  CONSTRAINT `FK_item` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `FK_list` FOREIGN KEY (`list_id`) REFERENCES `list` (`id`),
  CONSTRAINT `FK_retailer` FOREIGN KEY (`retailer_id`) REFERENCES `retailer` (`id`),
  CONSTRAINT `FK_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listentry`
--

LOCK TABLES `listentry` WRITE;
/*!40000 ALTER TABLE `listentry` DISABLE KEYS */;
INSERT INTO `listentry` VALUES (10,'kufda','2020-07-19 11:49:46',65,3,10,5,0,25,2),(13,'Wir sind die besten!','2020-07-19 11:49:46',141,5,5,5,1,33,1),(14,'Wir sind die besten!','2020-07-19 11:49:46',145,4,10,5,0,6,0),(15,'Wir sind die besten!','2020-07-19 11:49:46',146,3,5,5,1,12,5),(16,'Wir sind die besten!','2020-07-19 11:49:46',147,5,10,5,0,122,3),(17,'Wir sind die besten!','2020-07-19 11:49:46',148,3,5,5,0,3,1);
/*!40000 ALTER TABLE `listentry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
INSERT INTO `party` VALUES (1,'XJ','2019-07-26 17:31:00'),(2,'V70','2019-07-05 08:03:58'),(3,'Bronco','2019-10-30 01:47:02'),(4,'Town & Country','2019-11-30 00:52:55'),(5,'Raider','2019-11-28 09:36:18'),(6,'Cloclo','2020-06-19 22:42:57'),(7,'jolo','2020-06-20 11:54:09'),(8,'Tomas Geburtstag','2020-07-13 10:45:55'),(9,'Alex Geburtstag','2020-07-13 10:47:45');
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retailer`
--

DROP TABLE IF EXISTS `retailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retailer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retailer`
--

LOCK TABLES `retailer` WRITE;
/*!40000 ALTER TABLE `retailer` DISABLE KEYS */;
INSERT INTO `retailer` VALUES (1,'Electronics','2019-11-27 18:40:49'),(2,'Grocery','2020-01-08 13:44:42'),(3,'Outdoors','2020-02-23 19:27:03'),(4,'Mall','2020-06-21 22:25:59'),(5,'Books','2020-03-03 15:52:43'),(6,'Aldi','2019-10-28 01:36:40'),(7,'Automotive','2019-08-08 07:01:01'),(8,'Toys','2019-07-22 21:04:46'),(9,'Lokodun','2020-06-16 11:22:31');
/*!40000 ALTER TABLE `retailer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standardlistentry`
--

DROP TABLE IF EXISTS `standardlistentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `standardlistentry` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `creation_date` datetime NOT NULL,
  `item_id` int NOT NULL,
  `retailer_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `party_sle_id` int NOT NULL,
  `amount` int DEFAULT NULL,
  `unit` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_sitem` (`item_id`),
  KEY `FK_sretailer` (`retailer_id`),
  KEY `FK_suser` (`user_id`),
  KEY `FK_sle` (`party_sle_id`),
  CONSTRAINT `FK_sitem` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  CONSTRAINT `FK_sle` FOREIGN KEY (`party_sle_id`) REFERENCES `party` (`id`),
  CONSTRAINT `FK_sretailer` FOREIGN KEY (`retailer_id`) REFERENCES `retailer` (`id`),
  CONSTRAINT `FK_suser` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standardlistentry`
--

LOCK TABLES `standardlistentry` WRITE;
/*!40000 ALTER TABLE `standardlistentry` DISABLE KEYS */;
INSERT INTO `standardlistentry` VALUES (4,'Mofo','2020-03-07 12:04:48',5,2,3,2,NULL,NULL),(5,'Tea','2019-06-07 19:14:23',6,6,7,3,NULL,NULL),(6,'Mofo','2020-03-07 12:04:48',5,3,3,2,NULL,NULL),(13,'Wir sind die besten!','2020-07-14 14:59:37',139,4,5,1,NULL,NULL),(14,'Wir sind die besten!','2020-07-14 15:00:43',140,8,4,1,NULL,NULL),(16,'Wir sind die besten!','2020-07-13 10:15:18',143,7,5,1,NULL,NULL),(17,'Wir sind die besten!','2020-07-14 15:21:07',144,3,5,1,NULL,NULL);
/*!40000 ALTER TABLE `standardlistentry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `creation_date` datetime NOT NULL,
  `google_id` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Field flicker','2019-12-28 22:51:47','c6589658-d3fb-450d-8021-ca55bd998208','ecarthy0@nyu.edu'),(2,'Jürgön','2019-09-11 16:38:56','15314642-49f8-4233-b63b-92a2dc82bac3','bwychard1@sina.com.cn'),(3,'Gelada baboon','2020-02-26 03:21:50','48fd159b-21f4-41ee-9690-27dd8e8a1d09','ygaudin2@unicef.org'),(4,'Striped hyena','2019-11-14 05:46:41','0ca7ecc7-b90f-4cf6-8889-e9281ea23fdd','jmcdavitt3@is.gd'),(5,'Arboral spiny rat','2019-11-08 22:11:34','806186c7-69cc-4e66-9121-cc426c40ad19','sdumphries4@reference.com'),(6,'Common turkey','2019-05-28 23:23:45','7acc6dec-1522-4ce4-8ab6-81c11798d7ed','eschooley5@sciencedirect.com'),(7,'Common wombat','2020-01-25 22:01:29','37dd7cf9-a49c-4a85-aa01-fbbc43b68d6d','peaden6@lulu.com'),(8,'Clark\'s nutcracker','2020-03-23 12:06:23','97fa1bdc-34c4-4c25-a282-9fc35a2ff752','mlownds7@dedecms.com'),(9,'Vulture, turkey','2019-11-30 17:58:02','5ec30a0b-2db2-4b8e-a27e-1d0f3aee8849','srossiter8@oracle.com'),(10,'Polecat, african','2020-02-26 06:10:41','db38dbcc-3a28-44cc-8a3b-1f5f6a5e9c9f','xspir9@wisc.edu'),(11,'Screamer, crested','2019-09-05 21:36:13','3b57cf3d-590d-4355-ace3-d6ee6552e716','dhallewella@fda.gov'),(12,'Golden-mantled ground squirrel','2020-05-12 06:56:09','2843cfa3-a659-4d10-8083-978627843e1a','jcowlishawb@skype.com'),(13,'Manatee','2019-12-11 00:40:32','3f689052-3d8a-4753-b969-c14c2ebec376','hhartlyc@symantec.com'),(14,'Woylie','2019-08-31 22:27:30','748e919c-d5cd-4b89-8d00-d4b365b661bb','cvertyd@whitehouse.gov'),(15,'Egret, cattle','2020-02-02 14:39:26','b962558b-f1e3-4e4c-a53a-8ad8e5728018','jmcpeicee@etsy.com'),(16,'Snake, tiger','2019-06-20 10:21:15','c9fa3eca-6552-406f-ab5d-ea514acb8ca4','hpiddockf@twitter.com'),(17,'Deer, swamp','2020-04-30 09:12:21','bc3471fa-2781-4c26-bc76-d4f503f47bcd','ddussyg@unesco.org'),(18,'Flying fox (unidentified)','2020-02-26 20:00:25','dd486034-dd44-4ce8-8138-38cf8665ffe9','clattah@unc.edu'),(20,'Lizard, goanna','2020-01-19 22:52:19','3e6478b4-d620-43c3-be35-1602407433b5','akewj@icio.us'),(21,'kongi chago','2020-07-18 22:33:01','LOwXBW0EHiQahasiHxvHGSSy03z2','joni.kessel@web.de');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-19 11:57:21
