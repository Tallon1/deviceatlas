const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Construct the absolute path to the database file
const dbPath = path.join(__dirname, 'devices.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
    return;
  }
  console.log("Connected to the database.");

  // Query to check if data exists in the devices table
  const query = "SELECT * FROM devices;";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error querying database:", err.message);
    } else if (rows.length === 0) {
      console.log("No data found in devices table.");
    } else {
      console.log("Data in devices table:");
      console.table(rows);
    }
    db.close();
  });
});
