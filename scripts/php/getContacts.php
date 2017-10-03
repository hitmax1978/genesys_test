<?php
require "functions.php";
checklogin();
$resp["contacts"] = Array();
if ($result = query("select * from s_person order by s_person_last_name, s_person_first_name")) {
    while ($row = $result->fetch_object()) {
        $ai                 = Array();
        $ai["id"]           = $row->s_person_id;
        $ai["first_name"]   = $row->s_person_first_name;
        $ai["last_name"]    = $row->s_person_last_name;
        $ai["tel_work"]     = $row->s_person_tel_work;
        $ai["tel_mob"]      = $row->s_person_tel_mob;
        $ai["tel_home"]     = $row->s_person_tel_home;
        $ai["company"]      = $row->s_person_company;
        $ai["note"]         = $row->s_person_note;
        $resp["contacts"][] = $ai;
    }
    success();
}
error('something wrong');
?>