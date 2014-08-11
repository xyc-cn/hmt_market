
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
    app.get('/getGood', function(req,res){
        var iid = req.query.iid;
        var callback = req.query.callback;
        Good.get(iid,function(sign,data){
            if(callback!=null){
                var str = callback + '(' + JSON.stringify(data) + ')';
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                res.end(str);
            }else{
                res.json(data);
            }
        })
    });

    app.get('/index', function(req,res){

    });

    app.get('/getGoodCatalogByIid', function(req,res){
        var iid = req.query.iid;
        var page = req.query.page;
        var callback = req.query.callback;
        Catalog.get(iid,page,function(sign,data){
            if(callback!=null){
                var str = callback + '(' + JSON.stringify(data) + ')';
                res.writeHead(200, { 'Content-Type': 'text/javascript;charset=utf-8' });
                res.end(str);
            }else{
            res.json(data);
            }
        });

    });




};