module.exports = (sequelize, DataType) => {
    let model = sequelize.define('Junction', {                                //define the model for the "person" table using Sequelize
      id_person: {
        type: DataType.INTEGER,
        references: {
          model: 'Person', // Numele tabelului Person
          key: 'id'
        }
      },
      id_car: {
        type: DataType.INTEGER,
        references: {
          model: 'Car', // Numele tabelului Car
          key: 'id'
        }
      }
    }, {
      timestamps: true
    });
//Definirea relației dintre Junction și Person
  model.belongsTo(sequelize.models.Person, {
    foreignKey: 'id_person'
,    onDelete: 'CASCADE'
  });
 
  // Definirea relației dintre Junction și Car
  model.belongsTo(sequelize.models.Car, {
    foreignKey: 'id_car'
    ,onDelete: 'CASCADE' 
  });

    /*
      Aceasta linie este comentata pentru a demonstra legatura dintre tabelul person si tabelul Post prin id
    */
    // model.belongsTo(sequelize.models.Post, {foreignKey: 'id_post', onDelete: 'set null'});
    return model;
  };
  