window.onload = function () {
    var mySwiper1 = new Swiper('#banner', {
        autoplay: 5000,
        visibilityFullFit: true,
        loop: true,
        pagination: '.pagination',
    });
}

$(".refresh").click(function () {
    //通过ajax获取数据
    //var html = '';
    //$("#site_content_1").addClass("fade");
    //$.ajax({
    //    type: "GET",
    //    url: "/refresh",
    //    success: function (data) {
    //        html = new EJS({url:'./template/videoTime_piece.ejs'}).update('site_content_1',data);
    //        $("#site_content_1").fadeTo("slow",1).removeClass("fade");
    //    }
    //});

    //通过两组数据隐藏显示控制
    $("#site_content_1").toggleClass("hide");
    $("#site_content_2").toggleClass("hide");
});


$("#showMore").click(function () {
    var html = '';
    var json;
    $.ajax({
        type: "GET",
        url: "/more",
        success: function (data) {
            json = eval(data);
            html = "<a href='#' class='video-item'>" +
                "<img src='/images/1.jpg' class='sub-video-img'>" +
                "<span class='sub-video-duration-left'>" + json.data[0] + "</span>" +
                "<span class='sub-title sub-video-title'>" + json.data[0] + "</span>" +
                "<span class='headline-playTime'>" +
                "<i class='sub-i-playTime'></i><span class='sub-news-playTime'>" + json.data[0] + "</span>" +
                "</span>" +
                "</a>";
            $(".sub-recommend").append(html);
        }
    });

});




