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
app.use(bodyParser.json());
app.use('/static', express.static('uploads'));


//multer
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
var upload = multer({ storage: storage });

// const UserController = require('./controllers/users')

//create the homepage route
//app dari express app variable
//req for request & res for respon
app.get('/', (req, res) => {
    res.send('API SUCCESS')
})

//controllers
const AuthController = require('./controllers/authController')
const RoomController = require('./controllers/roomController')
const CustomerController = require('./controllers/customerController')
const OrderController = require('./controllers/orderController')

//middleware
const { authenticated } = require('./middleware')

app.group('/api/v2', (router) => {
    //API login & register
    router.post('/login', AuthController.login) //for Log In
    router.post('/register', AuthController.register) //for Register
    router.get('/user/:id', authenticated, AuthController.getUser) //for Show Detail User
    router.patch('/user/:id', authenticated, AuthController.editUser) //for Show Detail User


    //API Room
    router.get('/rooms', authenticated, RoomController.index) //untuk mendapatkan semua room
    router.post('/room', authenticated, RoomController.store) //untuk membuat room baru
    router.patch('/room/:id', authenticated, RoomController.update) //untuk merubah room
    router.delete('/room/:id', authenticated, RoomController.delete) //untuk delete room

    //API Customer
    router.get('/customers', authenticated, CustomerController.index) //untuk mendapatkan semua customer
    router.post('/customer', authenticated, CustomerController.store) //untuk membuat customer baru
    router.patch('/customer/:id', authenticated, CustomerController.update) //untuk merubah semua customer

    //API Order
    router.get('/checkin', authenticated, RoomController.checkin) //untuk mendapatkan semua order
    router.post('/orders', authenticated, OrderController.store) //untuk membuat order baru
    router.delete('/order', authenticated, OrderController.update) //untuk checkout order


})

app.listen(port, () => console.log(`Listening On Port ${port}!`))