/**
 * Created by Administrator on 2016/9/13.
 */

$(document).ready(function () {
    //返回顶部
    $(document).scroll(function () {
        if (document.body.scrollTop > window.innerHeight) {
            $(".go-top").css("display", "inline");
        } else {
            $(".go-top").css("display", "none");
        }
    });

    $(".go-top").click(function () {
        $(document.body).animate({
                scrollTop: "0"
            },
            500, function () {

            });
    });


    //时政查看更多
    var politic_page = 2;
    $(".politics-more-button").click(function () {
        var html = '';
        $.ajax({
            type: "GET",
            url: "http://m.v.zjol.com.cn/api/index/politic/" + politic_page,
            dataType: "json",
            success: function (data) {
                politic_page++;
                var h = {"data": data};  //给数组定义名字
                html = new EJS({url: '../msight/template/politics_piece.ejs'}).render(h);
                $("#content").append(html);
            }
        });
    });

    // //原创查看更多
    // var original_page = 2;
    // $(".original-more-button").click(function () {
    //     var html = '';
    //     $.ajax({
    //         type: "GET",
    //         url: "http://m.v.zjol.com.cn/api/index/original/"+original_page,
    //         dataType: "json",
    //         success: function (data) {
    //             original_page++;
    //             var h= {"data":data};  //给数组定义名字
    //             html = new EJS({url: './template/original_piece.ejs'}).render(h);
    //             $("#content").append(html);
    //         }
    //     });
    // });

    //视频即时报查看更多
    var videoTime_page = 2;
    $(".videoTime-more-button").click(function () {
        var html = '';
        $.ajax({
            type: "GET",
            url: "http://m.v.zjol.com.cn/api/index/timeLine/" + videoTime_page,
            dataType: "json",
            success: function (data) {
                videoTime_page++;
                var h = {"data": data};  //给数组定义名字
                html = new EJS({url: '../msight/template/videoTime_piece.ejs'}).render(h);
                $("#content").append(html);
            }
        });
    });

});


//分类查看更多
var category_page = 2;
var moreCategory = function(type) {
    var html = '';
    $.ajax({
        type: "GET",
        url: "http://m.v.zjol.com.cn/api/index/type/" + type + "/" + category_page,
        dataType: "json",
        success: function (data) {
            category_page++;
            var h = {"data": data};  //给数组定义名字
            html = new EJS({url: '../template/category_piece.ejs'}).render(h);
            $("#content").append(html);
        }
    });
}












