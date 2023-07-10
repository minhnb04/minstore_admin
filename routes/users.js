var express = require('express');
var router = express.Router();
const multer = require('multer');

const userController = require('../config/controllers/userController') 

var storage = multer.diskStorage({
    destination:(req, file,res)=>{
        res(null, 'uploads/userImage')
    },
    filename: (req, file, res)=>{
        res(null,Date.now()+'-'+file.originalname)
    }
})

var upload = multer({storage:storage});

router.get('/', userController.index);

router.post('/add-user',upload.single('avatarImage'),userController.addUser);

router.put('/update/:id',upload.single('avatarImage'), userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

router.get('/search', userController.searchUser);


module.exports = router;

