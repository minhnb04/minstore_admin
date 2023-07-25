
class IndexController {

    index(req, res){
        const userlogin = req.userlogin
        const salesByYear = res.salesByYear;
        console.log("userlogin: ",userlogin);
        var tokenAdmin = req.cookies.tokenAdmin
        if(tokenAdmin){
          res.render('index', { title: 'MinStore', userlogin, salesByYear });
        }
        else{
          res.redirect('/login')
        }
    }


}

module.exports = new IndexController;