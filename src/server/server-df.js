const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const historyApiFallback = require('connect-history-api-fallback');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config');
const isProd = process.env.NODE_ENV === 'production';

//Mongo DB Connection
const db = require('./db/connection.js');
db.on('error', console.error.bind(console, 'Error while connecting database:'));


db.once('open', function () {
  console.log('Database Connected.');

  //Initializing Express Application with router
  const app = express();
  const router = express.Router();
  const port = process.env.PORT || 8080;

  //Adding Middlewares
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //Enabling Logger
  app.use(morgan('dev'));

  //Fetching all routes
  require('./routes')(router);

  //Setting Base Route
  app.use('/api/v1', router);

   if (!isProd) {
     const compiler = webpack(webpackConfig);
     app.use(historyApiFallback({
       verbose: false
     }));
 
     app.use(webpackDevMiddleware(compiler, {
       publicPath: webpackConfig.output.publicPath,
       contentBase: path.resolve(__dirname, '../client/public'),
       stats: {
         colors: true,
         hash: false,
         timings: true,
         chunks: false,
         chunkModules: false,
         modules: false
       }
     }));
 
     app.use(webpackHotMiddleware(compiler));
     app.use(express.static(path.resolve(__dirname, '../dist')));
   } else {
     app.use(express.static(path.resolve(__dirname, '../dist')));
     app.get('*', function (req, res) {
       res.sendFile(path.resolve(__dirname, '../dist/index.html'));
       res.end();
     });
   }

  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('>>> Open http://localhost:%s/ in your browser.', port);
  });
});