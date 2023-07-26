
class IndexController {

    index(req, res){
        const userlogin = req.userlogin
        const salesByYear = res.salesByYear;
        const totalMoney = res.totalMoney
        const todaySales = res.todaySales
        const newOrders = res.newOrders
        var tokenAdmin = req.cookies.tokenAdmin
        if(tokenAdmin){
          res.render('index', { title: 'MinStore', userlogin, salesByYear, totalMoney, todaySales, newOrders});
        }
        else{
          res.redirect('/login')
        }
    }


}

module.exports = new IndexController;