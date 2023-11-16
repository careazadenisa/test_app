module.exports = app => {
    'use strict';
    const express         = require('express');
    const carCtrl = require('../controllers/carCtrl')(app.locals.db);                       //import and initialize the "carCtrl" controller with a database instance
    const router          = express.Router();
  
    router.post('/', carCtrl.create);
    router.put('/', carCtrl.update);
    router.get('/', carCtrl.findAll);
    router.get('/:id', carCtrl.find);
    router.delete('/:id', carCtrl.destroy);
  
    return router;
  };
  