import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import App from "../shared/App";
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const isProd = process.env.NODE_ENV === 'production';

//Mongo DB Connection
const db = require('./db/connection.js');
db.on('error', console.error.bind(console, 'Error while connecting database:'));


db.once('open', function () {
  console.log('Database Connected.');

  const app = express();

  app.use(express.static("public"));

  app.get("*", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <head>
        <title>Universal Reacl</title>
        <link rel="stylesheet" href="/css/main.css">
        <script src="/bundle.js" defer></script>
      </head>
      <body>
        <div id="root">${renderToString(<App />)}</div>
      </body>
    </html>
  `);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening");
  });
});