module.exports = app => {
    'use strict';
    const express         = require('express');                                         //import the Express.js module
    const junctionCtrl = require('../controllers/junctionCtrl')(app.locals.db);             //import and initialize the "junctionCtrl" controller with a database instance
    const router          = express.Router();                                           //create a router object to define API routes
  
// Defining the API routes and binding them to the corresponding methods in the "junctionCtrl" controller
  router.post('/', junctionCtrl.create);
  router.get('/', junctionCtrl.list);  
  router.get('/junction/person/:id_person', junctionCtrl.find);
  router.delete('/person/:id/car/:id', junctionCtrl.destroy);                                    // DELETE route for deleting an person by ID         
  
    return router;
  };
