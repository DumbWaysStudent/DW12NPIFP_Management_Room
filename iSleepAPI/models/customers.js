'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define('customers', {
    name: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  customers.associate = function (models) {
    // customers.belongsTo(models.orders, {
    //   foreignKey: 'id',
    //   as: 'Customer'
    // })
  };
  return customers;
};