<?php
include "functions.php";
if (!isset($params['userName']) || !preg_match("/^\S+$/",$params['userName'])) {
    error("UserName has wrong format");
}
if (!isset($params['userPassword']) || !preg_match("/^\S+$/",$params['userPassword'])) {
    error("Password has wrong format");
}

if ($params["userName"] == "test" && $params["userPassword"] == "098f6bcd4621d373cade4e832627b4f6") {
    $_SESSION["token"] = rand(1,99999999999);
    $resp["token"] = $_SESSION["token"];
    success();
} else {
    session_destroy();
    error('UserName or password is wrong');
}
?>