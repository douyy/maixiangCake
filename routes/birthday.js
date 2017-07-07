var express = require('express');
var router = express.Router();

var conn = require('../mysql/db');

var birthday = [
    {img:'https://www.dangao.com/proimgs/711673175228.jpg',name:'我想要的幸福',id:1, zhucai:'圆形欧式水果蛋糕，各色时令水果方格式艺术装饰，纯手工巧克力片围边。',price:188,yprice:226,type:'生日蛋糕送朋友送恋人送家人水果蛋糕鲜奶蛋糕圆形蛋糕欧式蛋糕'},
    {img:'https://www.dangao.com/proimgs/708039175228.jpg',name:'一生的爱',id:2,zhucai:'圆形巧克力蛋糕，巧克力色奶油花装饰，水果片点缀',price:188,yprice:226,type:'生日蛋糕送恋人送朋友鲜奶蛋糕圆形蛋糕欧式蛋糕'},
    {img:'https://www.dangao.com/proimgs/701716175228.jpg',name:'梦幻芭比',id:3,zhucai:'新鲜奶油、戚风水果夹层蛋糕胚（芭比随机搭配）',price:198,yprice:238,type:'生日蛋糕送儿童鲜奶蛋糕圆形蛋糕卡通蛋糕'},
    {img:'https://www.dangao.com/proimgs/711701175228.jpg',name:'生日快乐',id:4,zhucai:'圆形欧式水果蛋糕，拇指饼干围边',price:188,yprice:226,type:'生日蛋糕送朋友送家人水果蛋糕圆形蛋糕欧式蛋糕'},
    {img:'https://www.dangao.com/proimgs/721017175228.jpg',name:'熟悉的歌',id:5,zhucai:'新鲜奶油，鸡蛋牛奶戚风胚 配材：时令水果装饰',price:198,yprice:238,type:'生日蛋糕送朋友送家人鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/711667175228.jpg',name:'缤纷盛果',id:6,zhucai:'圆形欧式水果蛋糕，各色水果饱满装饰，纯手工巧克力片围边。',price:188,yprice:246,type:'生日蛋糕送恋人送朋友水果蛋糕圆形蛋糕欧式蛋糕'},
    {img:'https://www.dangao.com/proimgs/721018175228.jpg',name:'愿得一人心',id:7,zhucai:'新鲜奶油，时令水果，鸡蛋牛奶水果夹层胚',price:198,yprice:226,type:'生日蛋糕送恋人送朋友鲜奶蛋糕心形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721021175228.jpg',name:'两情相悦',id:8,zhucai:'奥利奥饼干屑，美味糖果，鸡蛋牛奶胚 配材：新鲜奶油，巧克力片围边',price:198,yprice:226,type:'生日蛋糕送朋友送恋人黑森林蛋糕圆形蛋糕'},
];
conn.query('select * from cake',function(err,result){
    if(err){
        console.log(err);
    }else{
        if(result.length == 0){
            for(var i = 0;i < birthday.length;i++) {
                var b = birthday[i];
                conn.query('insert into cake set ?',b,function(err){
                    if(err){
                        console.log(err);
                        console.log('失败');
                    }else{
                        console.log('插入成功');
                    }
                })
            }
        }
    }
});

router.get('/',function(req,res){
    conn.query('select * from cake',function(err,user){
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
})
router.get('/:id',function(req,res){
    // console.log(req.params);
    conn.query('select * from cake where id = ?',req.params.id,function(err,user){
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
})
module.exports = router;