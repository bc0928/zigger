define(["jquery","mCookie"], function() {
    // 主页导航  zt-box  隐藏菜单显示和隐藏
        function DisShow(selector) {
            $(selector).css({
                display: "block"
            })
        }
        function DisHide(selector) {
            $(selector).css({
                display: "none"
            })
        }

        $(".loginafter")
            .on("mouseenter", () => {
                DisShow(".login-list");
            })
            .on("mouseleave", () => {
                DisHide(".login-list");
            })

        $(".headmessage")
            .on("mouseenter", () => {
                DisShow(".msglist");
            })
            .on("mouseleave", () => {
                DisHide(".msglist");
            })

        $(".r-bar-qrcode")
            .on("mouseenter", () => {
                DisShow(".shopshare");
            })
            .on("mouseleave", () => {
                DisHide(".shopshare");
            })




        //热门专题特效 
        $(".hotsubimg").on("mouseenter", function (event) {
            $(event.target).siblings().css({
                height: "50px",
            })
        })
        $(".hotsubdes").on("mouseenter", function (event) {
            $(event.target).css({
                height: "50px"
            })
        })
        $(".hotsubdes").on("mouseleave", function (event) {
            $(event.target).css({
                height: "0"
            })
        })
        $(".hotsubimg").on("mouseleave", function (event) {
            $(event.target).siblings().css({
                height: "0"
            })
        })

        // 轮播图加载渲染 json
        function DesignBanner(url, selector) {
            if (!url || !selector) return;
            this.url = url;
            this.main = $(selector);
            this.init();
        }
        DesignBanner.prototype = {
            constructor: DesignBanner,
            init() {
                // 加载功能
                this.load_data()
                    .then(function (res) {
                        // console.log(res);
                        this.json = res;
                        this.render_data();
                    }.bind(this));
                // this.nextBtn = $(".swiper-button-prev");
                // this.nextBtn.on("click",function(){
                //     console.log(1);
                // })
            },
            load_data() {
                var opt = {
                    url: this.url
                }
                return $.ajax(opt);
            },
            render_data() {
                var html = "";
                this.json.forEach(function (item) {
                    html += `<div class="designersubli swiper-slide" style="width:346.667px;">
                            <a class="designersubhead" href="###">
                                <img class="designerwallimg" src="${item.desingerHeadImg}" alt="自个设计师背景"/>
                                <div class="designerinfo">
                                    <span class="designerimg">
                                        <img src="${item.desingerImg}" alt="自个设计师">
                                    </span>
                                    <span class="designertit">${item.title}</span>
                                </div>
                            </a>
                            <div class="designerpro clearfix">
                                <a class="designerproli">
                                    <img class="designerproimg" src="${item.proLImg}" alt="自个设计师推荐产品"/>
                                    <span class="designerproname mt10">${item.proLTitle}</span>
                                    <span class="designerpromoney mb10">¥${item.proLPrice}</span>
                                </a>
                                <a class="designerproli">
                                    <img class="designerproimg" src="${item.proRImg}" alt="自个设计师推荐产品" />
                                    <span class="designerproname mt10">${item.proRTitle}</span>
                                    <span class="designerpromoney mb10">¥${item.proRPrice}</span>
                                </a>
                            </div>
                            <a class="designerpromore clearfix" href="#javascript">
                                <span class="fl">查看更多</span>
                                <i class="indexicon arrowleft fr"></i>
                            </a>
                        </div>`
                }.bind(this));
                this.main.html(html);
            }
            // move(){
            // }
        }
        // new DesignBanner("http://127.0.0.1:8888/json/disinger_list.json",".designersubul"); 
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
            init() {
                this.page = 1;
                this.firstload = false;
                // 加载功能
                this.load_data()
                    .then(function (res) {
                        this.firstload = true;
                        this.json = res.page1;
                        // console.log(this.json);

                        this.render_data();
                    }.bind(this));
                this.main.on("mouseenter.changeImg", "img", $.proxy(this.change_show, this));
                this.main.on("mouseleave.changeImg", "img", $.proxy(this.change_hide, this));
                $(".js-newSuggestProduct").on("click", $.proxy(this.is_load, this));
            },
            load_data() {
                var opt = {
                    url: this.url,
                    data: { page: this.page }
                }
                return $.ajax(opt);
            },
            render_data() {
                this.html = "";
                this.json.forEach(function (item) {
                    if (item.special == "1") {
                        // var html = "";
                        this.html += `<li class="hotsellconli">
                            <a href="#javascript" >
                                <img class="hotadimgone" data = "0" src="${this.json[0].hotproimagec}" alt="自个热门推荐宝贝">
                            </a>
                        </li>`
                    } else if (item.special == "2") {
                        this.html += `<li class="hotsellconli hotadimgtwo">
                                <a href="/Angel/AngelShow" >
                                    <img class="hotadimgtwoimg" data = "0" src="${this.json[9].hotproimagec}" alt="自个热门推荐宝贝">
                                </a>
                            </li>`
                    } else {
                        this.html += `<li class="hotsellconli">
                            <a href="javascript:void(0)" >
                                <em class="hotpro">
                                    <img class="hotproimg hotproimgc" src="${item.hotproimagec}"
                                        alt="自个热门推荐宝贝">
                                    <img class="hotproimg hotproimgy" src="${item.hotproimgy}"
                                        alt="自个热门推荐宝贝">
                                </em>
                                <p class="normalprtit clearfix">
                                    <span class="normalt fl">${item.normaltitle}</span>
                                    <span class="normalmoney fr">¥${item.normalmoney}</span>
                                </p>
                                <p class="normaldescon clearfix">
                                    <span class="normaldes fl">${item.normaldes}</span>
                                    <span class="buybtn fr">${item.butbtn}</span>
                                </p>
                            </a>
                        </li>`
                    }
                }.bind(this));
                this.main.html(this.main.html() + this.html);
            },
            change_show(event) {
                var target = event.target || event.srcElement;
                // console.log(target);
                $(target).siblings(".hotproimgy")
                    .css({
                        display: "block"
                    })
            },
            change_hide(event) {
                var target = event.target || event.srcElement;
                if ($(target).attr("data") == "0") return;
                // console.log(target);
                $(target).css({
                    display: "none"
                })
                    .siblings(".hotproimgc")
                    .css({
                        display: "block"
                    })
            },
            is_load() {
                this.page++;
                this.load_data()
                    .then(function (res) {
                        this.json = res;
                        this.render_data();
                    }.bind(this))
            }
        }

        new HotList("../json/index_list.json", ".hotsellcon");

        // 商品列表数据
        function proList(url, selector) {
            if (!url || !selector) return;
            this.url = url;
            this.main = $(selector);
            this.init();
        }
        proList.prototype = {
            constructor: proList,
            init() {
                // this.page = 1;
                // this.firstload = false;
                // 加载功能
                this.load_data()
                    .then(function (res) {
                        this.json = res.productList.page1;
                        // console.log(this.json);
                        this.render_data();
                    }.bind(this));
                this.main.on("mouseenter.changeImg", "img", $.proxy(this.change_show, this));
                this.main.on("mouseleave.changeImg", "img", $.proxy(this.change_hide, this));
                $(".js-newSuggestProduct").on("click", $.proxy(this.is_load, this));
            },
            load_data() {
                var opt = {
                    url: this.url,
                    data: { page: this.page }
                }
                return $.ajax(opt);
            },
            render_data() {
                this.html = "";
                this.json.forEach(function (item) {
                    if (item.special == "1") {
                        // var html = "";
                        this.html += `<a class="normalprli normalprliphone" href="#javascript">
                                        <img data = "0" src="${item.hotproimagec}" alt="" class="mt60"/>
                                    </a>`
                    } else if (item.special == "2") {
                        this.html += `<a class="normalprli nextpagea" style="" href="javascript:;">
                                        <em class="nextpage">
                                            <i class="proicon"></i>
                                            <span>下一页</span>
                                        </em>
                                    </a>`
                    } else {
                        this.html += `<li class="normalprli" goodsid="${item.goodsId}">
                                    <a href="http://localhost:81/bcjs/zigger_wamp2/html/proList_Detail.html"  goodsid="${item.goodsId}">
                                        <em class="normalimgc"goodsid="${item.goodsId}">
                                            <img class="normalimg hotproimgc" src="${item.hotproimagec}" alt="">
                                            <img class="normalimg hotproimgy" src="${item.hotproimgy}"
                                             goodsid="${item.goodsId}"/>
                                        </em>
                                        <p class="normalprtit clearfix">
                                            <span class="normalt fl" goodsid="${item.goodsId}">${item.normaltitle}</span>
                                            <span class="normalmoney fr" goodsid="${item.goodsId}">¥${item.normalmoney}</span>
                                        </p>
                                        <p class="normaldescon clearfix" goodsid="${item.goodsId}">
                                            <span class="normaldes fl" goodsid="${item.goodsId}">${item.normaldes}</span>
                                            <span class="buybtn fr" goodsid="${item.goodsId}">${item.butbtn}</span>
                                        </p>
                                    </a>
                                </li>`

                    }
                }.bind(this));
                this.main.html(this.main.html() + this.html);
            },
            change_show(event) {
                var target = event.target || event.srcElement;
                // console.log(target);
                $(target).siblings(".hotproimgy")
                    .css({
                        display: "block"
                    })
            },
            change_hide(event) {
                var target = event.target || event.srcElement;
                if ($(target).attr("data") == "0") return;
                // console.log(target);
                $(target).css({
                    display: "none"
                })
                    .siblings(".hotproimgc")
                    .css({
                        display: "block"
                    })
            }
        }
        new proList("../json/pros_list.json", ".normalprocon");


        // 加载更多按钮
        $(".js-newSuggestProduct").on("click", function () {
            // 加一个状态？flag  然后在isload里判断一哈？
            new HotList("../json/index_list.json", ".hotsellcon");
        });


        // 判断用户是否登录，显示对应的用户头像区域和用户名字
        // var isLogin = false;
        var hasUname = localStorage.getItem("uName");
        var hasLogin = localStorage.getItem("isLogin");
        // console.log(hasLogin);
        if (hasLogin == "true") {
            $(".loginbox").css({
                display: "none"
            })
            $(".loginafter").css({
                display: "block"
            })
            $(".userName").text(hasUname);
            $(".noLogintx").css({
                display: "none"
            })
            $(".hasLogintx").css({
                display: "block"
            })
        } else {
            $(".loginbox").css({
                display: "block"
            })
            $(".loginafter").css({
                display: "none"
            })
            $(".noLogintx").css({
                display: "block"
            })
            $(".hasLogintx").css({
                display: "none"
            })
        }
        // 退出登录状态
        $(".tuichu").on("click", function () {
            localStorage.clear();
            $(".loginbox").css({
                display: "block"
            })
            $(".loginafter").css({
                display: "none"
            })
        })

        // 返回顶部
    $(".r-bar-top").click(function () {
        $("body,html").animate({ scrollTop: 0 }, 800)
    })



    
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