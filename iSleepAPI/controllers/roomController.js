const models = require('../models')
const Rooms = models.rooms

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