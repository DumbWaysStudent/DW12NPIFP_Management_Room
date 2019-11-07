const models = require('../models')
const Customers = models.customers

exports.index = (req, res) => {
    Customers.findAll({})
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.store = (req, res) => {
    const { name, idNumber, phone } = req.body
    Customers.findOrCreate({
        where: { name },
        defaults: {
            name: name,
            idNumber: idNumber,
            phone: phone,
            image: req.file.filename,
            createdAt: new Date(),
            updateAt: new Date()
        }
    }).then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.update = (req, res) => {
    var { name, idNumber, phone } = req.body
    data = { name: name, idNumber: idNumber, phone: phone, image: req.file.filename }

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