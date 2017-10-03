<?php
require "functions.php";
checklogin();
if (!isset($params['first_name']) || strlen($params['first_name']) == 0) {
    error("First name is required");
}
if (isset($params["id"])) {     // lets update existing contact
    if ($result = query("update s_person set
         s_person_first_name = " .quotes($params["first_name"])."
        ,s_person_last_name = ".quotes($params["last_name"])."
        ,s_person_tel_work = ".quotes($params["tel_work"])."
        ,s_person_tel_mob = ".quotes($params["tel_mob"])."
        ,s_person_tel_home = ".quotes($params["tel_home"])."
        ,s_person_company = ".quotes($params["company"])."
        ,s_person_note = ".quotes($params["note"])."
        where s_person_id = " .$params["id"] . "
        ")) {
        success();
    }
} else {    // let's insert new contact
    if ($result = query("insert into s_person (
        s_person_first_name
       ,s_person_last_name
       ,s_person_tel_work
       ,s_person_tel_mob
       ,s_person_tel_home
       ,s_person_company
       ,s_person_note) values(
           " .quotes($params["first_name"])."
           ,".quotes($params["last_name"])."
           ,".quotes($params["tel_work"])."
           ,".quotes($params["tel_mob"])."
           ,".quotes($params["tel_home"])."
           ,".quotes($params["company"])."
           ,".quotes($params["note"])."
       )")) {
        $resp["id"] = $mysqli->insert_id;
        success();
    }
}

error('something wrong');
?>