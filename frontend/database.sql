-- Run this in your Railway MySQL database
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'staff') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS laboratories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lab_name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    capacity INT,
    status ENUM('active', 'maintenance', 'inactive') DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipment_name VARCHAR(100) NOT NULL,
    brand VARCHAR(50),
    model VARCHAR(50),
    serial_number VARCHAR(100),
    lab_id INT,
    category VARCHAR(50),
    status ENUM('available', 'in_use', 'maintenance', 'broken') DEFAULT 'available',
    date_acquired DATE,
    FOREIGN KEY (lab_id) REFERENCES laboratories(id)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, full_name, role) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'admin');

-- Insert sample IT laboratories
INSERT INTO laboratories (lab_name, location, capacity, status) VALUES
('Programming Lab 1', 'Building A, Room 101', 30, 'active'),
('Programming Lab 2', 'Building A, Room 102', 30, 'active'),
('Networking Lab', 'Building B, Room 201', 25, 'active'),
('Hardware Lab', 'Building B, Room 202', 20, 'active'),
('Multimedia Lab', 'Building C, Room 301', 25, 'active');

-- Insert sample IT equipment
INSERT INTO equipment (equipment_name, brand, model, serial_number, lab_id, category, status, date_acquired) VALUES
('Desktop Computer', 'Dell', 'OptiPlex 7090', 'SN123456789', 1, 'Computer', 'available', '2023-01-15'),
('Desktop Computer', 'Dell', 'OptiPlex 7090', 'SN123456790', 1, 'Computer', 'in_use', '2023-01-15'),
('Laptop', 'HP', 'EliteBook 840', 'SN987654321', 2, 'Computer', 'available', '2023-02-20'),
('Projector', 'Epson', 'EB-W51', 'SN456789123', 1, 'Display', 'available', '2023-03-10'),
('Router', 'Cisco', 'Catalyst 2960', 'SN789123456', 3, 'Network', 'available', '2023-01-05'),
('Switch', 'TP-Link', 'TL-SG1024D', 'SN321654987', 3, 'Network', 'available', '2023-01-05'),
('Server', 'Dell', 'PowerEdge R740', 'SN654987321', 3, 'Server', 'available', '2023-04-12'),
('Printer', 'HP', 'LaserJet Pro M404', 'SN147258369', 1, 'Peripheral', 'maintenance', '2023-02-28'),
('Arduino Kit', 'Arduino', 'Uno R3', 'SN963852741', 4, 'Development', 'available', '2023-03-15'),
('Raspberry Pi', 'Raspberry', 'Pi 4 Model B', 'SN753951456', 4, 'Development', 'available', '2023-03-20'),
('Webcam', 'Logitech', 'C920 HD Pro', 'SN159357486', 5, 'Peripheral', 'available', '2023-05-01'),
('Microphone', 'Blue', 'Yeti USB', 'SN357159486', 5, 'Audio', 'available', '2023-05-01');