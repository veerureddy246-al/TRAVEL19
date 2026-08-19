const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.ADMIN_PORT || 5001;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  let reqUrl = req.url.split('?')[0];

  // Root request on Admin portal serves admin.html
  if (reqUrl === '/' || reqUrl === '/index.html' || reqUrl === '/admin') {
    reqUrl = '/admin.html';
  }

  const filePath = path.join(__dirname, '../', reqUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    return fs.createReadStream(filePath).pipe(res);
  }

  // Fallback to admin.html for SPA routing
  const adminHtmlPath = path.join(__dirname, '../admin.html');
  if (fs.existsSync(adminHtmlPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return fs.createReadStream(adminHtmlPath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Admin resource not found' }));
});

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🛡️  VENTOURA DEDICATED ADMIN CONTROL PORTAL`);
  console.log(`🌐  Running separately at: http://localhost:${PORT}`);
  console.log(`🔒  Isolated from public customer website`);
  console.log(`=================================================`);
});
