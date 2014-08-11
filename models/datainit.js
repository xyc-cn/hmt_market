/**
 * Created by Administrator on 14-8-9.
 */
/**
 * Created by Administrator on 14-8-9.
 */
var item_goods = require('../models/item_goods.js');
var goodlistmodel = require('../models/goodlistmodel');
var Catalog = require('../models/catalog.js');
var Good = require('../models/good.js');
var updatelist = [1,2,3,4,5,6,7,8,9,13,14,15,16,17,18];

function cataloginit(callback){
    for (var iid = 0; iid < updatelist.length; iid++) {
        for (var page = 1; page < 4; page++) {
            fetchcatalog(updatelist[iid],page);
        }

    }
}
function addgood(url){
        item_goods(url,function(data){
        var goodinstance = new Good(data);
        goodinstance.save(function(t,datas){
            console.log(datas);
        });
    })
}

function fetchgood(callback){
    for (var iid = 0; iid < updatelist.length; iid++) {
        for(var page  =1;page<4;page++){
        Catalog.get(updatelist[iid],page,function(err,data){
            for (var i = 0; i < data['goods'].length; i++) {
                addgood(data['goods'][i]['url']);
            }
        })
        }
    }
}
function fetchcatalog(iid,page){
    goodlistmodel('http://market.scau.edu.cn/catalog.php?iid='+iid+'&itype=1&page='+page,function(data){
        var Catalogmodel = new Catalog(iid,page,data);
        Catalogmodel.save(function(t,datas){
            console.log(datas);
        });
    })
}
function fetchend(){
    console.log("success");
}
fetchgood(fetchend());
