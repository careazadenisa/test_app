module.exports = (sequelize, DataType) => {
    let model = sequelize.define('Junction', {                                //define the model for the "person" table using Sequelize
      id_person: {
        type: DataType.INTEGER
      },
      id_car: {
        type: DataType.INTEGER
      }
    }, {
      timestamps: true
    });
    /*
      Aceasta linie este comentata pentru a demonstra legatura dintre tabelul person si tabelul Post prin id
    */
    // model.belongsTo(sequelize.models.Post, {foreignKey: 'id_post', onDelete: 'set null'});
    return model;
  };
  