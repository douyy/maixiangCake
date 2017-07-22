// 数据库
var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'10.0.45.251',
    user:'cake',
    password:'123456',
    database:'cake'
});
conn.connect(function(err){
    if (err) {
        throw err;
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
    }
});
module.exports = conn;
