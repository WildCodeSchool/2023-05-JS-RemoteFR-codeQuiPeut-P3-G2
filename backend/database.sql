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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campagnes`
--

LOCK TABLES `campagnes` WRITE;
/*!40000 ALTER TABLE `campagnes` DISABLE KEYS */;
INSERT INTO `campagnes` VALUES (1,1,1,'Campagne de la mort','http://localhost:4242/public/assets/images/grosYeuxMoustache1.jpg1694598593358.jpg','C\'est le synopsis de ma campagne test',1,5,'Easy','2023-08-07','2999-12-31'),(2,1,1,'Campagne n°2','none','C\'est l\'histoire d\'un mec...',2,4,'Easy','2023-08-09','3000-01-01'),(3,1,1,'Campagne 3','none','Et le mec est sur le pont de l\'Alma',4,9,'Easy','2023-08-10','3000-01-01'),(5,1,1,'Campagne 4','none','Il a fait tomber ses lunettes dans la Loire',3,7,'Easy','2023-08-09','3000-01-01'),(6,1,1,'Maison bleue','http://localhost:4242/public/assets/images/image4.jpg1694548671011.jpg','C\'est une maison bleue adossée à la colline !',1,2,'A little walk ?','2023-09-12','3000-01-01');
/*!40000 ALTER TABLE `campagnes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campagnes_favoris`
--

DROP TABLE IF EXISTS `campagnes_favoris`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campagnes_favoris` (
  `campagnes_id` int NOT NULL,
  `utilisateurs_id` int NOT NULL,
  PRIMARY KEY (`campagnes_id`,`utilisateurs_id`),
  KEY `fk_campagnes_has_utilisateurs_utilisateurs1_idx` (`utilisateurs_id`),
  KEY `fk_campagnes_has_utilisateurs_campagnes1_idx` (`campagnes_id`),
  CONSTRAINT `fk_campagnes_has_utilisateurs_campagnes1` FOREIGN KEY (`campagnes_id`) REFERENCES `campagnes` (`id`),
  CONSTRAINT `fk_campagnes_has_utilisateurs_utilisateurs1` FOREIGN KEY (`utilisateurs_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campagnes_favoris`
--

LOCK TABLES `campagnes_favoris` WRITE;
/*!40000 ALTER TABLE `campagnes_favoris` DISABLE KEYS */;
/*!40000 ALTER TABLE `campagnes_favoris` ENABLE KEYS */;
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
INSERT INTO `campagnes_themes` VALUES (1,1),(6,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaires_forum`
--

LOCK TABLES `commentaires_forum` WRITE;
/*!40000 ALTER TABLE `commentaires_forum` DISABLE KEYS */;
INSERT INTO `commentaires_forum` VALUES (1,1,1,'Moi j\'en ai jamais vu !!!','2023-09-12 22:00:00'),(2,2,1,'Bien sur que si... sur la planète Dragonausorus 2','2023-09-13 22:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_style`
--

LOCK TABLES `image_style` WRITE;
/*!40000 ALTER TABLE `image_style` DISABLE KEYS */;
INSERT INTO `image_style` VALUES (24,28,'43%','auto','21.497755368325322%','52.624536206275074%',1,'double','12px','500px','rgba(33,192,65,1)','0px 0px 37px 16px rgba(105,147,237,1)','0.35','6px'),(26,30,'40%','auto','23.90739392254219%','6.486120960537864%',1,'dashed','12px','68px','rgba(192,33,33,1)','33px 36px 37px 16px rgba(237,105,105,1)','1','0px'),(27,31,'40%','auto','30%','30%',1,'double','12px','500px','rgba(33,192,65,1)','0px 0px 37px 16px rgba(105,147,237,1)','0.35','6px'),(28,32,'40%','auto','30%','30%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px');
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_images`
--

LOCK TABLES `page_images` WRITE;
/*!40000 ALTER TABLE `page_images` DISABLE KEYS */;
INSERT INTO `page_images` VALUES (28,51,'http://localhost:4242/public/assets/images/image1.jfif1693313566571.jpg'),(30,51,'http://localhost:4242/public/assets/images/cameleon1.jpg1693405905262.jpg'),(31,33,'http://localhost:4242/public/assets/images/fee1.jpg1693491588880.jpg'),(32,49,'http://localhost:4242/public/assets/images/fee1.jpg1694543954092.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_style`
--

LOCK TABLES `page_style` WRITE;
/*!40000 ALTER TABLE `page_style` DISABLE KEYS */;
INSERT INTO `page_style` VALUES (64,4,'14px','rgba(255,255,255,1)'),(67,8,'4%','rgba(187,247,193,1)'),(68,9,'4%','rgba(255,255,255,1)'),(79,20,'4%','rgba(255,255,230,1)'),(80,21,'4%','rgba(255,255,230,1)'),(81,22,'4%','rgba(255,255,230,1)'),(84,25,'4%','rgba(255,255,230,1)'),(85,26,'4%','rgba(255,255,230,1)'),(86,27,'4%','rgba(255,255,230,1)'),(91,32,'4%','rgba(255,255,230,1)'),(92,33,'0px','rgba(240,229,229,1)'),(97,38,'5px','rgba(255,255,255,1)'),(98,39,'4%','rgba(255,255,255,1)'),(108,49,'5px','rgba(202,238,195,1)'),(110,51,'10px','rgba(234,238,195,1)'),(111,52,'4%','rgba(246,228,248,1)'),(112,53,'0px','rgba(255,255,255,1)'),(116,57,'0px','rgba(255,255,255,1)'),(117,58,'0px','rgba(255,255,255,1)'),(118,59,'0px','rgba(255,255,255,1)'),(120,61,'0px','rgba(255,255,255,1)'),(121,62,'0px','rgba(255,255,255,1)'),(122,63,'0px','rgba(255,255,255,1)');
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
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_textes`
--

LOCK TABLES `page_textes` WRITE;
/*!40000 ALTER TABLE `page_textes` DISABLE KEYS */;
INSERT INTO `page_textes` VALUES (16,4,'On teste la réinsertion d\'un texte et d\'un style'),(28,9,''),(29,9,''),(50,20,''),(51,20,''),(52,21,''),(53,21,'Wazzzaaau vert'),(54,22,''),(55,22,'Bonjour'),(67,25,'Hugo le Putoi'),(68,25,''),(69,26,'Jacquouille le Pouilleux'),(70,26,''),(71,27,'Igor le Bourru'),(72,27,''),(81,32,'Le fond des enfers'),(82,32,''),(83,33,'Arthur le Roidec'),(84,33,'Maitre de la bétise, le Roidec en impose, mais pas dans le bon sens du terme !'),(93,22,''),(94,22,''),(95,22,''),(112,38,'Paris'),(113,38,''),(115,39,'Amulette du pouvoir'),(116,39,''),(137,49,'C\'est l\'histoire d\'un mec...'),(143,52,'Bug quand on clique sur la page en cours dans sommaire avant d\'avoir enregistré'),(144,52,'Si je clique sur la page en cours avant d\'avoir enregistré, les modifications que j\'ai fait aux textes ne sont pas enregistrées.\n\nPar contre si je clique sur une autre page que celle en cours, mes modifications sont bien enregistrées.'),(145,53,'Amulette'),(146,53,'Pahfhhsbd'),(147,49,''),(152,51,'aazaaffff'),(153,51,'Le debuggage peut être terrible'),(175,57,'Paris'),(176,57,'Une grande ville qui pue, que tous les Français détestent (sauf les parisiens), mais que tous les étrangers adorent, même s\'ils ne savent pas pourquoi car ils n\'y sont jamais allé !'),(177,58,'Page test'),(178,58,''),(179,59,'Page test 2'),(180,59,''),(183,61,''),(184,61,''),(185,62,'Un printemps heureux'),(186,62,'C\'est un charmant petit trou tout entouré de cailloux...'),(187,63,'La mort lente arrive à pas de loups !'),(188,63,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (4,3,1,NULL,'Wazzzaaaaa',2),(8,3,1,NULL,'WazaQUOI ? WazaBI ?',3),(9,4,1,NULL,'Le charlatan',6),(20,4,1,NULL,'Et les 3 p\'tits chats',7),(21,4,1,NULL,'Le chapeau',8),(22,3,1,NULL,'Wazzzaaau vert',5),(25,4,2,NULL,'Hugo le Putoi',1),(26,4,2,NULL,'Jacqouille le Pouilleux',2),(27,4,2,NULL,'Igor le Bourru',3),(32,4,4,NULL,'Le fond des enfers',5),(33,1,2,NULL,'Arthur le Roidec',1),(38,3,4,NULL,'Paris',1),(39,4,3,NULL,'Amulette du pouvoir',4),(49,1,1,NULL,'C\'est l\'histoire d\'une nana...',4),(51,1,1,NULL,'Le debuggage peut être terrible',5),(52,1,1,NULL,'Bug quand on clique sur la page en cours dans sommaire avant d\'avoir enregistré',6),(53,1,3,NULL,'Amulette',2),(57,1,4,NULL,'Paris',3),(58,1,1,NULL,'Page test',7),(59,1,1,NULL,'Page test 2',8),(61,14,1,NULL,'Rename me',1),(62,15,1,NULL,'Un printemps heureux',1),(63,16,1,NULL,'La mort lente arrive à pas de loups',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_style_image`
--

LOCK TABLES `saved_style_image` WRITE;
/*!40000 ALTER TABLE `saved_style_image` DISABLE KEYS */;
INSERT INTO `saved_style_image` VALUES (1,1,'Bordure + shadow rouge',1,'dashed','12px','68px','rgba(192,33,33,1)','33px 36px 37px 16px rgba(237,105,105,1)','1','22px'),(2,1,'Rond transparent bordure verte',1,'double','12px','500px','rgba(33,192,65,1)','0px 0px 37px 16px rgba(105,147,237,1)','0.35','6px');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_style_page`
--

LOCK TABLES `saved_style_page` WRITE;
/*!40000 ALTER TABLE `saved_style_page` DISABLE KEYS */;
INSERT INTO `saved_style_page` VALUES (2,1,'0px','rgba(251,177,177,1)','rouge clair'),(5,1,'5px','rgba(202,238,195,1)','Vert');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_style_text`
--

LOCK TABLES `saved_style_text` WRITE;
/*!40000 ALTER TABLE `saved_style_text` DISABLE KEYS */;
INSERT INTO `saved_style_text` VALUES (10,1,'Style 2',0,'dashed','rgba(103,100,255,1)','5px','50px','15px 15px 15px 5px rgba(191,29,29,1)','rgba(250,200,200,0.57)','1.5rem','italic','700','cursive','rgba(74,144,226,1)','19px','blur(15px)','none','center'),(11,1,'Style3',0,'groove','rgba(42,90,139,1)','6px','27px','15px 15px 15px 5px rgba(188,32,32,1)','rgba(139,77,77,0.2)','1.8rem','italic','700','Cambria','rgba(199,31,31,1)','15px','blur(15px)','underline','left'),(12,1,'Style4',0,'groove','rgba(42,90,139,1)','6px','27px','15px 15px 15px 5px rgba(188,32,32,1)','rgba(139,77,77,0.2)','1.8rem','italic','700','Cambria','rgba(199,31,31,1)','15px','blur(15px)','underline','left');
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenarios`
--

LOCK TABLES `scenarios` WRITE;
/*!40000 ALTER TABLE `scenarios` DISABLE KEYS */;
INSERT INTO `scenarios` VALUES (1,1,1,1,'Levé tôt !',2,5,'campagne','You will suffer !','2023-08-06','2999-12-30','http://localhost:4242/public/assets/images/lezard4.jpg1693820480485.jpg','L\'avenir appartient à ceux qui ont le véto !',1,NULL),(3,1,1,1,'Couché tardif',3,7,'campagne','Easy','2023-05-02','2999-12-29','http://localhost:4242/public/assets/images/image3.jpg1694549405452.jpg','Comment jouer à un jeu de rôle si on ne veut jamais se coucher tard !',1,NULL),(4,1,1,2,'Les tréfonds du pouvoir',3,8,'solo','Normal','2022-12-31','2999-12-31','http://localhost:4242/public/assets/images/temoignages.jpg1694549470096.jpg','Description du scenario 1 de la campagne 2',1,NULL),(14,1,1,2,'Le réveil du cosmos',1,3,'campagne','Hard','2023-08-31','2999-12-31','http://localhost:4242/public/assets/images/fee1.jpg1694549517213.jpg','C\'est un scenario test',1,NULL),(15,1,1,6,'Maison bleue',1,2,'one shot','A little walk ?','2023-09-12','3000-01-01','http://localhost:4242/public/assets/images/image4.jpg1694548671011.jpg','C\'est une maison bleue adossée à la colline !',1,NULL),(16,1,1,6,'Maison rouge',3,5,'campagne','Hard','2023-09-12','3000-01-01','http://localhost:4242/public/assets/images/deamon2.jpg1694548872361.jpg','Bienvenue dans la maison de la torture cyberpunk !!!',1,NULL);
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
INSERT INTO `scenarios_themes` VALUES (3,3),(4,4),(15,4),(1,6),(14,6),(16,6);
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
  `sujet_forum_categories_id` int NOT NULL,
  `firstComment` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sujet_forum_sujet_forum_categories1_idx` (`sujet_forum_categories_id`),
  CONSTRAINT `fk_sujet_forum_sujet_forum_categories1` FOREIGN KEY (`sujet_forum_categories_id`) REFERENCES `sujet_forum_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sujet_forum`
--

LOCK TABLES `sujet_forum` WRITE;
/*!40000 ALTER TABLE `sujet_forum` DISABLE KEYS */;
INSERT INTO `sujet_forum` VALUES (1,'Des dragons dans Star Wars','2023-09-13',4,'Trouvez vous ça normal qu\'on voit un dragon dans Star Wars? Car j\'en ai vu dans un jeu et j\'ai trouvé ça n\'importe quoi car c\'est pas du tout le même univers !'),(2,'Comment tuer un Elf dans Elf et Dragons','2023-08-28',3,'Bonjour à tous, je suis nouveau dans le jeu Elf et Dragons. J\'ai rencontré un Elf dans le jeu et je ne sais pas comment le vaincre. Quelqu\'un peut-il me donner des conseils ou des stratégies pour vaincre un Elf ? Merci d\'avance.\');'),(3,'Stratégies pour le niveau final de ‘Château des Ombres','2023-09-14',3,'Bonjour à tous, je suis actuellement bloqué au niveau final du jeu ‘Château des Ombres’. J’ai du mal à vaincre le boss final, l’Ombre Suprême. J’ai essayé différentes stratégies, mais aucune ne semble fonctionner. Il a une attaque très puissante qui élimine la plupart de mes points de vie et je ne peux pas trouver un moyen d’esquiver ou de bloquer cette attaque. De plus, il semble se régénérer après un certain temps, ce qui rend le combat encore plus difficile. Quelqu’un a-t-il des conseils ou des stratégies pour ce niveau ? J’utilise actuellement un personnage de classe Guerrier avec une spécialisation en défense. Merci d’avance pour votre aide.'),(4,'Conseils pour augmenter rapidement le niveau dans ‘Quête Éternelle’','2023-09-14',2,'Salut à tous, je suis nouveau dans ‘Quête Éternelle’ et j’aimerais savoir comment je peux augmenter rapidement le niveau de mon personnage. J’ai l’impression que ça prend beaucoup de temps pour gagner de l’expérience et je me demande s’il y a des astuces ou des méthodes pour accélérer ce processus. J’ai un Mage de niveau 10 actuellement. Tous les conseils sont les bienvenus. Merci d’avance.'),(5,'Recherche d’alliés pour la mission ‘Crypte des Damnés’ dans ‘Légendes Oubliées','2023-09-14',1,'Bonjour à tous, je suis sur le point de commencer la mission ‘Crypte des Damnés’ dans ‘Légendes Oubliées’ et je cherche des alliés pour m’aider. La mission est assez difficile et je pense qu’elle serait plus facile avec une équipe. Mon personnage est un Paladin de niveau 30 avec une bonne défense et des compétences de soin. Si vous êtes intéressé, veuillez me laisser un message. Merci.'),(6,'Problèmes avec l’inventaire dans Royaume des Chasseurs','2023-09-14',4,'Salut à tous, j’ai un problème avec l’inventaire dans ‘Royaume des Chasseurs’. Il semble que je ne peux pas trier mes objets par type ou par valeur. C’est assez frustrant car j’ai beaucoup d’objets et il est difficile de trouver ce dont j’ai besoin. Quelqu’un sait-il comment résoudre ce problème ou s’il y a une mise à jour prévue pour améliorer l’inventaire ? J’apprécierais vraiment toute aide. Merci.'),(7,'Meilleures compétences pour un voleur dans \"Nuit des Voleurs\"','2023-09-14',4,'Bonjour à tous, je joue actuellement à ‘Nuit des Voleurs’ et j’ai choisi un personnage de classe Voleur. Je suis un peu perdu quant aux compétences que je devrais privilégier pour mon personnage. Il y a tellement de compétences disponibles et je ne suis pas sûr de celles qui seraient les plus utiles pour un voleur. J’aimerais avoir vos opinions et vos suggestions sur les meilleures compétences pour un voleur dans ce jeu. Quelles compétences utilisez-vous pour votre voleur ? Quelles compétences pensez-vous être indispensables pour un voleur ? Merci d’avance pour vos conseils.');
/*!40000 ALTER TABLE `sujet_forum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sujet_forum_categories`
--

DROP TABLE IF EXISTS `sujet_forum_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sujet_forum_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) NOT NULL,
  `color` varchar(100) NOT NULL DEFAULT 'rgb(255,255,255)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sujet_forum_categories`
--

LOCK TABLES `sujet_forum_categories` WRITE;
/*!40000 ALTER TABLE `sujet_forum_categories` DISABLE KEYS */;
INSERT INTO `sujet_forum_categories` VALUES (1,'Annonces','rgb(76,96,174)'),(2,'Documentation','rgb(255,189,89)'),(3,'Inspiration','rgb(227,70,46)'),(4,'Univers','rgb(174,214,205)');
/*!40000 ALTER TABLE `sujet_forum_categories` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `text_style`
--

LOCK TABLES `text_style` WRITE;
/*!40000 ALTER TABLE `text_style` DISABLE KEYS */;
INSERT INTO `text_style` VALUES (14,16,'50%','5%','28.654390826779114%','50%',0,'none','rgba(200,200,200,1)','1px','0px','15px 15px 15px 5px rgba(202,30,201,1)','rgba(250,250,250,1)','1.25rem','normal','700','Courier New','rgba(50,81,199,1)','4px','blur(0px)','none','left'),(26,28,'30%','5%','5%','10%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(27,29,'80%','15%','15%','10%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(48,50,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(49,51,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(50,52,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(51,53,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(52,54,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(53,55,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(179,82,82,1)','4px','blur(0px)','none','justify'),(65,67,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(66,68,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(67,69,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(68,70,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(69,71,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(70,72,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(79,81,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(80,82,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(81,83,'60%','4%','1%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(82,84,'90.25241985722793%','15.60831525493057%','6%','5%',0,'groove','rgba(42,90,139,1)','6px','27px','15px 15px 15px 5px rgba(188,32,32,1)','rgba(139,77,77,0.2)','1.8rem','italic','700','Cambria','rgba(199,31,31,1)','15px','blur(15px)','underline','left'),(89,93,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(90,94,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(91,95,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(108,112,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(109,113,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(111,115,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(112,116,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(133,137,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(139,143,'89%','10%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(140,144,'75.96666259765625%','20.011575354150978%','27%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(141,145,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(142,146,'90%','15%','10%','5%',0,'groove','rgba(42,90,139,1)','6px','27px','15px 15px 15px 5px rgba(188,32,32,1)','rgba(139,77,77,0.2)','1.8rem','italic','700','Cambria','rgba(199,31,31,1)','15px','blur(15px)','underline','left'),(143,147,'90%','15%','11.079612207446514%','3.4770938792941326%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(148,153,'60.797392176529584%','4.307819152875288%','5%','10%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(149,152,'79.06666259765625%','12.206472590153815%','9.662177763789533%','8.793041722824723%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(171,175,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(172,176,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(173,177,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(174,178,'35.48812697859203%','10%','12.85140526201774%','17.61952116113967%',0,'solid','rgba(193,48,48,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(175,179,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(176,180,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(179,183,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(180,184,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(181,185,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(182,186,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(183,187,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(184,188,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes`
--

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` VALUES (1,'Action / Adventure'),(2,'Adventure'),(3,'Comedy / Parody'),(4,'Contemporary'),(5,'Contemporary Fantasy'),(6,'Cyberpunk'),(7,'Espionage / Thriller'),(8,'Historical'),(9,'Historical Fantasy'),(10,'Horror'),(11,'Suspense'),(12,'Humorous'),(13,'Medieval Fantasy'),(14,'Mystery / Investigation'),(15,'Mythology / Legends'),(16,'Oriental'),(17,'Manga'),(18,'Parallel Universes / Multiverse'),(19,'Post Apocalyptic'),(20,'Romance / Drama'),(21,'Space Opera'),(22,'Steampunk'),(23,'Superheroes'),(24,'Survival / Exploration'),(25,'Time Travel'),(26,'Unclassifiable'),(27,'Science Fiction'),(28,'Western / Far West'),(29,'Wonderful / Dreamlike');
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
  `inscription_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'Desouches','Jerome','jeje','jd@hotmail.fr','jede','http','2023-08-08'),(2,'Desouches2','Jerome2','jeje2','jd2@hotmail.fr','jede','http','2023-08-07');
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vues_campagnes`
--

DROP TABLE IF EXISTS `vues_campagnes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vues_campagnes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nbVuesCampagne` int NOT NULL DEFAULT '0',
  `campagnes_id` int NOT NULL,
  PRIMARY KEY (`id`,`campagnes_id`),
  KEY `fk_vues_campagnes_campagnes_idx` (`campagnes_id`),
  CONSTRAINT `fk_vues_campagnes_campagnes` FOREIGN KEY (`campagnes_id`) REFERENCES `campagnes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vues_campagnes`
--

LOCK TABLES `vues_campagnes` WRITE;
/*!40000 ALTER TABLE `vues_campagnes` DISABLE KEYS */;
INSERT INTO `vues_campagnes` VALUES (6,460,1),(7,320,2),(8,3,3),(9,8,5),(10,50,6);
/*!40000 ALTER TABLE `vues_campagnes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vues_scenarios`
--

DROP TABLE IF EXISTS `vues_scenarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vues_scenarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nbVuesScenario` int NOT NULL DEFAULT '0',
  `scenarios_id` int NOT NULL,
  PRIMARY KEY (`id`,`scenarios_id`),
  KEY `fk_vues_scenarios_scenarios1_idx` (`scenarios_id`),
  CONSTRAINT `fk_vues_scenarios_scenarios1` FOREIGN KEY (`scenarios_id`) REFERENCES `scenarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vues_scenarios`
--

LOCK TABLES `vues_scenarios` WRITE;
/*!40000 ALTER TABLE `vues_scenarios` DISABLE KEYS */;
INSERT INTO `vues_scenarios` VALUES (1,742,1),(2,623,3),(3,2,4),(4,25,14),(5,78,15),(6,489,16);
/*!40000 ALTER TABLE `vues_scenarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-14 15:03:58
