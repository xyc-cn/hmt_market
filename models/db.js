/**
 * Created by Administrator on 14-8-8.
 */
var M = require('mongoose');
M.connect('mongodb://admin:411411411@kahana.mongohq.com:10043/blog');
// reference to the database connection 为这个连接创建一个引用
var db = M.connection;
// expose to modules that require database.js 把这个引用暴露给引用 database 模块的其他模块
module.exports = db;