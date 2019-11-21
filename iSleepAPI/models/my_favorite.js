'use strict';
module.exports = (sequelize, DataTypes) => {
  const my_favorite = sequelize.define('my_favorite', {
    comic_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    isFavorite: DataTypes.BOOLEAN
  }, {});
  my_favorite.associate = function(models) {
    // associations can be defined here
  };
  return my_favorite;
};