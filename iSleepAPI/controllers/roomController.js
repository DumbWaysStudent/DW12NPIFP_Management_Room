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
            imageRoom: req.file.filename,
            createdAt: new Date(),
            updateAt: new Date()
        }
    }).then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.update = (req, res) => {
    var roomname = req.body.roomname;
    const data = { roomname: roomname, imageRoom: req.file.filename }

    Rooms.update(
        data,
        {
            where: { id: req.params.id },
            defaults: {
                roomname: roomname,
                updateAt: new Date()
            }
        }
    )
        .then(result => res.send(result))
        .catch(err => res.send(err))
}
exports.delete = (req, res) => {
    Rooms.destroy({
        where: { id: req.params.id },
    })
        .then(result => { res.send(result) })
        .catch(err => { res.send(err) })
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