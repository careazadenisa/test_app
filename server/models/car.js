module.exports = (sequelize, DataType) => {
    let model = sequelize.define('car', {                           //define the modal for the "car" table using Sequelize
      brand: {
        type: DataType.TEXT
      },
      modelcar: {
        type: DataType.TEXT
      },
      fabricationyear: {
        type: DataType.INTEGER
      },
      tax: {
        type: DataType.DOUBLE
      }
    }, {
      timestamps: true                                              
    });
    /*
      Aceasta linie este comentata pentru a demonstra legatura dintre tabelul car si tabelul Post prin id
    */
    // model.belongsTo(sequelize.models.Post, {foreignKey: 'id_post', onDelete: 'set null'});
    return model;
  };
  