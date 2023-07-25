const User = require('../../models/user');
const Product = require('../../models/product');
const Order = require('../../models/order');


class AnalysisController {

    index(req, res, next) {
        const salesByYear = res.salesByYear;
        const userlogin = req.userlogin
        res.render('dashboard', { title: 'Dashboard', userlogin, salesByYear });
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
        next()
    }

}

module.exports = new AnalysisController;
