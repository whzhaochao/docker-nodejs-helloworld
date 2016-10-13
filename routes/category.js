/**
 * Created by Administrator on 2016/6/21.
 */
var express = require("express");
var config = require('../tools/utils').getJSONSync("./config.json");

var categoryRouter = function (app) {

    var router = express.Router();

    router.get("/0", function (req, res) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/123/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_0: "current-type",type:"123"});
        });
    });

    router.get("/1", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/1/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_1: "current-type",type:"1"});
        });
    });

    router.get("/2", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/3/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_2: "current-type",type:"3"});
        });
    });

    router.get("/3", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/114/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_3: "current-type",type:"114"});
        });
    });

    router.get("/4", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/10/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_4: "current-type",type:"10"});
        });
    });

    router.get("/5", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/103/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_5: "current-type",type:"103"});
        });
    });

    router.get("/6", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/117/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_6: "current-type",type:"117"});
        });
    });

    router.get("/7", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/2/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_7: "current-type",type:"2"});
        });
    });

    router.get("/8", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/118/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_8: "current-type",type:"118"});
        });
    });

    router.get("/9", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/109/1", function (req, data) {

            res.render('category', {category: "current", data: data, category_9: "current-type",type:"109"});
        });
    });

    router.get("/10", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/133/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_10: "current-type",type:"133"});
        });
    });

    router.get("/11", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/132/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_11: "current-type",type:"132"});
        });
    });

    router.get("/12", function (req, res, next) {
        app.find(req, config.api, "http://" + config.api + "/api/index/type/131/1", function (req, data) {
            res.render('category', {category: "current", data: data, category_12: "current-type",type:"131"});
        });
    });


    app.use(config.rootPath + "/category", router);
}

module.exports.r = categoryRouter;