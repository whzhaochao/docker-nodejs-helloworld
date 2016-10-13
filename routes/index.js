/**
 * 路由入口
 */

var express = require('express');
var config = require('../tools/utils').getJSONSync("./config.json");
var page = 1;
var bindRoutes = function (app) {
    navRoutes(app);
    require("./home").r(app);
    require("./category").r(app);
    require("./search").r(app);
}


var navRoutes = function (app) {
    var router = express.Router();
    router.get('/index', function (req, res) {

        app.find(req, config.api, "http://" + config.api + '/api/index/list', function (req, data) {
            res.render('index', {index: 'current', data: data});
        });
    });

    router.get('/politics', function (req, res) {
        app.find(req, config.api, "http://" + config.api + "/api/index/politic/1", function (req, data) {
            res.render('politics', {politics: "current", data: data});
        });
    });

    router.get('/original', function (req, res) {
        app.find(req, config.api, "http://" + config.api + "/api/index/original/1", function (req, data) {
            res.render('original', {original: "current", data: data});
        });
    });

    router.get('/videoTime', function (req, res) {
        app.find(req, config.api, "http://" + config.api + "/api/index/timeLine/1", function (req, data) {
            res.render('videoTime', {videoTime: "current", data: data});
        });
    });

    router.get('/category/0', function (req, res) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/123/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_0: "current-type",type:"123"});
        });
    });

    router.get('/search', function (req, res) {
        res.render('search', {});
    });


    router.get('/video/:id', function (req, res) {
        var id = req.params.id;
        var tags = "";
        var time = "";
        app.find(req, config.api, "http://" + config.api + "/api/index/" + id, function (req, data) {
            if (data.video.tagstring && data.video.tagstring != null) {
                tags = data.video.tagstring.split(",");
            }
            if(data.video.play_time > 10000){
                time = data.video.play_time;
                data.video.play_time = Math.round(time/10000*10)/10 + '万';
            }
            res.render('detail', {data: data, tags: tags});
        });
    });

    router.get('/user', function (req, res) {
        var user_id = req.query.user_id;
        app.find(req, config.api, "http://" + config.api + "/api/index/user/" + user_id + "/1", function (req, data) {
            res.render('user', {data: data});
        });

    });

    app.use(function(req, res, next){
        res.locals.rootPath = config.rootPath;      //上下文路径
        next();
    });

    app.use(config.rootPath, router);
}


module.exports.bind = bindRoutes;
