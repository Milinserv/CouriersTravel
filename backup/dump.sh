#!/bin/bash
set -o pipefail

echo "Введите логин пользователя БД:"
read -s USER

echo "Подключение к БД"
mysql -u $USER -p basic < ./backup/sql/table/couriers.sql
mysql basic < ./backup/sql/table/regions.sql
mysql basic < ./backup/sql/table/travel_schedule.sql

if [[ $? -eq 0 ]]; then
  echo "Таблицы созданы"
else
  echo "Ошибка создания таблиц"
fi

mysql basic < ./backup/sql/dataCouriers.sql
mysql basic < ./backup/sql/dataRegions.sql
mysql basic < ./backup/sql/dataTravels.sql

if [[ $? -eq 0 ]]; then
  echo "Данные таблиц успешно заполнены"
else
  echo "Ошибка заполнения данных"
fi