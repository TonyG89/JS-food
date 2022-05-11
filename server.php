<?php
$_POST=json_decode(file_get_contents('php://input',true)); // получить php данные json и работать с ними
echo var_dump($_POST);