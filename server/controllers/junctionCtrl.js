module.exports = db => {
    return {
      create: (req, res) => {
        db.models.Junction.create(req.body).then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      },
  
      list(req, res) {
        //return Junction
        return db.models.Junction
          .findAll()
          .then(junctions => res.status(200).send(junctions))
          .catch(error => res.status(400).send(error));
      },

      find: (req, res) => {
        const id_person = req.params.id_person;
        db.query(`SELECT id_person, id_car FROM "Junction" WHERE id_person = ${id_person}`, 
        { type: db.QueryTypes.SELECT })
        .then(resp => {
          const carIds = resp.map(entry => entry.id_car);
          res.send(carIds);
        }).catch(() => res.status(401));
      },

      destroy: (req, res) => {
        const personId = req.params.id_person;
        const carId = req.params.id_car;
        db.query(`DELETE FROM "Junction" WHERE id_person = ${personId} AND id_car = ${carId}`, 
        { type: db.QueryTypes.DELETE })
         .then(() => {
          res.send({ success: true });                                                          //when deleting a car from person modal, only the junction line for the person will be deleted (be6)
        }).catch(() => res.status(401));
      }
    };
  };
  