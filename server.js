const express = require('express');
const path = require('path');
const app = express();

app.disable('x-powered-by');
app.enable('trust proxy');

app.use((req, res, next) => {
  if (req.secure) return next();
  return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
});

app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host === 'iliasbk.me') {
    return res.redirect(301, `https://www.iliasbk.me${req.originalUrl}`);
  }
  return next();
});

// serve static
app.use(express.static(path.join(__dirname, '.')));
app.get('/favicon.ico', (_req, res) => res.status(204).end());

// fallback
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on ${port}`));
