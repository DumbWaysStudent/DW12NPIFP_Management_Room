'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    roomname: DataTypes.STRING
  }, {});
  rooms.associate = function (models) {
    // rooms.belongsTo(models.orders, {
    //   foreignKey: 'id',
    //   as: 'Room'
    // })

    rooms.hasMany(models.orders, {
      foreignKey: 'id',
      as: 'Orders'
    })
    rooms.hasMany(models.customers, {
      foreignKey: 'id',
      as: 'Customer'
    })
  };
  return rooms;
};