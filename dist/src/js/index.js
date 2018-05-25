"use strict";

$(function () {
    // 主页导航  zt-box  隐藏菜单显示和隐藏
    function DisShow(selector) {
        $(selector).css({
            display: "block"
        });
    }
    function DisHide(selector) {
        $(selector).css({
            display: "none"
        });
    }

    $(".loginafter").on("mouseenter", function () {
        DisShow(".login-list");
    }).on("mouseleave", function () {
        DisHide(".login-list");
    });

    $(".headmessage").on("mouseenter", function () {
        DisShow(".msglist");
    }).on("mouseleave", function () {
        DisHide(".msglist");
    });

    $(".r-bar-qrcode").on("mouseenter", function () {
        DisShow(".shopshare");
    }).on("mouseleave", function () {
        DisHide(".shopshare");
    });

    //热门专题特效 
    $(".hotsubimg").on("mouseenter", function (event) {
        $(event.target).siblings().css({
            height: "50px"
        });
    });
    $(".hotsubdes").on("mouseenter", function (event) {
        $(event.target).css({
            height: "50px"
        });
    });
    $(".hotsubdes").on("mouseleave", function (event) {
        $(event.target).css({
            height: "0"
        });
    });
    $(".hotsubimg").on("mouseleave", function (event) {
        $(event.target).siblings().css({
            height: "0"
        });
    });

    // 轮播图加载渲染 json
    function DesignBanner(url, selector) {
        if (!url || !selector) return;
        this.url = url;
        this.main = $(selector);
        this.init();
    }
    DesignBanner.prototype = {
        constructor: DesignBanner,
        init: function init() {
            // 加载功能
            this.load_data().then(function (res) {
                // console.log(res);
                this.json = res;
                this.render_data();
            }.bind(this));
            // this.nextBtn = $(".swiper-button-prev");
            // this.nextBtn.on("click",function(){
            //     console.log(1);
            // })
        },
        load_data: function load_data() {
            var opt = {
                url: this.url
            };
            return $.ajax(opt);
        },
        render_data: function render_data() {
            var html = "";
            this.json.forEach(function (item) {
                html += "<div class=\"designersubli swiper-slide\" style=\"width:360px;\">\n                            <a class=\"designersubhead\" href=\"###\">\n                                <img class=\"designerwallimg\" src=\"" + item.desingerHeadImg + "\" alt=\"\u81EA\u4E2A\u8BBE\u8BA1\u5E08\u80CC\u666F\"/>\n                                <div class=\"designerinfo\">\n                                    <span class=\"designerimg\">\n                                        <img src=\"" + item.desingerImg + "\" alt=\"\u81EA\u4E2A\u8BBE\u8BA1\u5E08\">\n                                    </span>\n                                    <span class=\"designertit\">" + item.title + "</span>\n                                </div>\n                            </a>\n                            <div class=\"designerpro clearfix\">\n                                <a class=\"designerproli\">\n                                    <img class=\"designerproimg\" src=\"" + item.proLImg + "\" alt=\"\u81EA\u4E2A\u8BBE\u8BA1\u5E08\u63A8\u8350\u4EA7\u54C1\"/>\n                                    <span class=\"designerproname mt10\">" + item.proLTitle + "</span>\n                                    <span class=\"designerpromoney mb10\">\xA5" + item.proLPrice + "</span>\n                                </a>\n                                <a class=\"designerproli\">\n                                    <img class=\"designerproimg\" src=\"" + item.proRImg + "\" alt=\"\u81EA\u4E2A\u8BBE\u8BA1\u5E08\u63A8\u8350\u4EA7\u54C1\" />\n                                    <span class=\"designerproname mt10\">" + item.proRTitle + "</span>\n                                    <span class=\"designerpromoney mb10\">\xA5" + item.proRPrice + "</span>\n                                </a>\n                            </div>\n                            <a class=\"designerpromore clearfix\" href=\"#javascript\">\n                                <span class=\"fl\">\u67E5\u770B\u66F4\u591A</span>\n                                <i class=\"indexicon arrowleft fr\"></i>\n                            </a>\n                        </div>";
            }.bind(this));
            this.main.html(html);
        }
        // move(){
        // }

    };
    new DesignBanner("../json/disinger_list.json", ".designersubul");

    // 主页热销宝贝特效
    function HotList(url, selector) {
        if (!url || !selector) return;
        this.url = url;
        this.main = $(selector);
        this.init();
    }
    HotList.prototype = {
        constructor: HotList,
        init: function init() {
            this.page = 1;
            this.firstload = false;
            // 加载功能
            this.load_data().then(function (res) {
                // console.log(res);
                // this.firstload = true;
                this.json = res.page1;

                this.render_data();
            }.bind(this));
            this.main.on("mouseenter.changeImg", "img", $.proxy(this.change_show, this));
            this.main.on("mouseleave.changeImg", "img", $.proxy(this.change_hide, this));
            $(".js-newSuggestProduct").on("click", $.proxy(this.is_load, this));
        },
        load_data: function load_data() {
            var opt = {
                url: this.url,
                data: { page: this.page }
            };
            return $.ajax(opt);
        },
        render_data: function render_data() {
            this.html = "";
            this.json.forEach(function (item) {
                if (item.special == "1") {
                    // var html = "";
                    this.html += "<li class=\"hotsellconli\">\n                            <a href=\"#javascript\" >\n                                <img class=\"hotadimgone\" data = \"0\" src=\"" + this.json[0].hotproimagec + "\" alt=\"\u81EA\u4E2A\u70ED\u95E8\u63A8\u8350\u5B9D\u8D1D\">\n                            </a>\n                        </li>";
                } else if (item.special == "2") {
                    this.html += "<li class=\"hotsellconli hotadimgtwo\">\n                                <a href=\"/Angel/AngelShow\" >\n                                    <img class=\"hotadimgtwoimg\" data = \"0\" src=\"" + this.json[9].hotproimagec + "\" alt=\"\u81EA\u4E2A\u70ED\u95E8\u63A8\u8350\u5B9D\u8D1D\">\n                                </a>\n                            </li>";
                } else {
                    this.html += "<li class=\"hotsellconli\">\n                            <a href=\"javascript:void(0)\" >\n                                <em class=\"hotpro\">\n                                    <img class=\"hotproimg hotproimgc\" src=\"" + item.hotproimagec + "\"\n                                        alt=\"\u81EA\u4E2A\u70ED\u95E8\u63A8\u8350\u5B9D\u8D1D\">\n                                    <img class=\"hotproimg hotproimgy\" src=\"" + item.hotproimgy + "\"\n                                        alt=\"\u81EA\u4E2A\u70ED\u95E8\u63A8\u8350\u5B9D\u8D1D\">\n                                </em>\n                                <p class=\"normalprtit clearfix\">\n                                    <span class=\"normalt fl\">" + item.normaltitle + "</span>\n                                    <span class=\"normalmoney fr\">\xA5" + item.normalmoney + "</span>\n                                </p>\n                                <p class=\"normaldescon clearfix\">\n                                    <span class=\"normaldes fl\">" + item.normaldes + "</span>\n                                    <span class=\"buybtn fr\">" + item.butbtn + "</span>\n                                </p>\n                            </a>\n                        </li>";
                }
            }.bind(this));
            this.main.html(this.main.html() + this.html);
        },
        change_show: function change_show(event) {
            var target = event.target || event.srcElement;
            // console.log(target);
            $(target).siblings(".hotproimgy").css({
                display: "block"
            });
        },
        change_hide: function change_hide(event) {
            var target = event.target || event.srcElement;
            if ($(target).attr("data") == "0") return;
            // console.log(target);
            $(target).css({
                display: "none"
            }).siblings(".hotproimgc").css({
                display: "block"
            });
        },
        is_load: function is_load() {
            this.page++;
            this.load_data().then(function (res) {
                this.json = res;
                this.render_data();
            }.bind(this));
        }
    };
    new HotList("../json/index_list.json", ".hotsellcon");
    // 加载更多
    $(".js-newSuggestProduct").on("click", function () {
        console.log(21);
        // 加一个状态？flag  然后在isload里判断一哈？
        new HotList("../json/index_list.json", ".hotsellcon");
    });
    /*  var swiper = new Swiper('.swiper-container',{
         initialSlide: 3,
         spaceBetween: 0,
         slidesPerView: 2,
         centeredSlides: true,
         slideToClickedSlide: true,
         grabCursor: true,
         scrollbar: {
             el: '.swiper-scrollbar',
         },
         mousewheel: {
             enabled: true,
         },
         keyboard: {
             enabled: true,
         },
         // pagination: {
         //     el: '.swiper-pagination',
         // },
         navigation: {
             nextEl: '.swiper-button-next',
             prevEl: '.swiper-button-prev',
         }
     }); */
});