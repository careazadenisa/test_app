module.exports = app => {
  'use strict';
  const express         = require('express');                                       
  const informationCtrl = require('../controllers/informationCtrl')(app.locals.db);
  const router          = express.Router();

  router.post('/', informationCtrl.create);
  router.put('/', informationCtrl.update);
  router.get('/', informationCtrl.findAll);
  router.get('/:id', informationCtrl.find);
  router.delete('/:id', informationCtrl.destroy);
  // router.get('/person', informationCtrl.getPerson);                       // GET route for getting person data
  // router.get('/cars', informationCtrl.getCar);                            // GET route for getting car data

  return router;
};
