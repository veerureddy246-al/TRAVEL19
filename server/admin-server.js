/**
 * Ventoura Admin Panel Dedicated Server
 * Runs on Port 4002 — completely separate from the main website
 * Serves the same React build but forces /admin route
 */
const express = require('express');
const path = require('path');

const app = express();
const ADMIN_PORT = 4002;
const CLIENT_DIST = path.join(__dirname, '../client/dist');

// Serve static assets
app.use(express.static(CLIENT_DIST));

// Root redirect → always go to /admin
app.get('/', (req, res) => {
  res.redirect('/admin');
});

// All routes serve index.html (React Router handles routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_DIST, 'index.html'));
});

app.listen(ADMIN_PORT, () => {
  console.log(`[Ventoura Admin Panel] Running at http://localhost:${ADMIN_PORT}/admin`);
});
