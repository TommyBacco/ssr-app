import express from 'express';
import fs from 'fs';
import path from 'path';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';
import React from 'react';

const PORT = process.env.PORT || 3006;
const express_app = express();

express_app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);
  const indexFile = path.resolve('../../public/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

express_app.use(express.static('./build'));

express_app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});