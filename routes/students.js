/**
 * Created by a on 2017/7/5.
 */
var express = require('express');
//工厂函数
var router = express.Router();
//导入数据库的链接
var conn = require('../mysql/db')
//导入
router.get('/',(req,res)=>{
    let sql =` SELECT * FROM yonghu`;
    conn.query(sql,(err,results)=>{
        if (err) {
            return res.send({success:false,date:err.message})
        }
        console.log('成功啦');
        res.send({success:true,date:results})
    })
});
//新建学员
router.post('/',(req,res)=>{
    let sql = `INSERT INTO yonghu SET ?`;
    conn.query(sql,req.body,(err,results)=>{
        if (err) {
            return res.json({success:false,date:err.message})
        }
        res.json({success:true})

    })
});
module.exports = router;
