const models = require('../models')
const Orders = models.orders


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

exports.store = (req, res) => {
    Orders.create({
        idCustomer: req.body.idCustomer,
        idRoom: req.body.idRoom,
        is_done: false,
        is_booked: true,
        duration: req.body.duration,
        order_end_time: new Date()
    })
        .then(result => res.send(result))
        .catch(error => res.send(error))
}

exports.update = (req, res) => {
    Orders.destroy({
        where: { idRoom: req.body.idRoom }
    })
        .then(result => res.send({
            message: 'Success Check Out',
            result
        }))
        .catch(error => res.send({
            message: 'Cannot Check Out',
            error
        }))
}

