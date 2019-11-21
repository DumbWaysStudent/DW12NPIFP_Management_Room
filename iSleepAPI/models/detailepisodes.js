'use strict';
module.exports = (sequelize, DataTypes) => {
  const detailepisodes = sequelize.define('detailepisodes', {
    page: DataTypes.STRING,
    image: DataTypes.STRING,
    idUsers: DataTypes.INTEGER,
    idComics: DataTypes.INTEGER,
    idListEpisodes: DataTypes.INTEGER,
  }, {});
  detailepisodes.associate = function (models) {
    // associations can be defined here
    detailepisodes.belongsTo(models.listEpisodes, {
      foreignKey: 'idListEpisodes'
    });
    detailepisodes.belongsTo(models.comics, {
      foreignKey: 'idComics'
    });

  };
  return detailepisodes;
};