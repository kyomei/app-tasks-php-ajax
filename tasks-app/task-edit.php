<?php

require_once './database.php';

//print_r($_POST);

$id = addslashes($_POST['id']);
$name = addslashes($_POST['name']);
$description = addslashes($_POST['description']);

$query = "UPDATE task SET name = '$name', description = '$description' WHERE id = '$id'";
$result = mysqli_query($connection, $query);
if(!$result) {
   die('Query Field.');
}

echo "Update Task Successfully";