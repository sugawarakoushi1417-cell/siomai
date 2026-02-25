<?php
require_once 'config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

try {
    $stmt = $pdo->query("
        SELECT e.*, l.lab_name 
        FROM equipment e 
        LEFT JOIN laboratories l ON e.lab_id = l.id 
        ORDER BY e.id DESC
    ");
    $equipment = $stmt->fetchAll();
    echo json_encode($equipment);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>