/**
 * Created by Administrator on 14-8-8.
 */
var mongoose = require('mongoose');
var db = require('./db.js');
var gooditemSchema = new mongoose.Schema({
    iid:String,
    status: String,
    date: String,
    pv: String,
    url : String,
    name :String,
    owner :String

}, {
    collection: 'gooditems'
});

var GooditemModel = mongoose.model('Gooditem', gooditemSchema);

function Gooditem(gooditem) {
    this.iid=gooditem.iid;
    this.name = gooditem.name;
    this.pv =gooditem.pv;
    this.status = gooditem.status;
    this.url = gooditem.url;
    this.date = gooditem.date;
    this.owner = gooditem.owner;
};

Gooditem.prototype.save = function(callback) {
    var gooditem= {
        iid:this.iid,
        name:this.name,
        pv :this.pv,
        status : this.status,
        url : this.url,
        date : this.date,
        owner : this.owner
    };

var Model = new GooditemModel(gooditem);
     Model.save(function (err, gooditem) {
        if (err) {
            return callback(err);
        }
        callback(null, gooditem);

    });
};
Gooditem.get = function(iid, callback) {
    gooditemModel.findOne({iid: iid}, function (err, gooditem) {
        if (err) {
            return callback(err);
        }
        callback(null, gooditem);
    });
};
Gooditem.update = function(iid,img,callback){
    var conditions = {iid : iid};
    var update     = {$set : {img: img}};
    var options    = {upsert : true};
    gooditemModel.update(conditions, update, options, function(error,data){
        if(error) {
            console.log(error);
        } else {
            callback( 'update ok!');
        }
    });

}
Gooditem.batch = function(array,callback){
    GooditemModel.create(array,function(err){
        if(err){
            callback('error')
        }
        else{
            callback("ok")
        }
    })

}
module.exports = Gooditem;