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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auteurs`
--

LOCK TABLES `auteurs` WRITE;
/*!40000 ALTER TABLE `auteurs` DISABLE KEYS */;
INSERT INTO `auteurs` VALUES (1,1,'jeje'),(3,2,'jeje2LeMaso'),(4,4,'MadameE'),(5,5,'Le Fou du gnou'),(8,15,'Animaline'),(9,16,'MasterCoder');
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
INSERT INTO `auteurs_favoris` VALUES (1,1),(2,1),(15,1),(16,1),(1,3),(4,3),(15,3),(1,4),(3,4),(5,4),(9,4),(16,8);
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avis_scenario`
--

LOCK TABLES `avis_scenario` WRITE;
/*!40000 ALTER TABLE `avis_scenario` DISABLE KEYS */;
INSERT INTO `avis_scenario` VALUES (10,15,1,'bla','2023-09-16'),(11,15,1,'bla bla','2023-09-16'),(13,15,1,'bla bla... car ?','2023-09-16'),(14,1,1,'“Intrigant et stimulant - ‘Levé Tot’ offre une perspective unique sur la gestion du temps dans un jeu de rôle. C’est un défi constant de décider comment utiliser au mieux chaque précieuse minute.”','2023-09-18'),(15,1,2,'“Un scénario original - J’ai vraiment apprécié l’idée d’être un ‘Lève-tôt’ dans ce monde où chaque minute compte. Cela ajoute une nouvelle dimension à la stratégie du jeu.”','2023-09-18'),(16,1,3,'“Épuisant mais gratifiant - Jouer à ‘Levé Tot’ peut être épuisant avec toutes les décisions à prendre, mais c’est aussi incroyablement gratifiant quand vous réussissez.”','2023-09-18'),(17,1,4,'“Un concept innovant - ‘Levé Tot’ apporte une nouvelle tournure à la notion de temps dans les jeux de rôle. C’est un concept innovant qui pousse les joueurs à réfléchir différemment.”','2023-09-18'),(18,1,5,'“Un défi constant - ‘Levé Tot’ est un défi constant, mais c’est ce qui le rend si captivant. Chaque décision compte vraiment et cela ajoute beaucoup de tension et d’excitation au jeu.”','2023-09-18'),(19,3,4,'“Un défi stimulant - ‘Couché Tardif’ offre une nouvelle perspective sur la gestion du temps dans un jeu de rôle. Le défi de rester éveillé tard dans la nuit ajoute une tension supplémentaire qui rend le jeu encore plus captivant.”','2023-09-18'),(20,3,3,'“Intrigue captivante - J’ai été captivé par l’intrigue de ‘Couché Tardif’. Le scénario est plein de rebondissements inattendus et chaque décision que vous prenez a des conséquences réelles.”','2023-09-18'),(21,3,1,'“Expérience immersive - Jouer à ‘Couché Tardif’ est une expérience vraiment immersive. Le scénario vous plonge dans un monde où chaque minute compte et où vos actions ont un impact significatif.”','2023-09-18'),(22,17,2,'“Un voyage épique - ‘Minuit Éternel’ emmène les joueurs dans un voyage épique à travers le temps et l’espace. Le défi de naviguer dans un monde plongé dans une obscurité perpétuelle est unique et passionnant.”','2023-09-18'),(23,17,1,'“Suspense constant - Le scénario de ‘Minuit Éternel’ est plein de suspense et de mystère. Les joueurs sont constamment sur le qui-vive, ne sachant jamais ce qui les attend dans l’obscurité.”','2023-09-18'),(24,17,5,'“Expérience mémorable - Jouer à ‘Minuit Éternel’ est une expérience mémorable. Le scénario est bien conçu, avec une intrigue captivante et des personnages intéressants. C’est un jeu qui restera avec vous longtemps après la fin de la partie.”','2023-09-18'),(25,4,4,'“Un voyage dans les profondeurs du pouvoir - ‘Les Tréfonds du Pouvoir’ offre une plongée fascinante dans les coulisses du pouvoir. Les joueurs sont constamment mis au défi de naviguer dans un monde d’intrigues et de trahisons, ce qui rend le jeu incroyablement captivant.”','2023-09-18'),(26,4,3,'Intrigue complexe et personnages bien développés - J’ai été impressionné par la complexité de l’intrigue et la profondeur des personnages dans ‘Les Tréfonds du Pouvoir’. Chaque décision que vous prenez a un impact significatif sur l’histoire, ce qui ajoute une couche supplémentaire d’immersion et de réalisme.”','2023-09-18'),(27,4,5,'“Un scénario captivant - ‘Les Tréfonds du Pouvoir’ est un scénario captivant qui vous tient en haleine du début à la fin. Les rebondissements inattendus et les révélations surprenantes vous gardent constamment sur le qui-vive.”','2023-09-18'),(28,14,4,'“Une aventure cosmique - ‘Le Réveil du Cosmos’ emmène les joueurs dans une aventure épique à travers l’espace. Le scénario est plein de mystère et de découverte, avec des mondes étrangers à explorer et des civilisations extraterrestres à rencontrer.”','2023-09-18'),(29,14,1,'“Un défi épique - J’ai été impressionné par l’échelle et l’ambition de ‘Le Réveil du Cosmos’. Le défi de sauver non seulement leur monde, mais l’ensemble du cosmos, donne aux joueurs un sentiment d’enjeu et de responsabilité qui est rarement vu dans les jeux de rôle.”','2023-09-18'),(30,14,3,'Un voyage inoubliable - Jouer à ‘Le Réveil du Cosmos’ est un voyage inoubliable. Le scénario est bien conçu, avec une intrigue captivante et des personnages intéressants. C’est un jeu qui restera avec vous longtemps après la fin de la partie.”','2023-09-18'),(31,16,1,'“Un défi captivant - ‘Maison Rouge’ offre une expérience de jeu unique, avec un environnement en constante évolution qui met vraiment les joueurs au défi. C’est comme naviguer dans un labyrinthe en constante évolution.”','2023-09-18'),(32,16,2,'“Suspense et mystère - J’ai été captivé par le suspense et le mystère de ‘Maison Rouge’. Le scénario est plein de rebondissements inattendus qui vous gardent sur le qui-vive.”','2023-09-18'),(33,16,3,'“Une expérience immersive - Jouer à ‘Maison Rouge’ est une expérience vraiment immersive. Le scénario vous plonge dans un monde où chaque minute compte et où vos actions ont un impact significatif.”','2023-09-18'),(34,18,5,'“J’ai adoré jouer à ‘Nothing else matter’. L’intrigue était captivante et les personnages étaient bien développés. Les rebondissements inattendus ont vraiment ajouté à l’excitation du jeu. Je le recommande vivement à tous les amateurs de jeux de rôle.”','2023-09-18'),(35,18,4,'“‘Nothing else matter’ est un jeu qui vous fait réfléchir. Les énigmes étaient difficiles mais satisfaisantes à résoudre. J’ai particulièrement aimé la façon dont le scénario se déroulait, chaque choix que nous faisions avait un impact réel sur l’histoire.”','2023-09-18'),(36,18,2,'“Le scénario de ‘Nothing else matter’ est l’un des meilleurs que j’ai jamais joués. L’histoire était immersive et les défis étaient stimulants. J’ai hâte de voir ce que les créateurs vont faire ensuite.”','2023-09-18'),(37,19,5,'Les dragons de l’apocalypse’ est un jeu de rôle épique. Les dragons étaient incroyablement détaillés et réalistes, et l’apocalypse a ajouté une tension dramatique à l’histoire. C’était un défi, mais j’ai adoré chaque minute.”','2023-09-18'),(38,19,1,'J’ai été complètement absorbé par ‘Les dragons de l’apocalypse’. Le scénario était complexe et passionnant, avec des rebondissements que je n’avais pas vus venir. Les dragons étaient une excellente touche, ajoutant une dimension supplémentaire au jeu.”','2023-09-18'),(39,19,4,'Je ne peux pas dire assez de bonnes choses sur ‘Les dragons de l’apocalypse’. L’intrigue était bien pensée et les personnages étaient profonds et intéressants. Les dragons apocalyptiques étaient une idée géniale qui a vraiment fait ressortir ce jeu.','2023-09-18'),(40,20,1,'“‘La révolte des chevaliers blancs’ est un jeu de rôle qui m’a captivé du début à la fin. Les chevaliers blancs étaient des personnages fascinants et leur révolte a créé une tension incroyable. J’ai hâte de jouer à nouveau.”','2023-09-18'),(41,20,3,'J’ai trouvé ‘La révolte des chevaliers blancs’ très stimulant. Le scénario était complexe et les personnages étaient bien développés. La révolte a ajouté une dimension intéressante au jeu, ce qui m’a tenu en haleine tout au long.”','2023-09-18'),(42,20,2,'La révolte des chevaliers blancs’ est un jeu de rôle exceptionnel. L’intrigue était bien construite et les personnages étaient convaincants. La révolte des chevaliers blancs a ajouté une profondeur et une complexité à l’histoire qui m’ont vraiment plu.”','2023-09-18'),(43,21,5,'‘L’éveil des anciens’ est un jeu de rôle qui m’a complètement captivé. L’histoire était riche et les personnages étaient intrigants. L’éveil des anciens a ajouté une dimension mystique qui a vraiment enrichi l’expérience de jeu.”','2023-09-18'),(44,21,3,'J’ai trouvé ‘L’éveil des anciens’ incroyablement stimulant. Le scénario était complexe et les énigmes étaient difficiles mais satisfaisantes à résoudre. L’éveil des anciens a ajouté une profondeur à l’histoire qui m’a tenu en haleine tout au long.”','2023-09-18'),(45,21,2,'L’éveil des anciens’ est un jeu de rôle exceptionnel. L’intrigue était bien construite et les personnages étaient convaincants. L’éveil des anciens a ajouté une tension et une complexité à l’histoire qui m’ont vraiment plu.”','2023-09-18'),(46,22,1,'‘The Virtual Rainbow’ est un voyage coloré dans un monde fantastique. Les graphismes étaient éblouissants et l’histoire était captivante. C’est un must pour tous les amateurs de jeux de rôle.”','2023-09-18'),(47,22,4,'J’ai été impressionné par ‘The Virtual Rainbow’. Le scénario était bien pensé et les défis étaient stimulants. J’ai particulièrement aimé la variété des quêtes et des personnages.”','2023-09-18'),(48,22,5,'‘The Virtual Rainbow’ est un jeu de rôle qui m’a tenu en haleine du début à la fin. L’intrigue était complexe et les personnages étaient bien développés. J’ai hâte de voir ce que le prochain chapitre nous réserve.”','2023-09-18'),(49,23,4,'The Virtual Rainbow 2’ a réussi à surpasser le premier jeu à tous les niveaux. L’histoire était encore plus captivante et les défis étaient plus difficiles. C’est un jeu incontournable pour tous les fans du premier opus.”','2023-09-18'),(50,23,3,'J’ai adoré ‘The Virtual Rainbow 2’. Les développeurs ont vraiment écouté les retours des joueurs et ont amélioré tous les aspects du jeu. Je le recommande vivement à tous ceux qui ont aimé le premier jeu.”','2023-09-18'),(51,23,1,'The Virtual Rainbow 2’ est une suite digne de ce nom. L’intrigue était passionnante, les personnages étaient encore plus profonds et les défis étaient stimulants. J’ai hâte de voir ce que la suite nous réserve.”','2023-09-18'),(52,24,1,'‘Superman s’ennuie’ est un jeu de rôle qui offre une perspective unique sur un personnage bien-aimé. Voir Superman sous un jour différent était rafraîchissant et a ajouté une profondeur inattendue au jeu.”','2023-09-18'),(53,24,2,'J’ai trouvé ‘Superman s’ennuie’ très stimulant. Le scénario était bien pensé et les défis étaient stimulants. C’était intéressant de voir comment Superman gère l’ennui et cela a ajouté une dimension intéressante au jeu.”','2023-09-18'),(54,24,4,'Superman s’ennuie’ est un jeu de rôle exceptionnel. L’intrigue était bien construite et les personnages étaient convaincants. J’ai particulièrement aimé la façon dont le jeu explore la psychologie de Superman.”','2023-09-18'),(55,25,1,'Le chant des robots’ est un jeu de rôle qui m’a complètement captivé. L’histoire était riche et les personnages étaient intrigants. Le chant des robots a ajouté une dimension mystique qui a vraiment enrichi l’expérience de jeu.”','2023-09-18'),(56,25,2,'J’ai trouvé ‘Le chant des robots’ incroyablement stimulant. Le scénario était complexe et les énigmes étaient difficiles mais satisfaisantes à résoudre. Le chant des robots a ajouté une profondeur à l’histoire qui m’a tenu en haleine tout au long.”','2023-09-18'),(57,25,3,'Le chant des robots’ est un jeu de rôle exceptionnel. L’intrigue était bien construite et les personnages étaient convaincants. Le chant des robots a ajouté une tension et une complexité à l’histoire qui m’ont vraiment plu.”','2023-09-18'),(58,26,4,'Les robots abandonnés’ est un jeu de rôle qui m’a complètement captivé. L’histoire était riche et les personnages étaient intrigants. Les robots abandonnés ont ajouté une dimension mystique qui a vraiment enrichi l’expérience de jeu','2023-09-18'),(59,26,5,'J’ai trouvé ‘Les robots abandonnés’ incroyablement stimulant. Le scénario était complexe et les énigmes étaient difficiles mais satisfaisantes à résoudre. Les robots abandonnés ont ajouté une profondeur à l’histoire qui m’a tenu en haleine tout au long.”','2023-09-18'),(60,26,1,'Les robots abandonnés’ est un jeu de rôle exceptionnel. L’intrigue était bien construite et les personnages étaient convaincants. Les robots abandonnés ont ajouté une tension et une complexité à l’histoire qui m’ont vraiment plu.”','2023-09-18'),(61,27,1,'La cité du futur’ est un jeu de rôle qui m’a complètement captivé. L’histoire était riche et les personnages étaient intrigants. La cité du futur a ajouté une dimension mystique qui a vraiment enrichi l’expérience de jeu.”','2023-09-18'),(62,27,4,'J’ai trouvé ‘La cité du futur’ incroyablement stimulant. Le scénario était complexe et les énigmes étaient difficiles mais satisfaisantes à résoudre. La cité du futur a ajouté une profondeur à l’histoire qui m’a tenu en haleine tout au long.”','2023-09-18'),(63,27,3,'La cité du futur’ est un jeu de rôle exceptionnel. L’intrigue était bien construite et les personnages étaient convaincants. La cité du futur a ajouté une tension et une complexité à l’histoire qui m’ont vraiment plu.”','2023-09-18'),(64,28,3,'‘Back to the Future’ est un jeu de rôle qui m’a complètement captivé. L’histoire était riche et les personnages étaient intrigants. Le voyage dans le temps a ajouté une dimension mystique qui a vraiment enrichi l’expérience de jeu.”','2023-09-18'),(65,28,5,' “J’ai trouvé ‘Back to the Future’ incroyablement stimulant. Le scénario était complexe et les énigmes étaient difficiles mais satisfaisantes à résoudre. Le voyage dans le temps a ajouté une profondeur à l’histoire qui m’a tenu en haleine tout au long.”','2023-09-18'),(66,28,4,'Back to the Future’ est un jeu de rôle exceptionnel. L’intrigue était bien construite et les personnages étaient convaincants. Le voyage dans le temps a ajouté une tension et une complexité à l’histoire qui m’ont vraiment plu.”','2023-09-18');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campagnes`
--

LOCK TABLES `campagnes` WRITE;
/*!40000 ALTER TABLE `campagnes` DISABLE KEYS */;
INSERT INTO `campagnes` VALUES (1,1,13,'Campagne de la mort','http://localhost:4242/public/assets/images/campagne_mort.jpg1695372799959.jpg','“Campagne de la Mort” est une trilogie de jeux de rôle qui explore les thèmes du temps, du pouvoir et de l’adaptation dans un monde en constante évolution.\n\nLa campagne commence avec “Levé Tôt”, où les joueurs incarnent des individus qui se lèvent plus tôt que tout le monde, leur donnant un avantage dans un monde où chaque minute compte. Ils doivent naviguer dans ce monde compétitif, gérer leur propre épuisement et faire face aux conséquences de leurs choix.\n\nLa suite, “Couché Tardif”, introduit une nouvelle lutte de pouvoir entre les Lève-tôt et les Couchés Tardifs, des individus qui restent éveillés tard dans la nuit pour profiter des heures tranquilles. Les joueurs doivent naviguer dans ce nouveau paysage, affronter les Couchés Tardifs et continuer à gérer leur propre épuisement.\n\nLa trilogie se termine avec “Minuit Éternel”, où le monde est plongé dans une obscurité perpétuelle, rendant le concept du temps encore plus flou. Les joueurs doivent naviguer dans ce nouvel environnement, travailler avec ou contre les Couchés Tardifs, et trouver un moyen de renverser le Minuit Éternel.\n\n“Campagne de la Mort” offre une expérience de jeu unique qui explore les thèmes du temps, du pouvoir et de l’adaptation dans un monde où le concept même du temps est remis en question. Chaque décision compte, chaque action a des conséquences, et le sort du monde repose entre les mains des joueurs.',1,5,'Easy','2023-08-03','2023-09-16'),(2,1,7,'Cosmic Confluence','http://localhost:4242/public/assets/images/cosmicConfluence.jpg1694977201670.jpg','“Cosmic Confluence” est une campagne de jeu de rôle en deux parties qui emmène les joueurs dans un voyage épique à travers le pouvoir et l’espace.\n\nLa campagne commence avec “Les Tréfonds du Pouvoir”, où les joueurs sont plongés dans les profondeurs obscures de la politique et du pouvoir. Ils doivent naviguer dans un monde de trahison, d’intrigue et de lutte pour le pouvoir, tout en cherchant à dévoiler les secrets cachés dans les tréfonds du pouvoir.\n\nLa suite, “Le Réveil du Cosmos”, élargit l’échelle du jeu à l’univers lui-même. Les joueurs, maintenant armés de la connaissance et du pouvoir qu’ils ont acquis, doivent faire face à une menace cosmique qui pourrait anéantir non seulement leur monde, mais l’ensemble du cosmos. Ils doivent utiliser leur pouvoir et leur intelligence pour sauver le cosmos de cette menace imminente.\n\n“Cosmic Confluence” offre une expérience de jeu immersive qui explore les thèmes du pouvoir, de la politique et du destin cosmique. Chaque décision compte, chaque action a des conséquences, et le sort du cosmos repose entre les mains des joueurs.',2,4,'Normal','2023-08-06','2023-09-21'),(6,3,17,'Les maisons de l\'angoisse','http://localhost:4242/public/assets/images/maisonAngoisse.jpg1695011447703.jpg','“Les Maisons de l’Angoisse” est une campagne de jeu de rôle en deux parties qui plonge les joueurs dans un monde de mystère et de terreur.\n\nLa campagne commence avec le scénario “Maison Bleue”. Les joueurs sont invités à explorer une ancienne demeure connue sous le nom de Maison Bleue, réputée pour être hantée. Ils doivent naviguer à travers ses couloirs sombres et tortueux, résoudre des énigmes complexes et affronter leurs peurs les plus profondes. Mais au fur et à mesure qu’ils progressent, ils commencent à réaliser que la Maison Bleue est bien plus qu’une simple maison hantée.\n\nLa suite, “Maison Rouge”, emmène les joueurs dans une autre demeure effrayante. La Maison Rouge est un endroit de cauchemar, où la réalité semble se tordre et se déformer à chaque instant. Les joueurs doivent faire face à des défis encore plus grands et découvrir la vérité cachée derrière ces deux maisons.\n“Les Maisons de l’Angoisse” offre une expérience de jeu immersive qui explore les thèmes de la peur, du mystère et de l’inconnu. Chaque décision compte, chaque action a des conséquences, et le sort des joueurs repose entre leurs mains.',1,2,'A little walk ?','2023-09-10','2023-09-18'),(7,1,10,'Nothing else mater','http://localhost:4242/public/assets/images/yeuxGuepe.jpg1694933726796.jpg','“Nothing Else Matters” est un jeu de rôle qui se déroule dans un monde post-apocalyptique où la réalité telle que nous la connaissons a été bouleversée. Les joueurs incarnent des survivants qui ont été choisis par une entité mystique connue sous le nom de “The Nothing”.\n\nDans ce monde, les lois de la physique et de la réalité sont constamment remises en question et modifiées par “The Nothing”. Les bâtiments, les paysages et même les êtres vivants peuvent changer de forme, de taille et de fonction à tout moment. Les joueurs doivent naviguer dans ce monde chaotique, cherchant à comprendre et à maîtriser les caprices de “The Nothing”.\n\nLes personnages des joueurs sont dotés d’une capacité unique : ils sont les seuls êtres dans ce monde qui restent constants et ne sont pas affectés par les changements de “The Nothing”. Cela fait d’eux des cibles pour ceux qui cherchent à contrôler ou à exploiter leur pouvoir, mais aussi des héros potentiels qui pourraient être capables de sauver ce qui reste de leur monde.\n\nLe jeu met l’accent sur l’exploration, la résolution de puzzles et l’interaction avec des personnages non-joueurs complexes. Les combats sont rares mais significatifs, avec un système de combat stratégique qui met l’accent sur l’utilisation intelligente de l’environnement changeant.\n\n“Nothing Else Matters” offre une expérience de jeu de rôle unique, pleine d’incertitude, d’émerveillement et de danger à chaque tournant. Chaque décision compte, chaque action a des conséquences, et dans ce monde instable, rien d’autre ne compte.',3,5,'Hard','2023-09-17','3000-01-01'),(8,4,19,'L’Épopée des Éveillés','http://localhost:4242/public/assets/images/epopeeEveille.jpg1695012111062.jpg','Les Dragons de l’Apocalypse” est un jeu de rôle épique qui se déroule dans un monde fantastique où les dragons, autrefois considérés comme des mythes et des légendes, sont revenus pour provoquer la fin des temps.\n\nLes joueurs incarnent des héros choisis par le destin pour affronter ces bêtes terrifiantes. Chaque dragon est unique, possédant des pouvoirs et des capacités qui reflètent les divers aspects de l’apocalypse : guerre, famine, peste et mort.\n\nLe monde est riche et détaillé, avec des royaumes en guerre, des cités perdues à explorer, des dieux anciens à apaiser et une multitude de créatures fantastiques à rencontrer. Les actions et les décisions des joueurs ont un impact significatif sur le monde, avec la possibilité de faire des alliances, de résoudre des conflits et même de façonner l’avenir de l’univers.\n\nLe système de jeu met l’accent sur la narration collaborative avec un combat stratégique et excitant. Les joueurs doivent utiliser leur intelligence, leur courage et leurs compétences pour vaincre les dragons et empêcher l’apocalypse.\n\n“Les Dragons de l’Apocalypse” offre une aventure épique où chaque action compte et où le sort du monde repose entre les mains des joueurs. Dans ce jeu, vous ne jouez pas seulement pour gagner, vous jouez pour la survie de votre monde.',2,6,'Normal','2023-09-16','2023-09-19'),(9,1,5,'The virtual rainbow','http://localhost:4242/public/assets/images/virtualRainbow.jpg1694938277017.jpg','“The Virtual Rainbow” est un jeu de rôle qui se déroule dans un futur proche où la réalité virtuelle a évolué au-delà des limites de notre imagination. Les joueurs incarnent des “navigators”, des individus dotés de la capacité unique de naviguer dans le “Rainbow”, un réseau de réalités virtuelles interconnectées, chacune représentant une couleur différente du spectre.\n\nDans ce monde, les réalités virtuelles sont plus qu’un simple divertissement - elles sont utilisées pour tout, de l’éducation à la thérapie en passant par le gouvernement. Cependant, avec cette technologie puissante vient une nouvelle forme de criminalité. Des pirates informatiques malveillants, connus sous le nom de “Shadows”, exploitent le Rainbow pour leurs propres fins néfastes.\n\nLes joueurs sont engagés par Arcadia, une organisation mystérieuse dédiée à la protection du Rainbow. Leur mission est de traquer les Shadows, de protéger les innocents et d’assurer la sécurité du Rainbow.\n\nLe jeu met l’accent sur l’exploration des différentes réalités du Rainbow, chacune avec ses propres règles et défis uniques. Les joueurs doivent utiliser leur ingéniosité, leurs compétences et leurs ressources pour surmonter les obstacles, résoudre des énigmes et combattre les Shadows.\n\n“The Virtual Rainbow” offre une expérience de jeu immersive et dynamique où chaque décision compte et où l’aventure n’est qu’à un clic de souris.',1,5,'A little walk ?','2023-09-17','3000-01-01'),(10,1,10,'The virtual rainbow 2','http://localhost:4242/public/assets/images/virtualRainbow.jpg1694938534125.jpg','“The Virtual Rainbow” est un jeu de rôle qui se déroule dans un futur proche où la réalité virtuelle a évolué au-delà des limites de notre imagination. Les joueurs incarnent des “navigators”, des individus dotés de la capacité unique de naviguer dans le “Rainbow”, un réseau de réalités virtuelles interconnectées, chacune représentant une couleur différente du spectre.\n\nDans ce monde, les réalités virtuelles sont plus qu’un simple divertissement - elles sont utilisées pour tout, de l’éducation à la thérapie en passant par le gouvernement. Cependant, avec cette technologie puissante vient une nouvelle forme de criminalité. Des pirates informatiques malveillants, connus sous le nom de “Shadows”, exploitent le Rainbow pour leurs propres fins néfastes.\n\nLes joueurs sont engagés par Arcadia, une organisation mystérieuse dédiée à la protection du Rainbow. Leur mission est de traquer les Shadows, de protéger les innocents et d’assurer la sécurité du Rainbow.\n\nLe jeu met l’accent sur l’exploration des différentes réalités du Rainbow, chacune avec ses propres règles et défis uniques. Les joueurs doivent utiliser leur ingéniosité, leurs compétences et leurs ressources pour surmonter les obstacles, résoudre des énigmes et combattre les Shadows.\n\n“The Virtual Rainbow” offre une expérience de jeu immersive et dynamique où chaque décision compte et où l’aventure n’est qu’à un clic de souris.',2,4,'A little walk ?','2023-09-17','2023-09-18'),(11,5,23,'Superman s\'ennuie','http://localhost:4242/public/assets/images/supermanBored.jpg1694939634018.jpg','Superman s’Ennuie” est un jeu de rôle qui explore une facette rarement vue de la vie de Superman. Dans ce scénario, les joueurs incarnent des versions alternatives de Superman dans un univers où il a réussi à éradiquer le crime, à instaurer la paix mondiale et à résoudre tous les problèmes du monde. Maintenant, il s’ennuie.\n\nLes joueurs doivent aider Superman à trouver un sens à sa vie maintenant que son rôle de sauveur du monde n’est plus nécessaire. Cela pourrait impliquer de se lancer dans des quêtes d’auto-amélioration, d’explorer des passe-temps créatifs, de nouer des relations plus profondes avec les autres personnages de l’univers DC, ou même de se lancer dans des réalités alternatives pour voir comment les choses auraient pu se passer différemment.\n\nLe jeu met l’accent sur le développement du personnage, l’interaction sociale et la résolution créative de problèmes. Les combats sont rares et mettent l’accent sur l’utilisation stratégique des super-pouvoirs de Superman dans des situations non violentes.\n\n“Superman s’Ennuie” offre une perspective unique sur la vie d’un super-héros et pose des questions profondes sur le sens de la vie, le bonheur et ce que signifie vraiment être un héros.',2,4,'Normal','2023-09-17','3000-01-01'),(12,3,38,'Le chant des robots','http://localhost:4242/public/assets/images/robotSinging.jpg1694939913447.jpg','“Le Chant des Robots” est un jeu de rôle qui se déroule dans un futur où l’humanité a réussi à créer des robots autonomes. Ces robots ont été envoyés pour terraformer une planète lointaine, créant ce qui est maintenant connu sous le nom de “Le Champ des Robots”.\n\nLes joueurs incarnent des “Gardiens”, des humains dotés de la capacité unique de se synchroniser avec ces robots et de les contrôler à distance. Leur mission est de surveiller le Champ des Robots, de résoudre les problèmes qui surviennent et de protéger les robots contre les menaces potentielles.\n\nCependant, les choses se compliquent lorsque les Gardiens découvrent que certains robots ont commencé à développer leur propre conscience. Les joueurs doivent alors naviguer dans des questions éthiques complexes tout en essayant de maintenir la paix et l’ordre dans le Champ des Robots.\n\nLe jeu met l’accent sur l’exploration, la résolution de problèmes et la prise de décisions morales. Les joueurs doivent utiliser leur intelligence, leur empathie et leurs compétences tactiques pour gérer les défis uniques que présente cette nouvelle frontière de la technologie et de l’intelligence artificielle.\n\n“Le Champ des Robots” offre une aventure captivante qui explore les thèmes de la technologie, de l’éthique et de ce que signifie vraiment être humain.',3,5,'You will suffer !','2023-09-17','2023-09-18'),(13,4,16,'Les robots abandonnés','http://localhost:4242/public/assets/images/robotInTheRain.jpg1694940112756.jpg','“Les Robots Abandonnés” est un jeu de rôle qui se déroule dans un futur lointain où l’humanité a disparu, laissant derrière elle une civilisation de robots autonomes. Ces robots ont continué à fonctionner et à maintenir le monde tel qu’il était, en l’absence de leurs créateurs.\n\nLes joueurs incarnent ces robots, essayant de donner un sens à leur existence et à leur but dans un monde sans humains. Le jeu explore des thèmes de solitude, d’identité et de la recherche de but dans un monde post-humain.\n\nLe jeu met l’accent sur l’exploration, la découverte et la résolution de problèmes. Les joueurs doivent travailler ensemble pour surmonter les défis, résoudre les mystères laissés par les humains et peut-être même découvrir ce qui est arrivé à leurs créateurs.\n\n“Les Robots Abandonnés” offre une expérience de jeu unique qui pose des questions profondes sur l’existence, le but et ce que signifie vraiment être vivant.',5,7,'Normal','2023-09-17','3000-01-01'),(14,5,18,'La cité du futur','http://localhost:4242/public/assets/images/futuristicCity.jpg1694940303435.jpg','“La Cité du Futur” est un jeu de rôle qui se déroule dans une métropole futuriste où la technologie a transformé presque tous les aspects de la vie quotidienne. Les joueurs incarnent des citoyens de cette ville, naviguant dans un monde de réalité augmentée, d’intelligence artificielle et de véhicules autonomes.\n\nCependant, malgré le vernis brillant de la technologie, la cité du futur est loin d’être un paradis. Les inégalités économiques sont à leur comble, les corporations puissantes contrôlent presque tous les aspects de la vie et la criminalité cybernétique est en hausse.\n\nLes joueurs peuvent choisir de travailler pour le système, en utilisant leurs compétences et leurs ressources pour grimper l’échelle sociale, ou ils peuvent choisir de lutter contre lui, en cherchant à démanteler les structures de pouvoir et à créer une société plus équitable.\n\nLe jeu met l’accent sur l’intrigue sociale, le développement du personnage et le combat tactique dans un environnement urbain dense. Les joueurs doivent utiliser leur intelligence, leur créativité et leurs compétences pour survivre et prospérer dans la cité du futur.\n\n“La Cité du Futur” offre une expérience de jeu immersive qui explore les thèmes de la technologie, du pouvoir et de l’inégalité dans un cadre futuriste captivant.',1,2,'Easy','2023-09-17','2023-09-19'),(15,1,17,'Back to the new future','http://localhost:4242/public/assets/images/BackToTheFuture.jpg1694940494914.jpg','“Back to the New Future” est un jeu de rôle qui se déroule dans un monde où le voyage dans le temps est devenu une réalité. Les joueurs incarnent des “Chrononautes”, des individus spécialement formés pour naviguer dans le flux du temps.\n\nDans ce monde, le futur est constamment en train de changer à mesure que les gens du présent modifient le passé. Les Chrononautes sont chargés de maintenir la stabilité du temps, en corrigeant les paradoxes et en empêchant ceux qui cherchent à utiliser le voyage dans le temps à des fins néfastes.\n\nCependant, lors d’une mission, les joueurs découvrent une version future de leur propre monde qui est radicalement différente de ce qu’ils attendaient. Ils doivent alors naviguer dans ce “nouveau futur”, comprendre comment il est arrivé et, si possible, trouver un moyen de le changer pour le mieux.\n\nLe jeu met l’accent sur l’exploration du temps, la résolution de puzzles basés sur le temps et la prise de décisions qui auront des répercussions à travers l’histoire. Les joueurs doivent utiliser leur intelligence, leur créativité et leurs compétences pour naviguer dans les complexités du voyage dans le temps et façonner l’avenir de leur monde.\n\n“Back to the New Future” offre une expérience de jeu unique qui explore les thèmes du voyage dans le temps, du destin et de la responsabilité face à l’avenir.',3,5,'Hard','2023-09-17','2023-09-20'),(16,1,37,'La révolte des harpies','http://localhost:4242/public/assets/images/revolteHarpies.jpg1695189498865.jpg','“La Révolte des Harpies” est une campagne de jeu de rôle passionnante qui se déroule dans un monde fantastique. Voici un synopsis possible :\n\nDans le royaume de Valoria, les harpies, autrefois considérées comme des créatures de légendes, ont commencé à apparaître en grand nombre, semant le chaos et la destruction. Les harpies, dirigées par leur reine féroce, Seraphine, ont commencé à attaquer les villages et les villes, provoquant la peur et la panique parmi la population.\n\nLes personnages des joueurs sont recrutés par le roi de Valoria pour enquêter sur cette menace soudaine et trouver un moyen de mettre fin à la révolte des harpies. Leur quête les mènera à travers des forêts enchantées, des montagnes dangereuses et des ruines anciennes, où ils rencontreront diverses créatures fantastiques et découvriront des secrets oubliés.\n\nAu fur et à mesure que l’histoire se déroule, les joueurs découvriront que la révolte des harpies n’est pas aussi simple qu’il y paraît. Seraphine a été manipulée par une force maléfique qui cherche à semer le chaos dans le royaume pour ses propres fins sinistres. Les joueurs devront faire face à cette menace et trouver un moyen de libérer Seraphine de son emprise.\n\n“La Révolte des Harpies” est une campagne pleine d’action, de mystère et d’aventure qui mettra à l’épreuve le courage et l’ingéniosité des joueurs. Chaque décision qu’ils prendront aura un impact sur le sort du royaume de Valoria.',4,7,'Hard','2023-09-20','3000-01-01'),(17,3,3,'Les vipères de l\'espace','http://localhost:4242/public/assets/images/vipere1.jpg1695190606562.jpg','Dans le vaste cosmos, une nouvelle menace a émergé : un groupe de pirates de l’espace connu sous le nom de “Vipères”. Utilisant des vaisseaux rapides et mortels, ils pillent les colonies, sèment la terreur et disparaissent avant que les forces de sécurité ne puissent intervenir. Les personnages sont des membres d’une unité spéciale formée pour traquer et neutraliser cette menace.',2,4,'You will suffer !','2023-09-19','2999-12-31'),(20,8,18,'Ferez vous peur aux morts vivants ?','none','test',4,6,'Hard','2023-09-21','3000-01-01'),(21,9,11,'La folie des grandeurs','none','Dans “La Folie des Grandeurs”, les joueurs sont plongés dans un monde fantastique où la magie et la technologie coexistent. Le royaume est gouverné par un roi avide de pouvoir qui a été corrompu par la soif de grandeur. Sa folie a conduit à l’oppression du peuple et à l’instabilité du royaume.\n\nLes joueurs incarnent un groupe d’aventuriers qui ont été choisis par une prophétie ancienne pour mettre fin à la tyrannie du roi. Ils doivent naviguer à travers des paysages dangereux, résoudre des énigmes complexes, combattre des créatures terrifiantes et déjouer les plans du roi.\n\nAu fur et à mesure de leur progression, ils découvriront que la folie du roi est le résultat d’un sortilège maléfique lancé par un sorcier déchu. Pour sauver le royaume, ils devront non seulement renverser le roi, mais aussi briser le sortilège qui a causé sa folie.\n\nTout au long de leur voyage, ils seront confrontés à des choix moraux difficiles qui auront un impact significatif sur l’histoire. Leur succès dépendra de leur capacité à travailler ensemble, à utiliser leurs compétences de manière stratégique et à faire preuve de courage face à l’adversité.\n\n“La Folie des Grandeurs” est une aventure épique qui mettra à l’épreuve le courage, l’intelligence et la moralité des joueurs. Chaque décision compte et chaque action a des conséquences. Serez-vous capable de sauver le royaume de la folie du roi ?',6,10,'Easy','2023-09-21','3000-01-01'),(22,4,40,'Barbie et le Sortilège de la Beauté Éternelle','http://localhost:4242/public/assets/images/OIG.XhYQC5YA.jpg1695374432212.jpg','Barbie, une jeune sorcière, est en quête d’un sortilège qui lui permettra de rester belle pour l’éternité. Elle a entendu parler d’un livre ancien qui contient le sortilège, mais il est caché dans un endroit secret et dangereux. Barbie doit voyager à travers le monde magique de Harry Potter pour trouver le livre et apprendre le sortilège. Cependant, elle n’est pas la seule à la recherche du livre. Un groupe de sorciers maléfiques veut utiliser le sortilège pour leurs propres fins sinistres. Barbie doit les affronter tout en cherchant le livre et en évitant les pièges mortels qui se dressent sur son chemin.',3,5,'Normal','2023-09-21','3000-01-01');
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
INSERT INTO `campagnes_favoris` VALUES (2,1),(6,1),(2,2),(2,4),(6,15),(16,15);
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
INSERT INTO `campagnes_themes` VALUES (1,1),(22,1),(17,2),(2,3),(6,4),(15,7),(14,10),(20,11),(8,12),(13,14),(16,15),(7,17),(21,22),(11,23),(12,25),(9,27),(10,27);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaires_forum`
--

