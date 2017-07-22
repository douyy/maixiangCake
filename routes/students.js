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
    let sql =` SELECT * FROM user`;
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
    let sql = `INSERT INTO user SET ?`;
    conn.query(sql,req.body,(err,results)=>{
        if (err) {
            return res.json({success:false,date:err.message})
        }
        res.json({success:true})

    })
});
router.put('/user',(req,res)=>{
	//请求body内容
	console.log(req.body);
	var sql = `UPDATE user 
			   SET ?  
			   WHERE phone=?`;
	conn.query(sql,[req.body,req.body.phone]
		,(err,result)=>{
		if (err) {
			return res.json({success:false,data:err.message})
		}
		console.log(result);
		if (result.affectedRows > 0) {
			return res.json({success:true,data:result.inserPhone});
		}
		res.json({success:false,data:'插入失败'})
	})
	//res.send({data:req.body.id});
})
router.put('/userpass',(req,res)=>{
    //请求body的内容
    console.log(req.body);
    var sql=`UPDATE user
            SET password=?
            WHERE phone=? AND password=?
            `;
    conn.query(sql,[req.body.new1,req.body.phone,req.body.old],(err,result)=>{
        if (err) {
            return res.json({success:false,data:err.message})
        }
        console.log(result);
        if (result.affectedRows > 0) {
            return res.json({success:true,data:result.inserPhone});
        }
        res.json({success:false,data:'插入失败'})
    })
})
router.delete('/phone/:phone',(req,res)=>{
    //获取删除手机号
    var sql =`DELETE FROM user WHERE phone=?`;
    conn.query(sql,[req.params.phone,],(err,r)=>{
        if (err) {
            return res.send({
                success:false,
                date:err.message
            })
        }
        res.send({success:true})
    })
})
router.post('/u',(req,res)=>{
    //获取查询登录
    let sql =` SELECT * FROM user WHERE phone=? AND password=?`;
    conn.query(sql,[req.body.phone,req.body.password],(err,results)=>{
        if (results.length>0) {
            return res.send({
                success:true,date:results
            })
        }
        if (err) {
            return res.send({
                success:false,
                date:err.message
            })
        }
        else{
            res.send({
                date:'没有你要的成员'
            })
        }

    })
})
router.post('/userphone',(req,res)=>{
    //获取查询个人信息
    console.log(req.body.phone)
    let sql =` SELECT * FROM user WHERE phone=?`;
    conn.query(sql,[req.body.phone],(err,results)=>{
        if (err) {
            return res.send({
                success:false,
                date:err.message
            })
        }
        if (results.length>0) {
            return res.send({
                success:true,date:results
            })
        }
        else{
            res.send({
                success:false,
                date:'没有你要的成员'
            })
        }

    })
})
//新建收货人
router.post('/adress',(req,res)=>{
    let sql = `INSERT INTO address SET ?`;
    conn.query(sql,req.body,(err,results)=>{
        if (err) {
            return res.json({success:false,date:err.message})
        }
        res.json({success:true})

    })
});
//获取查询adress
router.post('/lkads',(req,res)=>{
    //获取查询登录
    let sql =` SELECT * FROM address WHERE phone=?`;
    console.log(req.body.rsvphone)
    conn.query(sql,[req.body.phone],(err,results)=>{
        if (results.length>0) {
            return res.send({
                success:true,date:results
            })
        }
        if (err) {
            return res.send({
                success:false,
                date:err.message
            })
        }
        else{
            res.send({
                date:'没有你要的成员'
            })
        }

    })
})
//更新地址
router.put('/updateads',(req,res)=>{
    //请求body内容
    console.log(req.body);
    var sql = `UPDATE address 
               SET ?  
               WHERE id=?`;
    conn.query(sql,[req.body,req.body.id]
        ,(err,result)=>{
        if (err) {
            return res.json({success:false,data:err.message})
        }
        console.log(result);
        if (result.affectedRows > 0) {
            return res.json({success:true,data:result.inserPhone});
        }
        res.json({success:false,data:'插入失败'})
    })
    //res.send({data:req.body.id});
})
 //获取删除地址
router.delete('/rmadress/:id',(req,res)=>{
    //获取删除
     console.log(req.params);
    var sql =`DELETE FROM address WHERE id=?`;
    conn.query(sql,[req.params.id,],(err,r)=>{
        if (err) {
            return res.send({
                success:false,
                date:err.message
            })
        }
        res.send({success:true})
    })
})
module.exports = router;
