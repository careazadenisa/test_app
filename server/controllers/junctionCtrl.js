module.exports = db => {
    return {
      destroy: (req, res) => {
        const personId=req.params.idperson;
        const carId=req.params.idcar;
        db.query(`DELETE FROM "Junction" WHERE id_person = ${personId} AND id_car = ${carId}`, 
        { type: db.QueryTypes.DELETE })
         .then(() => {
          res.send({ success: true });                                                          //when deleting a car from person modal, only the junction line for the person will be deleted (be6)
        }).catch(() => res.status(401));
      }
    };
  };
  