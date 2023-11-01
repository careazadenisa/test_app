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
        db.query(`DELETE FROM "car" WHERE idcar = ${req.params.idcar}`, { type: db.QueryTypes.DELETE }).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      }
    };
  };
  