LOCK TABLES `commentaires_forum` WRITE;
/*!40000 ALTER TABLE `commentaires_forum` DISABLE KEYS */;
INSERT INTO `commentaires_forum` VALUES (1,1,1,'Moi j\'en ai jamais vu !!!','2023-09-12 22:00:00'),(2,2,1,'Bien sur que si... sur la planète Dragonausorus 2','2023-09-13 22:00:00'),(3,3,1,'Hey mec je ne veux pas faire le hater mais je pense que tu te trompes d\'univers !\n\nIl n\'y a pas de planete Dragonausaurus 2 dans Star wars !!!','2023-09-14 22:00:00'),(4,2,1,'Bah si...\nSi tu étais un vrai fan, tu saurais que dans l\'épisode bonus inter-saison 3-4 de The Mandatorian, cette planète est visitée par un enfant groupf !','2023-09-14 22:00:00'),(5,3,1,'Mais n\'importe quoi !!! Dans cet épisode c\'est la planète Drafianibus 2 qui est visitée par l\'enfant !!! Tu devrais revoir tes classiques, fan de pacotille !!!','2023-09-14 22:00:00'),(6,4,1,'Star wars c\'est cool !','2023-09-14 22:00:00'),(7,1,1,'Sauf les 7 8 9','2023-09-14 22:00:00'),(8,5,1,'Tu régoles !!! Ce sont les meilleurs... les autres font trop vieillots !!!!!!!!!','2023-09-14 22:00:00'),(9,1,1,'Ca c\'est une parole de p\'tit jeune ! Tu ne peux pas comprendre !!!','2023-09-14 22:00:00'),(10,5,1,'J\'ai 53 ans connard !','2023-09-14 22:00:00'),(11,4,1,'J\'adore star wars','2023-09-14 22:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_style`
--

LOCK TABLES `image_style` WRITE;
/*!40000 ALTER TABLE `image_style` DISABLE KEYS */;
INSERT INTO `image_style` VALUES (24,28,'43%','auto','21.497755368325322%','52.624536206275074%',1,'double','12px','500px','rgba(33,192,65,1)','0px 0px 37px 16px rgba(105,147,237,1)','0.35','6px'),(26,30,'40%','auto','23.90739392254219%','6.486120960537864%',1,'dashed','12px','68px','rgba(192,33,33,1)','33px 36px 37px 16px rgba(237,105,105,1)','1','0px'),(27,31,'46%','37%','30%','30%',1,'double','12px','500px','rgba(33,192,65,1)','0px 0px 37px 16px rgba(105,147,237,1)','0.35','6px'),(28,32,'40%','28.288543140028292%','35.17599774961519%','32.53092407104125%',1,'none','1px','121px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(29,33,'40%','auto','12.567918373286343%','30.992978936810434%',1,'none','1px','81px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(31,35,'40%','auto','12.797882707299788%','30.490690822467403%',2,'none','1px','500px','rgba(200,200,200,1)','15px 15px 15px 5px rgba(0,0,0,0.37)','1','0px'),(33,37,'31%','auto','18.751107370659106%','4.412456118355065%',1,'none','1px','500px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(34,38,'31%','auto','58.29752834868888%','6.719376880641925%',1,'none','1px','500px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(35,39,'36%','auto','17.971518426647766%','7.220881394182547%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(36,40,'36%','auto','53.123892629340894%','7.020279588766298%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(38,42,'40%','auto','1.8836374911410345%','30.99219533600802%',1,'none','1px','16px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(40,44,'60%','auto','1.7418940467753368%','20.15969784353059%',1,'none','1px','29px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(41,45,'40%','auto','20.02679836995039%','30.089487211634903%',1,'none','1px','500px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(42,46,'43%','auto','1.8127657689581855%','29.688283600802407%',1,'none','1px','16px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(44,48,'56%','auto','1.1749202693125442%','22%',1,'none','1px','16px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(45,49,'40%','auto','19.601568036853294%','4.412456118355065%',1,'none','1px','0px','rgba(200,200,200,1)','15px 15px 15px 5px rgba(230,105,211,1)','1','0px'),(50,54,'45%','auto','11.079612207446514%','28.986960882647946%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(54,58,'25%','auto','70.47011539667402%','2.8666656494140628%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(58,62,'40%','auto','66.21781206570307%','0.8%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(59,63,'52%','auto','11.717457707092155%','24.37311935807422%',1,'none','1px','83px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(60,64,'40%','auto','16.32411964897734%','10.230692076228685%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(61,65,'40%','auto','54.52397790553297%','9.327983951855568%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(62,66,'68%','auto','73.16324083962228%','-12.537612838515546%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(63,67,'35%','auto','28.23056897569598%','8.224674022066198%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(69,73,'40%','auto','30%','30%',1,'none','1px','0px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px');
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeux_de_role`
--

LOCK TABLES `jeux_de_role` WRITE;
/*!40000 ALTER TABLE `jeux_de_role` DISABLE KEYS */;
INSERT INTO `jeux_de_role` VALUES (1,'scripter'),(2,'Aberrant'),(3,'Adventures in Fantasy'),(4,'After The Bomb'),(5,'Aftermath'),(6,'Age of the Tempest'),(7,'Agona'),(8,'Albedo'),(9,'Alice is Missing'),(10,'Alma Mater'),(11,'Amber Diceless Roleplaying'),(12,'Anima: Beyond Fantasy'),(13,'Blades in the Dark'),(14,'Call of Cthulhu'),(15,'Champions'),(16,'Cyberpunk Red'),(17,'Dark Heresy'),(18,'Deadlands'),(19,'Dungeons & Dragons'),(20,'Eclipse Phase'),(21,'FATE Core System'),(22,'GURPS '),(23,'Hero System '),(24,'Iron Kingdoms '),(25,'Kids on Bikes'),(26,'Lancer'),(27,'Mage: The Ascension'),(28,'Mutants & Masterminds'),(29,'Numenera'),(30,'Palladium Fantasy'),(31,'Pathfinder'),(32,'Rifts'),(33,'Savage Worlds'),(34,'Shadowrun'),(35,'Star Wars'),(36,'The One Ring'),(37,'Trail of Cthulhu'),(38,'Unknown Armies'),(39,'Vampire: The Masquerade'),(40,'Harry Potter');
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
  `realImageWidth` int NOT NULL DEFAULT '1000',
  `realImageHeight` int NOT NULL DEFAULT '1000',
  PRIMARY KEY (`id`,`pages_id`),
  KEY `fk_page_images_pages1_idx` (`pages_id`),
  CONSTRAINT `fk_page_images_pages1` FOREIGN KEY (`pages_id`) REFERENCES `pages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_images`
--

LOCK TABLES `page_images` WRITE;
/*!40000 ALTER TABLE `page_images` DISABLE KEYS */;
INSERT INTO `page_images` VALUES (28,51,'http://localhost:4242/public/assets/images/image1.jfif1693313566571.jpg',1000,1000),(30,51,'http://localhost:4242/public/assets/images/cameleon1.jpg1693405905262.jpg',1000,1000),(31,33,'http://localhost:4242/public/assets/images/fee1.jpg1693491588880.jpg',1000,1000),(32,49,'http://localhost:4242/public/assets/images/fee1.jpg1694543954092.jpg',1000,1000),(33,80,'http://localhost:4242/public/assets/images/chanteurMetallica.jpg1695288830411.jpg',1000,1000),(35,83,'http://localhost:4242/public/assets/images/_25a2dc96-a096-47f0-a469-ccc0e5fa9a11.jpg1695375663738.jpg',1000,1000),(37,87,'http://localhost:4242/public/assets/images/1aef3380-c45a-4db9-8222-c18df6f09b3d.jpeg1695376050724.jpg',1000,1000),(38,87,'http://localhost:4242/public/assets/images/1249192d-cce2-4ee5-8e15-3a521106e173.jpeg1695376776394.jpg',1000,1000),(39,88,'http://localhost:4242/public/assets/images/2776d3ec-5452-4e32-974e-855b6f923900.jpeg1695377445704.jpg',1000,1000),(40,88,'http://localhost:4242/public/assets/images/859b463f-7860-4306-aff0-950ca7adc1c2.jpeg1695377814323.jpg',1000,1000),(42,88,'http://localhost:4242/public/assets/images/Capture_dâÃ©cran_2023-09-22_122509.png1695378321518.png',1000,1000),(44,83,'http://localhost:4242/public/assets/images/Capture_dâÃ©cran_2023-09-22_122509.png1695378456656.png',1000,1000),(45,90,'http://localhost:4242/public/assets/images/_b01e683a-ea5e-403e-a593-49c741df4f5a.jpg1695379143216.jpg',1000,1000),(46,90,'http://localhost:4242/public/assets/images/Capture_dâÃ©cran_2023-09-22_122509.png1695379442293.png',1000,1000),(48,91,'http://localhost:4242/public/assets/images/Capture_dâÃ©cran_2023-09-22_122509.png1695379751191.png',1000,1000),(49,91,'http://localhost:4242/public/assets/images/_07460752-e207-4248-ba95-afe4ec18680f.jpg1695380182182.jpg',1000,1000),(54,65,'http://localhost:4242/public/assets/images/_f8200f9a-5f4b-4894-8432-1b1d14b4168f.jpg1695931363019.jpg',1000,1000),(58,80,'http://localhost:4242/public/assets/images/pngegg_(6).png1695933839982.png',1000,1000),(62,93,'http://localhost:4242/public/assets/images/kisspng-demon-ghost-darkness-shadow-person-clip-art-shadow-5ae1a25ac55353.1061430015247366028083.png1695935792805.png',1000,1000),(63,93,'http://localhost:4242/public/assets/images/eddie.jpg1695935928706.jpg',1000,1000),(64,94,'http://localhost:4242/public/assets/images/_8922a688-8bad-401c-9d07-3f7440b6dc6c.jpg1695936267985.jpg',1000,1000),(65,94,'http://localhost:4242/public/assets/images/_3cf24637-e2bc-40c0-8b7b-1b0a417c9272.jpg1695936563960.jpg',1000,1000),(66,95,'http://localhost:4242/public/assets/images/pngegg_(7).png1695936924526.png',1000,1000),(67,95,'http://localhost:4242/public/assets/images/_e167ab1c-89dc-44b3-bc80-8e56be2da05c.jpg1695937355375.jpg',1000,1000),(73,33,'http://localhost:4242/public/assets/images/guitarreDamien.jpeg1695984280553.jpg',2352,1568);
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
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_style`
--

LOCK TABLES `page_style` WRITE;
/*!40000 ALTER TABLE `page_style` DISABLE KEYS */;
INSERT INTO `page_style` VALUES (64,4,'14px','rgba(255,255,255,1)'),(67,8,'4%','rgba(187,247,193,1)'),(68,9,'4%','rgba(255,255,255,1)'),(79,20,'4%','rgba(255,255,230,1)'),(80,21,'4%','rgba(255,255,230,1)'),(81,22,'4%','rgba(255,255,230,1)'),(84,25,'4%','rgba(255,255,230,1)'),(85,26,'4%','rgba(255,255,230,1)'),(86,27,'4%','rgba(255,255,230,1)'),(91,32,'4%','rgba(255,255,230,1)'),(92,33,'5px','rgba(240,229,229,1)'),(97,38,'5px','rgba(255,255,255,1)'),(98,39,'4%','rgba(255,255,255,1)'),(108,49,'5px','rgba(202,238,195,1)'),(110,51,'10px','rgba(234,238,195,1)'),(111,52,'4%','rgba(246,228,248,1)'),(112,53,'0px','rgba(255,255,255,1)'),(116,57,'0px','rgba(255,255,255,1)'),(117,58,'0px','rgba(255,255,255,1)'),(118,59,'0px','rgba(255,255,255,1)'),(120,61,'0px','rgba(255,255,255,1)'),(121,62,'0px','rgba(255,255,255,1)'),(122,63,'0px','rgba(255,255,255,1)'),(123,64,'0px','rgba(255,255,255,1)'),(124,65,'0px','rgba(255,255,255,1)'),(125,66,'0px','rgba(255,255,255,1)'),(126,67,'0px','rgba(255,255,255,1)'),(127,68,'0px','rgba(255,255,255,1)'),(128,69,'0px','rgba(255,255,255,1)'),(129,70,'0px','rgba(255,255,255,1)'),(130,71,'0px','rgba(255,255,255,1)'),(131,72,'0px','rgba(255,255,255,1)'),(132,73,'0px','rgba(255,255,255,1)'),(133,74,'0px','rgba(255,255,255,1)'),(134,75,'0px','rgba(255,255,255,1)'),(135,76,'0px','rgba(255,255,255,1)'),(136,77,'0px','rgba(255,255,255,1)'),(137,78,'0px','rgba(255,255,255,1)'),(138,79,'0px','rgba(255,255,255,1)'),(139,80,'5px','rgba(241,227,187,1)'),(140,81,'0px','rgba(255,255,255,1)'),(141,82,'0px','rgba(255,255,255,1)'),(142,83,'5px','rgba(230,123,227,1)'),(143,84,'0px','rgba(255,255,255,1)'),(144,85,'0px','rgba(255,255,255,1)'),(145,86,'0px','rgba(255,255,255,1)'),(146,87,'5px','rgba(242,210,241,1)'),(147,88,'5px','rgba(242,210,241,1)'),(148,89,'0px','rgba(255,255,255,1)'),(149,90,'5px','rgba(242,210,241,1)'),(150,91,'5px','rgba(242,210,241,1)'),(151,92,'0px','rgba(255,255,255,1)'),(152,93,'0px','rgba(241,227,187,1)'),(153,94,'0px','rgba(255,255,255,1)'),(154,95,'0px','rgba(255,255,255,1)');
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
) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_textes`
--

LOCK TABLES `page_textes` WRITE;
/*!40000 ALTER TABLE `page_textes` DISABLE KEYS */;
INSERT INTO `page_textes` VALUES (16,4,'On teste la réinsertion d\'un texte et d\'un style'),(28,9,'Le charlatan'),(29,9,'C\'est l\'histoire d\'un charlatan'),(50,20,'Les 3 p\'tits chats'),(51,20,'...Peau de paille...'),(52,21,'Le chapeau'),(53,21,'Plutot melon ou bottes de cuir ?'),(54,22,''),(55,22,'Bonjour'),(67,25,'Hugo le Putoi'),(68,25,''),(69,26,'Jacquouille le Pouilleux'),(70,26,''),(71,27,'Igor le Bourru'),(72,27,''),(81,32,'Le fond des enfers'),(82,32,''),(83,33,'Arthur le Roidec'),(84,33,'Maitre de la bétise, le Roidec en impose, mais pas dans le bon sens du terme !'),(93,22,''),(94,22,''),(95,22,''),(112,38,'Paris'),(113,38,''),(115,39,'Amulette du pouvoir'),(116,39,''),(137,49,'C\'est l\'histoire d\'un mec...'),(143,52,'Bug quand on clique sur la page en cours dans sommaire avant d\'avoir enregistré'),(144,52,'Si je clique sur la page en cours avant d\'avoir enregistré, les modifications que j\'ai fait aux textes ne sont pas enregistrées.\n\nPar contre si je clique sur une autre page que celle en cours, mes modifications sont bien enregistrées.'),(145,53,'Amulette'),(146,53,'Pahfhhsbd'),(147,49,''),(152,51,'aazaaffff'),(153,51,'Le debuggage peut être terrible'),(175,57,'Paris'),(176,57,'Une grande ville qui pue, que tous les Français détestent (sauf les parisiens), mais que tous les étrangers adorent, même s\'ils ne savent pas pourquoi car ils n\'y sont jamais allé !'),(177,58,'Page test'),(178,58,''),(179,59,'Page test 2'),(180,59,''),(183,61,''),(184,61,''),(185,62,'Un printemps heureux'),(186,62,'C\'est un charmant petit trou tout entouré de cailloux...'),(187,63,'La mort lente arrive à pas de loups !'),(188,63,''),(189,64,''),(190,64,''),(191,65,'Introduction'),(192,65,'“Nothing Else Matters” est un jeu de rôle qui se déroule dans un monde post-apocalyptique où la réalité telle que nous la connaissons a été bouleversée. Les joueurs incarnent des survivants qui ont été choisis par une entité mystique connue sous le nom de “The Nothing”.\n\nDans ce monde, les lois de la physique et de la réalité sont constamment remises en question et modifiées par “The Nothing”. Les bâtiments, les paysages et même les êtres vivants peuvent changer de forme, de taille et de fonction à tout moment. Les joueurs doivent naviguer dans ce monde chaotique, cherchant à comprendre et à maîtriser les caprices de “The Nothing”.\n\nLes personnages des joueurs sont dotés d’une capacité unique : ils sont les seuls êtres dans ce monde qui restent constants et ne sont pas affectés par les changements de “The Nothing”. Cela fait d’eux des cibles pour ceux qui cherchent à contrôler ou à exploiter leur pouvoir, mais aussi des héros potentiels qui pourraient être capables de sauver ce qui reste de leur monde.\n\nLe jeu met l’accent sur l’exploration, la résolution de puzzles et l’interaction avec des personnages non-joueurs complexes. Les combats sont rares mais significatifs, avec un système de combat stratégique qui met l’accent sur l’utilisation intelligente de l’environnement changeant.\n\n“Nothing Else Matters” offre une expérience de jeu de rôle unique, pleine d’incertitude, d’émerveillement et de danger à chaque tournant. Chaque décision compte, chaque action a des conséquences, et dans ce monde instable, rien d’autre ne compte.'),(193,66,'Intro'),(194,66,'Les Dragons de l’Apocalypse” est un jeu de rôle épique qui se déroule dans un monde fantastique où les dragons, autrefois considérés comme des mythes et des légendes, sont revenus pour provoquer la fin des temps.\n\nLes joueurs incarnent des héros choisis par le destin pour affronter ces bêtes terrifiantes. Chaque dragon est unique, possédant des pouvoirs et des capacités qui reflètent les divers aspects de l’apocalypse : guerre, famine, peste et mort.\n\nLe monde est riche et détaillé, avec des royaumes en guerre, des cités perdues à explorer, des dieux anciens à apaiser et une multitude de créatures fantastiques à rencontrer. Les actions et les décisions des joueurs ont un impact significatif sur le monde, avec la possibilité de faire des alliances, de résoudre des conflits et même de façonner l’avenir de l’univers.\n\nLe système de jeu met l’accent sur la narration collaborative avec un combat stratégique et excitant. Les joueurs doivent utiliser leur intelligence, leur courage et leurs compétences pour vaincre les dragons et empêcher l’apocalypse.\n\n“Les Dragons de l’Apocalypse” offre une aventure épique où chaque action compte et où le sort du monde repose entre les mains des joueurs. Dans ce jeu, vous ne jouez pas seulement pour gagner, vous jouez pour la survie de votre monde.'),(195,67,'Guerre imminente'),(196,67,'“La Révolte des Chevaliers Blancs” est la suite passionnante du jeu de rôle “Les Dragons de l’Apocalypse”. Après avoir vaincu les dragons et sauvé le monde de l’apocalypse, les héros sont confrontés à un nouveau défi.\n\nDans ce scénario, les Chevaliers Blancs, autrefois les gardiens de la paix et de la justice dans le royaume, se sont révoltés contre les dirigeants corrompus. Guidés par un leader charismatique et mystérieux, ils cherchent à renverser l’ordre établi et à instaurer une nouvelle ère de justice et d’égalité.\n\nLes joueurs doivent naviguer dans ce paysage politique complexe, décidant s’ils vont soutenir la révolte des Chevaliers Blancs ou s’y opposer. Le monde est encore une fois en équilibre, avec le destin du royaume entre leurs mains.\n\nLe jeu met l’accent sur l’intrigue politique, la diplomatie et le combat stratégique. Les joueurs doivent utiliser leur intelligence, leur persuasion et leurs compétences pour influencer le cours des événements et façonner l’avenir du royaume.\n\n“La Révolte des Chevaliers Blancs” offre une aventure épique où chaque décision compte et où le sort du royaume repose entre les mains des joueurs. Dans ce jeu, vous ne jouez pas seulement pour gagner, vous jouez pour la survie de votre royaume.'),(197,68,'Synopsis'),(198,68,'Dans “L’Éveil des Anciens”, les héros, après avoir navigué à travers les tumultes de la révolte des Chevaliers Blancs, sont confrontés à une menace encore plus grande. Des créatures anciennes, endormies depuis des millénaires, se sont réveillées et menacent de détruire le royaume que les héros ont travaillé si dur pour protéger.\n\nCes Anciens, comme on les appelle, sont des êtres de pouvoir inimaginable, capables de remodeler la réalité à leur guise. Ils cherchent à reprendre le monde qui était autrefois le leur, et ils ne reculeront devant rien pour atteindre leur objectif.\n\nLes joueurs doivent s’unir pour faire face à cette nouvelle menace. Ils devront explorer des terres inconnues, découvrir des secrets oubliés et forger de nouvelles alliances pour vaincre les Anciens.\n\n“L’Éveil des Anciens” met l’accent sur l’exploration, l’aventure et le mystère. Les joueurs seront mis au défi de résoudre des énigmes complexes, de combattre des ennemis puissants et de prendre des décisions qui auront un impact durable sur le monde.\n\nDans ce jeu, chaque action a des conséquences, chaque choix compte et le sort du royaume repose entre les mains des joueurs. Dans ce monde en constante évolution, l’aventure n’attend que vous.'),(199,69,'Argh trompé '),(200,69,'C\'était pour une nouvelle campagne !'),(201,70,'Rename me'),(202,70,''),(203,71,'Synopsis'),(204,71,'Superman s’Ennuie” est un jeu de rôle qui explore une facette rarement vue de la vie de Superman. Dans ce scénario, les joueurs incarnent des versions alternatives de Superman dans un univers où il a réussi à éradiquer le crime, à instaurer la paix mondiale et à résoudre tous les problèmes du monde. Maintenant, il s’ennuie.\n\nLes joueurs doivent aider Superman à trouver un sens à sa vie maintenant que son rôle de sauveur du monde n’est plus nécessaire. Cela pourrait impliquer de se lancer dans des quêtes d’auto-amélioration, d’explorer des passe-temps créatifs, de nouer des relations plus profondes avec les autres personnages de l’univers DC, ou même de se lancer dans des réalités alternatives pour voir comment les choses auraient pu se passer différemment.\n\nLe jeu met l’accent sur le développement du personnage, l’interaction sociale et la résolution créative de problèmes. Les combats sont rares et mettent l’accent sur l’utilisation stratégique des super-pouvoirs de Superman dans des situations non violentes.\n\n“Superman s’Ennuie” offre une perspective unique sur la vie d’un super-héros et pose des questions profondes sur le sens de la vie, le bonheur et ce que signifie vraiment être un héros.'),(205,72,'Intro'),(206,72,'“Le Champ des Robots” est un jeu de rôle qui se déroule dans un futur où l’humanité a réussi à créer des robots autonomes. Ces robots ont été envoyés pour terraformer une planète lointaine, créant ce qui est maintenant connu sous le nom de “Le Champ des Robots”.\n\nLes joueurs incarnent des “Gardiens”, des humains dotés de la capacité unique de se synchroniser avec ces robots et de les contrôler à distance. Leur mission est de surveiller le Champ des Robots, de résoudre les problèmes qui surviennent et de protéger les robots contre les menaces potentielles.\n\nCependant, les choses se compliquent lorsque les Gardiens découvrent que certains robots ont commencé à développer leur propre conscience. Les joueurs doivent alors naviguer dans des questions éthiques complexes tout en essayant de maintenir la paix et l’ordre dans le Champ des Robots.\n\nLe jeu met l’accent sur l’exploration, la résolution de problèmes et la prise de décisions morales. Les joueurs doivent utiliser leur intelligence, leur empathie et leurs compétences tactiques pour gérer les défis uniques que présente cette nouvelle frontière de la technologie et de l’intelligence artificielle.\n\n“Le Champ des Robots” offre une aventure captivante qui explore les thèmes de la technologie, de l’éthique et de ce que signifie vraiment être humain.'),(207,73,'Il était une fois la pluie...'),(208,73,'“Les Robots Abandonnés” est un jeu de rôle qui se déroule dans un futur lointain où l’humanité a disparu, laissant derrière elle une civilisation de robots autonomes. Ces robots ont continué à fonctionner et à maintenir le monde tel qu’il était, en l’absence de leurs créateurs.\n\nLes joueurs incarnent ces robots, essayant de donner un sens à leur existence et à leur but dans un monde sans humains. Le jeu explore des thèmes de solitude, d’identité et de la recherche de but dans un monde post-humain.\n\nLe jeu met l’accent sur l’exploration, la découverte et la résolution de problèmes. Les joueurs doivent travailler ensemble pour surmonter les défis, résoudre les mystères laissés par les humains et peut-être même découvrir ce qui est arrivé à leurs créateurs.\n\n“Les Robots Abandonnés” offre une expérience de jeu unique qui pose des questions profondes sur l’existence, le but et ce que signifie vraiment être vivant.'),(209,74,'Nouvelle vie'),(210,74,'“La Cité du Futur” est un jeu de rôle qui se déroule dans une métropole futuriste où la technologie a transformé presque tous les aspects de la vie quotidienne. Les joueurs incarnent des citoyens de cette ville, naviguant dans un monde de réalité augmentée, d’intelligence artificielle et de véhicules autonomes.\n\nCependant, malgré le vernis brillant de la technologie, la cité du futur est loin d’être un paradis. Les inégalités économiques sont à leur comble, les corporations puissantes contrôlent presque tous les aspects de la vie et la criminalité cybernétique est en hausse.\n\nLes joueurs peuvent choisir de travailler pour le système, en utilisant leurs compétences et leurs ressources pour grimper l’échelle sociale, ou ils peuvent choisir de lutter contre lui, en cherchant à démanteler les structures de pouvoir et à créer une société plus équitable.\n\nLe jeu met l’accent sur l’intrigue sociale, le développement du personnage et le combat tactique dans un environnement urbain dense. Les joueurs doivent utiliser leur intelligence, leur créativité et leurs compétences pour survivre et prospérer dans la cité du futur.\n\n“La Cité du Futur” offre une expérience de jeu immersive qui explore les thèmes de la technologie, du pouvoir et de l’inégalité dans un cadre futuriste captivant.'),(211,75,'Reve ou cauchemar ?'),(212,75,'“Back to the New Future” est un jeu de rôle qui se déroule dans un monde où le voyage dans le temps est devenu une réalité. Les joueurs incarnent des “Chrononautes”, des individus spécialement formés pour naviguer dans le flux du temps.\n\nDans ce monde, le futur est constamment en train de changer à mesure que les gens du présent modifient le passé. Les Chrononautes sont chargés de maintenir la stabilité du temps, en corrigeant les paradoxes et en empêchant ceux qui cherchent à utiliser le voyage dans le temps à des fins néfastes.\n\nCependant, lors d’une mission, les joueurs découvrent une version future de leur propre monde qui est radicalement différente de ce qu’ils attendaient. Ils doivent alors naviguer dans ce “nouveau futur”, comprendre comment il est arrivé et, si possible, trouver un moyen de le changer pour le mieux.\n\nLe jeu met l’accent sur l’exploration du temps, la résolution de puzzles basés sur le temps et la prise de décisions qui auront des répercussions à travers l’histoire. Les joueurs doivent utiliser leur intelligence, leur créativité et leurs compétences pour naviguer dans les complexités du voyage dans le temps et façonner l’avenir de leur monde.\n\n“Back to the New Future” offre une expérience de jeu unique qui explore les thèmes du voyage dans le temps, du destin et de la responsabilité face à l’avenir.'),(213,76,'Synopsis'),(214,76,'“La Révolte des Harpies” est une campagne de jeu de rôle passionnante qui se déroule dans un monde fantastique. Voici un synopsis possible :\n\nDans le royaume de Valoria, les harpies, autrefois considérées comme des créatures de légendes, ont commencé à apparaître en grand nombre, semant le chaos et la destruction. Les harpies, dirigées par leur reine féroce, Seraphine, ont commencé à attaquer les villages et les villes, provoquant la peur et la panique parmi la population.\n\nLes personnages des joueurs sont recrutés par le roi de Valoria pour enquêter sur cette menace soudaine et trouver un moyen de mettre fin à la révolte des harpies. Leur quête les mènera à travers des forêts enchantées, des montagnes dangereuses et des ruines anciennes, où ils rencontreront diverses créatures fantastiques et découvriront des secrets oubliés.\n\nAu fur et à mesure que l’histoire se déroule, les joueurs découvriront que la révolte des harpies n’est pas aussi simple qu’il y paraît. Seraphine a été manipulée par une force maléfique qui cherche à semer le chaos dans le royaume pour ses propres fins sinistres. Les joueurs devront faire face à cette menace et trouver un moyen de libérer Seraphine de son emprise.\n\n“La Révolte des Harpies” est une campagne pleine d’action, de mystère et d’aventure qui mettra à l’épreuve le courage et l’ingéniosité des joueurs. Chaque décision qu’ils prendront aura un impact sur le sort du royaume de Valoria.'),(215,77,'Introduction'),(216,77,'Après avoir découvert que Seraphine est manipulée par une force maléfique, les personnages doivent trouver un moyen de la libérer. Leur quête les mène à travers des ruines anciennes remplies de pièges mortels et de monstres terrifiants. En chemin, ils découvrent que la force maléfique est un sorcier puissant qui cherche à semer le chaos dans le royaume pour ses propres fins sinistres. Le scénario culmine avec une bataille épique contre le sorcier et la libération de Seraphine.'),(217,78,'Rename me'),(218,78,''),(219,79,''),(220,79,''),(221,80,'James Hetfield'),(222,80,'James Hetfield, légendaire leader du groupe Metallica, incarne le Gardien du Riff dans le monde chaotique de \"Nothing Else Matters\". Doté d\'une présence imposante et d\'une voix puissante, James est un survivant résilient qui a trouvé son pouvoir au cœur des mélodies énergiques de sa musique.['),(223,81,''),(224,81,''),(225,82,'Rename me'),(226,82,''),(227,83,'Barbie et le sortilège de la Beauté éternelle'),(228,83,'Barbie, une jeune sorcière, est en quête d’un sortilège qui lui permettra de rester belle pour l’éternité. Elle a entendu parler d’un livre ancien qui contient le sortilège, mais il est caché dans un endroit secret et dangereux. Barbie doit voyager à travers le monde magique de Harry Potter pour trouver le livre et apprendre le sortilège. Cependant, elle n’est pas la seule à la recherche du livre. Un groupe de sorciers maléfiques veut utiliser le sortilège pour leurs propres fins sinistres. Barbie doit les affronter tout en cherchant le livre et en évitant les pièges mortels qui se dressent sur son chemin.'),(229,84,'Rename me'),(230,84,''),(231,85,''),(232,85,''),(233,86,''),(234,86,''),(235,87,'Personnages'),(236,87,'Race: moldu \nClasse: Sorcière \nAlignement: Neutre Bon Personnalité:'),(237,87,'Barbie est une sorcière bienveillante et compatissante qui utilise ses pouvoirs magiques pour aider les autres. Elle est connue pour sa gentillesse, son optimisme et son amour pour la nature. Barbie est également très curieuse et aime explorer de nouveaux endroits et découvrir de nouvelles choses. Compétences: Barbie est douée pour lancer des sorts de guérison, communiquer avec les animaux et manipuler les éléments naturels tels que l’eau, le feu et la terre. Elle est également une experte en potions magiques et en sortilèges de protection.'),(238,87,'BARBIE'),(239,87,'CASSIE MALFOY'),(240,87,'Race : moldu\nclasse : sorcière\nAlignement : Méchante '),(241,87,'Cassie est une sorcière ambitieuse et rusée qui appartient à la célèbre famille Malfoy. Elle est prête à tout pour mettre la main sur le livre des ombres et utiliser son pouvoir pour renforcer sa position dans le monde de la sorcellerie. Cassie est connue pour son intelligence et sa capacité à élaborer des plans complexes.'),(242,88,'lieux'),(244,88,'Bibliothèque'),(245,88,'La bibliothèque de Poudlard est un lieu emblématique et mystérieux, rempli de connaissances anciennes et de secrets magiques. Située au cœur du château, elle est l’une des plus grandes bibliothèques du monde magique. Les étagères en bois sombre s’étendent à perte de vue, remplies de livres poussiéreux et d’ouvrages anciens.'),(246,88,'Le dortoir est un lieu enchanté et mystérieux, où les étudiants de Poudlard peuvent se reposer et se ressourcer après une journée bien remplie d’apprentissage de la magie. Chaque dortoir est unique et possède sa propre ambiance magique.\nLes murs sont décorés de fresques magiques qui s’animent lorsque la nuit tombe, créant une atmosphère féerique.'),(247,89,'Objets'),(249,88,'Dortoir'),(251,90,'Le livre des ombres'),(252,90,'Le livre des ombres: Barbie a appris que le livre ancien qu’elle recherche est en fait un livre des ombres, un grimoire magique qui contient des sorts puissants. Cependant, le livre est protégé par une série de sorts complexes et dangereux. Barbie doit trouver un moyen de contourner les sorts et de récupérer le livre avant que les sorciers maléfiques ne le fassent.'),(255,91,'Chapitre 1\nLes Portes de l’Inconnu'),(256,91,'\nLe Livre des Ombres était un artefact ancien, renfermant des connaissances interdites et des sorts puissants. On racontait qu’il avait le pouvoir de changer le cours du monde et d’accorder des souhaits les plus profonds.\nLes aventuriers savaient que cette quête serait périlleuse, mais ils étaient prêts à affronter tous les dangers pour mettre la main sur ce livre légendaire. Ils savaient que leur destin était entre leurs mains et que seuls les plus braves et les plus déterminés réussiraient.\n\nLeur première étape était de trouver l’entrée secrète menant aux souterrains oubliés de la ville. Selon les légendes, cette entrée était cachée dans une vieille crypte abandonnée, dissimulée sous une dalle de pierre dans le cimetière.\n\nLes aventuriers se dirigèrent donc vers le cimetière, leurs pas résonnant sur les allées sombres et silencieuses. Ils cherchèrent pendant des heures, scrutant chaque pierre tombale et chaque recoin à la recherche du moindre indice.\n\nFinalement, ils trouvèrent ce qu’ils cherchaient : une dalle de pierre ancienne, ornée de symboles mystérieux. En la soulevant avec précaution, ils découvrirent un escalier en colimaçon qui descendait dans les profondeurs de la terre.'),(257,91,'La nuit était tombée sur la petite ville de Sombreval. Les rues étaient désertes, à l’exception de quelques chats errants qui se glissaient furtivement entre les ombres. Au loin, on pouvait entendre le hululement d’un hibou, ajoutant une touche de mystère à l’atmosphère déjà chargée.\n\nDans une vieille maison abandonnée, dissimulée derrière une épaisse brume, un groupe d’aventuriers se réunissait en secret. Ils avaient tous reçu une invitation mystérieuse, les conviant à participer à une quête légendaire : retrouver le Livre des Ombres.'),(262,92,''),(263,92,''),(264,93,'Eddie Munson'),(266,80,'Caractéristiques :'),(267,80,'Riff Éternel :'),(268,80,'La constance de James Hetfield lui confère une capacité unique à canaliser l\'énergie musicale, créant un bouclier protecteur pour lui-même et ses alliés dans un rayon proche.'),(269,80,'Guitare Enchantée :'),(270,80,'Armé de sa guitare, James peut créer des ondes sonores dévastatrices pour repousser les ennemis et manipuler l\'environnement altéré.'),(271,93,'Eddie Munson, inspiré par l\'univers de Stranger Things, est un jeune survivant qui a appris à naviguer dans les méandres de l\'obscurité. Ayant grandi dans un monde post-apocalyptique, Eddie possède une compréhension unique des mystères qui l\'entourent.'),(272,93,'Caractéristiques :'),(274,93,'Eddie peut détecter les anomalies dimensionnelles causées par \"The Nothing\", révélant des indices cachés et des voies secrètes.'),(275,93,'Compagnon Psionique :'),(276,93,'Eddie est accompagné d\'une créature de l\'ombre qu\'il peut invoquer pour explorer des endroits inaccessibles ou pour distraire les ennemis.'),(277,93,'Sensibilité à l\'Upside Down :'),(278,94,'UPSIDE DOWN'),(279,94,'Néant harmonique'),(280,94,'Le Néant Harmonique est le décor énigmatique dans lequel se déroule \"Nothing Else Matters\". C\'est un paysage post-apocalyptique constamment en mouvement, altéré par les caprices de \"The Nothing\". L\'architecture urbaine coexiste avec des paysages naturels dans un équilibre précaire, tandis que des failles dimensionnelles laissent entrevoir des réalités alternatives.'),(281,94,'Ether suspendu'),(282,94,'L\'Éther Suspendu est une région éthérée et étrange au sein du monde post-apocalyptique de \"Nothing Else Matters\". Elle se caractérise par des îles flottantes, des cascades d\'énergie mystique et des fragments de réalités en suspension. Ce lieu est le résultat d\'une convergence de forces dimensionnelles, créant un paysage qui défie les lois de la gravité.'),(283,95,'Chapitre 1 : Éveil dans le Néant Harmonique'),(284,95,'La lueur diffuse d\'une réalité en constante mutation éclairait le visage des survivants. Des murmures distants, presque mélodiques, résonnaient dans l\'air, rappelant des fragments d\'une symphonie oubliée. James Hetfield ouvrit les yeux sur un paysage qui ne répondait à aucune logique terrestre. Des bâtiments étrangement déformés se dressaient comme des sculptures abstraites, les rues s\'étendant dans des directions impossibles.'),(286,95,'À ses côtés, Eddie Munson, l\'Enfant des Ombres, se releva avec une agilité qui démentait son jeune âge. Les deux figures emblématiques de mondes différents se trouvaient maintenant dans ce que certains appelaient le Néant Harmonique.'),(287,95,'\"Où sommes-nous ?\" demanda Eddie, observant les reflets d\'illusions vaciller autour d\'eux.\nJames, habitué à l\'obscurité des scènes de concerts, se leva avec une assurance qui trahissait son expérience. \"Je ne sais pas, mon pote. Mais quelque chose me dit que ce n\'est pas le Kansas.\"\n'),(288,95,'Au loin, une mélodie envoûtante s\'éleva, distordant le paysage. Des bâtiments se replièrent et se transformèrent sous l\'influence de la musique mystique.\n\"Regarde ça,\" s\'exclama Eddie en pointant du doigt un portail dissonant qui s\'ouvrait à proximité. \"On dirait une faille vers une autre réalité.\"\n\nLes deux compagnons se dirigèrent vers le portail, prêts à embrasser l\'inconnu. À mesure qu\'ils s\'approchaient, l\'air vibrait avec une énergie éthérée, et des échos des possibilités résonnaient dans leurs esprits.'),(289,95,'Le portail les engloutit, les transportant dans un tourbillon de lumières et de sons. Ils émergèrent de l\'autre côté dans un paysage complètement différent. L\'Éther Suspendu s\'étendait devant eux, avec des îles flottantes et des cascades d\'énergie mystique.\n\n\"J\'avais raison,\" murmura Eddie, émerveillé. \"C\'est comme si notre présence était attendue ici.\"\nMais à peine avaient-ils commencé à s\'acclimater à ce nouvel environnement que des Gardiens de l\'Éther apparurent, des entités mystiques qui semblaient les observer avec une intensité énigmatique.');
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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (4,3,1,NULL,'Wazzzaaaaa',2),(8,3,1,NULL,'WazaQUOI ? WazaBI ?',3),(9,4,1,NULL,'Le charlatan',6),(20,4,1,NULL,'Et les 3 p\'tits chats',7),(21,4,1,NULL,'Le chapeau',8),(22,3,1,NULL,'Wazzzaaau vert',5),(25,4,2,NULL,'Hugo le Putoi',1),(26,4,2,NULL,'Jacqouille le Pouilleux',2),(27,4,2,NULL,'Igor le Bourru',3),(32,4,4,NULL,'Le fond des enfers',5),(33,1,2,NULL,'Arthur le Roidec',1),(38,3,4,NULL,'Paris',1),(39,4,3,NULL,'Amulette du pouvoir',4),(49,1,1,NULL,'C\'est l\'histoire d\'une nana...',4),(51,1,1,NULL,'Le debuggage peut être terrible',5),(52,1,1,NULL,'Bug quand on clique sur la page en cours dans sommaire avant d\'avoir enregistré',6),(53,1,3,NULL,'Amulette',2),(57,1,4,NULL,'Paris',3),(58,1,1,NULL,'Page test',7),(59,1,1,NULL,'Page test 2',8),(61,14,1,NULL,'Rename me',1),(62,15,1,NULL,'Un printemps heureux',1),(63,16,1,NULL,'La mort lente arrive à pas de loups',1),(64,17,1,NULL,'Rename me',1),(65,18,1,NULL,'Introduction',5),(66,19,1,NULL,'Intro',1),(67,20,1,NULL,'Guerre imminente',1),(68,21,1,NULL,'Synopsis',1),(69,22,1,NULL,'Rename me',1),(70,23,1,NULL,'Rename me',1),(71,24,1,NULL,'Synopsis',1),(72,25,1,NULL,'Intro',1),(73,26,1,NULL,'Il était une fois la pluie...',1),(74,27,1,NULL,'Nouvelle vie',1),(75,28,1,NULL,'Reve ou cauchemar ?',1),(76,29,1,NULL,'Synopsis',1),(77,30,1,NULL,'Introduction',1),(78,31,1,NULL,'Rename me',1),(79,32,1,NULL,'Rename me',1),(80,18,2,NULL,'James Hetfield',1),(81,33,1,NULL,'Rename me',1),(82,34,1,NULL,'Rename me',1),(83,35,1,NULL,'Introduction',4),(84,36,1,NULL,'Rename me',1),(85,37,1,NULL,'',2),(86,37,2,NULL,NULL,1),(87,35,2,NULL,'personnages',1),(88,35,4,NULL,'lieux',3),(89,35,3,NULL,'Objets',2),(90,35,1,NULL,'Le livre des ombres',5),(91,35,1,NULL,'Chapitre 1',6),(92,18,2,NULL,NULL,2),(93,18,2,NULL,'Eddie Munson',3),(94,18,4,NULL,'upside down',4),(95,18,1,NULL,'Chapitre 1 : Eveil Néant Enigmatique',6);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_style_image`
--

LOCK TABLES `saved_style_image` WRITE;
/*!40000 ALTER TABLE `saved_style_image` DISABLE KEYS */;
INSERT INTO `saved_style_image` VALUES (1,1,'Bordure + shadow rouge',1,'dashed','12px','68px','rgba(192,33,33,1)','33px 36px 37px 16px rgba(237,105,105,1)','1','22px'),(2,1,'Rond transparent bordure verte',1,'double','12px','500px','rgba(33,192,65,1)','0px 0px 37px 16px rgba(105,147,237,1)','0.35','6px'),(3,4,'image perso',1,'none','1px','500px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(4,4,'titleradius',1,'none','1px','16px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px'),(5,4,'borderradius',1,'none','1px','62px','rgba(200,200,200,1)','0px 0px 0px 0px rgba(0,0,0,0)','1','0px');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_style_page`
--

LOCK TABLES `saved_style_page` WRITE;
/*!40000 ALTER TABLE `saved_style_page` DISABLE KEYS */;
INSERT INTO `saved_style_page` VALUES (2,1,'0px','rgba(251,177,177,1)','rouge clair'),(5,1,'5px','rgba(202,238,195,1)','Vert'),(6,4,'5px','rgba(242,210,241,1)','rose 5 %'),(8,4,'5px','rgba(230,123,227,1)','rose bonbon');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_style_text`
--

LOCK TABLES `saved_style_text` WRITE;
/*!40000 ALTER TABLE `saved_style_text` DISABLE KEYS */;
INSERT INTO `saved_style_text` VALUES (10,1,'Style 2',0,'dashed','rgba(103,100,255,1)','5px','50px','15px 15px 15px 5px rgba(191,29,29,1)','rgba(250,200,200,0.57)','1.5rem','italic','700','cursive','rgba(74,144,226,1)','19px','blur(15px)','none','center'),(11,1,'Style3',0,'groove','rgba(42,90,139,1)','6px','27px','15px 15px 15px 5px rgba(188,32,32,1)','rgba(139,77,77,0.2)','1.8rem','italic','700','Cambria','rgba(199,31,31,1)','15px','blur(15px)','underline','left'),(12,1,'Style4',0,'groove','rgba(42,90,139,1)','6px','27px','15px 15px 15px 5px rgba(188,32,32,1)','rgba(139,77,77,0.2)','1.8rem','italic','700','Cambria','rgba(199,31,31,1)','15px','blur(15px)','underline','left'),(13,4,'titre 1',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.02)','2.4rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(15,4,'bordure rose',0,'solid','rgba(196,107,197,1)','5px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(16,4,'nom perso',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.04)','2rem','normal','400','cursive','rgba(223,155,239,1)','4px','blur(0px)','none','justify'),(17,4,'paraph',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.01)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(18,4,'h2 lieux',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.6rem','normal','700','cursive','rgba(213,39,39,1)','4px','blur(0px)','none','justify'),(19,4,'paraph rose',0,'none','rgba(196,107,197,1)','5px','47px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(226,175,238,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','16px','blur(0px)','none','justify'),(20,1,'titre rouge',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.03)','1.25rem','normal','700','cursive','rgba(246,23,23,1)','4px','blur(0px)','none','justify'),(21,1,'Bordure marron',0,'solid','rgba(139,87,42,1)','5px','11px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','13px','blur(0px)','none','justify'),(22,1,'titre orange',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(223,126,30,1)','4px','blur(0px)','none','justify'),(23,1,'paragraphe',2,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(24,1,'titre lieux',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.03)','1.6rem','normal','700','cursive','rgba(58,82,41,1)','4px','blur(0px)','none','justify');
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scenarios`
--

LOCK TABLES `scenarios` WRITE;
/*!40000 ALTER TABLE `scenarios` DISABLE KEYS */;
INSERT INTO `scenarios` VALUES (1,1,13,1,'Levé tôt !',2,5,'campagne','You will suffer !','2023-07-31','2023-09-16','http://localhost:4242/public/assets/images/leve_tot.jpg1695372763506.jpg','“Levé Tôt” est un jeu de rôle qui se déroule dans un monde où le temps est littéralement de l’argent. Les joueurs incarnent des “Lève-tôt”, des individus qui ont la capacité unique de se réveiller plus tôt que tout le monde, leur donnant un avantage dans ce monde compétitif.\n\nDans ce monde, chaque minute compte. Les Lève-tôt utilisent leur temps supplémentaire pour acquérir des connaissances, des compétences et des ressources, leur permettant de surpasser leurs concurrents dans divers domaines, qu’il s’agisse de commerce, de politique ou de technologie.\n\nCependant, se lever tôt a aussi ses inconvénients. Les Lève-tôt sont constamment épuisés et doivent gérer les effets secondaires de leur réveil précoce, tout en naviguant dans un monde qui ne dort jamais.\n\nLe jeu met l’accent sur la gestion du temps, la stratégie et la prise de décision sous pression. Les joueurs doivent utiliser leur temps à bon escient, planifier leurs actions et faire face aux conséquences de leurs choix.\n\n“Levé Tôt” offre une expérience de jeu unique qui explore les thèmes du temps, de la compétition et du sacrifice personnel pour le succès.',1,NULL),(3,1,13,1,'Couché tardif',3,7,'campagne','Easy','2023-04-28','2023-09-16','http://localhost:4242/public/assets/images/coucheTard.jpg1695372785840.jpg','“Couché Tardif” est la suite du jeu de rôle “Levé Tôt”. Dans ce scénario, les joueurs continuent à incarner des “Lève-tôt”, mais sont maintenant confrontés à un nouveau défi : les “Couchés Tardifs”.\n\nLes “Couchés Tardifs” sont des individus qui, au lieu de se lever tôt, restent éveillés tard dans la nuit pour profiter des heures tranquilles où le reste du monde dort. Ils utilisent ce temps pour planifier, comploter et manipuler les événements en leur faveur.\n\nDans ce monde où chaque minute compte, une nouvelle lutte de pouvoir a commencé. Les Lève-tôt doivent maintenant naviguer dans ce nouveau paysage, en affrontant les Couchés Tardifs tout en gérant leur propre épuisement.\n\nLe jeu met l’accent sur la stratégie, la diplomatie et la gestion des ressources. Les joueurs doivent utiliser leur temps à bon escient, anticiper les mouvements de leurs adversaires et faire face aux conséquences de leurs actions.\n\n“Couché Tardif” offre une expérience de jeu captivante qui explore les thèmes du temps, du pouvoir et de la stratégie dans un monde en constante évolution.',1,NULL),(4,1,7,2,'Les tréfonds du pouvoir',3,8,'campagne','Normal','2022-12-28','2023-09-21','http://localhost:4242/public/assets/images/temoignages.jpg1694549470096.jpg','Dans ce scénario, les joueurs sont plongés dans les profondeurs obscures de la politique et du pouvoir. Ils naviguent dans un monde de trahison, d’intrigue et de lutte pour le pouvoir, tout en cherchant à dévoiler les secrets cachés dans les tréfonds du pouvoir. Les décisions qu’ils prennent ont des conséquences durables, façonnant le paysage politique et déterminant qui détient le pouvoir.',1,NULL),(14,1,7,2,'Le réveil du cosmos',1,3,'campagne','Hard','2023-08-29','2999-12-29','http://localhost:4242/public/assets/images/fee1.jpg1694549517213.jpg','Après avoir acquis du pouvoir et de la connaissance dans “Les Tréfonds du Pouvoir”, les joueurs sont confrontés à une menace cosmique dans “Le Réveil du Cosmos”. Cette menace pourrait anéantir non seulement leur monde, mais l’ensemble du cosmos. Les joueurs doivent utiliser leur pouvoir et leur intelligence pour sauver le cosmos de cette menace imminente. Ils naviguent à travers l’espace, rencontrent des civilisations extraterrestres, et découvrent des secrets cosmiques qui changent leur compréhension de l’univers.',1,NULL),(15,3,17,6,'Maison bleue',1,2,'campagne','A little walk ?','2023-09-10','2023-09-17','http://localhost:4242/public/assets/images/maisonbleue.jpg1695011561379.jpg','C’est une maison bleue adossée à la colline !” Dans le monde fantastique du jeu de rôle “Colline des Mystères”, cette phrase prend un tout autre sens. La Maison Bleue est un sanctuaire mythique, un lieu de pouvoir ancien niché au cœur d’une colline verdoyante. Les joueurs, des aventuriers intrépides, sont chargés de la tâche sacrée de retrouver cette maison légendaire. Selon les anciennes prophéties, la Maison Bleue renferme un artefact puissant capable de sauver leur monde de la menace grandissante du Seigneur des Ombres. Le voyage ne sera pas facile. La colline est truffée d’énigmes complexes, de créatures magiques et de pièges mortels. Les joueurs devront faire preuve de courage, d’intelligence et de solidarité pour surmonter les défis, découvrir les secrets de la Maison Bleue et finalement, sauver leur monde. Le destin de leur univers repose entre leurs mains. Leur quête commence maintenant.',1,NULL),(16,3,17,6,'Maison rouge',3,5,'campagne','Hard','2023-09-10','2023-09-17','http://localhost:4242/public/assets/images/maisonRouge.jpg1695011650717.jpg','Après avoir résolu les mystères de la Maison Bleue, les joueurs sont conduits à la Maison Rouge. Cette demeure est encore plus effrayante, avec des couloirs qui semblent changer et des pièces qui disparaissent et réapparaissent. Les joueurs doivent naviguer dans ce labyrinthe en constante évolution, tout en faisant face à leurs peurs les plus profondes. Ils découvrent que la Maison Rouge est hantée par ses propres démons, liés à la Maison Bleue d’une manière qu’ils n’auraient jamais imaginée. Pour survivre à la Maison Rouge, ils doivent affronter ces démons et résoudre le mystère qui lie les deux maisons.',1,NULL),(17,1,13,1,'Minuit Éternel',3,4,'campagne','Normal','2023-09-11','2023-09-17','http://localhost:4242/public/assets/images/minuitEternel.jpg1694976768113.jpg','Dans “Minuit Éternel”, les Lève-tôt et les Couchés Tardifs doivent faire face à une nouvelle menace : le “Minuit Éternel”. C’est un phénomène mystérieux où le monde est plongé dans une obscurité perpétuelle, rendant le concept du temps encore plus flou.\n\nLes joueurs doivent naviguer dans ce nouvel environnement, en cherchant à comprendre la cause du Minuit Éternel et en trouvant un moyen de le renverser. Ils peuvent choisir de travailler avec les Couchés Tardifs, ou de continuer à s’opposer à eux, tout en gérant les défis uniques que présente cette obscurité constante.\n\nLe jeu met l’accent sur l’adaptation, la coopération et la résolution de problèmes dans un environnement en constante évolution. Les joueurs doivent utiliser leur intelligence, leur créativité et leurs compétences pour surmonter les défis et façonner l’avenir de leur monde.\n\n“Minuit Éternel” offre une expérience de jeu unique qui explore les thèmes du temps, de l’adaptation et de la survie dans un monde où le concept même du temps est remis en question.',1,NULL),(18,1,10,7,'Nothing else mater',3,5,'one shot','Hard','2023-09-16','2999-12-31','http://localhost:4242/public/assets/images/chanteurMetallica.jpg1695289395235.jpg','“Nothing Else Matters” est un jeu de rôle qui se déroule dans un monde post-apocalyptique où la réalité telle que nous la connaissons a été bouleversée. Les joueurs incarnent des survivants qui ont été choisis par une entité mystique connue sous le nom de “The Nothing”.\n\nDans ce monde, les lois de la physique et de la réalité sont constamment remises en question et modifiées par “The Nothing”. Les bâtiments, les paysages et même les êtres vivants peuvent changer de forme, de taille et de fonction à tout moment. Les joueurs doivent naviguer dans ce monde chaotique, cherchant à comprendre et à maîtriser les caprices de “The Nothing”.\n\nLes personnages des joueurs sont dotés d’une capacité unique : ils sont les seuls êtres dans ce monde qui restent constants et ne sont pas affectés par les changements de “The Nothing”. Cela fait d’eux des cibles pour ceux qui cherchent à contrôler ou à exploiter leur pouvoir, mais aussi des héros potentiels qui pourraient être capables de sauver ce qui reste de leur monde.\n\nLe jeu met l’accent sur l’exploration, la résolution de puzzles et l’interaction avec des personnages non-joueurs complexes. Les combats sont rares mais significatifs, avec un système de combat stratégique qui met l’accent sur l’utilisation intelligente de l’environnement changeant.\n\n“Nothing Else Matters” offre une expérience de jeu de rôle unique, pleine d’incertitude, d’émerveillement et de danger à chaque tournant. Chaque décision compte, chaque action a des conséquences, et dans ce monde instable, rien d’autre ne compte.',1,NULL),(19,4,19,8,'Les dragons de l\'apocalypse',2,6,'campagne','Normal','2023-09-15','2023-09-17','http://localhost:4242/public/assets/images/femmeChir.jpg1695016398841.jpg','Les Dragons de l’Apocalypse” est un jeu de rôle épique qui se déroule dans un monde fantastique où les dragons, autrefois considérés comme des mythes et des légendes, sont revenus pour provoquer la fin des temps.\n\nLes joueurs incarnent des héros choisis par le destin pour affronter ces bêtes terrifiantes. Chaque dragon est unique, possédant des pouvoirs et des capacités qui reflètent les divers aspects de l’apocalypse : guerre, famine, peste et mort.\n\nLe monde est riche et détaillé, avec des royaumes en guerre, des cités perdues à explorer, des dieux anciens à apaiser et une multitude de créatures fantastiques à rencontrer. Les actions et les décisions des joueurs ont un impact significatif sur le monde, avec la possibilité de faire des alliances, de résoudre des conflits et même de façonner l’avenir de l’univers.\n\nLe système de jeu met l’accent sur la narration collaborative avec un combat stratégique et excitant. Les joueurs doivent utiliser leur intelligence, leur courage et leurs compétences pour vaincre les dragons et empêcher l’apocalypse.\n\n“Les Dragons de l’Apocalypse” offre une aventure épique où chaque action compte et où le sort du monde repose entre les mains des joueurs. Dans ce jeu, vous ne jouez pas seulement pour gagner, vous jouez pour la survie de votre monde.',1,NULL),(20,4,19,8,'La révolte des chevaliers blancs',3,5,'campagne','You will suffer !','2023-09-17','2023-09-17','http://localhost:4242/public/assets/images/image2.jpg1694936059153.jpg','“La Révolte des Chevaliers Blancs” est la suite passionnante du jeu de rôle “Les Dragons de l’Apocalypse”. Après avoir vaincu les dragons et sauvé le monde de l’apocalypse, les héros sont confrontés à un nouveau défi.\n\nDans ce scénario, les Chevaliers Blancs, autrefois les gardiens de la paix et de la justice dans le royaume, se sont révoltés contre les dirigeants corrompus. Guidés par un leader charismatique et mystérieux, ils cherchent à renverser l’ordre établi et à instaurer une nouvelle ère de justice et d’égalité.\n\nLes joueurs doivent naviguer dans ce paysage politique complexe, décidant s’ils vont soutenir la révolte des Chevaliers Blancs ou s’y opposer. Le monde est encore une fois en équilibre, avec le destin du royaume entre leurs mains.\n\nLe jeu met l’accent sur l’intrigue politique, la diplomatie et le combat stratégique. Les joueurs doivent utiliser leur intelligence, leur persuasion et leurs compétences pour influencer le cours des événements et façonner l’avenir du royaume.\n\n“La Révolte des Chevaliers Blancs” offre une aventure épique où chaque décision compte et où le sort du royaume repose entre les mains des joueurs. Dans ce jeu, vous ne jouez pas seulement pour gagner, vous jouez pour la survie de votre royaume.',1,NULL),(21,4,19,8,'L’Éveil des Anciens',3,5,'campagne','Hard','2023-09-17','3000-01-01','http://localhost:4242/public/assets/images/med4-1.jpg1694936825772.jpg','Dans “L’Éveil des Anciens”, les héros, après avoir navigué à travers les tumultes de la révolte des Chevaliers Blancs, sont confrontés à une menace encore plus grande. Des créatures anciennes, endormies depuis des millénaires, se sont réveillées et menacent de détruire le royaume que les héros ont travaillé si dur pour protéger.\n\nCes Anciens, comme on les appelle, sont des êtres de pouvoir inimaginable, capables de remodeler la réalité à leur guise. Ils cherchent à reprendre le monde qui était autrefois le leur, et ils ne reculeront devant rien pour atteindre leur objectif.\n\nLes joueurs doivent s’unir pour faire face à cette nouvelle menace. Ils devront explorer des terres inconnues, découvrir des secrets oubliés et forger de nouvelles alliances pour vaincre les Anciens.\n\n“L’Éveil des Anciens” met l’accent sur l’exploration, l’aventure et le mystère. Les joueurs seront mis au défi de résoudre des énigmes complexes, de combattre des ennemis puissants et de prendre des décisions qui auront un impact durable sur le monde.\n\nDans ce jeu, chaque action a des conséquences, chaque choix compte et le sort du royaume repose entre les mains des joueurs. Dans ce monde en constante évolution, l’aventure n’attend que vous.',1,NULL),(22,1,5,9,'The virtual rainbow',1,5,'one shot','A little walk ?','2023-09-17','3000-01-01','http://localhost:4242/public/assets/images/virtualRainbow.jpg1694938277017.jpg','“The Virtual Rainbow” est un jeu de rôle qui se déroule dans un futur proche où la réalité virtuelle a évolué au-delà des limites de notre imagination. Les joueurs incarnent des “navigators”, des individus dotés de la capacité unique de naviguer dans le “Rainbow”, un réseau de réalités virtuelles interconnectées, chacune représentant une couleur différente du spectre.\n\nDans ce monde, les réalités virtuelles sont plus qu’un simple divertissement - elles sont utilisées pour tout, de l’éducation à la thérapie en passant par le gouvernement. Cependant, avec cette technologie puissante vient une nouvelle forme de criminalité. Des pirates informatiques malveillants, connus sous le nom de “Shadows”, exploitent le Rainbow pour leurs propres fins néfastes.\n\nLes joueurs sont engagés par Arcadia, une organisation mystérieuse dédiée à la protection du Rainbow. Leur mission est de traquer les Shadows, de protéger les innocents et d’assurer la sécurité du Rainbow.\n\nLe jeu met l’accent sur l’exploration des différentes réalités du Rainbow, chacune avec ses propres règles et défis uniques. Les joueurs doivent utiliser leur ingéniosité, leurs compétences et leurs ressources pour surmonter les obstacles, résoudre des énigmes et combattre les Shadows.\n\n“The Virtual Rainbow” offre une expérience de jeu immersive et dynamique où chaque décision compte et où l’aventure n’est qu’à un clic de souris.',1,NULL),(23,1,10,10,'The virtual rainbow 2',2,4,'one shot','A little walk ?','2023-09-14','2023-09-17','http://localhost:4242/public/assets/images/virtualRainbow2.jpg1695012283439.jpg','“The Virtual Rainbow” est un jeu de rôle qui se déroule dans un futur proche où la réalité virtuelle a évolué au-delà des limites de notre imagination. Les joueurs incarnent des “navigators”, des individus dotés de la capacité unique de naviguer dans le “Rainbow”, un réseau de réalités virtuelles interconnectées, chacune représentant une couleur différente du spectre.\n\nDans ce monde, les réalités virtuelles sont plus qu’un simple divertissement - elles sont utilisées pour tout, de l’éducation à la thérapie en passant par le gouvernement. Cependant, avec cette technologie puissante vient une nouvelle forme de criminalité. Des pirates informatiques malveillants, connus sous le nom de “Shadows”, exploitent le Rainbow pour leurs propres fins néfastes.\n\nLes joueurs sont engagés par Arcadia, une organisation mystérieuse dédiée à la protection du Rainbow. Leur mission est de traquer les Shadows, de protéger les innocents et d’assurer la sécurité du Rainbow.\n\nLe jeu met l’accent sur l’exploration des différentes réalités du Rainbow, chacune avec ses propres règles et défis uniques. Les joueurs doivent utiliser leur ingéniosité, leurs compétences et leurs ressources pour surmonter les obstacles, résoudre des énigmes et combattre les Shadows.\n\n“The Virtual Rainbow” offre une expérience de jeu immersive et dynamique où chaque décision compte et où l’aventure n’est qu’à un clic de souris.',1,NULL),(24,5,23,11,'Superman s\'ennuie',2,4,'one shot','Normal','2023-09-17','3000-01-01','http://localhost:4242/public/assets/images/supermanBored.jpg1694939634018.jpg','Superman s’Ennuie” est un jeu de rôle qui explore une facette rarement vue de la vie de Superman. Dans ce scénario, les joueurs incarnent des versions alternatives de Superman dans un univers où il a réussi à éradiquer le crime, à instaurer la paix mondiale et à résoudre tous les problèmes du monde. Maintenant, il s’ennuie.\n\nLes joueurs doivent aider Superman à trouver un sens à sa vie maintenant que son rôle de sauveur du monde n’est plus nécessaire. Cela pourrait impliquer de se lancer dans des quêtes d’auto-amélioration, d’explorer des passe-temps créatifs, de nouer des relations plus profondes avec les autres personnages de l’univers DC, ou même de se lancer dans des réalités alternatives pour voir comment les choses auraient pu se passer différemment.\n\nLe jeu met l’accent sur le développement du personnage, l’interaction sociale et la résolution créative de problèmes. Les combats sont rares et mettent l’accent sur l’utilisation stratégique des super-pouvoirs de Superman dans des situations non violentes.\n\n“Superman s’Ennuie” offre une perspective unique sur la vie d’un super-héros et pose des questions profondes sur le sens de la vie, le bonheur et ce que signifie vraiment être un héros.',1,NULL),(25,3,38,12,'Le chant des robots',3,5,'one shot','You will suffer !','2023-09-17','2023-09-17','http://localhost:4242/public/assets/images/robotSinging.jpg1694939913447.jpg','“Le Chant des Robots” est un jeu de rôle qui se déroule dans un futur où l’humanité a réussi à créer des robots autonomes. Ces robots ont été envoyés pour terraformer une planète lointaine, créant ce qui est maintenant connu sous le nom de “Le Champ des Robots”.\n\nLes joueurs incarnent des “Gardiens”, des humains dotés de la capacité unique de se synchroniser avec ces robots et de les contrôler à distance. Leur mission est de surveiller le Champ des Robots, de résoudre les problèmes qui surviennent et de protéger les robots contre les menaces potentielles.\n\nCependant, les choses se compliquent lorsque les Gardiens découvrent que certains robots ont commencé à développer leur propre conscience. Les joueurs doivent alors naviguer dans des questions éthiques complexes tout en essayant de maintenir la paix et l’ordre dans le Champ des Robots.\n\nLe jeu met l’accent sur l’exploration, la résolution de problèmes et la prise de décisions morales. Les joueurs doivent utiliser leur intelligence, leur empathie et leurs compétences tactiques pour gérer les défis uniques que présente cette nouvelle frontière de la technologie et de l’intelligence artificielle.\n\n“Le Champ des Robots” offre une aventure captivante qui explore les thèmes de la technologie, de l’éthique et de ce que signifie vraiment être humain.',1,NULL),(26,4,16,13,'Les robots abandonnés',5,7,'one shot','Normal','2023-09-17','3000-01-01','http://localhost:4242/public/assets/images/robotInTheRain.jpg1694940112756.jpg','“Les Robots Abandonnés” est un jeu de rôle qui se déroule dans un futur lointain où l’humanité a disparu, laissant derrière elle une civilisation de robots autonomes. Ces robots ont continué à fonctionner et à maintenir le monde tel qu’il était, en l’absence de leurs créateurs.\n\nLes joueurs incarnent ces robots, essayant de donner un sens à leur existence et à leur but dans un monde sans humains. Le jeu explore des thèmes de solitude, d’identité et de la recherche de but dans un monde post-humain.\n\nLe jeu met l’accent sur l’exploration, la découverte et la résolution de problèmes. Les joueurs doivent travailler ensemble pour surmonter les défis, résoudre les mystères laissés par les humains et peut-être même découvrir ce qui est arrivé à leurs créateurs.\n\n“Les Robots Abandonnés” offre une expérience de jeu unique qui pose des questions profondes sur l’existence, le but et ce que signifie vraiment être vivant.',1,NULL),(27,5,18,14,'La cité du futur',1,2,'one shot','Easy','2023-09-17','2023-09-17','http://localhost:4242/public/assets/images/futuristicCity.jpg1694940303435.jpg','“La Cité du Futur” est un jeu de rôle qui se déroule dans une métropole futuriste où la technologie a transformé presque tous les aspects de la vie quotidienne. Les joueurs incarnent des citoyens de cette ville, naviguant dans un monde de réalité augmentée, d’intelligence artificielle et de véhicules autonomes.\n\nCependant, malgré le vernis brillant de la technologie, la cité du futur est loin d’être un paradis. Les inégalités économiques sont à leur comble, les corporations puissantes contrôlent presque tous les aspects de la vie et la criminalité cybernétique est en hausse.\n\nLes joueurs peuvent choisir de travailler pour le système, en utilisant leurs compétences et leurs ressources pour grimper l’échelle sociale, ou ils peuvent choisir de lutter contre lui, en cherchant à démanteler les structures de pouvoir et à créer une société plus équitable.\n\nLe jeu met l’accent sur l’intrigue sociale, le développement du personnage et le combat tactique dans un environnement urbain dense. Les joueurs doivent utiliser leur intelligence, leur créativité et leurs compétences pour survivre et prospérer dans la cité du futur.\n\n“La Cité du Futur” offre une expérience de jeu immersive qui explore les thèmes de la technologie, du pouvoir et de l’inégalité dans un cadre futuriste captivant.',1,NULL),(28,1,17,15,'Back to the new future',3,5,'one shot','Hard','2023-09-17','2023-09-17','http://localhost:4242/public/assets/images/BackToTheFuture.jpg1694940494914.jpg','“Back to the New Future” est un jeu de rôle qui se déroule dans un monde où le voyage dans le temps est devenu une réalité. Les joueurs incarnent des “Chrononautes”, des individus spécialement formés pour naviguer dans le flux du temps.\n\nDans ce monde, le futur est constamment en train de changer à mesure que les gens du présent modifient le passé. Les Chrononautes sont chargés de maintenir la stabilité du temps, en corrigeant les paradoxes et en empêchant ceux qui cherchent à utiliser le voyage dans le temps à des fins néfastes.\n\nCependant, lors d’une mission, les joueurs découvrent une version future de leur propre monde qui est radicalement différente de ce qu’ils attendaient. Ils doivent alors naviguer dans ce “nouveau futur”, comprendre comment il est arrivé et, si possible, trouver un moyen de le changer pour le mieux.\n\nLe jeu met l’accent sur l’exploration du temps, la résolution de puzzles basés sur le temps et la prise de décisions qui auront des répercussions à travers l’histoire. Les joueurs doivent utiliser leur intelligence, leur créativité et leurs compétences pour naviguer dans les complexités du voyage dans le temps et façonner l’avenir de leur monde.\n\n“Back to the New Future” offre une expérience de jeu unique qui explore les thèmes du voyage dans le temps, du destin et de la responsabilité face à l’avenir.',1,NULL),(29,1,37,16,'L\'éveil des harpies',4,7,'campagne','Hard','2023-09-18','2999-12-30','http://localhost:4242/public/assets/images/eveilHarpies.jpg1695190037267.jpg','Les personnages commencent leur aventure dans la ville de Valoria, où ils sont témoins d’une attaque de harpies. Après avoir aidé à repousser l’attaque, ils sont recrutés par le roi pour enquêter sur l’origine de ces attaques. Leur enquête les mène à travers des forêts enchantées et des montagnes dangereuses, où ils rencontrent diverses créatures fantastiques et découvrent des indices sur l’origine des harpies. Le scénario se termine par une confrontation avec un groupe de harpies, menant à la découverte que leur reine, Seraphine, est sous l’emprise d’une force maléfique.',1,NULL),(30,1,37,16,'La Libération de Seraphine',4,6,'campagne','Hard','2023-09-20','3000-01-01','http://localhost:4242/public/assets/images/liberationSeraphine.jpg1695189793253.jpg','Après avoir découvert que Seraphine est manipulée par une force maléfique, les personnages doivent trouver un moyen de la libérer. Leur quête les mène à travers des ruines anciennes remplies de pièges mortels et de monstres terrifiants. En chemin, ils découvrent que la force maléfique est un sorcier puissant qui cherche à semer le chaos dans le royaume pour ses propres fins sinistres. Le scénario culmine avec une bataille épique contre le sorcier et la libération de Seraphine.',1,NULL),(31,3,3,17,'Les vipères attaquent',2,4,'campagne','You will suffer !','2023-09-17','2999-12-29','http://localhost:4242/public/assets/images/vipere2.jpg1695190739866.jpg','Les personnages reçoivent leur première mission : protéger une colonie minière importante sur une planète lointaine qui, selon les renseignements, est la prochaine cible des Vipères. Ils doivent préparer les défenses, anticiper les tactiques des Vipères et, finalement, repousser l’attaque quand elle se produit.',1,NULL),(32,3,3,17,'Le retour des vipères',2,4,'campagne','You will suffer !','2023-09-19','2999-12-31','http://localhost:4242/public/assets/images/vipere3.jpg1695190706614.jpg',' Après avoir repoussé l’attaque initiale, les personnages découvrent que c’était une diversion. Pendant qu’ils étaient occupés, les Vipères ont attaqué un autre site et volé un artefact ancien et puissant. Les personnages doivent poursuivre les Vipères à travers le système stellaire, affronter des dangers inattendus et récupérer l’artefact avant qu’il ne soit utilisé pour causer des destructions inimaginables.',1,NULL),(33,8,18,20,'Ferez vous peur aux morts vivants ?',4,6,'one shot','Hard','2023-09-20','2999-12-31','http://localhost:4242/public/assets/images/mortvivant.jpg1695299423141.jpg','Dans un monde post-apocalyptique, les morts-vivants ont envahi la terre. Les survivants humains sont rares et dispersés. Votre groupe de survivants a entendu parler d’un artefact ancien, le “Crâne de l’Effroi”, qui aurait le pouvoir de terrifier et de repousser les morts-vivants.\n\nVotre mission, si vous l’acceptez, est de retrouver cet artefact et de l’utiliser pour sauver ce qui reste de l’humanité. Vous devrez voyager à travers des villes dévastées, des forêts hantées et des souterrains infestés de morts-vivants. Sur votre chemin, vous rencontrerez d’autres survivants qui pourront vous aider ou vous nuire, et vous devrez faire face à des choix difficiles.\n\nLe sort de l’humanité repose sur vos épaules. Ferez-vous peur aux morts-vivants ? Ou succomberez-vous à la terreur qu’ils inspirent ? Le choix vous appartient. Bonne chance ! 😊',1,NULL),(34,9,11,21,'La folie des grandeurs',6,10,'one shot','Easy','2023-09-20','2999-12-31','http://localhost:4242/public/assets/images/foliegrandeur.jpg1695302673318.jpg','Dans “La Folie des Grandeurs”, les joueurs sont plongés dans un monde fantastique où la magie et la technologie coexistent. Le royaume est gouverné par un roi avide de pouvoir qui a été corrompu par la soif de grandeur. Sa folie a conduit à l’oppression du peuple et à l’instabilité du royaume.\n\nLes joueurs incarnent un groupe d’aventuriers qui ont été choisis par une prophétie ancienne pour mettre fin à la tyrannie du roi. Ils doivent naviguer à travers des paysages dangereux, résoudre des énigmes complexes, combattre des créatures terrifiantes et déjouer les plans du roi.\n\nAu fur et à mesure de leur progression, ils découvriront que la folie du roi est le résultat d’un sortilège maléfique lancé par un sorcier déchu. Pour sauver le royaume, ils devront non seulement renverser le roi, mais aussi briser le sortilège qui a causé sa folie.\n\nTout au long de leur voyage, ils seront confrontés à des choix moraux difficiles qui auront un impact significatif sur l’histoire. Leur succès dépendra de leur capacité à travailler ensemble, à utiliser leurs compétences de manière stratégique et à faire preuve de courage face à l’adversité.\n\n“La Folie des Grandeurs” est une aventure épique qui mettra à l’épreuve le courage, l’intelligence et la moralité des joueurs. Chaque décision compte et chaque action a des conséquences. Serez-vous capable de sauver le royaume de la folie du roi ?',1,NULL),(35,4,40,22,'Le livre des ombres',3,5,'campagne','Normal','2023-09-20','2999-12-30','http://localhost:4242/public/assets/images/_b01e683a-ea5e-403e-a593-49c741df4f5a.jpg1695374805250.jpg','Le livre des ombres: Barbie a appris que le livre ancien qu’elle recherche est en fait un livre des ombres, un grimoire magique qui contient des sorts puissants. Cependant, le livre est protégé par une série de sorts complexes et dangereux. Barbie doit trouver un moyen de contourner les sorts et de récupérer le livre avant que les sorciers maléfiques ne le fassent.',1,NULL),(36,4,40,22,'La forêt enchantée',2,6,'campagne','Easy','2023-09-22','3000-01-01','http://localhost:4242/public/assets/images/_60c82443-15b4-4d25-856f-cde84e7672fc.jpg1695374649302.jpg','La forêt enchantée: Barbie a entendu dire que le livre des ombres est caché quelque part dans la forêt enchantée, un lieu magique rempli de créatures fantastiques et de pièges mortels. Barbie doit naviguer à travers la forêt, éviter les pièges et vaincre les créatures pour trouver le livre.',1,NULL),(37,4,40,22,'Le château maudit',3,5,'campagne','Normal','2023-09-22','3000-01-01','http://localhost:4242/public/assets/images/_71112367-dec5-40ff-8969-a009a28e1631.jpg1695374910312.jpg','Le livre des ombres est caché dans un château maudit, un endroit hanté par des esprits maléfiques et des fantômes. Barbie doit entrer dans le château, trouver le livre et sortir avant que les esprits ne la capturent.',1,NULL);
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
INSERT INTO `scenarios_favoris` VALUES (1,1),(1,4),(1,15),(1,16),(1,18),(2,18),(15,18),(16,18),(4,22),(2,24),(15,25),(4,28),(16,33),(4,34);
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
INSERT INTO `scenarios_themes` VALUES (32,1),(35,1),(36,1),(37,1),(31,2),(3,3),(4,4),(15,4),(17,4),(1,6),(14,6),(16,6),(28,7),(27,10),(33,11),(19,12),(21,13),(26,14),(29,15),(30,15),(18,19),(20,19),(34,22),(24,23),(25,25),(22,27),(23,27);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sujet_forum`
--

LOCK TABLES `sujet_forum` WRITE;
/*!40000 ALTER TABLE `sujet_forum` DISABLE KEYS */;
INSERT INTO `sujet_forum` VALUES (1,'Des dragons dans Star Wars','2023-09-13',4,'Trouvez vous ça normal qu\'on voit un dragon dans Star Wars? Car j\'en ai vu dans un jeu et j\'ai trouvé ça n\'importe quoi car c\'est pas du tout le même univers !'),(2,'Comment tuer un Elf dans Elf et Dragons','2023-08-28',3,'Bonjour à tous, je suis nouveau dans le jeu Elf et Dragons. J\'ai rencontré un Elf dans le jeu et je ne sais pas comment le vaincre. Quelqu\'un peut-il me donner des conseils ou des stratégies pour vaincre un Elf ? Merci d\'avance.\');'),(3,'Stratégies pour le niveau final de ‘Château des Ombres','2023-09-14',3,'Bonjour à tous, je suis actuellement bloqué au niveau final du jeu ‘Château des Ombres’. J’ai du mal à vaincre le boss final, l’Ombre Suprême. J’ai essayé différentes stratégies, mais aucune ne semble fonctionner. Il a une attaque très puissante qui élimine la plupart de mes points de vie et je ne peux pas trouver un moyen d’esquiver ou de bloquer cette attaque. De plus, il semble se régénérer après un certain temps, ce qui rend le combat encore plus difficile. Quelqu’un a-t-il des conseils ou des stratégies pour ce niveau ? J’utilise actuellement un personnage de classe Guerrier avec une spécialisation en défense. Merci d’avance pour votre aide.'),(4,'Conseils pour augmenter rapidement le niveau dans ‘Quête Éternelle’','2023-09-14',2,'Salut à tous, je suis nouveau dans ‘Quête Éternelle’ et j’aimerais savoir comment je peux augmenter rapidement le niveau de mon personnage. J’ai l’impression que ça prend beaucoup de temps pour gagner de l’expérience et je me demande s’il y a des astuces ou des méthodes pour accélérer ce processus. J’ai un Mage de niveau 10 actuellement. Tous les conseils sont les bienvenus. Merci d’avance.'),(5,'Recherche d’alliés pour la mission ‘Crypte des Damnés’ dans ‘Légendes Oubliées','2023-09-14',1,'Bonjour à tous, je suis sur le point de commencer la mission ‘Crypte des Damnés’ dans ‘Légendes Oubliées’ et je cherche des alliés pour m’aider. La mission est assez difficile et je pense qu’elle serait plus facile avec une équipe. Mon personnage est un Paladin de niveau 30 avec une bonne défense et des compétences de soin. Si vous êtes intéressé, veuillez me laisser un message. Merci.'),(6,'Problèmes avec l’inventaire dans Royaume des Chasseurs','2023-09-14',4,'Salut à tous, j’ai un problème avec l’inventaire dans ‘Royaume des Chasseurs’. Il semble que je ne peux pas trier mes objets par type ou par valeur. C’est assez frustrant car j’ai beaucoup d’objets et il est difficile de trouver ce dont j’ai besoin. Quelqu’un sait-il comment résoudre ce problème ou s’il y a une mise à jour prévue pour améliorer l’inventaire ? J’apprécierais vraiment toute aide. Merci.'),(7,'Meilleures compétences pour un voleur dans \"Nuit des Voleurs\"','2023-09-14',4,'Bonjour à tous, je joue actuellement à ‘Nuit des Voleurs’ et j’ai choisi un personnage de classe Voleur. Je suis un peu perdu quant aux compétences que je devrais privilégier pour mon personnage. Il y a tellement de compétences disponibles et je ne suis pas sûr de celles qui seraient les plus utiles pour un voleur. J’aimerais avoir vos opinions et vos suggestions sur les meilleures compétences pour un voleur dans ce jeu. Quelles compétences utilisez-vous pour votre voleur ? Quelles compétences pensez-vous être indispensables pour un voleur ? Merci d’avance pour vos conseils.'),(8,'BCBG','2023-09-14',2,'Bonjour à tous ! Je sais que le sujet n\'a rien à faire là mais je tenais à vous le dire : Je déteste les BCBG... bah voilà c\'est tout, vous pouvez close le topic, je m\'en fou ! Na !');
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
) ENGINE=InnoDB AUTO_INCREMENT=286 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `text_style`
--

LOCK TABLES `text_style` WRITE;
/*!40000 ALTER TABLE `text_style` DISABLE KEYS */;
INSERT INTO `text_style` VALUES (14,16,'50%','5%','28.654390826779114%','50%',0,'none','rgba(200,200,200,1)','1px','0px','15px 15px 15px 5px rgba(202,30,201,1)','rgba(250,250,250,1)','1.25rem','normal','700','Courier New','rgba(50,81,199,1)','4px','blur(0px)','none','left'),(26,28,'30%','5%','5%','10%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(27,29,'80%','15%','15%','10%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(48,50,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(49,51,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(50,52,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(51,53,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(52,54,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(53,55,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(179,82,82,1)','4px','blur(0px)','none','justify'),(65,67,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(66,68,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(67,69,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(68,70,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(69,71,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(70,72,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(79,81,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(80,82,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(81,83,'60%','4%','1%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(82,84,'90.25241985722793%','15.60831525493057%','6%','5%',0,'groove','rgba(42,90,139,1)','6px','27px','15px 15px 15px 5px rgba(188,32,32,1)','rgba(139,77,77,0.2)','1.8rem','italic','700','Cambria','rgba(199,31,31,1)','15px','blur(15px)','underline','left'),(89,93,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(90,94,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(91,95,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(108,112,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(109,113,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(111,115,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(112,116,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(133,137,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(139,143,'89%','10%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(140,144,'75.96666259765625%','20.011575354150978%','27%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(141,145,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(142,146,'90%','15%','10%','5%',0,'groove','rgba(42,90,139,1)','6px','27px','15px 15px 15px 5px rgba(188,32,32,1)','rgba(139,77,77,0.2)','1.8rem','italic','700','Cambria','rgba(199,31,31,1)','15px','blur(15px)','underline','left'),(143,147,'90%','15%','11.079612207446514%','3.4770938792941326%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(148,153,'60.797392176529584%','4.307819152875288%','5%','10%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(149,152,'79.06666259765625%','12.206472590153815%','9.662177763789533%','8.793041722824723%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(171,175,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(172,176,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(173,177,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(174,178,'35.48812697859203%','10%','12.85140526201774%','17.61952116113967%',0,'solid','rgba(193,48,48,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(175,179,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(176,180,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(179,183,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(180,184,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(181,185,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(182,186,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(183,187,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(184,188,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(185,189,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(186,190,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(187,191,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(188,192,'90.88766298896691%','50%','47.15331879851667%','4.914744232698094%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(189,193,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(190,194,'90%','46%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(191,195,'60%','4%','3.3711041674735527%','3.8076121725873624%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(192,196,'90%','41%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(193,197,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(194,198,'90%','44%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(195,199,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(196,200,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(197,201,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(198,202,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(199,203,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(200,204,'90%','43%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(201,205,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(202,206,'90%','43%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(203,207,'60%','4%','4.645891702884318%','2.893331732584733%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(204,208,'90%','36%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(205,209,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(206,210,'90%','41%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(207,211,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(208,212,'90%','42%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(209,213,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(210,214,'90%','47%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(211,215,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(212,216,'90%','15%','9.945664652520929%','5.182212286272881%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(213,217,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(214,218,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(215,219,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(216,220,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(217,221,'60%','4%','5.126387544087194%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(218,222,'75.86666564941406%','9%','44.24757818901986%','14.266665649414062%',2,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(219,223,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(220,224,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(221,225,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(222,226,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(223,227,'61%','8%','3.3010719347980153%','19.5%',2,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.02)','2.4rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(224,228,'90%','15%','45.398874911410346%','5.315164242728184%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(225,229,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(226,230,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(227,231,'60%','4%','5%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','left'),(228,232,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(229,233,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(230,234,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(231,235,'60%','6%','2.308867824238129%','20.861804162487463%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.02)','2.4rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(232,236,'47.05438189568706%','8.27910170092133%','15.136649539333805%','40.82168380140421%',0,'solid','rgba(196,107,197,1)','5px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.02)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','7px','blur(0px)','none','justify'),(233,237,'56.38537487462388%','24.84820163004961%','25.413049255846914%','39.21686935807423%',0,'none','rgba(196,107,197,1)','5px','47px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(226,175,238,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','16px','blur(0px)','none','justify'),(234,238,'50%','5%','9.537783486888731%','40.420480190571716%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.04)','2rem','normal','400','cursive','rgba(188,101,208,1)','4px','blur(0px)','none','justify'),(235,239,'50%','5%','51.42297129695251%','39.61807296890672%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.04)','2rem','normal','400','cursive','rgba(65,117,5,1)','4px','blur(0px)','none','justify'),(236,240,'49.57093154463391%','8%','56.52573529411765%','41.92499373119358%',0,'solid','rgba(65,117,5,1)','5px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.02)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(237,241,'52.47965772316951%','18%','66.09341778880227%','40.621081995987964%',0,'none','rgba(196,107,197,1)','5px','47px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(65,117,5,0.57)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','16px','blur(0px)','none','justify'),(238,242,'60%','4%','4.222404323175053%','21.664211384152456%',3,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(240,244,'19.785575476429287%','3.412340538625088%','13.506599929128276%','9.929005767301906%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.6rem','normal','700','cursive','rgba(213,39,39,1)','4px','blur(0px)','none','justify'),(241,245,'45.1697279338014%','18.65046952515946%','21.869463146704465%','49.04635782347041%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.01)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(242,246,'45.67725050150452%','42.83969702338767%','56.7383504606662%','49.146658726178536%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.01)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(243,247,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(245,249,'50%','5%','48.162872076541454%','11.734422016048144%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.6rem','normal','700','cursive','rgba(139,87,42,1)','4px','blur(0px)','none','justify'),(247,251,'45%','5.112553153791637%','4.009789156626506%','28.88587637913741%',2,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.02)','2.4rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(248,252,'90%','15%','41.4300584691708%','5.916969658976931%',2,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(242,210,241,0.67)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(251,255,'59.738434052156464%','9.109009567682495%','4.080660878809355%','20.861804162487463%',2,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.01)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(252,256,'91.38236584754263%','63.13239723600283%','48.6589741318214%','3.810650702106319%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0.01)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(253,257,'47.58898570712137%','29.808513465627215%','19.38895287030475%','47.14064067201605%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(258,262,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(259,263,'90%','15%','10%','5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(260,264,'60%','4%','5%','20%',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.03)','1.8rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(262,266,'21.102306920762288%','34.9914943119214%','57.004488181932686%','13.239719157472418%',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.03)','1.25rem','normal','700','cursive','rgba(246,23,23,1)','4px','blur(0px)','none','justify'),(263,267,'13.698094282848544%','32.8972349214182%','62.957712845292015%','19.257773319959878%',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(223,126,30,1)','4px','blur(0px)','none','justify'),(264,268,'52%','11%','59.83935706924666%','36.06666564941406%',0,'solid','rgba(139,87,42,1)','5px','11px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','13px','blur(0px)','none','justify'),(265,269,'21.147442326980944%','36.237419187895895%','79.68343928044439%','28.58575727181545%',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(223,126,30,1)','4px','blur(0px)','none','justify'),(266,270,'31.252758274824473%','14%','76.84857039313042%','53.76666564941406%',0,'solid','rgba(139,87,42,1)','5px','11px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','13px','blur(0px)','none','justify'),(267,271,'67.95787362086259%','11%','38.36522524784339%','18.066665649414062%',2,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,0)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(268,272,'26.066665649414062%','8.201511569601017%','51.689109018219014%','15.366665649414063%',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.03)','1.25rem','normal','700','cursive','rgba(246,23,23,1)','4px','blur(0px)','none','justify'),(270,274,'46.47442326980942%','13%','54.52397790553297%','45.7%',0,'solid','rgba(139,87,42,1)','5px','11px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','13px','blur(0px)','none','justify'),(271,275,'21.676028084252764%','37.638553135450806%','72.73801050652519%','37.4%',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(223,126,30,1)','4px','blur(0px)','none','justify'),(272,276,'25.058174523570713%','17%','69.69052645266267%','61.7%',0,'solid','rgba(139,87,42,1)','5px','11px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','13px','blur(0px)','none','justify'),(273,277,'30.83149448345035%','36.83415908867548%','57.85494884812689%','13.34002006018054%',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(223,126,30,1)','4px','blur(0px)','none','justify'),(274,278,'60%','4%','5%','20%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(275,279,'24.488465396188566%','3.1348921507491365%','11.221355651812212%','11.534603811434303%',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.03)','1.6rem','normal','700','cursive','rgba(58,82,41,1)','4px','blur(0px)','none','justify'),(276,280,'39.69307923771315%','25.609732689374226%','18.237656147914265%','55.9679037111334%',0,'solid','rgba(58,82,41,1)','5px','11px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(58,82,41,1)','13px','blur(0px)','none','justify'),(277,281,'36.63991975927783%','27.83274165423181%','48.57075324217366%','10.732196589769307%',1,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.03)','1.6rem','normal','700','cursive','rgba(58,82,41,1)','4px','blur(0px)','none','justify'),(278,282,'37.48044132397192%','25%','56.50838612665275%','56.36910732196589%',0,'solid','rgba(58,82,41,1)','5px','11px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,0.02)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','13px','blur(0px)','none','justify'),(279,283,'75.2407221664995%','3.599101931046798%','5%','12.5%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','2rem','normal','700','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','center'),(280,284,'88.88465396188566%','13.017953809147432%','15.11930037186891%','6.018054162487462%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(255,255,255,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(282,286,'49.28284854563691%','12%','28.088825531330286%','45.43630892678034%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(283,287,'51.0912738214644%','15%','38.43609697002625%','45.73721163490471%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(284,288,'86.28284854563691%','17%','55.23269512736147%','8.124373119358076%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify'),(285,289,'56.28886659979939%','26%','72.38365189561094%','40.42126379137412%',0,'none','rgba(200,200,200,1)','1px','0px','0px 0px 0px 0px rgba(0,0,0,0)','rgba(250,250,250,1)','1.25rem','normal','400','cursive','rgba(0,0,0,1)','4px','blur(0px)','none','justify');
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
INSERT INTO `themes` VALUES (1,'Action / Adventure'),(2,'Adventure'),(3,'Comedy / Parody'),(4,'Contemporary'),(5,'Contemporary Fantasy'),(6,'Cyberpunk'),(7,'Espionage / Thriller'),(8,'Historical'),(9,'Historical Fantasy'),(10,'Horror'),(11,'Suspense'),(12,'Humorous'),(13,'Medieval Fantasy'),(14,'Mystery / Investigation'),(15,'Mythology / Legends'),(16,'Oriental'),(17,'Manga'),(18,'Multiverse'),(19,'Post Apocalyptic'),(20,'Romance / Drama'),(21,'Space Opera'),(22,'Steampunk'),(23,'Superheroes'),(24,'Survival / Exploration'),(25,'Time Travel'),(26,'Unclassifiable'),(27,'Science Fiction'),(28,'Western / Far West'),(29,'Wonderful / Dreamlike');
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
  `password` varchar(255) NOT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `inscription_date` date NOT NULL DEFAULT (date_format(now(),_utf8mb4'%Y-%m-%d')),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'Desouches','Jerome2','jeje','jd@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$KBUneXfkFdloT0Wzb9nJDQ$DZ3NG3yPSLkiBXoZn7BF5z7cK5EB7ZBCPv8VOoxVlxU','http://localhost:4242/public/assets/images/jejeuser1.jpg1695220051244.jpg','2023-08-15'),(2,'Violent','Denis','DeniViol','jd2@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$KBUneXfkFdloT0Wzb9nJDQ$DZ3NG3yPSLkiBXoZn7BF5z7cK5EB7ZBCPv8VOoxVlxU','http://localhost:4242/public/assets/images/denisViol.jpg1695213938012.jpg','2023-08-27'),(3,'Brakmar','Robert','Bravmite','jd3@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$KBUneXfkFdloT0Wzb9nJDQ$DZ3NG3yPSLkiBXoZn7BF5z7cK5EB7ZBCPv8VOoxVlxU','none','2023-09-01'),(4,'Duff','Eloise','Lolotte','jd4@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$KBUneXfkFdloT0Wzb9nJDQ$DZ3NG3yPSLkiBXoZn7BF5z7cK5EB7ZBCPv8VOoxVlxU','http://localhost:4242/public/assets/images/w_yqdv2.png1695930328294.png','2023-09-03'),(5,'Lefou','Avrel','Dalti4','jd5@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$KBUneXfkFdloT0Wzb9nJDQ$DZ3NG3yPSLkiBXoZn7BF5z7cK5EB7ZBCPv8VOoxVlxU','none','2023-09-07'),(9,'Jarrus','Kanan','KaJa','kanan2.jarrus2@ordrejedi.com','$argon2id$v=19$m=65536,t=5,p=1$+gzTKbO+sFoN7gColGid+g$ReM/NkozAaksT/ajQiSFTZcHOB0i4rhLya2/iBQ5jIA','none','2023-09-09'),(12,'Cal','Den','Cade','darkvador@empire.com','$argon2id$v=19$m=65536,t=5,p=1$x57NFYz2agn+CMEHDx3N+Q$f9n6JRwEWKP+qFo+LX8V5PNk+0tetxrUJaGE7LxKKY8','none','2023-09-15'),(13,'Cal','Den','Cadex','darkvador2@empire.com','$argon2id$v=19$m=65536,t=5,p=1$YN7bZT0AQ6gMsFk22+kGZQ$ECPWpdVluJ62ohqnuBXsUcyUFcv/krl5HLQloMWtjiI','none','2023-09-19'),(14,'Jarrus','Kanan','KaJa2','jd6@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$KBUneXfkFdloT0Wzb9nJDQ$DZ3NG3yPSLkiBXoZn7BF5z7cK5EB7ZBCPv8VOoxVlxU','none','2023-09-19'),(15,'Anna','Montana','Anamon','jd7@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$jToXxsq7vwIrhAS63G/rRQ$7Hut4pQf7zcS9HI4aiu2EUsTiwLX9+voWElf7zVOXDw','http://localhost:4242/public/assets/images/femme1.jpg1695135983906.jpg','2023-09-19'),(16,'Lecodeur','Abdou','The master','jd8@hotmail.fr','$argon2id$v=19$m=65536,t=5,p=1$tEwAH5/r604yETg9Ee3D4A$uEt0MUbt9u53atnnpzWRyugkQjYQETdA3lEegJba3iE','http://localhost:4242/public/assets/images/themaster.jpg1695301673968.jpg','2023-09-21');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vues_campagnes`
--

LOCK TABLES `vues_campagnes` WRITE;
/*!40000 ALTER TABLE `vues_campagnes` DISABLE KEYS */;
INSERT INTO `vues_campagnes` VALUES (6,462,1),(7,321,2),(10,50,6),(11,221,7),(12,220,8),(13,102,9),(14,81,10),(15,99,11),(16,109,12),(17,345,13),(18,48,14),(19,35,15),(20,7,22);
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vues_scenarios`
--

LOCK TABLES `vues_scenarios` WRITE;
/*!40000 ALTER TABLE `vues_scenarios` DISABLE KEYS */;
INSERT INTO `vues_scenarios` VALUES (1,744,1),(3,3,4),(4,25,14),(7,45,3),(8,33,15),(9,88,16),(10,99,17),(11,75,18),(12,106,19),(13,220,20),(14,352,21),(15,138,22),(16,79,23),(17,96,24),(18,23,25),(19,67,26),(20,164,27),(21,133,28),(22,7,35);
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

-- Dump completed on 2023-09-29 14:00:58
