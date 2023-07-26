const User = require('../../models/user');
const Product = require('../../models/product');
const Order = require('../../models/order');


class AnalysisController {

    index(req, res, next) {
        const userlogin = req.userlogin
        const salesByYear = res.salesByYear
        const totalMoney = res.totalMoney
        const todaySales = res.todaySales
        const newOrders = res.newOrders
        res.render('dashboard', { title: 'Dashboard', userlogin, salesByYear, totalMoney, todaySales, newOrders});
    }

    async getSalesByYear(req, res, next) {
        var salesByYear = []
        var startDate;
        var endDate;
        for (var i = 1; i <= 12; ++i) {
            if (i == 2) {
                startDate = '2023-' + String(i).padStart(2, '0') + '-01';
                endDate = '2023-' + String(i).padStart(2, '0') + '-28';
            } else if (i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) {
                startDate = '2023-' + String(i).padStart(2, '0') + '-01';
                endDate = '2023-' + String(i).padStart(2, '0') + '-31';
            } else {
                startDate = '2023-' + String(i).padStart(2, '0') + '-01';
                endDate = '2023-' + String(i).padStart(2, '0') + '-30';
            }

            await Order.find({
                date: { $gte: startDate, $lte: endDate},
                orderStatus: true
            }).then((results) => {
                salesByYear.push(results)
            }).catch((error) => {
                console.error(error);
            })
        }
        res.salesByYear = salesByYear.map((sales)=>{
            var salesByMonth = 0;
            sales.forEach(element => {
                salesByMonth+=element.priceOrder
            });
            return salesByMonth
        })

        var totalMoney = 0
        salesByYear.forEach(element => {
            element.forEach(order => {
                totalMoney += order.priceOrder
            })
        });
        res.totalMoney = totalMoney

        next()
    } 

    async getSalesByDay(req, res, next){
        var todaySales = 0
        var newOrders = 0
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')

        await Order.find({
            date: { $regex: `${year}-${month}-${day}` },
            orderStatus: true
        }).then((results) => {
            results.forEach((element, i) => {
                todaySales += element.priceOrder
                newOrders += (i+1)
            });
        }).catch((error) => {
            console.error(error);
        })
        res.todaySales = todaySales
        res.newOrders = newOrders
        next()
    }

}

module.exports = new AnalysisController;
