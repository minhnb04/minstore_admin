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

const secretKey = makeKey(8)

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
                const token = jwt.sign({ _id: data._id }, secretKey, { expiresIn: '15m' });
                console.log(data);
                console.log(token);

                res.cookie('token', token, { maxAge: 900000, httpOnly: true });
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
            var token = req.cookies.token
            var result = jwt.verify(token, secretKey)

            console.log(result);
            
            await User.findOne({_id:result._id})
            .then((user)=>{
                res.userlogin = user
            })
            .catch((error)=>{
                console.log(error);
            })

            console.log("res.data: ",res.data);

            if (result) {
                next()
            }
        } catch (error) {
            res.render('login', { title: 'LogIn' })
        }
 
    }

    loginSuccessfully(req, res, next) {
        res.redirect('/')
    }

}

module.exports = new AuthController;