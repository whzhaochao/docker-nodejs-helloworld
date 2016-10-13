$(function () {
    $("#tophovertree").hide();
    //获取历史记录
    getHistory();

    //筛选按钮切换
    $("#filterHandle").click(function () {
        $("#m-ico").toggleClass("on");
        $("#m-word").toggleClass("m-word");
        $(".filter").toggle();
    });

    //删除输入字符
    $(".search-del").click(function () {
        $("#searchInput").val("");
        $("#searchInput").focus();
        $(".search-del").hide();
        $(".history-list").html("");
        getHistory();
    });

    $("#related").click(function(){
        $("#searchSubmit").click();
    });

    $("#new").click(function(){
        $("#sort").val("create_date");
        $("#searchSubmit").click();
    });

    $("#times").click(function(){
        $("#sort").val("play_time");
        $("#searchSubmit").click();
    });

    for(var i =0;i<$(".filter-item a").length;i++){
        $("#type_"+i).click(function(){
            $("#typeName").val(this.innerText);
            $("#searchSubmit").click();
        });
    }



    //自动提示输入
    document.getElementById('searchInput').addEventListener('input', function (e) {
        var autoListUrl = "http://m.v.zjol.com.cn/searchAuto/json.shtml";
        var value = e.target.value;
        if (value != "") {
            changeWin("history", "searchList");
            $(".history-list").html("");
            var html = '', i = 0;
            $.ajax({
                type: "post",
                dataType: "json",
                url: autoListUrl,
                data: "name=" + value + "",
                success: function (data) {
                    if (data != null) {
                        var length = data.length;
                        for (; i < length; i++) {
                            html += '<li class="word-wrap" onclick="selectWord(this.innerText)">';
                            html += '<span class="word-his">' + data[i].name + '</span>';
                            html += '</li>';
                        }
                        $(".history-list").append(html);
                    }
                }
            });
            $(".search-del").show();
        } else {
            $(".history-list").html("");
            getHistory();
            $(".search-del").hide();
        }
    });



    //返回
    $(".search-cancel").click(function () {
        window.location.href = "/index";
    });
});


//输入验证
function IsLegal() {
    var str = document.getElementById('searchInput').value.trim();
    if (str.length != 0) {
        var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
        var r = str.match(reg);
        if (r == null) {
            alert('对不起，您输入的格式不合法!');
            return false;
        }
        return true;
    }
}

//清除历史记录
function cleanHistory() {
    $(".history-list").html("");
    localStorage.clear();
}

//获取url参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function checkForm(obj) {
    if (obj.name.value.trim() == "") {
        alert("请输入搜索内容");
        return false;
    }
    //输入验证
    if (!IsLegal()) {
        return false;
    }

    //存储历史记录
    setHistory(obj);
}


function changeWin(div1, div2) {
    $("#" + div1).css("display", "block");
    $("#" + div2).css("display", "none");
}

function setHistory(obj) {
    var history = localStorage.history;
    if (history) {
        var hasHistorys = history.split(",");
        for (var i = 0; i < hasHistorys.length; i++) {
            if (hasHistorys[i] == obj.name.value) {
                if (i == 0) {
                    return false;
                } else {
                    history = history.replace("," + hasHistorys[i], "");
                }
            }
        }
        localStorage.history = obj.name.value + "," + history;
    } else {
        localStorage.history = obj.name.value;
    }
}


function getHistory() {
    var history = localStorage.history;
    var historyList, html = " ";
    if (history != null) {
        historyList = history.split(",");
        html += '<li class="tip">';
        html += '<span class="tip-his">历史搜索</span>';
        html += '<span class="clean-his" id="cleanHistory" onclick="cleanHistory()">清除搜索历史</span></li>';
        for (var i = 0; i < historyList.length; i++) {
            html += '<li class="word-wrap" onclick="selectWord(this.innerText)">';
            html += '<span class="word-his">' + historyList[i] + '</span>';
            html += '</li>';
        }
        $(".history-list").append(html);
    }
}

function selectWord(obj) {
    $("#searchInput").val(obj);
    $("#searchSubmit").click();
}


var page = 2;

//加载内容
function loading() {
    if (isloading)return;
    isloading = true;
    var html = '', i = 0;
    var defaults = 'http://file.v.zjol.com.cn/image/default.png';
    var name = (getUrlParam("name") == undefined) ? "" : getUrlParam("name");
    var sort = (getUrlParam("sort") == undefined) ? "" : getUrlParam("sort");
    var qType = (getUrlParam("qType") == undefined) ? "" : getUrlParam("qType");
    var typeName = (getUrlParam("typeName") == undefined) ? "" : getUrlParam("typeName");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: listUrl,
        data: "name=" + name + "&sort=" + sort + "&qType=" + qType + "&typeName=" + typeName + "&page=" + page + "&rows=20",
        success: function (data) {
            var length = data.videos.length, dataing;
            page++;
            for (; i < length; i++) {
                dataing = data.videos[i];
                html += '<li class="search-li">';
                html += '<a title="' + dataing.name.replace(/<[^>]+>/g, "") + '" href="../' + dataing.id + '.shtml">';
                html += '<div class="list-img"><img src="' + dataing.frontCover + '" alt="' + dataing.name.replace(/<[^>]+>/g, "") + '" onerror=this.src="' + defaults + '"></div>';
                html += '<div class="list-intro"><div class="list-title"><h2>' + dataing.name + '</h2></div>';
                html += '<div class="list-info"><span class="views">播放:' + dataing.playTime + '</span>';
                html += '<span class="time">' + dataing.createDate.substring(0, 10) + '</span></div></div></a></li>';
            }

            $(".search-list").append(html);
            myScroll.refresh();
            if (length < 20) {
                $("#pullUp").hide();
                return;
            }
            $(".search-list").imagesLoaded(function () {
                // Call the layout function.
                myScroll.refresh();
            });
            isloading = false;
        }
    });
}