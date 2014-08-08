/**
 * Created by Administrator on 14-8-7.
 */
var request = require('request');
var cheerio = require('cheerio');

// 读取博客首页
module.exports= function(url,callback){
request(url, function (err, res) {
    if (err) return console.error(err);

    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

    // 读取博文类别列表
    var classList = [];
    $('#mainRightNewestSinfo_subject_sell').find(".list").find("tr").each(function () {

        // 从URL中取出分类的ID

        var $me = $(this);
        var item = {
            owner: url.match(/iid=(\w+)/)||"index",
            name: $me.find('a').text().trim(),
            status: $($me.find('td')[1]).text().trim(),
            date : $($me.find('td')[2]).text().trim(),
            pv: $($me.find('td')[3]).text().trim(),
            url:  $me.find('a').attr('href')
        }
        var s = item.url;
        if(s!=null){
          item.id = s.match(/iid=([0-9a-z]+)&iaction=(\w+)&st=(\w+)/)[1];
          classList.push(item);
        }


    });

    // 输出结果
    console.log(classList);
    callback(classList);
});
}