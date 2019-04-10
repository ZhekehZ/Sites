<?php
  $lines = file('config');
  $props = array(0=>1);
  foreach($lines as $p) {
	  $prop = preg_split("/[:\s]/", $p);
	  $props[$prop[0]] = $prop[1].'';
  }

  $DEBUG = false;

  $db = mysql_connect($props[server], $props[user], $props[password]);
  if ($db) {
    if ($DEBUG)
      echo 'Соединение установлено.';
  } else die('Ошибка подключения к серверу баз данных.');

  $selected = mysql_select_db($props[database], $db);
  if ($selected) {
    if ($DEBUG)
      echo '<br>Подключение к базе данных успешно.';
  }else die('<br>База данных не найдена или отсутствует доступ.');

  mysql_query("SET NAMES 'utf-8'");
  mysql_query("SET CHARACTER SET 'utf-8'");

  $create = mysql_query("CREATE TABLE IF NOT EXISTS `phonebook` (
    `number` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL DEFAULT '',
    `surname` varchar(255) NOT NULL DEFAULT '',
    `group` varchar(255) NOT NULL DEFAULT '',
    PRIMARY KEY (`number`)
  ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;");

  if ($create) {
    if ($DEBUG)
      echo "<p>Таблица найдена или создана.</p>";
  } else die("<br>Ошибка при создании таблицы.");
 ?>
