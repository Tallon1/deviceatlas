const express = require('express');
const axios = require('axios');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const DEVICEATLAS_API_URL = 'https://region0.deviceatlascloud.com/v1/detect/properties';

app.post('/fetch-device-data', async (req, res) => {
  const { userAgents } = req.body;

  try {
    for (const userAgent of userAgents) {
      const response = await axios.get(`${DEVICEATLAS_API_URL}?licencekey=${process.env.DEVICEATLAS_LICENSE_KEY}&useragent=${encodeURIComponent(userAgent)}`);
      const { primaryHardwareType, osVersion, ...otherProperties } = response.data;

      console.log("API Response:", response.data); // Debugging log

      db.run(
        `INSERT INTO devices (userAgent, deviceType, osVersion, properties) VALUES (?, ?, ?, ?)`,
        [userAgent, primaryHardwareType || 'Unknown', osVersion || 'Unknown', JSON.stringify(response.data)],
        (err) => {
          if (err) {
            console.error("Error inserting data:", err.message);
          } else {
            console.log("Data inserted successfully for User-Agent:", userAgent);
          }
        }
      );
    }
    res.status(200).send({ message: 'Data fetched successfully' });
  } catch (error) {
    console.error("Error fetching from DeviceAtlas API:", error.message);
    res.status(500).send({ error: error.message });
  }
});

app.get('/devices', (req, res) => {
  const query = `
    SELECT 
      id,
      userAgent,
      json_extract(properties, '$.properties.primaryHardwareType') AS deviceType,
      json_extract(properties, '$.properties.osVersion') AS osVersion,
      properties,
      CAST(SUBSTR(json_extract(properties, '$.properties.osVersion'), 1, 
        CASE WHEN INSTR(json_extract(properties, '$.properties.osVersion'), '.') = 0 
        THEN LENGTH(json_extract(properties, '$.properties.osVersion')) 
        ELSE INSTR(json_extract(properties, '$.properties.osVersion'), '.') - 1 END
      ) AS INTEGER) AS major_version,
      CAST(SUBSTR(json_extract(properties, '$.properties.osVersion'), 
        INSTR(json_extract(properties, '$.properties.osVersion'), '.') + 1
      ) AS INTEGER) AS minor_version
    FROM devices
    WHERE json_extract(properties, '$.properties.primaryHardwareType') = 'Tablet'
    ORDER BY major_version DESC, minor_version DESC;
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      console.log("Fetched rows:", rows);
      res.status(200).send(rows);
    }
  });
});


app.listen(3000, () => console.log('Server running on port 3000'));
