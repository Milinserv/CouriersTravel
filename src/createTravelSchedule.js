$(document).ready(function() {
    $('#sendTravel').submit(function(event) {
        event.preventDefault();

        const data = {
            region: $("#region").val(),
            livingDate: $("#livingDate").val(),
            fio: $("#fio").val(),
        };

        $.ajax({
            url: "http://localhost:8000/database/controllers/createTravelSchedule.php",
            type: "post",
            data: data,
            success: function (response) {
                console.log("Данные успешно отправлены!", response);
            },
            error: function (error) {
                console.error("Ошибка при отправке данных: ", error);
            },
        });
        return false;
    });
});