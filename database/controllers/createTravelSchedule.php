<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if (isset($_POST['region']) && isset($_POST['livingDate']) && isset($_POST['fio'])) {

    echo json_encode(array('success' => 1));

} else {

    echo json_encode(array('success' => 0));

}
