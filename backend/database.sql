-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: scripterbdd
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Current Database: `scripterbdd`
--

/*!40000 DROP DATABASE IF EXISTS `scripterbdd`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `scripterbdd` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `scripterbdd`;

--
-- Table structure for table `auteurs`
--

DROP TABLE IF EXISTS `auteurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auteurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateurs_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`,`utilisateurs_id`),
  KEY `fk_auteurs_utilisateurs1_idx` (`utilisateurs_id`),
  CONSTRAINT `fk_auteurs_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auteurs`
--

LOCK TABLES `auteurs` WRITE;
/*!40000 ALTER TABLE `auteurs` DISABLE KEYS */;
INSERT INTO `auteurs` VALUES (1,1,'jeje'),(3,2,'jeje2LeMaso');
/*!40000 ALTER TABLE `auteurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auteurs_favoris`
--

DROP TABLE IF EXISTS `auteurs_favoris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auteurs_favoris` (
  `utilisateurs_id` int NOT NULL,
  `auteurs_id` int NOT NULL,
  PRIMARY KEY (`utilisateurs_id`,`auteurs_id`),
  KEY `fk_utilisateurs_has_auteurs_auteurs1_idx` (`auteurs_id`),
  KEY `fk_utilisateurs_has_auteurs_utilisateurs1_idx` (`utilisateurs_id`),
  CONSTRAINT `fk_utilisateurs_has_auteurs_auteurs1` FOREIGN KEY (`auteurs_id`) REFERENCES `auteurs` (`id`),
  CONSTRAINT `fk_utilisateurs_has_auteurs_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auteurs_favoris`
--

LOCK TABLES `auteurs_favoris` WRITE;
/*!40000 ALTER TABLE `auteurs_favoris` DISABLE KEYS */;
/*!40000 ALTER TABLE `auteurs_favoris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avis_scenario`
--

DROP TABLE IF EXISTS `avis_scenario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avis_scenario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scenarios_id` int NOT NULL,
  `utilisateurs_id` int NOT NULL,
  `commentaire` text NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`,`scenarios_id`,`utilisateurs_id`),
  KEY `fk_avisScenario_scenarios1_idx` (`scenarios_id`),
  KEY `fk_avisScenario_utilisateurs1_idx` (`utilisateurs_id`),
  CONSTRAINT `fk_avisScenario_scenarios1` FOREIGN KEY (`scenarios_id`) REFERENCES `scenarios` (`id`),
  CONSTRAINT `fk_avisScenario_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avis_scenario`
--

LOCK TABLES `avis_scenario` WRITE;
/*!40000 ALTER TABLE `avis_scenario` DISABLE KEYS */;
/*!40000 ALTER TABLE `avis_scenario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campagnes`
--

DROP TABLE IF EXISTS `campagnes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campagnes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auteurs_id` int NOT NULL,
  `jeux_de_role_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` varchar(1000) NOT NULL,
  `synopsis` text NOT NULL,
  `nb_player_min` int NOT NULL,
  `nb_player_max` int NOT NULL,
  `level` varchar(45) NOT NULL,
  `start_writing_date` date NOT NULL,
  `publication_date` date NOT NULL,
  PRIMARY KEY (`id`,`auteurs_id`,`jeux_de_role_id`),
  KEY `fk_campagnes_auteurs1_idx` (`auteurs_id`),
  KEY `fk_campagnes_jeux_de_role1_idx` (`jeux_de_role_id`),
  CONSTRAINT `fk_campagnes_auteurs1` FOREIGN KEY (`auteurs_id`) REFERENCES `auteurs` (`id`),
  CONSTRAINT `fk_campagnes_jeux_de_role1` FOREIGN KEY (`jeux_de_role_id`) REFERENCES `jeux_de_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campagnes`
--

LOCK TABLES `campagnes` WRITE;
/*!40000 ALTER TABLE `campagnes` DISABLE KEYS */;
INSERT INTO `campagnes` VALUES (1,1,1,'Campgne test','http','C\'est le synopsis de ma campagne test',1,5,'3','2023-08-08','3000-01-01'),(2,1,1,'Campagne n°2','http','C\'est l\'histoire d\'un mec...',2,4,'4','2023-08-09','3000-01-01'),(3,1,1,'Campagne 3','http','Et le mec est sur le pont de l\'Alma',4,9,'2','2023-08-10','3000-01-01'),(5,1,1,'Campagne 4','http','Il a fait tomber ses lunettes dans la Loire',3,7,'2','2023-08-09','3000-01-01');
/*!40000 ALTER TABLE `campagnes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campagnes_themes`
--

DROP TABLE IF EXISTS `campagnes_themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campagnes_themes` (
  `campagnes_id` int NOT NULL,
  `themes_id` int NOT NULL,
  PRIMARY KEY (`campagnes_id`,`themes_id`),
  KEY `fk_campagnes_has_themes_themes1_idx` (`themes_id`),
  KEY `fk_campagnes_has_themes_campagnes1_idx` (`campagnes_id`),
  CONSTRAINT `fk_campagnes_has_themes_campagnes1` FOREIGN KEY (`campagnes_id`) REFERENCES `campagnes` (`id`),
  CONSTRAINT `fk_campagnes_has_themes_themes1` FOREIGN KEY (`themes_id`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campagnes_themes`
--

LOCK TABLES `campagnes_themes` WRITE;
/*!40000 ALTER TABLE `campagnes_themes` DISABLE KEYS */;
/*!40000 ALTER TABLE `campagnes_themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentaires_forum`
--

DROP TABLE IF EXISTS `commentaires_forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaires_forum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateurs_id` int NOT NULL,
  `sujet_forum_id` int NOT NULL,
  `commentaire` text NOT NULL,
  `date_time` timestamp NOT NULL,
  PRIMARY KEY (`id`,`sujet_forum_id`,`utilisateurs_id`),
  KEY `fk_commentairesForum_sujetForum1_idx` (`sujet_forum_id`),
  KEY `fk_commentaires_forum_utilisateurs1_idx` (`utilisateurs_id`),
  CONSTRAINT `fk_commentaires_forum_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`),
  CONSTRAINT `fk_commentairesForum_sujetForum1` FOREIGN KEY (`sujet_forum_id`) REFERENCES `sujet_forum` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaires_forum`
--

LOCK TABLES `commentaires_forum` WRITE;
/*!40000 ALTER TABLE `commentaires_forum` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentaires_forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_style`
--

DROP TABLE IF EXISTS `image_style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_style` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_images_id` int NOT NULL,
  `width` varchar(45) NOT NULL,
  `height` varchar(45) NOT NULL,
  `top` varchar(45) NOT NULL,
  `ssi_left` varchar(45) NOT NULL,
  `z-index` int DEFAULT NULL,
  `border_style` varchar(45) DEFAULT NULL,
  `border_width` varchar(45) DEFAULT NULL,
  `border_radius` varchar(45) DEFAULT NULL,
  `border_color` varchar(45) DEFAULT NULL,
  `box_shadow` varchar(45) DEFAULT NULL,
  `opacity` varchar(45) DEFAULT NULL,
  `padding` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`page_images_id`),
  KEY `fk_imageStyle_pageImages1_idx` (`page_images_id`),
  CONSTRAINT `fk_imageStyle_pageImages1` FOREIGN KEY (`page_images_id`) REFERENCES `page_images` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_style`
--

LOCK TABLES `image_style` WRITE;
/*!40000 ALTER TABLE `image_style` DISABLE KEYS */;
/*!40000 ALTER TABLE `image_style` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jeux_de_role`
--

DROP TABLE IF EXISTS `jeux_de_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jeux_de_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeux_de_role`
--

LOCK TABLES `jeux_de_role` WRITE;
/*!40000 ALTER TABLE `jeux_de_role` DISABLE KEYS */;
INSERT INTO `jeux_de_role` VALUES (1,'scripter');
/*!40000 ALTER TABLE `jeux_de_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mode_creation`
--

DROP TABLE IF EXISTS `mode_creation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mode_creation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scenarios_id` int NOT NULL,
  `utilisateurs_id` int NOT NULL,
  `commentaire` text NOT NULL,
  `date_time` timestamp NOT NULL,
  PRIMARY KEY (`id`,`scenarios_id`,`utilisateurs_id`),
  KEY `fk_chatModeCreation_scenarios1_idx` (`scenarios_id`),
  KEY `fk_chatModeCreation_utilisateurs1_idx` (`utilisateurs_id`),
  CONSTRAINT `fk_chatModeCreation_scenarios1` FOREIGN KEY (`scenarios_id`) REFERENCES `scenarios` (`id`),
  CONSTRAINT `fk_chatModeCreation_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mode_creation`
--

LOCK TABLES `mode_creation` WRITE;
/*!40000 ALTER TABLE `mode_creation` DISABLE KEYS */;
/*!40000 ALTER TABLE `mode_creation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_images`
--

DROP TABLE IF EXISTS `page_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pages_id` int NOT NULL,
  `img_src` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`,`pages_id`),
  KEY `fk_page_images_pages1_idx` (`pages_id`),
  CONSTRAINT `fk_page_images_pages1` FOREIGN KEY (`pages_id`) REFERENCES `pages` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_images`
--

LOCK TABLES `page_images` WRITE;
/*!40000 ALTER TABLE `page_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_style`
--

DROP TABLE IF EXISTS `page_style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_style` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pages_id` int NOT NULL,
  `padding` varchar(45) DEFAULT NULL,
  `background_color` varchar(155) DEFAULT NULL,
  PRIMARY KEY (`id`,`pages_id`),
  KEY `fk_page_style_pages1_idx` (`pages_id`),
  CONSTRAINT `fk_page_style_pages1` FOREIGN KEY (`pages_id`) REFERENCES `pages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_style`
--

LOCK TABLES `page_style` WRITE;
/*!40000 ALTER TABLE `page_style` DISABLE KEYS */;
INSERT INTO `page_style` VALUES (62,2,'0px','rgba(255,255,255,1)'),(64,4,'0px','rgba(255,255,255,1)'),(65,5,'0px','rgba(255,255,255,1)'),(67,8,'0px','rgba(255,255,255,1)'),(68,9,'0px','rgba(255,255,255,1)'),(69,10,'0px','rgba(255,255,255,1)'),(79,20,'0px','rgba(255,255,230,1)'),(80,21,'0px','rgba(255,255,230,1)'),(81,22,'0px','rgba(255,255,230,1)'),(84,25,'0px','rgba(255,255,230,1)'),(85,26,'0px','rgba(255,255,230,1)'),(86,27,'0px','rgba(255,255,230,1)'),(90,31,'0px','rgba(255,255,230,1)'),(91,32,'0px','rgba(255,255,230,1)'),(92,33,'0px','rgba(255,240,250,1)'),(94,35,'0px','rgba(255,240,250,1)'),(96,37,'0px','rgba(255,240,250,1)');
/*!40000 ALTER TABLE `page_style` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_textes`
--

DROP TABLE IF EXISTS `page_textes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_textes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pages_id` int NOT NULL,
  `data` text,
  PRIMARY KEY (`id`,`pages_id`),
  KEY `fk_textes_pages1_idx` (`pages_id`),
  CONSTRAINT `fk_textes_pages1` FOREIGN KEY (`pages_id`) REFERENCES `pages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_textes`
--

LOCK TABLES `page_textes` WRITE;
/*!40000 ALTER TABLE `page_textes` DISABLE KEYS */;
INSERT INTO `page_textes` VALUES (2,2,'Il se baladait sur l\'avenue, le coeur ouvert à l\'inconnu...'),(14,5,'mmmm'),(15,5,'Boulou'),(16,4,'On teste la réinsertion d\'un texte et d\'un style'),(28,9,''),(29,9,''),(30,10,'Commencement'),(31,10,'Il était une fois dans l\'ouest une vielle charue qui avait 7 roues dentées et un revêtement métallique !'),(50,20,''),(51,20,''),(52,21,''),(53,21,'Wazzzaaau vert'),(54,22,''),(55,22,'Bonjour'),(64,2,'Bonjour, je vais vous raconter'),(67,25,'Hugo le Putoi'),(68,25,''),(69,26,'Jacquouille le Pouilleux'),(70,26,''),(71,27,'Igor le Bourru'),(72,27,''),(79,31,'Paris de l\'an 3024'),(80,31,''),(81,32,'Le fond des enfers'),(82,32,''),(83,33,'Arthur le Roidec'),(84,33,''),(93,22,''),(94,22,''),(95,22,''),(98,35,'Adieu les poussins'),(99,35,'Les poussins du chef'),(102,37,'J\'ai envie de pisser'),(103,37,''),(108,2,'Je m\'baladais sur l\'avenue le coeur ouvert à l\'inconnu...'),(110,2,'On test ici si les styles sauvegardés fonctionnent');
/*!40000 ALTER TABLE `page_textes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_types`
--

DROP TABLE IF EXISTS `page_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categorie` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_types`
--

LOCK TABLES `page_types` WRITE;
/*!40000 ALTER TABLE `page_types` DISABLE KEYS */;
INSERT INTO `page_types` VALUES (1,'script'),(2,'personnage'),(3,'objet'),(4,'lieu');
/*!40000 ALTER TABLE `page_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scenarios_id` int NOT NULL,
  `page_types_id` int NOT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `titre` varchar(255) DEFAULT NULL,
  `number` int DEFAULT NULL,
  PRIMARY KEY (`id`,`scenarios_id`,`page_types_id`),
  KEY `fk_pages_page_types1_idx` (`page_types_id`),
  KEY `fk_pages_scenarios1_idx` (`scenarios_id`),
  CONSTRAINT `fk_pages_page_types1` FOREIGN KEY (`page_types_id`) REFERENCES `page_types` (`id`),
  CONSTRAINT `fk_pages_scenarios1` FOREIGN KEY (`scenarios_id`) REFERENCES `scenarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (2,1,1,NULL,'Introduction',3),(4,3,1,NULL,'Wazzzaaaaa',1),(5,4,1,NULL,'Il était une fois',5),(8,3,1,NULL,'WazaQUOI ? WazaBI ?',2),(9,4,1,NULL,'Le charlatan',6),(10,3,1,NULL,'Commencement d\'un wazzzaaau',3),(20,4,1,NULL,'Et les 3 p\'tits chats',7),(21,4,1,NULL,'Le chapeau',8),(22,3,1,NULL,'Wazzzaaau vert',5),(25,4,2,NULL,'Hugo le Putoi',1),(26,4,2,NULL,'Jacqouille le Pouilleux',2),(27,4,2,NULL,'Igor le Bourru',3),(31,1,4,NULL,'Paris de l\'an 3024',2),(32,4,4,NULL,'Le fond des enfers',4),(33,1,2,NULL,'Arthur le Roidec',1),(35,1,1,NULL,'Adieu les poussins',10),(37,1,1,NULL,'J\'ai envie de pisser',11);
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_style_image`
--

DROP TABLE IF EXISTS `saved_style_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_style_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateurs_id` int NOT NULL,
  `styleName` varchar(255) DEFAULT NULL,
  `z_index` int DEFAULT NULL,
  `border_style` varchar(45) DEFAULT NULL,
  `border_width` varchar(45) DEFAULT NULL,
  `border_radius` varchar(45) DEFAULT NULL,
  `border_color` varchar(45) DEFAULT NULL,
  `box_shadow` varchar(45) DEFAULT NULL,
  `opacity` varchar(45) DEFAULT NULL,
  `padding` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`utilisateurs_id`),
  KEY `fk_saved_style_image_utilisateurs1_idx` (`utilisateurs_id`),
  CONSTRAINT `fk_saved_style_image_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_style_image`
--

LOCK TABLES `saved_style_image` WRITE;
/*!40000 ALTER TABLE `saved_style_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `saved_style_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_style_page`
--

DROP TABLE IF EXISTS `saved_style_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_style_page` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateurs_id` int NOT NULL,
  `padding` varchar(45) DEFAULT NULL,
  `background_color` varchar(155) DEFAULT NULL,
  `styleName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`utilisateurs_id`),
  KEY `fk_saved_style_page_utilisateurs1_idx` (`utilisateurs_id`),
  CONSTRAINT `fk_saved_style_page_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_style_page`
--

LOCK TABLES `saved_style_page` WRITE;
/*!40000 ALTER TABLE `saved_style_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `saved_style_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_style_text`
--

DROP TABLE IF EXISTS `saved_style_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_style_text` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateurs_id` int NOT NULL,
  `styleName` varchar(255) DEFAULT NULL,
  `z_index` int DEFAULT NULL,
  `border_style` varchar(45) DEFAULT NULL,
  `border_color` varchar(45) DEFAULT NULL,
  `border_width` varchar(45) DEFAULT NULL,
  `border_radius` varchar(45) DEFAULT NULL,
  `box_shadow` varchar(100) DEFAULT NULL,
  `background_color` varchar(45) DEFAULT NULL,
  `font_size` varchar(45) DEFAULT NULL,
  `font_style` varchar(45) DEFAULT NULL,
  `font_weight` varchar(45) DEFAULT NULL,
  `font_family` varchar(255) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `padding` varchar(45) DEFAULT NULL,
  `backdrop_filter` varchar(45) DEFAULT NULL,
  `text_decoration` varchar(45) DEFAULT NULL,
  `text_align` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`utilisateurs_id`),
  KEY `fk_saved_style_text_utilisateurs1_idx` (`utilisateurs_id`),
  CONSTRAINT `fk_saved_style_text_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_style_text`
--

LOCK TABLES `saved_style_text` WRITE;
/*!40000 ALTER TABLE `saved_style_text` DISABLE KEYS */;
INSERT INTO `saved_style_text` VALUES (4,1,'Style1',0,'groove','rgba(65,117,5,1)','13px','35px','0px 5px 20px 0px rgba(248,231,28,1)','rgba(200,203,250,1)','1.7rem','italic','400','Cambria','rgba(208,2,27,1)','15px','blur(15px)','underline','left'),(10,1,'Style 2',0,'dashed','rgba(103,100,255,1)','5px','50px','15px 15px 15px 5px rgba(191,29,29,1)','rgba(250,200,200,0.57)','1.5rem','italic','700','cursive','rgba(74,144,226,1)','19px','blur(15px)','none','center');
/*!40000 ALTER TABLE `saved_style_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenarios`
--

DROP TABLE IF EXISTS `scenarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scenarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auteurs_id` int NOT NULL,
  `jeux_de_role_id` int NOT NULL,
  `campagnes_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `nb_player_min` int NOT NULL,
  `nb_player_max` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `level` varchar(50) NOT NULL,
  `start_writing_date` date NOT NULL,
  `publication_date` date NOT NULL,
  `img` varchar(1000) NOT NULL,
  `description` text NOT NULL,
  `model` int NOT NULL,
  `pdf` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`,`auteurs_id`,`jeux_de_role_id`,`campagnes_id`),
  KEY `fk_scenarios_jeux_de_role1_idx` (`jeux_de_role_id`),
  KEY `fk_scenarios_auteurs1_idx` (`auteurs_id`),
  KEY `fk_scenarios_campagnes1_idx` (`campagnes_id`),
  CONSTRAINT `fk_scenarios_auteurs1` FOREIGN KEY (`auteurs_id`) REFERENCES `auteurs` (`id`),
  CONSTRAINT `fk_scenarios_campagnes1` FOREIGN KEY (`campagnes_id`) REFERENCES `campagnes` (`id`),
  CONSTRAINT `fk_scenarios_jeux_de_role1` FOREIGN KEY (`jeux_de_role_id`) REFERENCES `jeux_de_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenarios`
--

LOCK TABLES `scenarios` WRITE;
/*!40000 ALTER TABLE `scenarios` DISABLE KEYS */;
INSERT INTO `scenarios` VALUES (1,1,1,1,'Scenario test 1',1,5,'campagne','3','2023-08-08','3000-01-01','http','Description de mon scenario test 1',1,NULL),(3,1,1,1,'Scenario 2',2,5,'campagne','3','2023-05-05','3000-01-01','http','Description du scenarion 2 de la campagne 1',1,NULL),(4,1,1,2,'Scenario 1 campagne 2',3,8,'solo','4','2023-01-01','3000-01-01','http','Description du scenario 1 de la campagne 2',1,NULL);
/*!40000 ALTER TABLE `scenarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenarios_favoris`
--

DROP TABLE IF EXISTS `scenarios_favoris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scenarios_favoris` (
  `utilisateurs_id` int NOT NULL,
  `scenarios_id` int NOT NULL,
  PRIMARY KEY (`utilisateurs_id`,`scenarios_id`),
  KEY `fk_utilisateurs_has_scenarios_scenarios1_idx` (`scenarios_id`),
  KEY `fk_utilisateurs_has_scenarios_utilisateurs1_idx` (`utilisateurs_id`),
  CONSTRAINT `fk_utilisateurs_has_scenarios_scenarios1` FOREIGN KEY (`scenarios_id`) REFERENCES `scenarios` (`id`),
  CONSTRAINT `fk_utilisateurs_has_scenarios_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenarios_favoris`
--

LOCK TABLES `scenarios_favoris` WRITE;
/*!40000 ALTER TABLE `scenarios_favoris` DISABLE KEYS */;
/*!40000 ALTER TABLE `scenarios_favoris` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scenarios_themes`
--

DROP TABLE IF EXISTS `scenarios_themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scenarios_themes` (
  `scenarios_id` int NOT NULL,
  `themes_id` int NOT NULL,
  PRIMARY KEY (`scenarios_id`,`themes_id`),
  KEY `fk_scenarios_has_themes_themes1_idx` (`themes_id`),
  KEY `fk_scenarios_has_themes_scenarios1_idx` (`scenarios_id`),
  CONSTRAINT `fk_scenarios_has_themes_scenarios1` FOREIGN KEY (`scenarios_id`) REFERENCES `scenarios` (`id`),
  CONSTRAINT `fk_scenarios_has_themes_themes1` FOREIGN KEY (`themes_id`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenarios_themes`
--

LOCK TABLES `scenarios_themes` WRITE;
/*!40000 ALTER TABLE `scenarios_themes` DISABLE KEYS */;
/*!40000 ALTER TABLE `scenarios_themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sujet_forum`
--

DROP TABLE IF EXISTS `sujet_forum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sujet_forum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sujet` varchar(255) NOT NULL,
  `open_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sujet_forum`
--

LOCK TABLES `sujet_forum` WRITE;
/*!40000 ALTER TABLE `sujet_forum` DISABLE KEYS */;
/*!40000 ALTER TABLE `sujet_forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `text_style`
--

DROP TABLE IF EXISTS `text_style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `text_style` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_textes_id` int NOT NULL,
  `width` varchar(45) NOT NULL,
  `height` varchar(45) NOT NULL,
  `top` varchar(45) NOT NULL,
  `sst_left` varchar(45) NOT NULL,
  `z_index` int DEFAULT NULL,
  `border_style` varchar(45) DEFAULT NULL,
  `border_color` varchar(45) DEFAULT NULL,
  `border_width` varchar(45) DEFAULT NULL,
  `border_radius` varchar(45) DEFAULT NULL,
  `box_shadow` varchar(100) DEFAULT NULL,
  `background_color` varchar(45) DEFAULT NULL,
  `font_size` varchar(45) DEFAULT NULL,
  `font_style` varchar(45) DEFAULT NULL,
  `font_weight` varchar(45) DEFAULT NULL,
  `font_family` varchar(255) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `padding` varchar(45) DEFAULT NULL,
  `back_drop_filter` varchar(45) DEFAULT NULL,
  `text_decoration` varchar(45) DEFAULT NULL,
  `text_align` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`page_textes_id`),
  KEY `fk_textStyle_pageTextes1_idx` (`page_textes_id`),
  CONSTRAINT `fk_textStyle_pageTextes1` FOREIGN KEY (`page_textes_id`) REFERENCES `page_textes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `text_style`
--

LOCK TABLES `text_style` WRITE;
/*!40000 ALTER TABLE `text_style` DISABLE KEYS */;
INSERT INTO `text_style` VALUES (2,2,'44%','11%','54.99999935160953%','25.98530190263339%',0,'groove','rgba(65,117,5,1)','13px','35px','0px 5px 20px 0px rgba(248,231,28,1)','rgba(200,203,250,1)','1.7rem','italic','400','Cambria','rgba(208,2,27,1)','15px','blur(15px)','underline','left'),(12,14,'50%','5%','40.633120357694565%','27.449009626535858%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,1)','1.25rem','normal','400','cursive','rgba(189,16,224,1)','4px','blur(0px)','none','center'),(13,15,'50%','5%','14.26883970567472%','23.3%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(14,16,'50%','5%','28.654390826779114%','29.88643913804171%',0,'none','rgba(200,200,200,1)','1px','0px','15px 15px 15px 5px rgba(202,30,201,1)','rgba(250,250,250,1)','1.25rem','normal','700','Courier New','rgba(50,81,199,1)','4px','blur(0px)','none','left'),(26,28,'30%','5%','5%','10%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(27,29,'80%','15%','15%','10%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(28,30,'50%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(29,31,'90%','13%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(48,50,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(49,51,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(50,52,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(51,53,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(52,54,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(53,55,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(179,82,82,1)','4px','blur(0px)','none','justify'),(62,64,'52.989309918665455%','15%','69%','16.967265830489104%',0,'dashed','rgba(103,100,255,1)','5px','50px','15px 15px 15px 5px rgba(191,29,29,1)','rgba(250,200,200,0.57)','1.5rem','italic','700','cursive','rgba(74,144,226,1)','19px','blur(15px)','none','center'),(65,67,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(66,68,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(67,69,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(68,70,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(69,71,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(70,72,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(77,79,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(78,80,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(79,81,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(80,82,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(81,83,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(82,84,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(89,93,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(90,94,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(91,95,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(94,98,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(95,99,'90%','15%','10%','5%',0,'dotted','rgba(103,100,255,1)','5','50','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,200,200,1)','1.25rem','normal','normal','cursive','rgba(0,0,0,1)','19','blur(0px)','none','center'),(98,102,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(99,103,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(104,108,'50%','10%','22.776203317615195%','24.68269669221255%',0,'groove','rgba(65,117,5,1)','13px','35px','0px 5px 20px 0px rgba(248,231,28,1)','rgba(200,203,250,1)','1.7rem','italic','400','Cambria','rgba(208,2,27,1)','15px','blur(15px)','underline','left'),(106,110,'42.759992629394986%','9%','43%','38.6599951989749%',0,'dashed','rgba(103,100,255,1)','5px','50px','15px 15px 15px 5px rgba(191,29,29,1)','rgba(250,200,200,0.57)','1.5rem','italic','700','cursive','rgba(74,144,226,1)','19px','blur(15px)','none','center');
/*!40000 ALTER TABLE `text_style` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `themes`
--

DROP TABLE IF EXISTS `themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `themes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes`
--

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastname` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(45) NOT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `inscription_date` DATE DEFAULT (DATE_FORMAT(NOW(), '%Y-%m-%d')) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'Desouches','Jerome','jeje','jd@hotmail.fr','jede','http','2023-08-08'),(2,'Desouches2','Jerome2','jeje2','jd@hotmail.fr','jede','http','2023-08-07');
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-20 16:21:24
