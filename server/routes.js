module.exports = app => {
  'use strict';
  const express      = require("express");
  const appPath      = __dirname + '/../client';
  const path         = require('path');
  const errors       = require('./errors');

  /* LOGIN */
  app.use('/api/information', require('./routes/information')(app));    

  app.use('/api/person', require('./routes/person')(app));                                            //import and call a local module from path './routes/person'             

  app.use('/api/car', require('./routes/car')(app));

  app.route('*/:url(api|auth|components|app|bower_components|assets)/*').get(errors[404]);            //defines routing for handling authentication operations

  /* BUILD */
  app.use(express.static(path.join(appPath, 'dist/client')));                                         //the path to the directory containing the application's static resources
  app.get('/*', (req, res) => res.sendFile(path.join(appPath, 'dist/client', 'index.html')));         //direct all requests to index.html

  app.route('*').get(errors[404]);
};
