const express = require('express');
const path = require('path');
const app = express();

// Sert tout depuis la racine (où se trouve index.html)
app.use(express.static(path.join(__dirname, '.')));

// Fallback: si l'URL ne correspond pas à un fichier, renvoyer index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on ${port}`));
