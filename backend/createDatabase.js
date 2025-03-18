const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to the database file
const dbPath = path.resolve(__dirname, './devices.db');
console.log("Database path:", dbPath);

try {
  const db = new sqlite3.Database(dbPath);
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
    console.log("Database and table created successfully.");
  });
  db.close();
} catch (error) {
  console.error("Error creating database:", error.message);
}
