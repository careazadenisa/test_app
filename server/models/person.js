module.exports = (sequelize, DataType) => {
    let model = sequelize.define('person', {                                //define the model for the "person" table using Sequelize
      firstname: {
        type: DataType.TEXT
      },
      lastname: {
        type: DataType.TEXT
      },
      cnp: {
        type: DataType.STRING
      },
      age: {
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
  