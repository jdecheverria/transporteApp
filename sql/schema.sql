CREATE TABLE transport_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    km_initial INT NOT NULL,
    km_final INT NOT NULL,
    oil_change_date DATE,
    tire_change VARCHAR(255),
    tire_rotation_date DATE
);

INSERT INTO transport_data (date, km_initial, km_final, oil_change_date, tire_change, tire_rotation_date) VALUES
('2024-07-01', 1000, 1200, '2024-07-01', 'Michelin', '2024-07-15');
