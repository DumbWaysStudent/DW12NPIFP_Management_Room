const models = require('../models')
const Orders = models.orders


exports.store = (req, res) => {
    const { roomname } = req.body
    Orders.findOrCreate({
        where: { roomname },
        defaults: {
            roomname: roomname,
            createdAt: new Date(),
            updateAt: new Date()
        }
    }).then(result => res.send(result))
        .catch(err => res.send(err))
}