
/*
 * GET home page.
 */
var item_goods = require('../models/item_goods.js');
var Good = require('../models/good.js');
module.exports = function(app){
    app.get('/', function(req,res){


        item_goods("http://market.scau.edu.cn/goods.php?iid=1406631520pkbr6igw&iaction=view&st=6b",function(data){
            res.json(data);
            var goodmodel = new Good(data);
            goodmodel.save(function(t,datas){
                console.log(datas);
            });
        })
    });

    app.get('/good', function(req,res){
            var iid = req.query.iid;
            Good.get(iid,function(t,data){
                res.json(data)
            })
    });
    app.get('/updata', function(req,res){
        var iid = req.query.iid;
        Good.update(iid,['dfdf'],function(t,data){
            res.json(data)
        })
    });
};