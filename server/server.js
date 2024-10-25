const extension_ID='hidffbikffohmhaknmmcldfeojmoobdn';
const intermoduleDataDir = '../intermodule-data';
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors({
  origin: `chrome-extension://${extension_ID}`,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());

// Log the headers of each incoming request
app.use((req, res, next) => {
  /*
  console.log('Headers:', req.headers);
  console.log('CORS-related headers:', {
    origin: req.headers.origin,
    'access-control-request-method': req.headers['access-control-request-method'],
    'access-control-request-headers': req.headers['access-control-request-headers'],
    'access-control-allow-origin': req.headers['access-control-allow-origin']
  });
  */
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  const dataSize = JSON.stringify(req.body).length;
  console.log(`Received request with data size: ${dataSize} bytes`);
  next();
});

app.post('/visitedUrls', (req, res) => {
  console.log('Received visited URLs: ', req.body.visitedUrls);
  console.log('Data:', req.body);
  fs.writeFile('visitedUrls.json', JSON.stringify(req.body.visitedUrls), err => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.post('/event', (req, res) => {
  console.log('Event received:', req.body);
  if (!fs.existsSync(intermoduleDataDir)){
      fs.mkdirSync(intermoduleDataDir);
  }
  fs.readFile(`${intermoduleDataDir}/history.json`, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.writeFileSync(`${intermoduleDataDir}/history.json`, '[]');
        data = '[]';
      } else {
        console.error(err);
        res.sendStatus(500);
        return;
      }
    }
    let history;
    try {
      history = JSON.parse(data);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      console.error('Problematic JSON data:', data);
      history = [];
    }
    if (req.body.event === 'highlight' || req.body.event === 'copy') {
      console.log(`${req.body.event.charAt(0).toUpperCase() + req.body.event.slice(1)} event received:`, req.body);
    }
    history.push(req.body);
    fs.writeFile(`${intermoduleDataDir}/history.json`, JSON.stringify(history, null, 2), err => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  });
});

app.post('/saveUrl', (req, res) => {
  const url = req.body.url;
  console.log('Received URL:', url);
  
  // Your existing code to save to history.json
  
  console.log('Saved URL to history.json');
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));