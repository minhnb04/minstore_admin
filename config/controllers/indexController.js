
class IndexController {

    index(req, res){
        const userlogin = req.userlogin
        console.log("userlogin: ",userlogin);
        var tokenAdmin = req.cookies.tokenAdmin
        if(tokenAdmin){
          res.render('index', { title: 'MinStore', userlogin });
        }
        else{
          res.redirect('/login')
          // res.render('login', { title: 'LogIn' })
        }
    }


}

module.exports = new IndexController;