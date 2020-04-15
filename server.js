const express = require('express');
const connectDB = require('./config/db');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const privateKey = fs.readFileSync(
  `${
    process.env.NODE_ENV === 'production'
      ? process.env.SSLKey
      : './localhost-key.pem'
  }`
);
const certificate = fs.readFileSync(
  `${
    process.env.NODE_ENV === 'production'
      ? process.env.SSLCert
      : './localhost.pem'
  }`
);
const https = require('https');
const credentials = { key: privateKey, cert: certificate };

const app = express();
require('./middleware/passport');

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
app.use('/api/user', require('./routes/api/user'));

app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/project', require('./routes/api/project'));
app.use('/api/workspace', require('./routes/api/workspace'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
