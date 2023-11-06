module.exports = db => {
    return {
      destroy: (req, res) => {
        db.query(`DELETE FROM "Junction" WHERE id_person = ${req.params.idperson} AND id_car = ${idcar}`, 
        { type: db.QueryTypes.DELETE })
         .then(() => {
          res.send({ success: true });
        }).catch(() => res.status(401));
      }
    };
  };
  