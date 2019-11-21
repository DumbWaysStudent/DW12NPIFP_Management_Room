const models = require('../models')
const myFavorite = models.my_favorite
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

// exports.getMyFavorite = (req, res) => {
//     const favorite = req.query.isFavorite
//     const user = req.params.id

//     if (favorite == 'true') {
//         myFavorite.findAll({
//             where: { isFavorite: 1, user_id: user }
//         }).then(result => res.send(result))
//     } else {
//         myFavorite.findAll({
//             where: { isFavorite: 0, user_id: user }
//         }).then(result => res.send(result))
//     }
// }
exports.getMyFavorite = (req, res) => {
    const user = req.params.id
    const isFavorite = req.query.isFavorite

    if (isFavorite == 'true') {
        myFavorite.findAll({
            where: { user_id: user, isFavorite: true }
        })
            .then(result => res.send({ result, isFavorite }))
    } else if (isFavorite == 'false') {
        myFavorite.findAll({
            where: { user_id: user, isFavorite: false }
        })
            .then(result => res.send({ result, isFavorite }))
    } else {
        res.send('Maaf Data salah')
    }
}

exports.storeMyFavorite = (req, res) => {
    const user = req.params.id_user
    const idComic = req.params.id_comic
    const isFavorite = 1

    const data = {
        user_id: user,
        comic_id: idComic,
        isFavorite
    }

    myFavorite.findOrcreate({
        data,
        where: { user_id: user, comic_id: idComic }

    })
        .then(res.send({
            message: 'Berhasil'
        }))
        .catch(res.send({
            message: "Maaf Error"
        })) // TODO(Andika): Fix find Or Create  My Favorite
}