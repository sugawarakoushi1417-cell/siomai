<?php
// Database configuration - Railway MySQL
$host = 'tramway.proxy.rlwy.net';
$port = 26850;
$dbname = 'railway';
$username = 'root';
$password = 'rQIvijlDvwuYScuGdRHpbbhwtJRSvuhq';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

session_start();
?>