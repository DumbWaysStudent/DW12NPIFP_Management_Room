const jwt = require('jsonwebtoken')
const models = require('../models')
const User = models.users

exports.login = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({ where: { username, password } })
        .then(user => {
            if (user) {
                const token = jwt.sign({ userId: user.id }, 'my-secret-key')
                const id = user.id
                res.send({
                    message: "success",
                    id,
                    username,
                    token,
                })
            } else {
                res.send({
                    error: true,
                    message: "Wrong Email or Password"
                })
            }
        })
}

exports.register = async (req, res) => {
    const { username, password } = req.body
    User.findOrCreate({
        where: { username },
        defaults: {
            username: username,
            password: password,
            createdAt: new Date(),
            updateAt: new Date()
        }
    }).then(result => res.send(result))
        .catch(result => res.send(result))
}

exports.getUser = (req, res) => {
    const idUser = req.params.id
    User.findOne({ where: { id: idUser } })

        .then(result => res.send(result))
        .catch(err => res.send(err))
}


exports.editUser = async (req, res) => {
    var { username, password, userImg } = req.body
    data = {
        username,
        password,
        userImg
    }
    User.update(
        data,
        {
            where: { id: req.params.id },
            defaults: {
                username: username,
                password: password,
                userImg: userImg,
                updateAt: new Date()
            }
        }).then(result => res.send(result))
        .catch(result => res.send(result))
}
