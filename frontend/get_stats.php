<?php
require_once 'config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Not authenticated']);
    exit;
}

try {
    $totalEquipment = $pdo->query("SELECT COUNT(*) FROM equipment")->fetchColumn();
    $totalLabs = $pdo->query("SELECT COUNT(*) FROM laboratories WHERE status = 'active'")->fetchColumn();
    $available = $pdo->query("SELECT COUNT(*) FROM equipment WHERE status = 'available'")->fetchColumn();
    $inUse = $pdo->query("SELECT COUNT(*) FROM equipment WHERE status = 'in_use'")->fetchColumn();
    $maintenance = $pdo->query("SELECT COUNT(*) FROM equipment WHERE status = 'maintenance'")->fetchColumn();
    
    echo json_encode([
        'total_equipment' => $totalEquipment,
        'total_labs' => $totalLabs,
        'available' => $available,
        'in_use' => $inUse,
        'maintenance' => $maintenance
    ]);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>