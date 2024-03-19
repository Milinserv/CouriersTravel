<?php
// Глобальный доступ подключение в БД
function pdo(): PDO
{
    static $pdo;

    if (!$pdo) {
        try {
            $config = include __DIR__ . '/config.php';
            // Подключение к БД
            $dsn = 'mysql:dbname=' . $config['db_name'] . ';host=' . $config['db_host'];
            $pdo = new PDO($dsn, $config['db_user'], $config['db_pass']);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            var_dump('Подключение не удалось: ' . $e->getMessage());
            die();
        }
    }

    return $pdo;
}