const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const readline = require('readline');
const http = require('http');

const app = express();
app.use(cors());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const validUsername ='name';
const validJob ='job';
const validPassword ='pass';
// Überprüft die Benutzeranmeldeinformationen
function authenticate(callback) {
  rl.question('Benutzername: ', (username) => {
    rl.question('Passwort: ', (password) => {
      rl.question('Job: ', (job) => {
        if (username === validUsername && password === validPassword && job === validJob) {
          rl.close(); // Schließt die Konsolen-Schnittstelle
          startServer(); // Startet den Server nach erfolgreicher Authentifizierung
        } else {
          console.log('Ungültige Anmeldeinformationen. Bitte versuche es erneut.');
          authenticate(callback); // Ruft die Authentifizierungsfunktion erneut auf, wenn die Anmeldeinformationen ungültig sind
        }
      });
    });
  });
}

function startServer() {
  const server = http.createServer(app);
  let port = process.env.PORT || 5000;
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} ist bereits in Verwendung. Versuche es mit einem anderen Port.`);
      port++;
      server.listen(port);
    }
  });

  server.on('listening', () => {
    console.log(`Server läuft auf Port ${port}`);
  });

  server.listen(port);
}

function queryDatabase(query, params, res) {
  // Verbindung zur MySQL-Datenbank
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hsgaargauost',
    database: 'krankenhausdb'
  });

  // Führt die Abfrage auf der Datenbank aus
  connection.execute(query, params, (queryErr, results) => {
    if (queryErr) {
      console.error('Fehler bei der Abfrage: ', queryErr);
      res.status(500).json({ error: 'Fehler bei der Abfrage' });
    } else {
      res.json(results);
    }
  });
}
// Definiert verschiedene Endpunkte, um Daten aus der Datenbank abzurufen

app.get('/patienten', (req, res) => {
  const query = 'SELECT * FROM Patienten';
  queryDatabase(query, [], res);
});

app.get('/arzte', (req, res) => {
  const query = 'SELECT * FROM Ärzte';
  queryDatabase(query, [], res);
});

app.get('/abteilungen', (req, res) => {
  const query = 'SELECT * FROM Abteilungen';
  queryDatabase(query, [], res);
});

app.get('/zimmer', (req, res) => {
  const query = 'SELECT * FROM Zimmer';
  queryDatabase(query, [], res);
});

app.get('/behandlungen', (req, res) => {
  const query = 'SELECT * FROM Behandlungen';
  queryDatabase(query, [], res);
});

app.get('/behandlungen_patienten', (req, res) => {
  const query = 'SELECT * FROM Behandlungen_Patienten';
  queryDatabase(query, [], res);
});

app.get('/behandlungen_arzte', (req, res) => {
  const query = 'SELECT * FROM Behandlungen_Ärzte';
  queryDatabase(query, [], res);
});

if (require.main === module) {
  authenticate(); // Startet die Authentifizierung, wenn das Skript direkt ausgeführt wird
}

module.exports = app;
