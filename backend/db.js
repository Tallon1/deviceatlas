const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./devices.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userAgent TEXT,
      deviceType TEXT,
      osVersion TEXT,
      properties TEXT
    )
  `);
});

module.exports = db;
