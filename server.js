const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/visitedUrls', (req, res) => {
  console.log('Received visited URLs: ', req.body.visitedUrls);
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));