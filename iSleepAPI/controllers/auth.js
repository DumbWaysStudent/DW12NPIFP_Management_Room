const jwt = require('jsonwebtoken')

const models = require('../models')
const User = models.users

//bisa menggunakan async await atau .then .catch 

exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ where: { email, password } })
        .then(user => {
            if (user) {
                const token = jwt.sign({ userId: user.id }, 'my-secret-key')
                res.send({
                    message: "success",
                    token
                })
            } else {
                res.send({
                    error: true,
                    message: "Wrong Email or Password"
                })
            }
        })
        .catch(err => res.send(err))
}

exports.register = async (req, res) => {
    const { email, username, password, image } = req.body
    const signUp = await User.findOrCreate({
        where: { email },
        defaults: {
            email: email,
            password: password,
            username: username,
            // image: image,
            createdAt: new Date(),
            updateAt: new Date()
        }
    })
        .then({})
    res.send({
        message: "success Sign Up",
    }).catch(err => res.send(err))
    console.log(err)
}
