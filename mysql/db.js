/**
 * Created by a on 2017/7/5.
 */
var mysql = require('mysql');
//创建连接
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sms'
})
conn.connect((err)=>{
    if (err) {
        console.log('链接失败！查找原因');
    }else{
        console.log('链接成功');
}
})
module.exports = conn;