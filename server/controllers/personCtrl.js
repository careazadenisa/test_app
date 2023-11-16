module.exports = db => {
    return {
      create: (req, res) => {
        db.models.Person.create(req.body).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      },
  
      update: (req, res) => {
        db.models.Person.update(req.body, { where: { id: req.body.id } }).then(() => {
          res.send({ success: true })
        }).catch(() => res.status(401));
      },
  
      findAll: (req, res) => {
        db.query(`SELECT id, firstname, lastname, cnp, age FROM "Person" ORDER BY id`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp);
        }).catch(() => res.status(401));
      },
  
      find: (req, res) => {
        db.query(`SELECT id, firstname, lastname, cnp, age
        FROM "Person"`, { type: db.QueryTypes.SELECT }).then(resp => {
          res.send(resp[0]);
        }).catch(() => res.status(401));
      },
  
      destroy: (req, res) => {
        const personId = req.params.id;                                                       //assigns the value of the idperson parameter from request object to the personId variable
        db.query(`DELETE FROM "Person" WHERE id = ${personId}`,
         { type: db.QueryTypes.DELETE })
         .then(() => {
          return db.query(`DELETE FROM "Junction" WHERE id_person=${personId}`, 
          { type: db.QueryTypes.DELETE});                                                           //deletes rows with the same id from the person and Junction tables (4be)
         })
         .then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      }
    };
  };
  