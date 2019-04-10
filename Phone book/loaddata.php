<?php
  include "db.php";

  class PBrecord {
    public $name = "";
    public $surname = "";
    public $number = "0-000-000-00-00";
    public $group = "";
    public $id = 0;

    public function __construct($nm, $snm, $num, $gr, $id) {
      $this->name = $nm;
      $this->surname = $snm;
      $this->number = $num;
      $this->group = $gr;
      $this->id = $id;
    }
  }

  $data = array();

  if ($_POST['action']=='add') {
    $insert = mysql_query("INSERT INTO `phonebook`(`number`, `name`, `surname`, `group`) VALUES ("
                . "'" . $_POST['phone'] . "' ,"
                . "'" . $_POST['name'] . "' ,"
                . "'" . $_POST['surname'] . "' ,"
                . "'" . $_POST['group'] . "' )");
    if (!$insert) {
      die("insert error!");
    };
  } elseif ($_POST['action']=='remove') {
    $delete = mysql_query("DELETE FROM `phonebook` WHERE `number`= '" . $_POST['phone'] . "'");
    if (!$delete) {
      die("delete error!");
    };
  } elseif ($_POST['action']=='modify') {
    $modify = mysql_query("UPDATE `phonebook` SET `number`="
                . "'" . $_POST['phone'] . "' , `name`="
                . "'" . $_POST['name'] . "' , `surname`="
                . "'" . $_POST['surname'] . "' , `group`="
                . "'" . $_POST['group'] . "' WHERE `number`="
                . "'" . $_POST['oldphone'] . "'");
    if (!$modify) {
      die($_POST['action'] . " error!");
    };
  }

  $rawdata = mysql_query("SELECT * FROM `phonebook`");
  if ($rawdata) {
    $id = 0;
    while ($row = mysql_fetch_assoc($rawdata)) {
        array_push($data, new PBrecord($row["name"],
                    $row["surname"],
                    $row["number"],
                    $row["group"],
                    $id));
        $id += 1;
    }
  } else die("ERROR!!");

  function comparator($a, $b) {
    $a1 = $a->name . $a->surname . $a->number;
    $b1 = $b->name . $b->surname . $b->number;
    return strcmp($a1, $b1);
  }

  usort($data, "comparator");

  echo "<thead><tr style='border-bottom: 3px double gray;'>
          <td id='mencol0' class='colname'>№</td>
          <td id='mencol1' class='colname'>Имя</td>
          <td id='mencol2' class='colname'>Фамилия</td>
          <td id='mencol3' class='colname'>Номер</td>
          <td id='mencol4' class='colname'>Категория</td>
        </tr></thead><tbody>";

  foreach ($data as $line) {
      echo "<tr class='simple-row'"
        . "id='" . $line->id . "' "
        . "onclick='phoneBookRowOnClick(this)'"
        . "onmouseout='phoneBookMouseOut(this)'"
        . "onmouseover='phoneBookMouseOver(this)'"
        . ">\n";
      echo "<td> 0 </td>\n";
      echo "<td> $line->name</td>\n";
      echo "<td> $line->surname</td>\n";
      echo "<td> $line->number</td>\n";
      echo "<td> $line->group</td>\n";
      echo "</tr>";

  };
  echo "</tbody>";
 ?>
