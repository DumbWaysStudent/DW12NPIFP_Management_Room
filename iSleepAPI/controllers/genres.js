const models = require('../models')
const genre = models.genres
const Comics = models.comics

exports.index = (req, res) => {
    genre.findAll()
        .then(result => res.send({
            message: 'Success',
            result
        }))
        .catch(err => res.send({
            message: "Sorry, it's Wrong",
            err
        }))
}

exports.show = (req, res) => {
    genre.findOne({ id: req.params.id }).then(result => res.send(result))
}

exports.showComics = (req, res) => {
    genre.findOne({
        where: { id: req.params.id },
        include: [{
            model: Comics,
            key: genre
        }]
    }).then(result => res.send(result))
}

exports.store = (req, res) => {
    const { title } = req.body
    genre.findOrCreate({
        where: { title },
        default: {
            createdAt: new Date(),
            updateAt: new Date()
        }
    }).then(result => {
        res.send({
            message: "Success",
            result
        })
    }).catch(err => res.send({
        message: "Sorry, it's Wrong",
        err
    }))
}

exports.update = (req, res) => {
    genre.update(
        req.body,
        { where: { id: req.params.id } }
    ).then(result => {
        res.send({
            message: "success",
            result
        })
    }).catch(err => {
        res.send({
            message: "Sorry, it's wrong",
            err
        })
    })
}

exports.delete = (req, res) => {
    genre.destroy(
        { where: { id: req.params.id } }).then(result => {
            res.send({
                message: "success",
                result
            })
        }).catch(err => res.send({
            message: "Sorry, it's wrong",
            err
        }))
}