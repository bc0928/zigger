define(['jquery'], function () {
    // 商品列表页的二级菜单
    function Menu(){
        
    }
    Menu.prototype = {
        constructor: Menu,
        init(selector,one,two){
            this.ele = $(selector);
            // console.log(this.ele)
            if(!this.ele)return;
            this.ele.on("mouseenter",$.proxy(this.show,this))
            this.ele.on("mouseleave", $.proxy(this.hide, this))
            $(".prolistconone").on("mouseleave", function(){
                $(".prolistconone")
                .css({
                    display:"none"
                })
                .parent().removeClass("on")
            })
            $(".prolistcontwo").on("mouseleave", function () {
                $(".prolistcontwo")
                .css({
                    display: "none"
                })
                .parent().removeClass("on")
            })
        },
        show(event){
            var target = event.target || event.srcElement;
            // console.log(target)
            $(target).addClass("on");
            $(target).find("ul").css({
                display:"block"
            })
        },
        hide(event){
            var target = event.target || event.srcElement;
            $(target).removeClass("on");
            $(target).find("ul").css({
                display: "none"
            })
        }
    }

    function Change(){
        // this.init()
    }
    Change.prototype={
        constructor:Change,
        init(){
            this.ele = $(".ranklist>li");
            // console.log(this.ele)
            if (!this.ele) return;
            this.ele.on("click", $.proxy(this.addC, this))
        },
        addC(event){
            var target = event.target || event.srcElement;
            // console.log(target);  
            $(target).addClass("on");
            $(target).siblings().removeClass("on");     
        }
    }

  
    


    // return new Menu();
    // return new Change();
    return all = {
        menu:new Menu(),
        change: new Change()
    }
})