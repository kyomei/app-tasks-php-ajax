<?php

require_once './database.php';

if(isset($_POST['name'])) {
   $name = addslashes($_POST['name']);
   $description = addslashes($_POST['description']);
   $query = "INSERT INTO task (name, description) VALUES ('$name', '$description')";
   $result = mysqli_query($connection, $query);
   if(!$result) {
      die('Query Failed.');
   }
   
   echo "Task Added Successfully";
}
