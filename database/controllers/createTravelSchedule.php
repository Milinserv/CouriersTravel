<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include '../../database/config/boot.php';

try {
    if (isset($_POST['region']) && isset($_POST['travelDate']) && isset($_POST['fio'])) {

        $courierId = $_POST['fio'];
        $regionId = $_POST['region'];
        $travelDate = $_POST['travelDate'];

        $queryCourier = pdo()->prepare("SELECT count_days_way FROM regions WHERE id = :id");
        $queryCourier->bindParam(':id', $regionId);
        $queryCourier->execute();
        $travelTime = $queryCourier->fetch(PDO::FETCH_ASSOC); //время на дорогу до выбранного региона

        $querySearchTravelDate = pdo()->prepare("SELECT region_id, departure_date FROM travel_schedule WHERE courier_Id = :courierId");
        $querySearchTravelDate->bindParam(':courierId', $courierId);
        $querySearchTravelDate->execute();
        $courierAllTravel = $querySearchTravelDate->fetchAll(PDO::FETCH_ASSOC); //все даты поездок курьера

        $interval = DateInterval::createFromDateString('1 day');
        $offsetDay = (string)($travelTime['count_days_way']);

        $travelDateForModify = new DateTime($travelDate);
        $startDate = new DateTime($travelDate);

        $endDate = $travelDateForModify->modify('+' . $offsetDay . ' day'); //дата окончания поездки

        $period = new DatePeriod($startDate, $interval, $endDate); //период поездки курьера

        $isTravel = false;

        foreach ($period as $periodItem) {
            $periodItemDate = $periodItem->format('Y-m-d');
            $courierAllEndDate = array();

            foreach ($courierAllTravel as $courierTravel) {
                $queryCourier = pdo()->prepare("SELECT count_days_way FROM regions WHERE id = :id");
                $queryCourier->bindParam(':id', $courierTravel['region_id']);
                $queryCourier->execute();
                $time = $queryCourier->fetch(PDO::FETCH_ASSOC); //время на дорогу до выбранного региона в бд

                $travelDateForModifyDb = new DateTime($courierTravel['departure_date']);
                $offsetDayDb = (string) ($time['count_days_way']); //дата выезда в бд

                $startDateDb = new DateTime($courierTravel['departure_date']); //дата выезда в бд
                $endDateDb = $travelDateForModifyDb->modify('+' . $offsetDayDb . ' day'); //дата окончания поездки в бд

                $periodTravelDb = new DatePeriod($startDateDb, $interval, $endDateDb);

                foreach ($periodTravelDb as $periodItemDb) {
                    $periodItemDateDb = $periodItemDb->format('Y-m-d');

                    if ($periodItemDateDb == $periodItemDate) {
                        $isTravel = true;
                        break 3;
                    }
                }
            }
        }

        //если поездки не существует, создаем ее
        if (!$isTravel) {
            $query = pdo()->prepare("INSERT INTO `travel_schedule` (`courier_id`, `region_id`, `departure_date`) VALUES (:courierId, :regionId, :departure_date)");
            $state = $query->execute([
                'courierId' => $courierId,
                'regionId' => $regionId,
                'departure_date' => $startDate->format('Y-m-d')
            ]);

            echo json_encode(array('success' => 1, 'stateCreate' => true, 'endDate' => $endDate->format('d.m.Y')));
        } else {
            echo json_encode(array('success' => 1, 'stateCreate' => false));
        }
    } else {
        echo json_encode(array('success' => 0));
    }
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
