
/*
 * GET home page.
 */
var item_goods = require('../models/item_goods.js');
var newest_good = require('../models/newest_good.js');
var good_item = require('../models/good_item');
var Good = require('../models/good.js');
var Catalog = require('../models/catalog.js');
var goodlistmodel = require('../models/goodlistmodel');
module.exports = function(app){
    app.get('/', function(req,res){
        item_goods("http://market.scau.edu.cn/goods.php?iid=1404819414lsel2j21&iaction=view&st=58",function(data){
            res.json(data);
            var goodinstance = new Good(data);
            goodinstance.save(function(t,datas){
                console.log(datas);
            });
        })
    });

    app.get('/index', function(req,res){
        newest_good('http://market.scau.edu.cn/index.php',function(data){
            good_item.batch(data,function(datas){
                res.json(datas);
            })
        })
    });

    app.get('/getGoodCatalogByIid', function(req,res){
        var iid = req.query.iid;
        goodlistmodel('http://market.scau.edu.cn/catalog.php?iid='+iid,function(data){
            good_item.batch(data,function(datas){
                res.json(datas);
            })
        })
    });
    app.get('/catalogs', function(req,res){
        item_goods("http://market.scau.edu.cn/goods.php?iid=1406631520pkbr6igw&iaction=view&st=6b",function(data){
            res.json(data);
            var goodmodel = new Good(data);
            goodmodel.save(function(t,datas){
                console.log(datas);
            });
        })
    });
    app.get('/getGoodByIid', function(req,res){
            var iid = req.query.iid;
            if(iid!=null){
            Good.get(iid,function(t,data){
                res.json(data)
            });}
            else{
                res.json('error');
            }
    });


};