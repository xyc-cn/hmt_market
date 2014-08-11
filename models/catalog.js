/**
 * Created by Administrator on 14-8-8.
 */
var mongoose = require('mongoose');
var db = require('./db.js');

var catalogSchema = new mongoose.Schema({
    iid:String,
    page:String,
    goods:[]

}, {
    collection: 'catalogs'
});

var CatalogModel = mongoose.model('Catalog', catalogSchema);

function Catalog(iid,page,goods) {
    this.iid=iid;
    this.goods =goods;
    this.page = page;
};

Catalog.prototype.save = function(callback) {
    var catalog= {
        iid : this.iid,
        goods:this.goods,
        page:this.page
    };

    var catalogUser = new CatalogModel(catalog);

    catalogUser.save(function (err, catalog) {
        if (err) {
            return callback(err);
        }
        callback(null, catalog);
    });
};
Catalog.get = function(iid,page, callback) {
    CatalogModel.findOne({iid: iid,page:page}, function (err, catalog) {
        if (err) {
            return callback(err);
        }
        callback(null, catalog);
    });
};
Catalog.update = function(iid,page,goods,callback){
    var conditions = {iid : iid,page:page};
    var update     = {$set : {goods: goods}};
    var options    = {upsert : true};
    CatalogModel.update(conditions, update, options, function(error,data){
        if(error) {
            console.log(error);
        } else {
            callback( 'update ok!');
        }
    });

}


module.exports = Catalog;