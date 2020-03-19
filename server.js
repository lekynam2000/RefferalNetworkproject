const express = require('express');
const connectDB = require('./config/db');
const fs = require('fs');

const privateKey = fs.readFileSync('./localhost-key.pem');
const certificate = fs.readFileSync('./localhost.pem');
const https = require('https');
const credentials = { key: privateKey, cert: certificate };

const app = express();
require('./middleware/passport');

// Connect Database
connectDB();
app.get('/', (req, res) => {
  res.send('Server connected');
});
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
app.use('/api/user', require('./routes/api/user'));

app.use('/api/profile', require('./routes/api/profile'));

app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/project', require('./routes/api/project'));
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
