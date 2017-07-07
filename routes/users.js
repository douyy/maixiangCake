var express = require('express');
var router = express.Router();

var productsList = [
    {
        url:'https://www.dangao.com/Tpl/2016skin/Public/imgbanner/ceng_dg.jpg',
        content:[
            {
                type:'按用途',neirong:'| 生日蛋糕 | 祝寿蛋糕 | 庆典蛋糕 | 祝福蛋糕'
            },
            {
                type:'按对象',neirong:'| 送恋人 | 送家人 | 送长辈 | 送朋友 | 送儿童'
            },
            {
                type:'按材料',neirong:'| 水果蛋糕 | 鲜奶蛋糕 | 慕斯蛋糕 | 翻糖蛋糕 | 巧克力蛋糕 | 芝士蛋糕 | 黑森林蛋糕 | 冰激凌蛋糕 | 抹茶蛋糕 | 提拉米苏蛋糕'
            },
            {
                type:'按造型',neirong:'| 欧式蛋糕 | 圆形蛋糕 | 多层蛋糕 | 方形蛋糕 | 心形蛋糕 | 卡通蛋糕 | 星座蛋糕 | 麻将蛋糕 | 生肖蛋糕 | 彩虹蛋糕 | 创意蛋糕'
            }
        ]
    },
    {
        url:'https://www.dangao.com/Tpl/2016skin/Public/imgbanner/ceng_xh.jpg',
        content:[
            {
                type:'按用途',neirong:'| 生日快乐 | 爱情鲜花 | 慰问祝福 | 道歉鲜花 | 商务用花'
            },
            {
                type:'按对象',neirong:'| 送女友 | 送男友 | 送朋友 | 送母亲 | 送父亲 | 送领导 | 送老师 | 送长辈'
            },
            {
                type:'按花材',neirong:'| 玫瑰 | 百合 | 康乃馨 | 永生花 | 向日葵 | 满天星 | 勿忘我 | 扶郎 | 雏菊 | 红掌 | 郁金香 | 马蹄莲'
            },
            {
                type:'按枝数',neirong:'| 9 枝 | 11 枝 | 12 枝 | 18 枝 | 19枝 | 21枝 | 24枝 | 29枝 | 33枝 | 50枝 | 66枝 | 99枝 | 101枝 | 108枝 | 365枝 | 999枝 | 其他枝数'
            },
            {
                type:'按价格',neirong:'| 200以下 | 200-300元 | 300-400元 | 400-600元 | 600-800元 | 800-1000元 | 1000以上'
            },
            {
                type:'植物',neirong:'| 盆栽绿植 | 盆栽鲜花'
            }
        ]
    },
    {
        url:'https://www.dangao.com/Tpl/2016skin/Public/imgbanner/ceng_hj.jpg',
        content:[
            {
                type:'原产地',neirong:'| 法国 | 意大利 | 西班牙 | 德国 | 美国 | 澳大利亚 | 智利 | 南非 | 加拿大'
            },
            {
                type:'按类型',neirong:'| 红葡萄酒 | 白葡萄酒 | 桃红葡萄酒 | 起泡酒 | 加强葡萄酒 | 烈酒'
            },
            {
                type:'按价格',neirong:'| 1-99元 | 100-199元 | 200-299元 | 500-799元 | 800-999元 | 1000元以上'
            },
            {
                type:'按品种',neirong:'| 赤霞珠 | 黑皮诺 | 美乐 | 西拉/设拉 | 马尔贝克 | 内比奥罗 | 黑歌海娜 | 霞多丽 | 雷司令 | 长相思 | 佳丽酿 |神索 | 哥伦白 | 白玉霓 | 歌海娜 | 品丽珠 | 赛美容 | 密斯卡岱 | 慕合怀特 | 皮诺塔吉 | 加尔纳恰 | 佳美娜丹魄 | 麝香葡萄 | 混合'
            }
        ]
    },
    {
        url:'https://www.dangao.com/Tpl/2016skin/Public/imgbanner/ceng_qkl.jpg',
        content:[
            {
                type:'按品牌',neirong:'| 德芙巧克力 | 金帝巧克力 | 费列罗巧克力'
            },
            {
                type:'按价格',neirong:'| 200以下 | 200-300元 | 300-500元 | 500以上'
            }
        ]
    },
    {
        url:'https://www.dangao.com/Tpl/2016skin/Public/imgbanner/ceng_lm11.jpg',
        content:[
            {
                type:'按品牌',neirong:'| 鲜花+蛋糕鲜花+巧克力 | 鲜花+红酒鲜花+毛绒玩具 | 卡通花束+巧克力'
            }
        ]
    },
    {
        url:'https://www.dangao.com/Tpl/2016skin/Public/imgbanner/ceng_mrwj.jpg',
        content:[
            {
                type:'按种类',neirong:'| 小熊系列 | 小猪系列 | 小猫系列 | 小猴系列 | 小兔系列 | 小龙系列 | 其他系列'
            },
            {
                type:'按价格',neirong:'| 200以下 | 200-300元 | 300-500元 | 500元以上'
            }
        ]
    },
    {
        url:'https://www.dangao.com/Tpl/2016skin/Public/imgbanner/ceng_kths.jpg',
        content:[
            {
                type:'按种类',neirong:'| 考拉熊 | 婚纱熊 | 关节熊 | 小猪仔 | 小兔子 | KITTY猫 | 迷糊娃娃 | 史努比 | 仿真花'
            },
            {
                type:'按只数',neirong:'| 5只 | 6只 | 8只 | 9只 | 11只 | 12只 | 18只 | 19只 | 21只 | 29只 | 33只 | 其他只数'
            },
            {
                type:'按价格',neirong:'| 200以下 | 200-300元 | 300-500元 | 500元以上'
            },
        ]
    },
    {
        url:'https://www.dangao.com/Tpl/2016skin/Public/imgbanner/ceng_syhl.jpg',
        content:[
            {
                type:'按种类',neirong:'| 商业花篮 | 会议桌花 | 礼仪胸花 | 盆栽绿植 | 盆栽鲜花'
            },
            {
                type:'按价格',neirong:'| 200以下 | 200-500元 | 500-800元 | 800元以上'
            },
        ]
    }
];

/* GET users listing. */
router.get('/', function(req, res){
    res.send(productsList);
});

module.exports = router;
