define(['jquery'], function() {
    //-----------------放大镜-------------------
    $("#smallBox").mouseenter(function () {
        $("#tool").css({ display: "block" });  //显示出图片上的放大镜（tool）
        $("#bigBox").css({ display: "block" }); //显示出右边的大盒子。

    })
    $("#smallBox").mouseleave(function () {
        $("#tool").css({ display: "none" });  //显示出图片上的放大镜（tool）
        $("#bigBox").css({ display: "none" }); //显示出右边的大盒子。

    })
    //smallbox随着show_li(左侧小图)变化-----------
    var leftLis = $(".detailyemul").find("li");  //左侧小图li
    leftLis.click(function () {
        var index = $(this).index();
        // console.log(index);
        v = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        // 对应大盒子根据点击小图片的下边改变css显示或隐藏
        $("#smallBox").find("li").eq(index).addClass("active").siblings().removeClass("active");
        $(".bigImg").eq(index).addClass("active").siblings().removeClass("active")
    })

    var smallBox = $("#smallBox");
    var tool = $("#tool");
    var bigBox = $("#bigBox");
    var bigImg = $(".bigImg");
    smallBox.mousemove(function (e) {
        //计算放大镜（tool）的x坐标
        var left = e.pageX - smallBox.offset().left - tool.width() / 2;
        //计算放大镜（tool）的y坐标
        // console.log(left)
        var top = e.pageY - smallBox.offset().top - tool.height() / 2;
        //处理left和top值(限制范围)
        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }
        if (left > smallBox.width() - tool.width()) {
            left = smallBox.width() - tool.width();
        }
        if (top > smallBox.height() - tool.height()) {
            top = smallBox.height() - tool.height();
        }
        //改变放大镜的一个坐标
        tool.css({
            left: left,
            top: top
        });
        //求图片应当移动的距离
        var x = left * bigBox.width() / tool.width();
        var y = tool.position().top * bigBox.height() / tool.height();
        //改变图片移动的距离
        //			bigImg[0].style.left = -x + "px";
        //			bigImg[0].style.top = -y + "px";
        bigImg.css({ left: -x });
        bigImg.css({ top: -y });
        //console.log(smallBox.offset().top)
    })

//选择商品不同购买信息
    $(".dskuDiv").on("click",function(event){
        // console.log(event.target);
        var li = $(event.target).parent();
        li.addClass("active").siblings().removeClass("active");

    })






});