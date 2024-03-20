$(document).ready(function (ajaxObj) {

    const url = new URL(ajaxObj.ajaxSettings.url)

    const currentPage = 'page=' + url.pathname.slice(1);

    $.ajax({
        url: "http://localhost:8000/database/controllers/displayAllTravels.php",
        method: 'GET',
        data: currentPage,
        success: function (response) {
            console.log("Данные успешно отправлены!");
            const res = JSON.parse(response);

            res.travels.forEach(function (item) {
                $('#travels').append(
                    '<tr>' +

                    '<td>' +
                    item.id +
                    '</td>' +

                    '<td>' +
                    '<a href="#" className="list-group-item list-group-item-action">' + item.courier[0].fio + '</a>' +
                    '</td>' +

                    '<td>' + item.region[0].name + '</td>' +

                    '<td>' + item.departure_date + '</td>' +

                    '</tr>',
                );
            })

            function addLi(id) {
                var listItem = $("<li class=\"page-item\">");
                var link = $("<a class=\"page-link a-link\">");
                link.text(id);
                link.attr("href", id);
                listItem.append(link);

                $('#pagination').append(listItem);
            }

            for (let i = 0; i < res.totalPage; i++) {
                addLi(i + 1);
            }

        },
        error: function (error) {
            console.error("Ошибка при отправке данных: ", error);
        },
    });
})