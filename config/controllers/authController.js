const User = require('../../models/user')
var jwt = require('jsonwebtoken');

function makeKey(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const secretKey = "minhnb04"

class AuthController {
    
    showLogin(req, res, next) {
        res.render('login', { title: 'LogIn' })
    }

    login(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({
            username: username,
            password: password,
            status: true
        })
        .then((data) => {
            if (data) {
                const tokenAdmin = jwt.sign({ _id: data._id }, secretKey, { expiresIn: '15m' });
                console.log(data);
                console.log(tokenAdmin);

                res.cookie('tokenAdmin', tokenAdmin, { maxAge: 900000, httpOnly: true });
                next()
            } else {
                return res.json("Login fail")
            }
        })
        .catch((error) => {
            res.status(500).json(error)
        })
    }

    async checklogin(req, res, next) {
        try {
            var tokenAdmin = req.cookies.tokenAdmin
            var result = jwt.verify(tokenAdmin, secretKey)
            res.secretKey = secretKey
            await User.findOne({_id:result._id})
            .then((user)=>{
                req.userlogin = user
                next()
            })
            .catch((error)=>{
                console.log(error);
            })

        } catch (error) {
            res.render('login', { title: 'LogIn' })
        }
 
    }

    checkPermissionManager(req, res, next){
        const role = req.userlogin.role
        console.log(role)
        if(role === 1){
            next()
            req.role == role
        }else{
            console.log('You not permission !!!');
            res.redirect(req.headers.referer)
        }
    }

    checkPermissionStaff(req, res, next){
        const role = req.userlogin.role
        console.log(role)
        if(role === 1 || role === 2){
            next()
            req.role == role
        }else{
            console.log('You not permission !!!');
            res.redirect(req.headers.referer)
        }
    }

    checkPermissionMember(req, res, next){
        const role = req.userlogin.role
        console.log(role)
        if(role === 1 || role === 2 || role === 3){
            next()
            req.role == role
        }else{
            console.log('You not permission !!!');
            res.redirect(req.headers.referer)
        }
    }

    loginSuccessfully(req, res, next) {
        res.redirect('/')
    }

}

module.exports = new AuthController;