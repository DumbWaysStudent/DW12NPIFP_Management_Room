const models = require('../models')
const Webtoons = models.comics
const ListEpisodes = models.listEpisodes
const DetailEpisodes = models.detailepisodes
const Users = models.users

//MY WEBTOON CREATION

//MENAMPILKAN KOMIK MILIK/BUATAN KITA SAJA
exports.showMyWebtoon = (req, res) => {
    Webtoons.findAll({
        where: { createdBy: req.params.id }
    })
        .then(result => res.send(result))
        .catch(err => res.send({
            message: 'tidak bisa menampilkan komik',
            err
        }))
}

//MEMBUAT KOMIK MILIK SENDIRI
exports.storeMyWebtoon = (req, res) => {
    Webtoons.create(req.body)
        .then(
            result => res.send(result)
        )
        .catch(err => res.send({
            message: 'tidak bisa membuat komik',
            err
        }))
}

exports.updateMyWebtoon = (req, res) => {
    const { title, description, genre, imgComics, createdBy } = req.body
    Webtoons.update({
        title,
        description,
        genre,
        imgComics,
        createdBy
    },
        {
            where: { id: req.params.id_comic, createdBy: req.params.id_user }
        }).then(res.send(req.body))
        .catch(err => res.send({
            message: 'tidak bisa mengupdate komik',
            err
        }))
}

exports.deleteMyWebtoon = (req, res) => {
    const idUser = req.params.id_user
    const idComic = req.params.id_comic
    Webtoons.destroy({
        where: { id: idComic, createdBy: idUser }
    })
        .then(res.send({
            id: idComic,
            message: 'Komik Telah Dihapus'
        }))
        .catch(err => res.send({
            message: 'tidak bisa menghapus komik',
            err
        }))
}


//EPISODES MY WEBTOON CREATION

// url = {your_host}/api/v1/user/{user_id}/webtoon/{webtoon_id}/episodes
// GET SEMUA DETAIL KOMIK KITA SENDIRI
exports.showDetailMyWebtoon = (req, res) => {
    const idUser = req.params.id_user;
    const idComic = req.params.id_comic;
    ListEpisodes.findAll({ where: { idUser: idUser, idComics: idComic } }).then(result => res.send(result))

}

//MEMBUAT EPISODES DARI KOMIK KITA SENDIRI
exports.storeMyEpisode = (req, res) => {
    const { imgListEpisodes, title } = req.body;
    const idUser = req.params.id_user;
    const idComic = req.params.id_comic;

    ListEpisodes.create({
        idUser: idUser,
        idComics: idComic,
        title,
        imgListEpisodes
    })
        .then(result => res.send(result))
}

//UPDATE DETAIL EPISODE KOMIK SENDIRI
exports.updateMyEpisode = (req, res) => {
    const { imgListEpisodes, title } = req.body;
    const idUser = req.params.id_user;
    const idComic = req.params.id_comic;

    ListEpisodes.update({
        idUser: idUser,
        idComics: idComic,
        title,
        imgListEpisodes
    }, {
        where: {
            idUser: idUser,
            idComics: idComic,
            id: req.params.id_episode
        }
    }
    )
        .then(res.send({ ...req.body }))
}

//DELETE EPISODE KOMIK SENDIRI
exports.deleteMyEpisode = (req, res) => {
    const { id_episode } = req.params;
    const idUser = req.params.id_user;
    const idComic = req.params.id_comic;

    ListEpisodes.destroy({
        where: {
            idUser: idUser,
            idComics: idComic,
            id: id_episode
        }
    })
        .then(res.send({ ...req.body }))
}


//DETAIL EPISODE / IMAGES 

//GET SEMUA DETAIL EPISODE BERDASARKAN EPISODE

exports.showDetailEpisodes = (req, res) => {
    const idUsers = req.params.id_user
    const idComics = req.params.id_comic
    const idListEpisodes = req.params.id_episode

    DetailEpisodes.findAll({
        where: { idUsers, idComics, idListEpisodes }
    })
        .then(episodes => res.send(episodes))
        .catch(err => res.send({
            err,
            message: "Maaf Terjadi Kesalahan"
        }))

}
// //GET SEMUA DETAIL EPISODE BERDASARKAN EPISODE

// exports.showDetailEpisodes = (req, res) => {
//     const webtoonId = req.params.id_comic
//     const episodeId = req.params.id_episode

//     ListEpisodes.findOne({
//         where: { idComics: webtoonId }
//     })
//         .then(() => {
//             DetailEpisodes.findAll({
//                 where: { idDetailComics: episodeId },
//                 // attributes: ['id', 'page', 'image'],
//                 include: [{
//                     model: ListEpisodes,
//                     as: 'detailComicId'
//                 }]
//             })
//                 .then(episodes => res.send(episodes))
//         })

// }

//MEMBUAT DETAIL EPISODE DARI KOMIK KITA SENDIRI
exports.storeDetailMyWebtoon = (req, res) => {
    const { image, page } = req.body
    const idUsers = req.params.id_user
    const idComics = req.params.id_comic
    const idListEpisodes = req.params.id_episode

    DetailEpisodes.create({
        idUsers,
        idComics,
        idListEpisodes,
        page,
        image
    })
        .then(result => res.send(result))
        .catch(err => res.send({
            message: 'tidak bisa menambahkan episode',
            err
        }))
}

//DELETE DETAIL EPISODE DARI KOMIK KITA SENDIRI
exports.deleteDetailMyWebtoon = (req, res) => {
    const imageId = req.params.id_image

    DetailEpisodes.destroy({
        where: { id: imageId }
    })
        .then(res.send({
            message: 'Berhasil di delete'
        }))
        .catch(err => res.send({
            message: 'tidak bisa menghapus episode',
            err
        }))
}