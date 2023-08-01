-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema scripterBdd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema scripterBdd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `scripterBdd` DEFAULT CHARACTER SET utf8 ;
USE `scripterBdd` ;

-- -----------------------------------------------------
-- Table `scripterBdd`.`utilisateurs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`utilisateurs` (
  `id` INT NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `firstname` VARCHAR(100) NOT NULL,
  `login` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `img` VARCHAR(1000) NULL,
  `inscription_date` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`auteurs`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`auteurs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `utilisateurs_id` INT NOT NULL,
  PRIMARY KEY (`id`, `utilisateurs_id`),
  INDEX `fk_auteurs_utilisateurs1_idx` (`utilisateurs_id` ASC) VISIBLE,
  CONSTRAINT `fk_auteurs_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `scripterBdd`.`utilisateurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`jeux_de_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`jeux_de_role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`campagnes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`campagnes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `auteurs_id` INT NOT NULL,
  `jeux_de_role_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `img` VARCHAR(1000) NOT NULL,
  `synopsis` TEXT NOT NULL,
  `nb_player_min` INT NOT NULL,
  `nb_player_max` INT NOT NULL,
  `level` VARCHAR(45) NOT NULL,
  `start_writing_date` DATE NOT NULL,
  `publication_date` DATE NOT NULL,
  PRIMARY KEY (`id`, `auteurs_id`, `jeux_de_role_id`),
  INDEX `fk_campagnes_auteurs1_idx` (`auteurs_id` ASC) VISIBLE,
  INDEX `fk_campagnes_jeux_de_role1_idx` (`jeux_de_role_id` ASC) VISIBLE,
  CONSTRAINT `fk_campagnes_auteurs1`
    FOREIGN KEY (`auteurs_id`)
    REFERENCES `scripterBdd`.`auteurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_campagnes_jeux_de_role1`
    FOREIGN KEY (`jeux_de_role_id`)
    REFERENCES `scripterBdd`.`jeux_de_role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`scenarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`scenarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `auteurs_id` INT NOT NULL,
  `jeux_de_role_id` INT NOT NULL,
  `campagnes_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `nb_player_min` INT NOT NULL,
  `nb_player_max` INT NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `level` VARCHAR(50) NOT NULL,
  `start_writing_date` DATE NOT NULL,
  `publication_date` DATE NOT NULL,
  `img` VARCHAR(1000) NOT NULL,
  `description` TEXT NOT NULL,
  `model` INT NOT NULL,
  `pdf` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`, `auteurs_id`, `jeux_de_role_id`, `campagnes_id`),
  INDEX `fk_scenarios_jeux_de_role1_idx` (`jeux_de_role_id` ASC) VISIBLE,
  INDEX `fk_scenarios_auteurs1_idx` (`auteurs_id` ASC) VISIBLE,
  INDEX `fk_scenarios_campagnes1_idx` (`campagnes_id` ASC) VISIBLE,
  CONSTRAINT `fk_scenarios_jeux_de_role1`
    FOREIGN KEY (`jeux_de_role_id`)
    REFERENCES `scripterBdd`.`jeux_de_role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scenarios_auteurs1`
    FOREIGN KEY (`auteurs_id`)
    REFERENCES `scripterBdd`.`auteurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scenarios_campagnes1`
    FOREIGN KEY (`campagnes_id`)
    REFERENCES `scripterBdd`.`campagnes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`themes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`themes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`page_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`page_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `categorie` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`scenarios_themes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`scenarios_themes` (
  `scenarios_id` INT NOT NULL,
  `themes_id` INT NOT NULL,
  PRIMARY KEY (`scenarios_id`, `themes_id`),
  INDEX `fk_scenarios_has_themes_themes1_idx` (`themes_id` ASC) VISIBLE,
  INDEX `fk_scenarios_has_themes_scenarios1_idx` (`scenarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_scenarios_has_themes_scenarios1`
    FOREIGN KEY (`scenarios_id`)
    REFERENCES `scripterBdd`.`scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_scenarios_has_themes_themes1`
    FOREIGN KEY (`themes_id`)
    REFERENCES `scripterBdd`.`themes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`pages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`pages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `scenarios_id` INT NOT NULL,
  `page_types_id` INT NOT NULL,
  `img` VARCHAR(1000) NULL,
  `titre` VARCHAR(255) NULL,
  `number` INT NULL,
  PRIMARY KEY (`id`, `scenarios_id`, `page_types_id`),
  INDEX `fk_pages_page_types1_idx` (`page_types_id` ASC) VISIBLE,
  INDEX `fk_pages_scenarios1_idx` (`scenarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_pages_page_types1`
    FOREIGN KEY (`page_types_id`)
    REFERENCES `scripterBdd`.`page_types` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pages_scenarios1`
    FOREIGN KEY (`scenarios_id`)
    REFERENCES `scripterBdd`.`scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`page_textes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`page_textes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` TEXT NULL,
  `pages_id` INT NOT NULL,
  PRIMARY KEY (`id`, `pages_id`),
  INDEX `fk_textes_pages1_idx` (`pages_id` ASC) VISIBLE,
  CONSTRAINT `fk_textes_pages1`
    FOREIGN KEY (`pages_id`)
    REFERENCES `scripterBdd`.`pages` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`page_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`page_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pages_id` INT NOT NULL,
  `img_src` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`id`, `pages_id`),
  INDEX `fk_page_images_pages1_idx` (`pages_id` ASC) VISIBLE,
  CONSTRAINT `fk_page_images_pages1`
    FOREIGN KEY (`pages_id`)
    REFERENCES `scripterBdd`.`pages` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`text_style`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`text_style` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `page_textes_id` INT NOT NULL,
  `width` VARCHAR(45) NOT NULL,
  `height` VARCHAR(45) NOT NULL,
  `top` VARCHAR(45) NOT NULL,
  `left` VARCHAR(45) NOT NULL,
  `z_index` INT NULL,
  `border_style` VARCHAR(45) NULL,
  `border_color` VARCHAR(45) NULL,
  `border_width` VARCHAR(45) NULL,
  `border_radius` VARCHAR(45) NULL,
  `box_shadow` VARCHAR(100) NULL,
  `background_color` VARCHAR(45) NULL,
  `font_size` VARCHAR(45) NULL,
  `font_style` VARCHAR(45) NULL,
  `font_weight` VARCHAR(45) NULL,
  `font_family` VARCHAR(255) NULL,
  `color` VARCHAR(45) NULL,
  `padding` VARCHAR(45) NULL,
  `back_drop_filter` VARCHAR(45) NULL,
  `webkit_backdrop_filter` VARCHAR(45) NULL,
  `text_align` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `page_textes_id`),
  INDEX `fk_textStyle_pageTextes1_idx` (`page_textes_id` ASC) VISIBLE,
  CONSTRAINT `fk_textStyle_pageTextes1`
    FOREIGN KEY (`page_textes_id`)
    REFERENCES `scripterBdd`.`page_textes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`image_style`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`image_style` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `page_images_id` INT NOT NULL,
  `width` VARCHAR(45) NOT NULL,
  `height` VARCHAR(45) NOT NULL,
  `top` VARCHAR(45) NOT NULL,
  `left` VARCHAR(45) NOT NULL,
  `z-index` INT NULL,
  `border_style` VARCHAR(45) NULL,
  `border_width` VARCHAR(45) NULL,
  `border_radius` VARCHAR(45) NULL,
  `border_color` VARCHAR(45) NULL,
  `box_shadow` VARCHAR(45) NULL,
  `opacity` VARCHAR(45) NULL,
  `padding` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `page_images_id`),
  INDEX `fk_imageStyle_pageImages1_idx` (`page_images_id` ASC) VISIBLE,
  CONSTRAINT `fk_imageStyle_pageImages1`
    FOREIGN KEY (`page_images_id`)
    REFERENCES `scripterBdd`.`page_images` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`page_style`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`page_style` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pages_id` INT NOT NULL,
  `padding` VARCHAR(45) NULL,
  `background_color` VARCHAR(155) NULL,
  PRIMARY KEY (`id`, `pages_id`),
  INDEX `fk_page_style_pages1_idx` (`pages_id` ASC) VISIBLE,
  CONSTRAINT `fk_page_style_pages1`
    FOREIGN KEY (`pages_id`)
    REFERENCES `scripterBdd`.`pages` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`saved_style_text`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`saved_style_text` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `scenarios_id` INT NOT NULL,
  `width` VARCHAR(45) NOT NULL,
  `height` VARCHAR(45) NOT NULL,
  `top` VARCHAR(45) NOT NULL,
  `left` VARCHAR(45) NOT NULL,
  `z_index` INT NULL,
  `border_style` VARCHAR(45) NULL,
  `border_color` VARCHAR(45) NULL,
  `border_width` VARCHAR(45) NULL,
  `border_radius` VARCHAR(45) NULL,
  `box_shadow` VARCHAR(100) NULL,
  `background_color` VARCHAR(45) NULL,
  `font_size` VARCHAR(45) NULL,
  `font_style` VARCHAR(45) NULL,
  `font_weight` VARCHAR(45) NULL,
  `font_family` VARCHAR(255) NULL,
  `color` VARCHAR(45) NULL,
  `padding` VARCHAR(45) NULL,
  `backdrop_filter` VARCHAR(45) NULL,
  `webkit_backdrop_filter` VARCHAR(45) NULL,
  `text_align` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `scenarios_id`),
  INDEX `fk_saved_style_text_scenarios1_idx` (`scenarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_saved_style_text_scenarios1`
    FOREIGN KEY (`scenarios_id`)
    REFERENCES `scripterBdd`.`scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`saved_style_image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`saved_style_image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `scenarios_id` INT NOT NULL,
  `width` VARCHAR(45) NOT NULL,
  `height` VARCHAR(45) NOT NULL,
  `top` VARCHAR(45) NOT NULL,
  `left` VARCHAR(45) NOT NULL,
  `z_index` INT NULL,
  `border_style` VARCHAR(45) NULL,
  `border_width` VARCHAR(45) NULL,
  `border_radius` VARCHAR(45) NULL,
  `border_color` VARCHAR(45) NULL,
  `box_shadow` VARCHAR(45) NULL,
  `opacity` VARCHAR(45) NULL,
  `padding` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `scenarios_id`),
  INDEX `fk_saved_style_image_scenarios1_idx` (`scenarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_saved_style_image_scenarios1`
    FOREIGN KEY (`scenarios_id`)
    REFERENCES `scripterBdd`.`scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`saved_style_page`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`saved_style_page` (
  `id` INT NOT NULL,
  `scenarios_id` INT NOT NULL,
  `padding` VARCHAR(45) NULL,
  `background_color` VARCHAR(155) NULL,
  PRIMARY KEY (`id`, `scenarios_id`),
  INDEX `fk_saved_style_page_scenarios1_idx` (`scenarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_saved_style_page_scenarios1`
    FOREIGN KEY (`scenarios_id`)
    REFERENCES `scripterBdd`.`scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`auteurs_favoris`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`auteurs_favoris` (
  `utilisateurs_id` INT NOT NULL,
  `auteurs_id` INT NOT NULL,
  PRIMARY KEY (`utilisateurs_id`, `auteurs_id`),
  INDEX `fk_utilisateurs_has_auteurs_auteurs1_idx` (`auteurs_id` ASC) VISIBLE,
  INDEX `fk_utilisateurs_has_auteurs_utilisateurs1_idx` (`utilisateurs_id` ASC) VISIBLE,
  CONSTRAINT `fk_utilisateurs_has_auteurs_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `scripterBdd`.`utilisateurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_utilisateurs_has_auteurs_auteurs1`
    FOREIGN KEY (`auteurs_id`)
    REFERENCES `scripterBdd`.`auteurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`scenarios_favoris`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`scenarios_favoris` (
  `utilisateurs_id` INT NOT NULL,
  `scenarios_id` INT NOT NULL,
  PRIMARY KEY (`utilisateurs_id`, `scenarios_id`),
  INDEX `fk_utilisateurs_has_scenarios_scenarios1_idx` (`scenarios_id` ASC) VISIBLE,
  INDEX `fk_utilisateurs_has_scenarios_utilisateurs1_idx` (`utilisateurs_id` ASC) VISIBLE,
  CONSTRAINT `fk_utilisateurs_has_scenarios_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `scripterBdd`.`utilisateurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_utilisateurs_has_scenarios_scenarios1`
    FOREIGN KEY (`scenarios_id`)
    REFERENCES `scripterBdd`.`scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`avis_scenario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`avis_scenario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `commentaire` TEXT NOT NULL,
  `date` DATE NOT NULL,
  `scenarios_id` INT NOT NULL,
  `utilisateurs_id` INT NOT NULL,
  PRIMARY KEY (`id`, `scenarios_id`, `utilisateurs_id`),
  INDEX `fk_avisScenario_scenarios1_idx` (`scenarios_id` ASC) VISIBLE,
  INDEX `fk_avisScenario_utilisateurs1_idx` (`utilisateurs_id` ASC) VISIBLE,
  CONSTRAINT `fk_avisScenario_scenarios1`
    FOREIGN KEY (`scenarios_id`)
    REFERENCES `scripterBdd`.`scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_avisScenario_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `scripterBdd`.`utilisateurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`sujet_forum`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`sujet_forum` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sujet` VARCHAR(255) NOT NULL,
  `open_date` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`commentaires_forum`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`commentaires_forum` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `commentaire` TEXT NOT NULL,
  `sujet_forum_id` INT NOT NULL,
  `utilisateurs_id` INT NOT NULL,
  `date_time` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`, `sujet_forum_id`, `utilisateurs_id`),
  INDEX `fk_commentairesForum_sujetForum1_idx` (`sujet_forum_id` ASC) VISIBLE,
  INDEX `fk_commentairesForum_utilisateurs1_idx` (`utilisateurs_id` ASC) VISIBLE,
  CONSTRAINT `fk_commentairesForum_sujetForum1`
    FOREIGN KEY (`sujet_forum_id`)
    REFERENCES `scripterBdd`.`sujet_forum` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_commentairesForum_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `scripterBdd`.`utilisateurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`mode_creation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`mode_creation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `commentaire` TEXT NOT NULL,
  `scenarios_id` INT NOT NULL,
  `utilisateurs_id` INT NOT NULL,
  `date_time` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`, `scenarios_id`, `utilisateurs_id`),
  INDEX `fk_chatModeCreation_scenarios1_idx` (`scenarios_id` ASC) VISIBLE,
  INDEX `fk_chatModeCreation_utilisateurs1_idx` (`utilisateurs_id` ASC) VISIBLE,
  CONSTRAINT `fk_chatModeCreation_scenarios1`
    FOREIGN KEY (`scenarios_id`)
    REFERENCES `scripterBdd`.`scenarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_chatModeCreation_utilisateurs1`
    FOREIGN KEY (`utilisateurs_id`)
    REFERENCES `scripterBdd`.`utilisateurs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `scripterBdd`.`campagnes_themes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `scripterBdd`.`campagnes_themes` (
  `campagnes_id` INT NOT NULL,
  `themes_id` INT NOT NULL,
  PRIMARY KEY (`campagnes_id`, `themes_id`),
  INDEX `fk_campagnes_has_themes_themes1_idx` (`themes_id` ASC) VISIBLE,
  INDEX `fk_campagnes_has_themes_campagnes1_idx` (`campagnes_id` ASC) VISIBLE,
  CONSTRAINT `fk_campagnes_has_themes_campagnes1`
    FOREIGN KEY (`campagnes_id`)
    REFERENCES `scripterBdd`.`campagnes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_campagnes_has_themes_themes1`
    FOREIGN KEY (`themes_id`)
    REFERENCES `scripterBdd`.`themes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
