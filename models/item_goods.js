/**
 * Created by Administrator on 14-8-7.
 */
/**
 * Created by Administrator on 14-8-7.
 */
var request = require('request');
var cheerio = require('cheerio');
var Good = require('../models/good.js');


// 读取博客首页
module.exports = function(url,name,callback){
    request(url, function (err, res) {
        if (err) return console.error(err);
        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(res.body.toString());
        var item = {
            title:name,
            iid:url.match(/iid=([0-9a-z]+)&iaction=(\w+)&st=(\w+)/)[1],
            img:[]
        }
        //判断是否有图片，有就再进行一次抓取，获得图片url
        var dom = $('#mainRight_goodsSubject');
        if(dom.find("#bcastr4").length!=0){
            var imgurl =dom.find("#bcastr4").attr('data').split('xml=')[1];
            getPhotos(imgurl,item.iid,function(data){
            })
        }

        if(dom.find('tr').find('a').text().match(/\d+/)!=null){
            item.qq=dom.find('tr').find('a').text().match(/\d+/)[0];
        }


        $('#mainRight_goodsSubject tr').each(function(index,value){
            var key =$(dom.find('tr')[index]).find('img').attr('src');
            var data =$(dom.find('tr')[index]).text();

            if(key!=null&&data!=null)
            {   key = key.match(/icon_(\w+)/)[1];
                data=data.trim();
                item[key]=data;
            }
            if(index<5){
                if($(dom.find('tr')[3]).text().match(/\w{11}/)!=null){
                    item.phone=$(dom.find('tr')[3]).text().match(/\w{11}/)[0];
                }
            }
        });

        callback(item);

    });

    function getPhotos(imgurl,iid,callback){
        request(imgurl, function (err, res2) {

            var img = [];

            if (err) return console.error(err);
            var $$ = cheerio.load(res2.body.toString());
            $$("image").each(function(){
                img.push($$(this).text())
            });
            Good.update(iid,img,function(data){
                callback(data);
            })

        })
}
}