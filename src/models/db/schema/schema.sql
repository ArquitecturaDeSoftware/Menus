DROP TABLE IF EXISTS `menu`
CREATE TABLE IF NOT EXISTS `menu`(
	`id_menu` INT unsigned NOT NULL AUTO_INCREMENT,
	`id_lunchroom` INT unsigned NOT NULL,
  `date` VARCHAR(20),
  `soup` VARCHAR(200) collate utf8_unicode_ci,
  `appetizer` VARCHAR(200) collate utf8_unicode_ci,
  `main_course` VARCHAR(200) collate utf8_unicode_ci,
	`protein` VARCHAR(200) collate utf8_unicode_ci,
  `juice` VARCHAR(200) collate utf8_unicode_ci,
  `dessert` VARCHAR(200) collate utf8_unicode_ci,
  `salad` VARCHAR(200) collate utf8_unicode_ci,
  PRIMARY KEY( `id_menu` )
)
engine = InnoDB DEFAULT CHARACTER SET = utf8;
