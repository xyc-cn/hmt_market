/**
 * Created by Administrator on 14-8-8.
 */
var mongoose = require('mongoose');
var db = require('./db.js');

var catalogSchema = new mongoose.Schema({
    iid:String,
    name:String,
    goods:[]

}, {
    collection: 'catalogs'
});

var CatalogModel = mongoose.model('Catalog', catalogSchema);

function Catalog(catalog) {
    this.iid=catalog.iid;
    this.name = catalog.name;
    this.goods = catalog.goods;
};

Catalog.prototype.save = function(callback) {
    var catalog= {
        iid : this.iid,
        name:this.name,
        goods:this.goods
    };

    var catalogUser = new CatalogModel(catalog);

    catalogUser.save(function (err, catalog) {
        if (err) {
            return callback(err);
        }
        callback(null, catalog);
    });
};
Catalog.get = function(iid, callback) {
    CatalogModel.findOne({iid: iid}, function (err, catalog) {
        if (err) {
            return callback(err);
        }
        callback(null, catalog);
    });
};
Catalog.update = function(iid,img,callback){
    var conditions = {iid : iid};
    var update     = {$set : {img: img}};
    var options    = {upsert : true};
    Catalog.update(conditions, update, options, function(error,data){
        if(error) {
            console.log(error);
        } else {
            callback( 'update ok!');
        }
    });

}


module.exports = Catalog;