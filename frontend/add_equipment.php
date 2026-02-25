<?php
require_once 'config.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not authenticated']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $stmt = $pdo->prepare("
            INSERT INTO equipment 
            (equipment_name, brand, model, serial_number, lab_id, category, status, date_acquired) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $data['equipment_name'],
            $data['brand'],
            $data['model'],
            $data['serial_number'],
            $data['lab_id'],
            $data['category'],
            $data['status'],
            $data['date_acquired']
        ]);
        
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}
?>