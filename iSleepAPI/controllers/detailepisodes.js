const models = require('../models')
// const Webtoons = models.comics
const ListEpisodes = models.listEpisodes
const DetailEpisodes = models.detailepisodes

exports.showDetailEpisodes = (req, res) => {
    const webtoonId = req.params.id_comic
    const episodeId = req.params.id_episode

    DetailEpisodes.findAll({
        where: { idComics: webtoonId, idListEpisodes: episodeId }
    })
        .then((result) => {
            res.send(
                result
            )
        })
}
// exports.showEpisodes = (req, res) => {
//     const webtoonId = req.params.id_comic
//     const episodeId = req.params.id_episode

//     ListEpisodes.findOne({
//         where: { idComics: webtoonId }
//     })
//         .then(() => {
//             DetailEpisodes.findAll({
//                 where: { idDetailComics: episodeId },
//                 attributes: ['id', 'page', 'image'],
//                 include: [{
//                     model: idListEpisodes,
//                 }]
//             })
//                 .then(episodes => res.send(episodes))
//         })
// }