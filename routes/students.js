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
router.post('/',(req,res)=>{
    let sql = `INSERT INTO yonghu SET ?`;
    conn.query(sql,req.body,(err,results)=>{
        if (err) {
            return res.json({success:false,date:err.message})
        }
        res.json({success:true})

    })
});
router.put('/',(req,res)=>{
	//请求body内容
	console.log(req.body);
	var sql = `UPDATE students 
			   SET ? 
			   WHERE id=?`;
	conn.query(sql,[req.body,req.body.id]
		,(err,result)=>{
		if (err) {
			return res.json({success:false,data:err.message})
		}
		console.log(result);
		if (result.affectedRows > 0) {
			return res.json({success:true,data:result.insertId});
		}
		res.json({success:false,data:'插入失败'})
	})
	//res.send({data:req.body.id});
})
module.exports = router;
