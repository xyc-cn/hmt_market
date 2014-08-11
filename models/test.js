/**
 * Created by Administrator on 14-8-7.
 */
/**
 * Created by Administrator on 14-8-7.
 */
var Catalog = require('../models/catalog.js');
var Good = require('../models/good.js');
var request = require('request');
var cheerio = require('cheerio');
var cronJob = require('cron').CronJob;
var newest_good = require('../models/newest_good.js');
newest_good("http://market.scau.edu.cn/index.php",function(data){
    var Catalogmodel = new Catalog(0,1,data);
    Catalogmodel.save(function(t,datas){
        console.log(datas);
    });
})