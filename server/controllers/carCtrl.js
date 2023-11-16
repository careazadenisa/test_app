module.exports = db => {
    return {
      create: (req, res) => {
        db.models.Car.create(req.body).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      },
  
      update: (req, res) => {
        db.models.Car.update(req.body, { where: { id: req.body.id } }).then(() => {
          res.send({ success: true })
        }).catch(() => res.status(401));
      },
  
      findAll: (req, res) => {
        db.query(`SELECT id, brand, modelcar, fabricationyear, cylindercapacity, tax
        FROM "Car"
        ORDER BY id`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp);
        }).catch(() => res.status(401));
      },
  
      find: (req, res) => {
        db.query(`SELECT id, brand, modelcar, fabricationyear, cylindercapacity, tax
        FROM "Car"`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp[0]);
        }).catch(() => res.status(401));
      },
  
      destroy: (req, res) => {
        const carId = req.params.id;
        db.query(`DELETE FROM "Car" WHERE id = ${carId}`,
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
  