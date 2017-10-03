<?php
require "functions.php";
checklogin();
if (!isset($params['id']) || !preg_match("/^\d+$/",$params['id'])) {
    error("Contact id required");
}
if ($result = query("delete from s_person where s_person_id = ".$params["id"])) {
    $resp["id"] = $params["id"];
    success();
}

error('something wrong');
?>