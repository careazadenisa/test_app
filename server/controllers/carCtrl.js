module.exports = db => {
    return {
      create: (req, res) => {
        db.models.car.create(req.body).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      },
  
      update: (req, res) => {
        db.models.car.update(req.body, { where: { idcar: req.body.idcar } }).then(() => {
          res.send({ success: true })
        }).catch(() => res.status(401));
      },
  
      findAll: (req, res) => {
        db.query(`SELECT idcar, brand, mdoelcar, fabricationyear, tax
        FROM "car"
        ORDER BY idcar`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp);
        }).catch(() => res.status(401));
      },
  
      find: (req, res) => {
        db.query(`SELECT idcar, brand, modelcar, fabricationyear, tax
        FROM "car"`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp[0]);
        }).catch(() => res.status(401));
      },
  
      destroy: (req, res) => {
        const carId = req.params.idcar;
        db.query(`DELETE FROM "car" WHERE idcar = ${carId}`,
         { type: db.QueryTypes.DELETE })
         .then(() => {
          return db.query(`DELETE FROM "Junction" WHERE id_car=${carId}`, 
          { type: db.QueryTypes.DELETE});                                                         ////deletes rows with the same id from the car and Junction tables
         })
         .then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      }
    };
  };
  