'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    idCustomer: DataTypes.INTEGER,
    idRoom: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    order_end_time: DataTypes.DATE
  }, {});
  orders.associate = function (models) {
    orders.belongsTo(models.customers, {
      foreignKey: 'idCustomer',
      as: 'Customer'
    });


    // orders.hasMany(models.rooms, {
    //   foreignKey: 'id',
    //   as: 'Room',
    // });
  };
  return orders;
};