module.exports = db => {
  return {
    create: (req, res) => {
      db.models.Information.create(req.body).then(() => {
        res.send({ success: true });
      }).catch(() => res.status(401));
    },

    update: (req, res) => {
      db.models.Information.update(req.body, { where: { id: req.body.id } }).then(() => {
        res.send({ success: true })
      }).catch(() => res.status(401));
    },

    findAll: (req, res) => {
      db.query(`SELECT id, name, type, CASE WHEN liked IS TRUE THEN 'Da' ELSE 'Nu' END AS liked FROM "Information" ORDER BY id`, { type: db.QueryTypes.SELECT }).then(resp => {
        res.send(resp);
      }).catch(() => res.status(401));
    },

    find: (req, res) => {
      db.query(`SELECT id, name, type, liked FROM "Information"`, { type: db.QueryTypes.SELECT }).then(resp => {
        res.send(resp[0]);
      }).catch(() => res.status(401));
    },

    destroy: (req, res) => {
      db.query(`DELETE FROM "Information" WHERE id = ${req.params.id}`, { type: db.QueryTypes.DELETE }).then(() => {
        res.send({ success: true });
      }).catch(() => res.status(401));
    }
    ,
    getPerson: (req, res) => {                                                                                  //return data from the "person" table
      db.query(`SELECT idperson, firstname, lastname, age FROM "person"`, { type: db.QueryTypes.SELECT })         //the database query selects specific columns from the table and returns the result as an array of JSON objects
        .then(resp => {
          res.send(resp);
        })
        .catch(() => res.status(401));                                                                          //if an error occurs during the query, an HTTP 401 status code is returned.
    },

    getCar: (req, res) => {
      db.query(`SELECT idcar, brand, modelcar, fabricationyear, tax FROM "car"`, { type: db.QueryTypes.SELECT })
        .then(resp => {
          res.send(resp);
        })
        .catch(() => res.status(401));
    }
  };
};
