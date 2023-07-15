const User = require('../../models/user')
var jwt = require('jsonwebtoken');


class IndexController {
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
                const token = jwt.sign({ _id: data._id }, "pw", { expiresIn: '15m' });
                console.log(data, token);

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

    checklogin(req, res, next) {
        try {
            var token = req.cookies.token
            var result = jwt.verify(token, 'pw')
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

module.exports = new IndexController;