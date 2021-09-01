const express = require('express');
const fs = require('fs');

const app = express();
const port = 3002;

const searchFull = (filename, text) => new Promise((resolve) => {
  const regEx = new RegExp(text, 'i');

  fs.readFile(`${filename}.txt`, 'utf8', (err, contents) => {
    const lines = contents.toString().split(' ');
    lines.forEach((line) => {
      if (line && line.search(regEx) >= 0) {
        resolve(true);
      }
    });
    resolve(false);
  });
});

app.get('/', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  searchFull('dictionary', req.query.word).then((result) => res.send({ isSpelledCorrectly: result.toString() }));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
