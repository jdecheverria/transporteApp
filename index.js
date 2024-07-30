const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3306;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'transport_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

app.use(express.json());
app.use(express.static('public'));

app.post('/api/transport', (req, res) => {
    const data = req.body;
    const sql = 'INSERT INTO transport_data (date, km_initial, km_final, oil_change_date, tire_change, tire_rotation_date) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [data.date, data.kmInitial, data.kmFinal, data.oilChangeDate, data.tireChange, data.tireRotationDate], (err, result) => {
        if (err) throw err;
        res.send('Data saved');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
