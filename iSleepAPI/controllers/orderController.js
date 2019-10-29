const models = require('../models')
const Orders = models.orders
const Customers = models.customers
const Rooms = models.rooms


// exports.index = (req, res) => {
//     Orders.findAll({
//         include: [
//             {
//                 model: Customers,
//                 attributes: ['name', 'idNumber', 'phone']
//             },
//             {
//                 model: Rooms,
//                 attributes: ['roomname']
//             },
//         ],
//     }).then(orders => res.send(orders));
// };