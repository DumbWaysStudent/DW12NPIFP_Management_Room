const models = require('../models')
const Rooms = models.rooms
const Orders = models.orders
const Customers = models.customers

exports.index = (req, res) => {
    Rooms.findAll({})
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.store = (req, res) => {
    const { roomname } = req.body
    Rooms.findOrCreate({
        where: { roomname },
        defaults: {
            roomname: roomname,
            createdAt: new Date(),
            updateAt: new Date()
        }
    }).then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.update = (req, res) => {
    Rooms.update(
        req.body,
        {
            where: { id: req.params.id },
            defaults: {
                updateAt: new Date()
            }
        }
    )
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.checkin = (req, res) => {
    Rooms.findAll({
        include: [
            {
                model: Orders,
                as: 'Orders',
                // where: { is_done: false },
                include: [
                    {
                        model: Customers,
                        as: 'Customer'
                    }
                ],
            },
        ],
        order: [
            ['id', 'ASC']
        ]

    }).then(orders => res.send(orders));
};