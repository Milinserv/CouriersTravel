$(document).ready(function() {
    $('#sendTravel').submit(function(event) {
        event.preventDefault();

        //данные для создания поездки
        const data = {
            region: $("#region").val(),
            travelDate: $("#travelDate").val(),
            fio: $("#fio").val(),
        };

        $.ajax({
            url: "http://localhost:8000/database/controllers/createTravelSchedule.php",
            type: "post",
            data: data,
            success: function (response) {
                const res = JSON.parse(response);

                if (res.stateCreate === true) {
                    $('#info').val('Курьер прибудет ' + res.endDate).css({
                        'color':'green',
                    });
                } else {
                    $('#info').val('Курьер занят в это время').css({
                        'color':'red',
                    });
                }
            },
            error: function (error) {
                console.error("Ошибка при отправке данных: ", error);
            },
        });
        return false;
    });
});