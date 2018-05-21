$(function(){
    $(".loginafter").on("mouseenter",function(event){
        // var target = event.target || event.srcElement;
        $(".login-list").css({
            display:"block"
        })
    })
    $(".loginafter").on("mouseleave", function () {
        $(".login-list").css({
            display: "none"
        })
    })
    $(".headmessage").on("mouseenter", function (event) {
        $(".msglist").css({
            display: "block"
        })
    })
    $(".headmessage").on("mouseleave", function () {
        $(".msglist").css({
            display: "none"
        })
    })



    // banner
    function DesignBanner(url,selector){
        this.url = url;
        this.main = $(selector);
        this.init();
    }
    DesignBanner.prototype = {
        constructor: DesignBanner,
        init(){
            // 加载功能
            this.load_data()
            .then(function(res){
                // console.log(res);
                this.json = res;
                this.render_data();
            }.bind(this));
            // this.nextBtn = $(".swiper-button-prev");
            // this.nextBtn.on("click",function(){
            //     console.log(1);
            // })
        },
        load_data(){
            var opt = {
                url:this.url
            }
            return $.ajax(opt);
        },
        render_data(){
            var html = "";
            this.json.forEach(function(item){
                html += `<div class="designersubli swiper-slide swiper-slide-visible swiper-slide-active" style="width:360px;">
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
        },
        // move(){

        // }
    }
    new DesignBanner("http://localhost:81/bcjs/zigger/json/disinger_list.json",".designersubul");

    var swiper = new Swiper({
        el: '.swiper-container',
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
        },
    });



})