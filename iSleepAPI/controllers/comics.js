const models = require('../models')
const Webtoons = models.comics
const Users = models.users
const Genres = models.genres
// const Genres = models.genres
const Sequelize = require('sequelize')
const Op = Sequelize.Op;


//SELAIN SEARCH JUGA MENAMPILKAN SEMUA DATA KOMIK
exports.index = (req, res) => {
    const { title } = req.query
    if (title) {
        //Untuk Pencarian title
        Webtoons.findAll({
            where: { title: { [Op.like]: `%${title}%` } },
            include: [
                {
                    model: Users,
                    as: 'user_createdBy',
                    attributes: ['username', 'email']
                },
                {
                    model: Genres,
                    as: 'genre_name',
                    attributes: ['title']
                }
            ]
        })
            .then(result => res.send(result))
    } else {
        //jika tidak ada maka dikeluarkan semua value
        Webtoons.findAll({
            include: [
                {
                    model: Users,
                    as: 'user_createdBy',
                    attributes: ['username', 'email']
                },
                {
                    model: Genres,
                    as: 'genre_name',
                    attributes: ['title']
                }
            ]
        }).then(result => res.send(result))
    }
}

// Webtoons.findAll({
//     include: [{
//         model: Users,
//         as: "created_by",
//     }
//         // {
//         //     model: Genres,
//         //     as: "genre_id"}
//     ]
// }).then(result => res.send(result))


// exports.show = (req, res) => {
//     Webtoons.findOne({
//         where: { id: req.params.id },
//         include: [{
//             model: Users,
//             as: "created_by"
//         }]
//     }).then(result => res.send(result))
// }

// exports.store = (req, res) => {
//     Webtoons.create(req.body).then(result => {
//         res.send({
//             message: "success",
//             result
//         })
//     })
// }

// exports.update = (req, res) => {
//     Webtoons.update(
//         req.body,
//         { where: { id: req.params.id } }
//     ).then(result => {
//         res.send({
//             message: "success",
//             result
//         })
//     })
// }

// exports.delete = (req, res) => {
//     Webtoons.destroy(
//         { where: { id: req.params.id } }).then(result => {
//             res.send({
//                 message: "success",
//                 result
//             })
//         })
// }