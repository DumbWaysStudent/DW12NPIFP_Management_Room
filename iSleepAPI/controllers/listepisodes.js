const models = require('../models')
const ListEpisodes = models.listEpisodes

//GET SEMUA DETAIL KOMIK
exports.showWebtoon = (req, res) => {
    ListEpisodes.findAll({
        where: { idComics: req.params.id }
    })
        .then(result => res.send(result))
        .catch(err => res.send({
            err,
            message: 'Sorry, its wrong'
        }))
}