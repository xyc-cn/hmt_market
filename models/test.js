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
    var url ="http://market.scau.edu.cn/goods.php?iid=1407246132s7jn1j8b&iaction=view&st=0f";
    request(url, function (err, res) {
        if (err) return console.error(err);
        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(res.body.toString());
        var item = {
            id:url.match(/iid=([0-9a-z]+)&iaction=(\w+)&st=(\w+)/)[1],
            img:[]
        }
        //判断是否有图片，有就再进行一次抓取，获得图片url
        var dom = $('#mainRight_goodsSubject');
        if(dom.find("#bcastr4").length!=0){
            var imgurl =dom.find("#bcastr4").attr('data').split('xml=')[1];
            getPhotos(imgurl,function(data){
                item.img=data;
                wait=0;
            })
        }

        $('#mainRight_goodsSubject tr').each(function(index,value){
            var key =$(dom.find('tr')[index]).find('img').attr('src');
            var data =$(dom.find('tr')[index]).text().trim();
            if(key!=null&&data!=null)
            {   key = key.match(/icon_(\w+)/)[1];
                item[key]=data;
            }
        });

          console.log(item);

    });

function getPhotos(imgurl,callback){
    request(imgurl, function (err, res2) {

        var img = [];

        if (err) return console.error(err);
        var $$ = cheerio.load(res2.body.toString());
        $$("image").each(function(){
            img.push($$(this).text())
        });
        callback(img);
})
}