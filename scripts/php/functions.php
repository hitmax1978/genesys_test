<?php
header("Content-Type: text/html; charset=utf-8");
session_start();
global $params;
global $resp;
$resp = array();

function error($err = "") {
    global $resp;
	
    $resp['success'] = false;
    $resp['error_text'] = htmlspecialchars($err,ENT_QUOTES,"utf-8");
    header($_SERVER["SERVER_PROTOCOL"]." 200 OK");
    echo(json_encode2($resp));
    die();    
}

function success() {
    global $resp;
    $resp['success'] = true;
    header($_SERVER["SERVER_PROTOCOL"]." 200 OK");
    echo(json_encode2($resp));
    die();    
}

function comment($txt) {
    global $resp;    
    if (isset($resp['comment']))
        $resp['comment'] = $resp['comment'].", ".htmlspecialchars($txt,ENT_QUOTES,"utf-8");
    else
        $resp['comment'] = htmlspecialchars($txt,ENT_QUOTES,"utf-8");
}

function json_encode2($data) {
        switch ($type = gettype($data)) {
            case 'NULL':
                return 'null';
            case 'boolean':
                return ($data ? 'true' : 'false');
            case 'integer':
            case 'double':
            case 'float':
                return $data;
            case 'string':
                return '"' . str_replace("\"","\\\"",$data) . '"';
            case 'object':
                $data = get_object_vars($data);
            case 'array':
                $output_index_count = 0;
                $output_indexed = array();
                $output_associative = array();
                foreach ($data as $key => $value) {
                    $output_indexed[] = json_encode2($value);
                    $output_associative[] = json_encode2($key) . ':' . json_encode2($value);
                    if ($output_index_count !== NULL && $output_index_count++ !== $key) {
                        $output_index_count = NULL;
                    }
                }
                if ($output_index_count !== NULL) {
                    return '[' . implode(',', $output_indexed) . ']';
                } else {
                    return '{' . implode(',', $output_associative) . '}';
                }
            default:
                return ''; // Not supported
        }
}

function connect()
{
	global $mysqli;
	if (!$mysqli = new mysqli("localhost", "m_test", "m_test", "miratech_test")) {
	    die("Can't connect to database");
        }
        $mysqli->query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
}

function query($query_string, $to_show_sql = 0)
{
  global $mysqli;
  if (!$mysqli)
    connect();
  if ($to_show_sql)
  	echo($query_string."<br/>");

  try {
    $result = $mysqli->query($query_string);
  }
  catch (Exception $e) {
    $result = false;
  }
  return $result;
}

function quotes($str,$make_side_quotes=1)
{
  $tmp="";
  $i=0;
  $tmp = trim(str_replace("'","''",$str));
  if ($make_side_quotes == 0)
    return $tmp;
  else
    return "'".$tmp."'";
}

function checklogin() {
    global $params, $resp;
    if (!isset($_SESSION["token"]) || !isset($params["token"]) || $_SESSION["token"] != $params["token"]) {
        error('need_to_login');
    }
}




foreach($_POST as $name=>$value) {
    $params[urldecode($name)] = urldecode($value);
}

$out = "token=". $_SESSION["token"]."\n";
$out .=  print_r($params,true);
file_put_contents("lastRequest.txt",$out);
?>