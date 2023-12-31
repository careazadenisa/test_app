module.exports = (sequelize, DataType) => {
    let model = sequelize.define('Car', {                           //define the modal for the "car" table using Sequelize
      brand: {
        type: DataType.TEXT
      },
      modelcar: {
        type: DataType.TEXT
      },
      fabricationyear: {
        type: DataType.INTEGER
      },
      cylindercapacity: {
        type: DataType.INTEGER
      },
      tax: {
        type: DataType.INTEGER
      }
    }, {
      timestamps: true               // false pt a nu mai crea createdAt si updatedAt                                              
    });
    /*
      Aceasta linie este comentata pentru a demonstra legatura dintre tabelul car si tabelul Post prin id
    */
    // model.belongsTo(sequelize.models.Post, {foreignKey: 'id_post', onDelete: 'set null'});
    return model;
  };
  