const express = require('express')
const app = express()
const port = 8080
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./config/db/db')
db.connectdb()

const authController = require('./config/controllers/authController')

const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const salesRouter = require('./routes/sales');

const authCilentRouter = require('./routes/client_api/auth_client');
const productCilentRouter = require('./routes/client_api/product_client');
const orderCilentRouter = require('./routes/client_api/order_client');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cookie-parser
app.use(cookieParser())

//setup đường dẫn file tĩnh
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

//logger with morgan
app.use(logger('dev'));

//ghi đè phương thức
app.use(methodOverride('_method'))

//Phân luồng
//Admin
app.use('/',indexRouter);
app.use('/dashboard',authController.checklogin, dashboardRouter);
app.use('/users',authController.checklogin, usersRouter);
app.use('/products',authController.checklogin, productsRouter);
app.use('/orders',authController.checklogin, ordersRouter);
app.use('/sales',authController.checklogin, salesRouter);

//Client
app.use('/authCilent', authCilentRouter);
app.use('/productCilent', productCilentRouter);
app.use('/orderCilent', orderCilentRouter);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})