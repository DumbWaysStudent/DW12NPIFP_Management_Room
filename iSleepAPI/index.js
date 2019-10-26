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

//controllers
const AuthController = require('./controllers/authController')
const RoomController = require('./controllers/roomController')
const CustomerController = require('./controllers/customerController')
const orderController = require('./controllers/orderController')

//middleware
const { authenticated } = require('./middleware')

app.group('/api/v2', (router) => {
    //API login & register
    router.post('/login', AuthController.login) //for Log In
    router.post('/register', AuthController.register) //for Register

    //API Room
    router.get('/rooms', authenticated, RoomController.index) //untuk mendapatkan semua room
    router.post('/room', authenticated, RoomController.store) //untuk membuat room baru
    router.patch('/room/:id', authenticated, RoomController.update) //untuk merubah room

    //API Customer
    router.get('/customers', authenticated, CustomerController.index) //untuk mendapatkan semua customer
    router.post('/customer', authenticated, CustomerController.store) //untuk membuat customer baru
    router.patch('/customer/:id', authenticated, CustomerController.update) //untuk merubah semua customer

    //API Order
    // router.get('/checkin', authenticated, orderController.index) //untuk mendapatkan semua order
    // router.post('/orders', authenticated, orderController.store) //untuk membuat order baru
    // router.patch('/order/:id', authenticated, orderController.update) //untuk checkout order
})

app.listen(port, () => console.log(`Listening On Port ${port}!`))