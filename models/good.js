/**
 * Created by Administrator on 14-8-7.
 */
var mongoose = require('mongoose');
var db = require('./db.js');
var goodSchema = new mongoose.Schema({
    qq:String,
    phone:String,
    title :String,
    iid:String,
    goods_owner: String,
    goodsPhotos: String,
    hownew: String,
    price: String,
    deliver: String,
    paidtype: String,
    goodsNums: String,
    pastdate: String,
    goodsBewrite:String,
    sex:String,
    img:[]

}, {
    collection: 'goods'
});

var GoodModel = mongoose.model('Good', goodSchema);

function Good(good) {
        this.qq = good.qq;
        this.phone = good.phone;
        this.sex = good.sex;
        this.title =good.title;
        this.iid=good.iid;
        this.goods_owner=good.goods_owner;
        this.goodsPhotos=good.goodsPhotos;
        this.hownew=good.hownew;
        this.price=good.price;
        this.deliver=good.deliver;
        this.paidtype=good.paidtype;
        this.goodsNums=good.goodsNums;
        this.pastdate=good.pastdate;
        this.goodsBewrite=good.goodsBewrite;
        this.img=good.img;
};

Good.prototype.save = function(callback) {
    var good= {
    qq:this.qq,
    phone:this.phone,
    sex:this.sex,
    title :this.title,
    iid : this.iid,
    goods_owner:this.goods_owner,
    goodsPhotos:this.goodsPhotos,
    hownew:this.hownew,
    price:this.price,
    deliver:this.deliver,
    paidtype:this.paidtype,
    goodsNums:this.goodsNums,
    pastdate:this.pastdate,
    goodsBewrite:this.goodsBewrite,
    img:this.img
    };

    var goodUser = new GoodModel(good);

    goodUser.save(function (err, good) {
        if (err) {
            return callback(err);
        }
        callback(null, good);

    });
};
Good.get = function(iid, callback) {
    GoodModel.findOne({iid: iid}, function (err, good) {
        if (err) {
            return callback(err);
        }
        callback(null, good);
    });
};
Good.update = function(iid,img,callback){
    var conditions = {iid : iid};
    var update     = {$set : {img: img}};
    var options    = {upsert : true};
    GoodModel.update(conditions, update, options, function(error,data){
        if(error) {
            console.log(error);
        } else {
            callback( 'update ok!');
        }
    });

}
Good.modify = function(data,callback){
    GoodModel.update({iid:data.iid},{$set : data},function (err,doc) {
        if(doc!=1){
                var goodinstance = new Good(data);
                goodinstance.save(function(t,info){
                    console.log(info);
            });
        }else{
            callback("ok");
        }
    })

}

module.exports = Good;