/**
 * Created by Administrator on 14-8-7.
 */
/**
 * Created by Administrator on 14-8-7.
 */
var request = require('request');
var cheerio = require('cheerio');


// 读取博客首页
module.exports = function(url,callback){
request(url, function (err, res) {
    if (err) return console.error(err);

    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

     var dom = $('#mainRight_goodsSubject');
     var item = {
            name: $('#navigation').text().match(/[0-9/\u4e00-\u9fa5]+/g)[2],
            adcreq: $(dom.find('tr')[4]).text().trim(),
            perprice: $(dom.find('tr')[6]).text().trim(),
            place:$(dom.find('tr')[8]).text().trim(),
            sex : $(dom.find('tr')[10]).text().trim(),
            num : $(dom.find('tr')[12]).text().trim(),
            time :$(dom.find('tr')[14]).text().match(/\d+-\d+-\d+ \d+:\d+:\d+/)[0],
            describe:$(dom.find('tr')[16]).text()
        }
    // 输出结果
    console.log(item);
    callback(item);
});
}