$(document).ready(function (ajaxObj) {

    const url = new URL(ajaxObj.ajaxSettings.url)
    const currentPage = url.pathname.slice(1);

    let searchDate = '';
    let isSearch = false;

    function loadData() {
        $.ajax({
            url: "http://localhost:8000/database/controllers/displayAllTravels.php",
            method: 'GET',
            data: {
                'currentPage': currentPage,
                'searchDate': searchDate
            },
            success: function (response) {
                const res = JSON.parse(response);

                const tbody = $('<tbody></tbody>')
                const pag = $('<ul></ul>')

                $('#travelsBody').remove();
                $('#pagination').remove();

                $('#travels').append(tbody);
                $('#headPag').append(pag);

                tbody.attr('id', 'travelsBody');
                pag.attr('id', 'pagination').addClass('pagination');

                res.travels.forEach(function (item) {
                    $('#travelsBody').append(
                        '<tr>' +

                        '<td>' + item.id + '</td>' +

                        '<td>' + item.courier[0].fio + '</td>' +

                        '<td>' + item.region[0].name + '</td>' +

                        '<td>' + item.departure_date + '</td>' +

                        '</tr>',
                    );
                })

                function addLi(id) {
                    const page = id;

                    var listItem = $("<li class=\"page-item\">");
                    var link = $("<a class=\"page-link a-link\">");
                    link.text(id);
                    link.attr("href", page);
                    listItem.append(link);

                    $('#pagination').append(listItem);
                }

                for (let i = 0; i < res.totalPage; i++) {
                    addLi(i + 1);
                    // }
                }

            },
            error: function (error) {
                console.error("Ошибка при отправке данных: ", error);
            },
        });
    }

    loadData();

    $("#searchDateForTable").on('keypress', function (event) {
        if (event.which === 13) {
            searchDate = $('#searchDateForTable').val();
            isSearch = true;

            $.ajax({
                url: "http://localhost:8000/database/controllers/displayAllTravels.php",
                method: 'GET',
                data: {
                    'currentPage': currentPage,
                    'searchDate': searchDate
                },
                success: function (response) {
                    const res = JSON.parse(response);

                    const tbody = $('<tbody></tbody>')
                    const pag = $('<ul></ul>')

                    $('#travelsBody').remove();
                    $('#pagination').remove();

                    $('#travels').append(tbody);
                    $('#headPag').append(pag);

                    tbody.attr('id', 'travelsBody');
                    pag.attr('id', 'pagination').addClass('pagination');

                    res.travels.forEach(function (item) {
                        $('#travels').append(
                            '<tr>' +

                            '<td>' + item.id + '</td>' +

                            '<td>' + item.courier[0].fio + '</td>' +

                            '<td>' + item.region[0].name + '</td>' +

                            '<td>' + item.departure_date + '</td>' +

                            '</tr>',
                        );
                    })

                    function addLi(id) {
                        const page = id;

                        var listItem = $("<li class=\"page-item\">");
                        var link = $("<a class=\"page-link a-link\">");
                        link.text(id);
                        link.attr("href", page);
                        listItem.append(link);

                        $('#pagination').append(listItem);
                    }

                    for (let i = 0; i < res.totalPage; i++) {
                        addLi(i + 1);
                        // }
                    }

                },
                error: function (error) {
                    console.error("Ошибка при отправке данных: ", error);
                },
            });
        }
    });

})