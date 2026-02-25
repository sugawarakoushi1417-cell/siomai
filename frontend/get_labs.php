<?php
require_once 'config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

try {
    $stmt = $pdo->query("SELECT * FROM laboratories WHERE status = 'active' ORDER BY lab_name");
    $labs = $stmt->fetchAll();
    echo json_encode($labs);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>