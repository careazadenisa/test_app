module.exports = app => {
    'use strict';
    const express         = require('express');                                         //import the Express.js module
    const personCtrl = require('../controllers/personCtrl')(app.locals.db);             //import and initialize the "personCtrl" controller with a database instance
    const router          = express.Router();                                           //create a router object to define API routes
  
// Defining the API routes and binding them to the corresponding methods in the "personCtrl" controller
    router.post('/', personCtrl.create);                                                // POST route for creating new person
    router.put('/', personCtrl.update);                                                 // PUT route for updating existing person
    router.get('/', personCtrl.findAll);                                                // GET route to get all person
    router.get('/:idperson', personCtrl.find);                                          // GET route for getting specific person by ID    
    router.delete('/:idperson', personCtrl.destroy);                                    // DELETE route for deleting an person by ID         
  
    return router;
  };
