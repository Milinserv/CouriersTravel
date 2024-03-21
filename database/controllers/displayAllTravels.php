<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include '../../database/config/boot.php';

try {
    $limit = 7;
    $query = "SELECT count(*) FROM travel_schedule";

    $s = pdo()->query($query);
    $total_results = $s->fetchColumn();
    $total_pages = ceil($total_results/$limit);

    $filteredObject = array();
    $r = '';
    $res = '';

    $page = 1;

    if ($_GET['searchDate'] != '') {
        $starting_limit = ($page - 1) * $limit;
        $show  = "SELECT * FROM travel_schedule WHERE departure_date = :departure_date ORDER BY id DESC";

        $r = pdo()->prepare($show);
        $r->bindParam(':departure_date', $_GET['searchDate']);
//        $r->bindParam(':startDate', $starting_limit, PDO::PARAM_INT);
//        $r->bindParam(':endDate', $limit, PDO::PARAM_INT);
    } else {
        $page = $_GET['currentPage'] !== '' ? $_GET['currentPage'] : 1;

        $starting_limit = ($page - 1) * $limit;
        $show  = "SELECT * FROM travel_schedule ORDER BY id DESC LIMIT ?,?";

        $r = pdo()->prepare($show);
        $r->bindParam(1, $starting_limit, PDO::PARAM_INT);
        $r->bindParam(2, $limit, PDO::PARAM_INT);
    }

    $r->execute();

    $res = $r->fetchAll(PDO::FETCH_ASSOC);

    foreach ($res as $travel) {
        $courierId = $travel['courier_id'];
        $regionId = $travel['region_id'];
        $travelDate = new DateTime($travel['departure_date']);

        $queryCourier = pdo()->prepare("SELECT fio FROM couriers WHERE id = :courierId");
        $queryCourier->bindParam(':courierId', $courierId);
        $queryCourier->execute();
        $courier = $queryCourier->fetchAll(PDO::FETCH_ASSOC);

        $queryRegion = pdo()->prepare("SELECT name FROM regions WHERE id = :regionId");
        $queryRegion->bindParam(':regionId', $regionId);
        $queryRegion->execute();
        $region = $queryRegion->fetchAll(PDO::FETCH_ASSOC);

        $filteredObject[] = [
            'id' => $travel['id'],
            'courier' => $courier,
            'region' => $region,
            'departure_date' => $travelDate->format('d.m.Y')
        ];
    }

    if ($r) {
        echo json_encode(array('success' => 1, 'travels' => $filteredObject, 'totalPage' => $total_pages));
    } else {
        echo json_encode(array('success' => 0));
    }

} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}