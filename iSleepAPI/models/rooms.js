'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define('rooms', {
    roomname: DataTypes.STRING
  }, {});
  rooms.associate = function (models) {
    rooms.belongsTo(models.orders, {
      foreignKey: 'id',
      idRoom: 'idCustomer'
    })
  };
  return rooms;
};