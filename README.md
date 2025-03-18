# DeviceAtlas App

## Overview

This application fetches device information using the DeviceAtlas API based on HTTP User-Agent strings, stores the data in a SQLite database, & provides a frontend to display tablet devices sorted by OS version.

## Technologies Used

- Frontend: Vue.js
- Backend: Node.js with Express
- Database: SQLite (for simplicity)
- Styling: TailwindCSS
- API Integration: DeviceAtlas Web Service

## Setup Instructions

## Backend Setup

1. Navigate to `backend` directory via terminal.
2. Install dependencies:
3. Create `.env` file and add your DeviceAtlas license key:
4. Start the server: "node server.js"

## Frontend Setup

1. Navigate to `frontend` directory via terminal.
2. Install dependencies:
3. Start the development server: "npm run dev"

### Usage

1. Send a POST request to `/fetch-device-data` with User-Agent strings to populate the database.
2. Visit the frontend at `http://localhost:5173` to view tablet devices.

## Notes

Ensure both backend & frontend servers are running simultaneously.
