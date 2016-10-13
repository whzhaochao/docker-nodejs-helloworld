$(function () {
    $(".type").click(function () {
        var pathname = window.location.pathname;
        var type = pathname.substring(pathname.lastIndexOf('/') + 1);
        if(type != ""){
            $("#"+type).addClass("nav-"+type);
        }else{
            $("#index").addClass("nav-index");
        }
        $(".bg").css({
            display: "block", height: $(document).height()
        });
        $(".close").css({
            display: "block",
            top:20+ $(window).scrollTop() + "px",
            right:($("body").width() - $('.menu').width()) / 2  + "px",
        });
        $('.menu').css({
            //设置弹出层距离左边的位置
            left: ($("body").width() - $('.menu').width()) / 2  + "px",
            //设置弹出层距离上面的位置
            top: 100 + $(window).scrollTop() + "px",
            display: "block"
        });
    });
    //点击关闭按钮的时候，遮罩层关闭
    $(".close,.bg").click(function () {
        $(".bg,.menu,.close").css("display", "none");
    });

    $(".has-sub-menu").click(function(){
        $(".updown").toggleClass("open");
        $(".sub-nav-menu").toggleClass("active");

    })
});
