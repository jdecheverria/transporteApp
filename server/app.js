// /server/app.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const pdf = require('html-pdf');
const path = require('path');

const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE transport (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    kmInicial INTEGER,
    kmFinal INTEGER
  )`);
  
  db.run(`CREATE TABLE maintenance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    oilChange TEXT,
    tireChange TEXT,
    tireRotation TEXT
  )`);
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/maintenances', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'maintenances.html'));
});

app.post('/save', (req, res) => {
  const { date, kmInicial, kmFinal } = req.body;
  const stmt = db.prepare("INSERT INTO transport (date, kmInicial, kmFinal) VALUES (?, ?, ?)");
  stmt.run(date, kmInicial, kmFinal, (err) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
  stmt.finalize();
});

app.post('/saveMaintenance', (req, res) => {
  const { oilChange, tireChange, tireRotation } = req.body;
  const stmt = db.prepare("INSERT INTO maintenance (oilChange, tireChange, tireRotation) VALUES (?, ?, ?)");
  stmt.run(oilChange, tireChange, tireRotation, (err) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true });
    }
  });
  stmt.finalize();
});

app.get('/download', (req, res) => {
  db.all("SELECT * FROM transport", (err, transportRows) => {
    if (err) {
      res.sendStatus(500);
    } else {
      db.all("SELECT * FROM maintenance", (err, maintenanceRows) => {
        if (err) {
          res.sendStatus(500);
        } else {
          const html = `
            <h1>Registro de Transporte</h1>
            <table border="1" style="width: 100%; border-collapse: collapse;">
              <tr>
                <th>Fecha</th>
                <th>Km Iniciales</th>
                <th>Km Finales</th>
              </tr>
              ${transportRows.map(row => `
                <tr>
                  <td>${row.date}</td>
                  <td>${row.kmInicial}</td>
                  <td>${row.kmFinal}</td>
                </tr>`).join('')}
            </table>
            <h1>Mantenimientos</h1>
            <table border="1" style="width: 100%; border-collapse: collapse;">
              <tr>
                <th>Fecha de Cambio de Aceite</th>
                <th>Cambio de Neumáticos</th>
                <th>Fecha de Rotación de Neumáticos</th>
              </tr>
              ${maintenanceRows.map(row => `
                <tr>
                  <td>${row.oilChange}</td>
                  <td>${row.tireChange}</td>
                  <td>${row.tireRotation}</td>
                </tr>`).join('')}
            </table>
          `;
          
          pdf.create(html).toBuffer((err, buffer) => {
            if (err) {
              res.sendStatus(500);
            } else {
              res.setHeader('Content-Type', 'application/pdf');
              res.setHeader('Content-Disposition', 'attachment; filename=registro_transporte.pdf');
              res.send(buffer);
            }
          });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
