
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var cronJob = require('cron').CronJob;
var spawn = require('child_process').spawn;
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
routes(app);
// 定时执行更新任务
/*setInterval( function () {
    console.log('开始执行定时更新任务');
    var update = spawn(process.execPath, [path.resolve(__dirname, 'models/update.js')]);
    update.stdout.pipe(process.stdout);
    update.stderr.pipe(process.stderr);
    update.on('close', function (code) {
        console.log('更新任务结束，代码=%d', code);
    });
}, 650000);*/


