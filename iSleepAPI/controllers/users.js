const models = require('../models')
const User = models.users

exports.index = (req, res) => {
    User.findAll().then(users => res.send(users))
}

exports.show = (req, res) => {
    User.findOne({ id: req.params.id }).then(user => res.send(user))
}

exports.store = (req, res) => {
    User.findOrCreate(req.body).then(result => {
        res.send({
            message: "success",
            result
        })
    })
}

exports.update = (req, res) => {
    User.update(
        req.body,
        { where: { id: req.params.id } }
    ).then(result => {
        res.send({
            message: "success",
            result
        })
    })
}

exports.delete = (req, res) => {
    User.destroy(
        { where: { id: req.params.id } }).then(result => {
            res.send({
                message: "success",
                result
            })
        })
}