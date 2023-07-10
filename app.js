const express = require('express')
const app = express()
const port = 8080
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

const db = require('./config/db/db')
db.connectdb()

const indexRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const salesRouter = require('./routes/dashboard');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup đường dẫn file tĩnh
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

//ghi đè phương thức
app.use(methodOverride('_method'))

//Phân luồng
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/sales', salesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})