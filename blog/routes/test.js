/**
 * Created by tracy on 2015/11/22.
 */
var express = require('express');
var router = express.Router();

// 使用回调函数数组处理路由
router.get('/', function(req, res, next) {
    res.send('test test test!!!');
});

var fn1 = function(req, res, next) {
    console.log('fn1');
    next();
};

var fn2 = function(req, res, next) {
    console.log('fn2');
    next();
};

var fn3 = function(req, res, next) {
    //res.send('fn3');
    next();
};

router.get('/example/a', [fn1, fn2, fn3], function(req, res) {
    res.download('tstt.js');
});

// 使用多个回调函数处理路由
/*router.get('/example/a', function(req, res, next) {
    console.log('test test test!!!');
    next();
}, function(req, res) {
    res.send('调用了next()');
});*/

// 使用字符串模式的路由路径
/*router.get('/', function(req, res, next) {
    res.send('test test test!!!');
});

router.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
});

router.get('/ab+cd', function(req, res) {
    res.send('ab+cd');
});

router.get('/ab*cd', function(req, res) {
    res.send('ab*cd');
});

router.get('/ab(cd)?d', function(req, res) {
    res.send('ab(cd)?cd');
});*/



module.exports = router;