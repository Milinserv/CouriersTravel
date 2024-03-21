// $(document).ready(function () {
//     $("#searchDateForTable").on('keypress', function (event) {
//         event.preventDefault();
//         let searchDate;
//
//         if (event.which === 13) {
//             searchDate = 'searchDate=' + $('#searchDateForTable').val();
//         }
//         $.ajax({
//             url: "http://localhost:8000/database/controllers/displayAllTravels.php",
//             method: 'GET',
//             data: searchDate,
//             success: function (response) {
//                 const res = JSON.parse(response);
//
//                 $('#travelsBody').remove();
//                 $('#pagination').remove();
//                 $('#travels').append('<tbody></tbody>');
//                 $('#headPag').append('<ul>');
//
//
//                 res.travels.forEach(function (item) {
//                     $('#travels').append(
//                         '<tr>' +
//
//                         '<td>' + item.id + '</td>' +
//
//                         '<td>' + item.courier[0].fio + '</td>' +
//
//                         '<td>' + item.region[0].name + '</td>' +
//
//                         '<td>' + item.departure_date + '</td>' +
//
//                         '</tr>',
//                     );
//                 })
//
//                 function addLi(id) {
//                     const page = 'page=' + id;
//
//                     var listItem = $("<li class=\"page-item\">");
//                     var link = $("<a class=\"page-link a-link\">");
//                     link.text(id);
//                     link.attr("href", page);
//                     listItem.append(link);
//
//                     $('#pagination').append(listItem);
//                 }
//
//                 for (let i = 0; i < res.totalPage; i++) {
//                     addLi(i + 1);
//                 }
//             },
//             error: function (error) {
//                 console.error("Ошибка при отправке данных: ", error);
//             },
//         });
//     });
// })