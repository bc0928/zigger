define(["jquery", "jqueryCookie"], function () {
    function mCookie(ele) {
        this.ele = ele;
        if (this.ele.length == 0) return 0;
        this.init();
    }
    mCookie.prototype={
        constructor:mCookie,
        init(){
                 $(this.ele).on("click", function (event) {
                     this.id = $(event.target).attr("goodsid");
                    //  console.log(event.target);
                    //  console.log(this.id)
                this.opt =
                    {
                        id: this.id,
                        num: 1
                    };
                this.cookiecheck();
            }.bind(this))
        },
        cookiecheck(){
            //取cookie  如果没有存过cookie则把点前点击商品的goodsid 和num存进去，一开始num为1（基础值）
            // cookie里的是纯字符串
            this.getcookie = $.cookie('goodslist');
            if (!this.getcookie) {
                this.goodslist = [];
                this.goodslist.push(this.opt);
                this.goodslistStr = JSON.stringify(this.goodslist);
                $.cookie('goodslist', this.goodslistStr, {
                    expires: 7,
                    path: '/',
                })
            } else {
                this.getcookie = $.cookie("goodslist");
                this.getcookie = JSON.parse(this.getcookie);
                this.last = this.getcookie.length;
                this.getcookie.forEach(function (item, index) {
                    // console.log(item.id,this.id );
                    // 存过该商品id 则num++
                    if (item.id == this.id) {
                        item.num = item.num + 1;
                    } else if (index == this.last - 1) {
                        // console.log(this.opt);
                        this.getcookie.push(this.opt)
                    }
                }.bind(this))
                this.goodslistStr = JSON.stringify(this.getcookie);
                $.cookie('goodslist', this.goodslistStr, {
                    expires: 7,
                    path: '/',
                })
                // console.log(this.goodslistStr); 
            }
        }
    }
return mCookie;
})