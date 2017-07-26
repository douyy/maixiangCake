var express = require('express');
var router = express.Router();

var conn = require('../mysql/db');

/* GET home page. */
router.get('/',function(req,res){
    res.render('index', {
        title: '麦香蛋糕',
    });
});

router.get('/b:c',function(req,res){
    var sql = `select name,type from cake where name = ? or type = ?`;
    console.log(req.params.c);
    conn.query(sql,[req.params.c,req.params.c],(err,result)=>{
       if(err){
           return res.send({
               success:false,
               data:err.message
           });
       }else{
           res.send({
               success:true,
               data:result
           });

       }
    });
});
router.get('/a', function(req, res, next) {
    conn.query('select * from cake where id <= 7',function(err,user){
        if (err) {
            return res.send({
                success:false,
                data:err.message
            });
        }
        return res.send({
            success:true,
            data:user
        });
    });
});
router.get('/bzzx',function (req,res) {
    res.render('bangzhuzhongxin',{
        title:'网上怎么定蛋糕'
    })
})
router.get('/bjhk',function (req,res) {
    res.render('bujiaohuokuan',{
        title:'麦香蛋糕--专业的蛋糕速送商'
    })
})
router.get('/ddcx',function (req,res) {
    res.render('dingdanchaxun',{
        title:'麦香蛋糕--专业的蛋糕速送商'
    })
})
router.get('/fkfs',function (req,res) {
    res.render('fukuanfangshi',{
        title:'麦香蛋糕--专业的蛋糕速送商'
    })
})
router.get('/pscx',function (req,res) {
    res.render('peisongchaxun',{
        title:'麦香蛋糕--专业的蛋糕速送商'
    })
})
module.exports = router;
