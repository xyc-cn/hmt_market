
/*
 * GET home page.
 */
var item_goods = require('../models/item_goods.js')
module.exports = function(app){
    app.get('/', function(req,res){
        item_goods("http://market.scau.edu.cn/goods.php?iid=1407327650nejt2kxs&iaction=view&st=e5",function(data){
            res.json(data)
        })
    });
};