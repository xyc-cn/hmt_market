/**
 * Created by Administrator on 14-8-9.
 */
var item_goods = require('../models/item_goods.js');
var goodlistmodel = require('../models/goodlistmodel');
var Catalog = require('../models/catalog.js');
var good_item = require('../models/good_item');
var Good = require('../models/good.js');
var updatelist = [1,2,3,4,5,6,7,8,9,13,14,15,16,17,18];
var async = require('async');
var newest_good = require('../models/newest_good.js');
function updateCatalog(){
    for (var iid = 0; iid < updatelist.length; iid++) {
        for (var page = 1; page < 4; page++) {
            updateCataItem(updatelist[iid],page);
        }
    }
}
function updateCataItem(iid,page){
    goodlistmodel('http://market.scau.edu.cn/catalog.php?iid='+iid+'&itype=1&page='+page,function(data){
        Catalog.update(iid,page,data,function(datas){
            console.log("catalog "+iid+" page"+page+" "+datas);
        });
    })
}
function goodModify(){
    for (var iid = 0; iid < updatelist.length; iid++) {
            Catalog.get(updatelist[iid],1,function(err,data){
                for (var i = 0; i < data['goods'].length; i++) {
                    updateGood(data['goods'][i],function(info){
                        console.log(info);
                    });
                }
            })

    }

}
function updateGood(data,callback){
       if(data.url!=undefined){
           item_goods(data.url,data.name,function(newdata){
           Good.modify(newdata,function(doc){
               callback(doc)
               });
           });
       }
}
function updateindex(){
    newest_good("http://market.scau.edu.cn/index.php",function(data){
        Catalog.update(0,1,data,function(datas){
            console.log("catalog 0 page 1"+datas);
        });
    })
}
updateindex()

setTimeout(function(){
    process.exit(0);

},300000);
