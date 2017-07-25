var express = require('express');
var router = express.Router();

var conn = require('../mysql/cake');

// 分类请求
router.get('/btype/:title',function(req,res){
    // console.log(req.params.title);
    conn.query('select * from bigtype where product = ?',[req.params.title],function(err,result){
        if (err) {
            return res.send({
                success:false,
                data:err.message
            });
        }
        return res.send({
            success:true,
            data:result
        });
    });
})
router.get('/stype',function(req,res){
    // console.log(req.params.title);
    conn.query('select * from type',function(err,result){
        if (err) {
            return res.send({
                success:false,
                data:err.message
            });
        }
        return res.send({
            success:true,
            data:result
        });
    });
})
router.get('/cake',function(req,res){
    // console.log(req.params.title);
    conn.query('select * from cake',function(err,result){
        if (err) {
            return res.send({
                success:false,
                data:err.message
            });
        }
        return res.send({
            success:true,
            data:result
        });
    });
})
router.post('/cake',function(req,res){
    var data = req.body.cake;
    var page = req.body.page;
    console.log(page);
    var size = 6;
    var fromindex = (page - 1) * size;
    var sqlstr = '';
    if (JSON.stringify(data) == '{}') {
        let sql = "select * from cake limit ?,?";
        conn.query(sql,[fromindex,size],function(err,results){
            if (err) {
                return res.send({
                    success:false,
                    data:err.message
                });
            }
            conn.query(
                `select count(*) as num from cake `,
                (err,result)=>{
                    res.send({
                        success:true,
                        data:{
                            results,
                            // 总行数
                            total:result[0].num,
                            size:size
                        }
                    })
                }
            );
        });
    }else{
        var len = 0;
        for(var d in data){
            len++;
            sqlstr += "SELECT * FROM cake_type ct WHERE ct.typeid="+data[d] + " UNION ";
        }
        var nsqlstr = sqlstr.substring(0,sqlstr.length - 7);
        let sql = `SELECT * FROM(
                    SELECT *,COUNT(cakeid) num FROM (`+nsqlstr+`) su GROUP BY su.cakeid) 
                    mm LEFT JOIN cake c
                    ON mm.cakeid = c.cakeid WHERE num = `+len+` limit ?,?`;
        conn.query(sql,[fromindex,size],function(err,results){
            if (err) {
                return res.send({
                    success:false,
                    data:err.message
                });
            }
            conn.query(
                `SELECT count(*) pa FROM(
                    SELECT *,COUNT(cakeid) num FROM (`+nsqlstr+`) su GROUP BY su.cakeid) 
                    mm LEFT JOIN cake c
                    ON mm.cakeid = c.cakeid WHERE num = `+len,
                (err,result)=>{
                    console.log(result);
                    res.send({
                        success:true,
                        data:{
                            results,
                            // 总行数
                            total:result[0].pa,
                            size:size
                        }
                    })
                }
            );
        });
    }
})
// app评论请求
router.get('/discuss',function(req,res){
    // console.log(req.params.title);
    conn.query('select * from discuss',function(err,result){
        if (err) {
            return res.send({
                success:false,
                data:err.message
            });
        }
        return res.send({
            success:true,
            data:result
        });
    });
})
module.exports = router;