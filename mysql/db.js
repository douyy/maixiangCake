// 数据库
var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'maixiangcake'
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
