<?php
require_once 'config.php';
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'logged_in' => true,
        'user' => [
            'username' => $_SESSION['username'],
            'full_name' => $_SESSION['full_name'],
            'role' => $_SESSION['role']
        ]
    ]);
} else {
    echo json_encode(['logged_in' => false]);
}
?>