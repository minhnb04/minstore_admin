var jwt = require('jsonwebtoken');
var data = { username: 'minhbb04' }
var token = jwt.sign(data, 'minhnguyen04');

console.log(token);