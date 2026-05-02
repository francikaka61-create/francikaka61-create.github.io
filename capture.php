<?php
$logFile = 'database_online.txt';

// Выдача данных для админки
if (isset($_GET['get_logs'])) {
    if (file_exists($logFile)) {
        $data = file_get_contents($logFile);
        $lines = array_reverse(array_filter(explode(PHP_EOL, $data)));
        foreach ($lines as $line) {
            echo "<div class='log-line'>" . htmlspecialchars($line) . "</div>";
        }
    } else {
        echo "Ожидание новых данных...";
    }
    exit;
}

// Запись данных от пользователей
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $info = $_POST['info'];
    $status = $_POST['status'];
    $time = date("H:i:s");
    $entry = "[$time] [$status] $info" . PHP_EOL;
    file_put_contents($logFile, $entry, FILE_APPEND);
}
?>
