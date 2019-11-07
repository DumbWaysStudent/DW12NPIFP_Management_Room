'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    roomname: DataTypes.STRING,
    imageRoom: DataTypes.STRING
  }, {});
  rooms.associate = function (models) {
    // rooms.belongsTo(models.orders, {
    //   foreignKey: 'id',
    //   as: 'Room'
    // })

    rooms.hasMany(models.orders, {
      foreignKey: 'idRoom',
      as: 'Orders'
    })
    // rooms.hasMany(models.customers, {
    //   foreignKey: 'idCustomer',
    //   as: 'Customer'
    // })
  };
  return rooms;
};