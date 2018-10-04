DROP TABLE IF EXISTS `menu`
CREATE TABLE IF NOT EXISTS `menu`(
	`id_menu` INT unsigned NOT NULL AUTO_INCREMENT,
	`id_comedor` INT unsigned NOT NULL,
  `fecha` VARCHAR(20),
  `sopa` VARCHAR(200) collate utf8_unicode_ci,
  `principio` VARCHAR(200) collate utf8_unicode_ci,
  `seco` VARCHAR(200) collate utf8_unicode_ci,
	`proteina` VARCHAR(200) collate utf8_unicode_ci,
  `jugo` VARCHAR(200) collate utf8_unicode_ci,
  `postre` VARCHAR(200) collate utf8_unicode_ci,
  `ensalada` VARCHAR(200) collate utf8_unicode_ci,
  PRIMARY KEY( `id_menu` )
)
engine = InnoDB DEFAULT CHARACTER SET = utf8;
