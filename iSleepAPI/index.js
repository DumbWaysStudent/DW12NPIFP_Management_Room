//express modul
const express = require('express')
//init bodyparser
const bodyParser = require('body-parser')
require('express-group-routes')

//use express in app variable
const app = express()
//define the server port
const port = process.env.PORT || 4000

//allow this app to receive incoming json request
app.use(bodyParser.json())

// const UserController = require('./controllers/users')

//create the homepage route
//app dari express app variable
//req for request & res for respon
app.get('/', (req, res) => {
    res.send('API SUCCESS')
})
// app.get('/todos', (req, res) => {
//     res.send(todos)
// })

//controllers
const AuthController = require('./controllers/auth')
const GenresController = require('./controllers/genres')
const ComicsController = require('./controllers/comics')
const ListEpisodesController = require('./controllers/listepisodes')
const DetailEpisodesController = require('./controllers/detailepisodes')
const MyFavoritesController = require('./controllers/myfavorites')
const MyWebtoonsController = require('./controllers/mywebtoon')
const UserController = require('./controllers/users')

//middleware
const { authenticated } = require('./middleware')

app.group('/api/v1', (router) => {
    //API login & register
    router.post('/login', AuthController.login) //for Log In
    router.post('/register', AuthController.register) //for Sign Up

    //API genre
    router.get('/genres', GenresController.index)
    router.post('/genre', GenresController.store)
    router.get('/genre/:id', GenresController.show)
    router.patch('/genre/:id', GenresController.update)
    router.delete('/genre/:id', GenresController.delete)
    router.get('/genre/:id/comics', GenresController.showComics)

    //API comics
    //SELAIN SEARCH JUGA MENAMPILKAN SEMUA DATA KOMIK
    router.get('/comics', ComicsController.index)

    //API List Episode
    router.get('/comic/:id/episodes', ListEpisodesController.showWebtoon)

    //API Detail Episodes
    router.get('/comic/:id_comic/episode/:id_episode/images', DetailEpisodesController.showDetailEpisodes)

    //API MY WEBTOON CREATION

    //MENAMPILKAN KOMIK MILIK/BUATAN KITA SAJA
    router.get('/user/:id/comics', authenticated, MyWebtoonsController.showMyWebtoon)
    //MEMBUAT KOMIK MILIK SENDIRI
    router.post('/user/:id/comic', authenticated, MyWebtoonsController.storeMyWebtoon)
    //UPDATE KOMIK MILIK SENDIRI
    router.patch('/user/:id_user/comic/:id_comic', authenticated, MyWebtoonsController.updateMyWebtoon)
    //DELETE KOMIK MILIK SENDIRI
    router.delete('/user/:id_user/comic/:id_comic', authenticated, MyWebtoonsController.deleteMyWebtoon)

    //API EPISODES MY WEBTOON CREATION

    // GET SEMUA DETAIL KOMIK DARI KOMIK KITA SENDIRI
    router.get('/user/:id_user/comic/:id_comic/episodes', authenticated, MyWebtoonsController.showDetailMyWebtoon)
    //MEMBUAT EPISODES DARI KOMIK KITA SENDIRI
    router.post('/user/:id_user/comic/:id_comic/episode', authenticated, MyWebtoonsController.storeMyEpisode)
    //UPDATE DETAIL EPISODE KOMIK SENDIRI
    router.patch('/user/:id_user/comic/:id_comic/episode/:id_episode', authenticated, MyWebtoonsController.updateMyEpisode)
    //DELTE EPISODE KOMIK SENDIRI
    router.delete('/user/:id_user/comic/:id_comic/episode/:id_episode', authenticated, MyWebtoonsController.deleteMyEpisode)

    //API DETAIL EPISODE / IMAGE KOMIK KITA SENDIRI

    //GET SEMUA DETAIL EPISODE KOMIK KITA SENDIRI
    router.get('/user/:id_user/comic/:id_comic/episode/:id_episode/images', authenticated, MyWebtoonsController.showDetailEpisodes)
    //MEMBUAT DETAIL EPISODE KITA SENDIRI
    router.post('/user/:id_user/comic/:id_comic/episode/:id_episode/image', authenticated, MyWebtoonsController.storeDetailMyWebtoon)
    //DELETE DETAIL EPISODE KITA
    router.delete('/user/:id_user/comic/:id_comic/episode/:id_episode/image/:id_image', authenticated, MyWebtoonsController.deleteDetailMyWebtoon)

    //API My Favorite
    // router.get('/favorite/:id', MyFavoritesController.getMyFavorite)
    router.get('/favorite/user/:id', authenticated, MyFavoritesController.getMyFavorite)
    router.post('/favorite/user/:id_user/comic/:id_comic', authenticated, MyFavoritesController.storeMyFavorite)


    //user API
    router.get('/user/:id', authenticated, UserController.show)
    // router.get('/users', UserController.index)
    // router.post('/user', UserController.store)
    // router.patch('/user/:id', UserController.update)
    // router.delete('/user/:id', UserController.delete)
})

app.listen(port, () => console.log(`Listening On Port ${port}!`))