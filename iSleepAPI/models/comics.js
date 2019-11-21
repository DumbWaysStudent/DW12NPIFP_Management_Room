'use strict';
module.exports = (sequelize, DataTypes) => {
  const comics = sequelize.define('comics', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    genre: DataTypes.INTEGER,
    imgComics: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  comics.associate = function (models) {
    // associations can be defined here
    comics.belongsTo(models.users, { as: 'user_createdBy', foreignKey: 'createdBy' });
    comics.belongsTo(models.genres, { as: 'genre_name', foreignKey: 'genre' })
    // comics.hasMany(models.listepisodes, { foreignKey: 'id' })
  };
  return comics;
};