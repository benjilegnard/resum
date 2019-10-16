
-- -----------------------------------------------------
-- Schema jibhaine_resum
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `jibhaine_resum` ;

-- -----------------------------------------------------
-- Schema jibhaine_resum
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `jibhaine_resum` DEFAULT CHARACTER SET utf8 ;
USE `jibhaine_resum` ;

-- -----------------------------------------------------
-- Table `jibhaine_resum`.`job`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jibhaine_resum`.`job` ;

CREATE TABLE IF NOT EXISTS `jibhaine_resum`.`job` (
  `id_job` INT NOT NULL,
  `start_date` TIMESTAMP NULL,
  `end_date` TIMESTAMP NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id_job`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `jibhaine_resum`.`project`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jibhaine_resum`.`project` ;

CREATE TABLE IF NOT EXISTS `jibhaine_resum`.`project` (
  `id_project` INT NOT NULL,
  `name` VARCHAR(256) NOT NULL,
  `start_date` TIMESTAMP NULL,
  `end_date` TIMESTAMP NULL,
  `job_id_job` INT NOT NULL,
  PRIMARY KEY (`id_project`),
  CONSTRAINT `fk_project_job`
    FOREIGN KEY (`job_id_job`)
    REFERENCES `jibhaine_resum`.`job` (`id_job`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_project_job_idx` ON `jibhaine_resum`.`project` (`job_id_job` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `jibhaine_resum`.`step`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jibhaine_resum`.`step` ;

CREATE TABLE IF NOT EXISTS `jibhaine_resum`.`step` (
  `id_step` INT NOT NULL,
  `description` VARCHAR(45) NULL,
  `order` INT NULL,
  `project_id_project` INT NOT NULL,
  PRIMARY KEY (`id_step`),
  CONSTRAINT `fk_step_project1`
    FOREIGN KEY (`project_id_project`)
    REFERENCES `jibhaine_resum`.`project` (`id_project`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_step_project1_idx` ON `jibhaine_resum`.`step` (`project_id_project` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `jibhaine_resum`.`skill`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jibhaine_resum`.`skill` ;

CREATE TABLE IF NOT EXISTS `jibhaine_resum`.`skill` (
  `id_skill` INT NOT NULL,
  `tag` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_skill`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `tag_UNIQUE` ON `jibhaine_resum`.`skill` (`tag` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `jibhaine_resum`.`project_skill`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jibhaine_resum`.`project_skill` ;

CREATE TABLE IF NOT EXISTS `jibhaine_resum`.`project_skill` (
  `project_id_project` INT NOT NULL,
  `skill_id_skill` INT NOT NULL,
  CONSTRAINT `fk_project_skill_project1`
    FOREIGN KEY (`project_id_project`)
    REFERENCES `jibhaine_resum`.`project` (`id_project`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_project_skill_skill1`
    FOREIGN KEY (`skill_id_skill`)
    REFERENCES `jibhaine_resum`.`skill` (`id_skill`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_project_skill_project1_idx` ON `jibhaine_resum`.`project_skill` (`project_id_project` ASC) VISIBLE;

CREATE INDEX `fk_project_skill_skill1_idx` ON `jibhaine_resum`.`project_skill` (`skill_id_skill` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
