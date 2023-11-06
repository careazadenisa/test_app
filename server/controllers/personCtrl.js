module.exports = db => {
    return {
      create: (req, res) => {
        db.models.person.create(req.body).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      },
  
      update: (req, res) => {
        db.models.person.update(req.body, { where: { idperson: req.body.idperson } }).then(() => {
          res.send({ success: true })
        }).catch(() => res.status(401));
      },
  
      findAll: (req, res) => {
        db.query(`SELECT idperson, firstname, lastname, cnp, age FROM "person" ORDER BY idperson`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp);
        }).catch(() => res.status(401));
      },
  
      find: (req, res) => {
        db.query(`SELECT idperson, firstname, lastname, cnp, age
        FROM "person"`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp[0]);
        }).catch(() => res.status(401));
      },
  
      destroy: (req, res) => {
        //const personId = req.params.idperson;
        db.query(`DELETE FROM "person" WHERE idperson = ${req.params.idperson}`,
         { type: db.QueryTypes.DELETE })
         .then(() => {
          return db.query(`DELETE FROM "Junction" WHERE id_person=${req.params.idperson}`, 
          { type: db.QueryTypes.DELETE});
         })
         .then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      }
    };
  };
  