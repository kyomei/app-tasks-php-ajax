<?php

require_once './database.php';

if(isset($_POST['id'])) {
   $id = addslashes($_POST['id']);
   $query = "DELETE FROM task WHERE id = $id";
   $result = mysqli_query($connection, $query);
   
   if(!$result) {
      die('Query Failed.');
   }
   echo "Task Deleted Successfully";
}