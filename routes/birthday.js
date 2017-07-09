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
    {img:'https://www.dangao.com/proimgs/711705175228.jpg',name:'小清新裸蛋糕',id:9,zhucai:'圆形水果裸蛋糕，时令水果铺面，水果果肉夹层',price:238,yprice:286,type:'生日蛋糕送朋友送恋人送家人水果蛋糕圆形蛋糕欧式蛋糕'},
    {img:'https://www.dangao.com/proimgs/711683175228.jpg',name:'心灵相通',id:10,zhucai:'圆形欧式水果蛋糕，各色水果爱心式艺术装饰，白色巧克力片点缀',price:188,yprice:226,type:'生日蛋糕送恋人水果蛋糕欧式蛋糕'},
    {img:'https://www.dangao.com/proimgs/711637175228.jpg',name:'心的祝愿',id:11,zhucai:'方形鲜奶水果蛋糕，巧克力碎屑铺面，时令水果装饰',price:198,yprice:238,type:'生日蛋糕送朋友水果蛋糕方形蛋糕'},
    {img:'https://www.dangao.com/proimgs/701650175228.jpg',name:'花漾',id:12,zhucai:'方形欧式蛋糕，巧克力碎屑铺面，新鲜玫瑰花瓣围边',price:198,yprice:238,type:'生日蛋糕送家人送朋友送恋人巧克力蛋糕欧式蛋糕方形蛋糕'},
    {img:'https://www.dangao.com/proimgs/701116175228.jpg',name:'白色田园',id:13,zhucai:'圆形鲜奶蛋糕，中间各色时令水果装饰及巧克力，周边白色巧克力碎屑包围',price:178,yprice:214,type:'生日蛋糕送恋人送家人送儿童圆形蛋糕鲜奶蛋糕水果蛋糕巧克力蛋糕'},
    {img:'https://www.dangao.com/proimgs/701731175228.jpg',name:'玫瑰色恋人',id:14,zhucai:'新鲜时令水果搭配玫瑰花装饰，甜蜜而又浪漫',price:198,yprice:238,type:'生日蛋糕送恋人水果蛋糕鲜奶蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/701732175228.jpg',name:'奥利奥黑白趣',id:15,zhucai:'新鲜奶油，搭配奥利奥香脆巧克力饼干，非一般的乐趣',price:188,yprice:226,type:'生日蛋糕送恋人送儿童巧克力蛋糕鲜奶蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/880031175228.jpg',name:'你是我的菜',id:16,zhucai:'美味蔬菜蛋糕，新鲜奶油搭配黄瓜,胡萝卜,紫甘蓝等 配材：鸡蛋牛奶戚风胚，巧克力片围边',price:188,yprice:226,type:'生日蛋糕送恋人送家人送长辈送儿童水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/706038175228.jpg',name:'健康长寿',id:17,zhucai:'圆形鲜奶水果蛋糕，时令水果装饰，蛋糕上写一个大红色的寿字',price:178,yprice:214,type:'祝寿蛋糕送长辈鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/703068175228.jpg',name:'福同海阔',id:18,zhucai:'圆形鲜奶蛋糕，鲜奶寿桃围边，时令水果装饰，红色果酱写有“寿”字样',price:178,yprice:214,type:'祝寿蛋糕送长辈鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/707060175228.jpg',name:'寿山福海',id:19,zhucai:'三层鲜奶蛋糕,上层做成蟠桃',price:498,yprice:598,type:'祝寿蛋糕送长辈鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/707061175228.jpg',name:'寿比松龄',id:20,zhucai:'三层鲜奶蛋糕,上层做成蟠桃',price:498,yprice:598,type:'祝寿蛋糕送长辈鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/706063175228.jpg',name:'福满堂',id:21,zhucai:'方形鲜奶水果蛋糕，时令水果装饰，水果围边',price:198,yprice:238,type:'祝寿蛋糕送长辈鲜奶蛋糕水果蛋糕方形蛋糕'},
    {img:'https://www.dangao.com/proimgs/706065175228.jpg',name:'海屋添寿',id:22,zhucai:'圆形鲜奶水果蛋糕，时令水果装饰',price:198,yprice:238,type:'祝寿蛋糕送长辈鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/707011175228.jpg',name:'蟠桃献寿',id:23,zhucai:'圆形鲜奶蛋糕，大小不同的蟠桃，蛋糕上写一个大红色的寿字',price:168,yprice:202,type:'祝寿蛋糕送长辈鲜奶蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/703067175228.jpg',name:'万寿无疆 ',id:24,zhucai:'圆形鲜奶蛋糕，不老松、仙鹤花样装饰，红色果酱写有“寿”字样',price:178,yprice:214,type:'祝寿蛋糕送长辈鲜奶蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/703071175228.jpg',name:'福寿绵长',id:25,zhucai:'圆形鲜奶蛋糕，一位寿星旁边陪伴着一只仙鹿，五个蟠桃，蛋糕上写一个大红色的寿字',price:178,yprice:214,type:'祝寿蛋糕送长辈鲜奶蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/703078175228.jpg',name:'福寿双全',id:26,zhucai:'圆形鲜奶蛋糕，八个蟠桃围边，中间一个红色的寿字',price:178,yprice:214,type:'祝寿蛋糕送长辈鲜奶蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/703052175228.jpg',name:'寿与天齐',id:27,zhucai:'圆形鲜奶蛋糕，鲜奶玫瑰花装饰，写有“母亲生日快乐”字样',price:168,yprice:202,type:'祝寿蛋糕送家人送长辈鲜奶蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/703086175228.jpg',name:'幸福相伴',id:28,zhucai:'圆形奶油蛋糕，中间一个“福”字，四朵紫色奶油花点缀，草莓围边',price:178,yprice:214,type:'祝寿蛋糕送家人送长辈鲜奶蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/707065175228.jpg',name:'松柏长青',id:29,zhucai:'寿桃加两层蛋糕,最上层做成蟠桃，彩色奶油花围边',price:598,yprice:718,type:'祝寿蛋糕送家人送长辈鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/707102175228.jpg',name:'松乔之寿 ',id:30,zhucai:'三层鲜奶蛋糕，周围小寿桃围边，正面一个大寿字，上层端坐一位老寿星',price:688,yprice:826,type:'祝寿蛋糕送长辈鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/707101175228.jpg',name:'贵寿无极',id:31,zhucai:'方形水果双层蛋糕，上层数字“60”形蛋糕，双层蛋糕时令水果铺满围边(十寸起订)',price:498,yprice:598,type:'祝寿蛋糕送家人送长辈鲜奶蛋糕方形蛋糕'},
    {img:'https://www.dangao.com/proimgs/707062175228.jpg',name:'福寿康宁',id:32,zhucai:'二层鲜奶蛋糕,奶油花点缀',price:378,yprice:454,type:'祝寿蛋糕送家人送长辈鲜奶蛋糕方形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709001175228.jpg',name:'挚爱唯一',id:33,zhucai:'三层圆形鲜奶蛋糕，白色鲜奶百合花装饰',price:798,yprice:958,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709002175228.jpg',name:'爱的见证',id:34,zhucai:'三层方形鲜奶蛋糕，白色雕花，鲜奶百合花',price:1688,yprice:2026,type:'庆典蛋糕送恋人鲜奶蛋糕方形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709006175228.jpg',name:'快乐年华',id:35,zhucai:'三层圆形鲜奶蛋糕，粉色鲜奶玫瑰花',price:898,yprice:1078,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709007175228.jpg',name:'幸福到永远',id:36,zhucai:'三层心形鲜奶蛋糕，粉色鲜奶玫瑰花装饰',price:918,yprice:1102,type:'庆典蛋糕送恋人鲜奶蛋糕心形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709008175228.jpg',name:'未来',id:37,zhucai:'三层圆形鲜奶蛋糕，奶油花装饰',price:898,yprice:1078,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709009175228.jpg',name:'浪漫婚礼',id:38,zhucai:'四层圆形鲜奶蛋糕，鲜奶百合花装饰',price:1988,yprice:2386,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709011175228.jpg',name:'爱之旅',id:39,zhucai:'四层鲜奶水果蛋糕，鲜奶太阳花装饰',price:1188,yprice:1426,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709012175228.jpg',name:'粉色天空',id:40,zhucai:'五层鲜奶蛋糕，太阳花装饰',price:1988,yprice:2386,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709013175228.jpg',name:'爱的殿堂',id:41,zhucai:'五层心形鲜奶蛋糕，粉色鲜奶玫瑰花装饰',price:1706,yprice:2047,type:'庆典蛋糕送恋人鲜奶蛋糕心形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709015175228.jpg',name:'紫色年华',id:42,zhucai:'六层鲜奶蛋糕，紫色鲜奶玫瑰花装饰',price:2388,yprice:2866,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709017175228.jpg',name:'红袖添香',id:43,zhucai:'六层鲜奶蛋糕，鲜奶玫瑰花',price:2288,yprice:2746,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709018175228.jpg',name:'永世之约',id:44,zhucai:'六层鲜奶水果蛋糕，鲜奶百合花装饰，时令水果。',price:2388,yprice:2866,type:'庆典蛋糕送恋人鲜奶蛋糕水果蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709020175228.jpg',name:'sweet lover',id:45,zhucai:'八层鲜奶水果蛋糕，时令水果，粉色鲜奶玫瑰花',price:3188,yprice:3826,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/709022175228.jpg',name:'花开并蒂',id:46,zhucai:'九层圆形鲜奶蛋糕，鲜花并蒂莲',price:3688,yprice:4426,type:'庆典蛋糕送恋人鲜奶蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/801001175228.jpg',name:'圆舞曲',id:47,zhucai:'3层艺术蛋糕(每一层是双层胚子)，水果装饰',price:768,yprice:922,type:'庆典蛋糕送恋人鲜奶蛋糕水果蛋糕圆形蛋糕多层蛋糕'},
    {img:'https://www.dangao.com/proimgs/721013175228.jpg',name:'Happy new year',id:48,zhucai:'新鲜奶油，时令水果装饰',price:188,yprice:226,type:'庆典蛋糕送恋人送家人送儿童送朋友鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/701100175228.jpg',name:'甜美Kitty猫',id:49,zhucai:'新鲜奶油、水果夹层蛋糕胚',price:198,yprice:238,type:'祝福蛋糕送恋人送儿童送朋友鲜奶蛋糕水果蛋糕卡通蛋糕'},
    {img:'https://www.dangao.com/proimgs/711006175228.jpg',name:'好运连连',id:50,zhucai:'新鲜奶油搭配时令水果',price:198,yprice:238,type:'祝福蛋糕送恋人送儿童送朋友鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/711005175228.jpg',name:'福寿齐天',id:51,zhucai:'新鲜奶油搭配时令水果',price:198,yprice:238,type:'祝福蛋糕送家人送长辈鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/711004175228.jpg',name:'福禄寿来',id:52,zhucai:'新鲜奶油搭配时令水果',price:198,yprice:238,type:'祝福蛋糕送家人送长辈鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/711002175228.jpg',name:'巨蟹座专属蛋糕',id:53,zhucai:'新鲜奶油搭配时令水果',price:198,yprice:238,type:'祝福蛋糕送恋人送儿童送朋友鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/711001175228.jpg',name:'父爱如山',id:54,zhucai:'新鲜奶油搭配时令水果',price:198,yprice:238,type:'祝福蛋糕送家人鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721055175228.jpg',name:'爸气十足',id:55,zhucai:'新鲜奶油、水果夹层蛋糕胚',price:198,yprice:238,type:'祝福蛋糕送家人鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721053175228.jpg',name:'玫瑰之约',id:56,zhucai:'新鲜奶油，鸡蛋牛奶胚，玫瑰花瓣围边',price:198,yprice:238,type:'祝福蛋糕送恋人鲜奶蛋糕心形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721052175228.jpg',name:'六一童趣',id:57,zhucai:'新鲜奶油搭配时令水果',price:188,yprice:226,type:'祝福蛋糕送儿童鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721051175228.jpg',name:'榴莲忘返',id:58,zhucai:'新鲜奶油、鸡蛋牛奶蛋糕胚、榴莲果泥',price:298,yprice:358,type:'祝福蛋糕送恋人鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721050175228.jpg',name:'双子座专属蛋糕',id:59,zhucai:'新鲜奶油，时令水果和巧克力片装饰',price:198,yprice:238,type:'祝福蛋糕送恋人送儿童送朋友鲜奶蛋糕水果蛋糕巧克力蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721039175228.jpg',name:'草莓甜心',id:60,zhucai:'新鲜草莓和慕斯的完美组合',price:298,yprice:358,type:'祝福蛋糕送恋人送儿童送朋友鲜奶蛋糕水果蛋糕慕斯蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721038175228.jpg',name:'母亲节快乐',id:61,zhucai:'时令水果，搭配新鲜奶油',price:188,yprice:226,type:'祝福蛋糕送家人鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721036175228.jpg',name:'金牛座专属蛋糕',id:62,zhucai:'时令水果，搭配新鲜奶油',price:198,yprice:238,type:'祝福蛋糕送恋人送儿童送朋友鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721035175228.jpg',name:'奖状数码蛋糕',id:63,zhucai:'新鲜奶油搭配时令水果；奖状为食用糯米纸打印，蛋糕上文字内容可更改',price:298,yprice:358,type:'祝福蛋糕送恋人送儿童送朋友鲜奶蛋糕水果蛋糕圆形蛋糕'},
    {img:'https://www.dangao.com/proimgs/721032175228.jpg',name:'快乐星球',id:64,zhucai:'多种时令水果，新鲜奶油 配材：鸡蛋 牛奶水果夹层胚',price:188,yprice:226,type:'祝福蛋糕送恋人送儿童送朋友鲜奶蛋糕水果蛋糕圆形蛋糕'},
];
var detail = [
    {
        id: 1,
        simg1: 'https://www.dangao.com/proimgs/C-711673601.jpg',
        mimg1: 'https://www.dangao.com/proimgs/C-7116734201.jpg',
        bimg1: 'https://www.dangao.com/proimgs/C-71167310241.jpg',
        simg2: 'https://www.dangao.com/proimgs/C-711673602.jpg',
        mimg2: 'https://www.dangao.com/proimgs/C-7116734202.jpg',
        bimg2: 'https://www.dangao.com/proimgs/C-71167310242.jpg',
        simg3: 'https://www.dangao.com/proimgs/C-711673603.jpg',
        mimg3: 'https://www.dangao.com/proimgs/C-7116734203.jpg',
        bimg3: 'https://www.dangao.com/proimgs/C-71167310243.jpg',
        simg4: 'https://www.dangao.com/proimgs/C-711673604.jpg',
        mimg4: 'https://www.dangao.com/proimgs/C-7116734204.jpg',
        bimg4: 'https://www.dangao.com/proimgs/C-71167310244.jpg',
        simg5: 'https://www.dangao.com/proimgs/C-711673605.jpg',
        mimg5: 'https://www.dangao.com/proimgs/C-7116734205.jpg',
        bimg5: 'https://www.dangao.com/proimgs/C-71167310241.jpg',
        big1: 'https://www.dangao.com/proimgs/C-711673desA1.jpg',
        big2: 'https://www.dangao.com/proimgs/C-711673desB1.jpg',
        big3: 'https://www.dangao.com/proimgs/C-711673desC1.jpg',
        big4: 'https://www.dangao.com/proimgs/C-711673desC2.jpg',
        wd:'欧式水果蛋糕',
        cl:'香醇巧克力片，多种时令水果',
        cg:'恋情,生日,祝福,家居,',
        rq:'送恋人,送朋友,',
        wy:'我想要的幸福，都只是一天天平淡日子里的执手相看；只是相处时温暖的关怀；只是在那一天，我们走进婚姻时的美丽瞬间。',
    },
    {
        id: 2,
        simg1: 'https://www.dangao.com/proimgs/C-711673601.jpg',
        mimg1: 'https://www.dangao.com/proimgs/C-7116734201.jpg',
        bimg1: 'https://www.dangao.com/proimgs/C-71167310241.jpg',
        simg2: 'https://www.dangao.com/proimgs/C-711673602.jpg',
        mimg2: 'https://www.dangao.com/proimgs/C-7116734202.jpg',
        bimg2: 'https://www.dangao.com/proimgs/C-71167310242.jpg',
        simg3: 'https://www.dangao.com/proimgs/C-711673603.jpg',
        mimg3: 'https://www.dangao.com/proimgs/C-7116734203.jpg',
        bimg3: 'https://www.dangao.com/proimgs/C-71167310243.jpg',
        simg4: 'https://www.dangao.com/proimgs/C-711673604.jpg',
        mimg4: 'https://www.dangao.com/proimgs/C-7116734204.jpg',
        bimg4: 'https://www.dangao.com/proimgs/C-71167310244.jpg',
        simg5: 'https://www.dangao.com/proimgs/C-711673605.jpg',
        mimg5: 'https://www.dangao.com/proimgs/C-7116734205.jpg',
        bimg5: 'https://www.dangao.com/proimgs/C-71167310241.jpg',
        big1: 'https://www.dangao.com/proimgs/C-711673desA1.jpg',
        big2: 'https://www.dangao.com/proimgs/C-711673desB1.jpg',
        big3: 'https://www.dangao.com/proimgs/C-711673desC1.jpg',
        big4: 'https://www.dangao.com/proimgs/C-711673desC2.jpg',
        wd:'啦啦啦啦',
        cl:'香醇巧克力片，多种时令水果',
        cg:'恋情,生日,祝福,家居,',
        rq:'送恋人,送朋友,',
        wy:'我想要的幸福，都只是一天天平淡日子里的执手相看；只是相处时温暖的关怀；只是在那一天，我们走进婚姻时的美丽瞬间。',
    },
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
conn.query('select * from detail',function(err,result){
    if(err){
        console.log(err);
    }else{
        if(result.length == 0){
            for(var i = 0;i < detail.length;i++) {
                var b = detail[i];
                conn.query('insert into detail set ?',b,function(err){
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
router.post('/:id',function(req,res){
    console.log(req.params.id);
    conn.query('select * from detail where id = ?',req.params.id,function(err,user){
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