const models = require('../models')
const Customers = models.customers

exports.index = (req, res) => {
    Customers.findAll({})
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.store = (req, res) => {
    var { name, idNumber, phone, image } = req.body
    Customers.findOrCreate({
        where: { name },
        defaults: {
            name: name,
            idNumber: idNumber,
            phone: phone,
            image: image,
            createdAt: new Date(),
            updateAt: new Date()
        }
    }).then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.update = (req, res) => {
    var { name, idNumber, phone, image } = req.body
    const data = {
        name,
        idNumber,
        phone,
        image
    }

    Customers.update(
        data,
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
// exports.update = (req, res) => {
//     Customers.update(
//         req.body,
//         {
//             where: { id: req.params.id },
//             defaults: {
//                 updateAt: new Date()
//             }
//         }
//     )
//         .then(result => res.send(result))
//         .catch(err => res.send(err))
// }