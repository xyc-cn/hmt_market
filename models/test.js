/**
 * Created by Administrator on 14-8-7.
 */
/**
 * Created by Administrator on 14-8-7.
 */
/**
 * Created by Administrator on 14-8-7.
 */
var request = require('request');
var cheerio = require('cheerio');


// 读取博客首页
    var url ="http://market.scau.edu.cn/catalog.php?iid=9";
    request(url, function (err, res) {
        if (err) return console.error(err);
        // 根据网页内容创建DOM操作对象
        var classList = [];
        var $ = cheerio.load(res.body.toString());
        var dom = $("#datacontainer").find('tbody tr').each(function () {

            // 从URL中取出分类的ID

            var $me = $(this);
            var item = {
                owner: url.match(/iid=(\w+)/)[1]||"index",
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


          console.log(classList);

    });

