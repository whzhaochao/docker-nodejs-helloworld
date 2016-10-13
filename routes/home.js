/**
 * Created by Administrator on 2016/6/21.
 */
var express = require("express");
var config = require('../tools/utils').getJSONSync("./config.json");

var homeRouter = function(app){

    var router = express.Router();

    router.get("/refresh",function(req,res,next){
        //app.find(req, config.api, "http://" + config.api + '/rest/index/list', function (req, data) {
        //    res.json({topNews:data.topNews});
        //});
    });

    router.get("/more",function(req,res,next){
        //app.find(req,"m.v.zjol.com.cn","http://m.v.zjol.com.cn/timeLineVideo/list.shtml?page=1&rows=4",function(req,data){
        //    var resData = JSON.parse(data);
        //    res.render('category', {index:"",politics:"",original:"",videoTime:"",category:"current",banner:resData,category_1:"current-type"});
        //});
        res.json({data:["refresh","category","category","category","category"]});

    });



    app.use("/",router);
}

module.exports.r = homeRouter;