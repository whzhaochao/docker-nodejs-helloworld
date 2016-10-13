/**
 * Created by Administrator on 2016/6/21.
 */
var express = require("express");

var searchRouter = function (app) {

    var router = express.Router();

    router.post("/searchSubmit", function (req, res, next) {
        delete req.headers["content-length"];//post比get请求多一个属性

        var name = encodeURI(req.body.name);
        var typeName = encodeURI(req.body.typeName);
        var qType = req.body.qType;
        var sort = req.body.sort;
        var typeClass = "", related = "", create_date = "", play_time = "";
        var host = "m.v.zjol.com.cn";
        var path = "http://m.v.zjol.com.cn/search/json.shtml?name=" + name + "";
        if (name != 'undefined' && name != "" && name != null) {
            if (qType != "") {
                path += "&qType=" + qType + "";
            }
            if (typeName != "") {
                path += "&typeName=" + typeName + "";
                typeClass = "choose";
            }
            if (sort != "") {
                path += "&sort=" + sort;
                if (sort == "create_date") {
                    create_date = "on";
                }
                if (sort == "play_time") {
                    play_time = "on";
                }
            } else {
                related = "on";
            }
            app.find(req, host, path, function (req, data) {
                res.render('search', {
                    data: data,
                    name: decodeURI(name),
                    status: "none",
                    related: related,
                    create_date: create_date,
                    play_time: play_time,
                    typeClass: typeClass,
                });
            });
        }
    });

    app.use("/", router);
}

module.exports.r = searchRouter;