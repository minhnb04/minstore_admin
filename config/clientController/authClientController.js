const User = require('../../models/user');
var jwt = require('jsonwebtoken');

const secretKey = "minhnb04"


class UserClientController {

    showLogin(req, res, next) {
        res.render('login', { title: 'LogIn' })
    }
    // authCilent/login
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            // Xử lý đăng nhập người dùng
            const user = await User.findOne({ username: username, status: true });

            if (user) {
                if (user.password == password) {
                    const tokenMember = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '15m' });

                    var userlogin = {
                        _id: user._id,
                        fullname: user.fullname,
                        phoneNumber: user.phoneNumber,
                        email: user.email,
                        birthday: user.birthday,
                        gender: user.gender,
                        avatarImage: user.avatarImage
                    }
                    res.json({ tokenMember, userlogin});
                } else {
                    // res.status(401).json({ error: 'Invalid credentials.' });
                    return res.json({ error: 'Incorrect password' });
                }

            } else {
                // res.status(404).json({ error: 'User not found' });
                return res.json({ error: 'User not found' });
            }

        } catch (error) {
            return res.json({ error: 'Login failed' });
        }
    }

    async checklogin(req, res, next) {

        try {
            const tokenMember = req.body.tokenMember
            var result = jwt.verify(tokenMember, secretKey)
            res.secretKey = secretKey
            await User.findOne({_id:result._id})
            .then((user)=>{
                var userlogin = {
                    _id: user._id,
                    fullname: user.fullname,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    birthday: user.birthday,
                    gender: user.gender,
                    avatarImage: user.avatarImage
                }
                return res.json({userlogin}) 
            })
            .catch((error)=>{
                console.log(error);
            })

        } catch (error) {
            return res.json('Not Login');
        }

    }
}


module.exports = new UserClientController;