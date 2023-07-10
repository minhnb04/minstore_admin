
const User = require('../../models/user');
const fs = require('fs');

class UserController {

    async index(req, res, next) {
        await User.find()
            .then((users) => {
                var lsUser = users.map(function (user) {
                    var date = user.birthday
                    date = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)
                    return {
                        _id: user._id,
                        employeeCode: user.employeeCode,
                        fullname: user.fullname,
                        username: user.username,
                        password: user.password,
                        role: user.role,
                        phoneNumber: user.phoneNumber,
                        email: user.email,
                        avatarImage: user.avatarImage,
                        birthday: date,
                        gender: user.gender,
                        status: user.status
                    }
                })
                var usersJSON = JSON.stringify(lsUser)
                res.render('users', { title: 'User Management', lsUser: lsUser, usersJSON: usersJSON})
            })
            .catch((error) => {
                next(error)
            })

    }

    async addUser(req, res, next) {

        if(req.body.employeeCode
            && req.body.fullname
            && req.body.username
            && req.body.password
            && req.body.phoneNumber
            && req.body.email
            && req.body.birthday
            && req.body.gender
            && req.file
        ){
            var user = new User(
                {
                    employeeCode: req.body.employeeCode,
                    fullname: req.body.fullname,
                    username: req.body.username,
                    password: req.body.password,
                    phoneNumber: req.body.phoneNumber,
                    email: req.body.email,
                    birthday: req.body.birthday,
                    gender: req.body.gender,
                    avatarImage: req.file.filename,
                    role: 2,
                    status: true,
                })

            try {
                await user.save()
                    .then((result) => {
                        console.log('User created:', result);
                        res.redirect('/users')
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                        res.json(error)
                    });
            }catch (err) {
                next(err);
            }

        }else {
            console.log("Yêu cầu nhập đầy đủ thông tin!")
        }

    }


    async updateUser(req, res, next) {
        try{
            const currentUser = await User.findById(req.params.id)
            const oldavatarImage = currentUser.avatarImage;
            var image;
            if(req.file){
                image = req.file.filename
            }else {
                image = currentUser.avatarImage

            }
            await User.updateOne({_id: req.params.id},
                {
                    employeeCode: req.body.employeeCode,
                    fullname: req.body.fullname,
                    username: req.body.username,
                    password: req.body.password,
                    phoneNumber: req.body.phoneNumber,
                    email: req.body.email,
                    birthday: req.body.birthday,
                    gender: req.body.gender,
                    avatarImage: image,
                    role: 2,
                    status: req.body.status,
                }
            )
                .then(function (){
                    if (oldavatarImage !== image) {
                        fs.unlinkSync('uploads/userImage/'+oldavatarImage);
                    }
                    res.redirect('/users')
                })
                .catch(next)
        }catch (err) {
            console.error(err);
        }
    }

    async deleteUser(req, res, next) {
        const currentUser = await User.findById(req.params.id)
        const oldavatarImage = currentUser.avatarImage;
        User.deleteOne({ _id: req.params.id })
        .then(()=>{
            fs.unlinkSync('uploads/userImage/'+oldavatarImage);
            return  res.redirect('/users')
        })
        .catch(next)
    }

    searchUser(req, res, next) {
        var keyword_search = req.query.keyword_search
        var query = User.where({
            $or:[
                {fullname:{$regex:keyword_search, $options:'i'}},
                {username:{$regex:keyword_search, $options:'i'}},
                {employeeCode:{$regex:keyword_search, $options:'i'}},
                {phoneNumber:{$regex:keyword_search, $options:'i'}},
                {email:{$regex:keyword_search, $options:'i'}},
            ]
        })

        User.find(query)
        .then((user)=>{
            var lsUser = user.map(function (user) {
                var date = user.birthday
                var birthday = date.slice(8, 10) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)
                return {
                    _id: user._id,
                    employeeCode: user.employeeCode,
                    fullname: user.fullname,
                    username: user.username,
                    password: user.password,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    avatarImage: user.avatarImage,
                    birthday: birthday,
                    gender: user.gender,
                    status: user.status
                }
            })
            var usersJSON = JSON.stringify(lsUser)
            res.render('users', { title: 'User Management', lsUser: lsUser, usersJSON: usersJSON})
        })
        .catch((error)=>{
            next(error)
        })

    }

}

module.exports = new UserController;