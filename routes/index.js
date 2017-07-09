var express = require('express');
var router = express.Router();

var conn = require('../mysql/db');

/* GET home page. */
router.get('/',function(req,res){
    res.render('index', {
      title: '麦香蛋糕'
    });
});
router.get('/a', function(req, res, next) {
    conn.query('select * from cake where id <= 5',function(err,user){
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
module.exports = router;
