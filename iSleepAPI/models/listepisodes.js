'use strict';
module.exports = (sequelize, DataTypes) => {
  const listEpisodes = sequelize.define('listEpisodes', {
    title: DataTypes.STRING,
    imgListEpisodes: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    idComics: DataTypes.INTEGER
  }, {});
  listEpisodes.associate = function (models) {
    // associations can be defined here
    listEpisodes.belongsTo(models.comics, {
      as: 'Comics',
      foreignKey: 'idComics'
    })
  };
  return listEpisodes;
};