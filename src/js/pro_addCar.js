define(["jquery", "jqueryCookie"], function () {
    function proAddCar(ele){
        this.ele = ele;
        if (this.ele.length == 0) return 0;
        this.init();
    }
    proAddCar.prototype = {
        constructor: proAddCar,
        init(){
            
            $(this.ele).on("click", "#add", $.proxy(this.add, this));
            $(this.ele).on("click", "#reduce", $.proxy(this.reduce, this));
            $(this.ele).on("click", "#btnAdd", $.proxy(this.setCookie, this));
        },
        add(){
            var priceStr = $("#price").text();
            var price = priceStr.replace(/¥/g, "");
            var num = $(event.target).prev().val();
            num++;
            $(event.target).prev().val(num);
            $("#totalPrice").text('¥ ' + (num * price) + '.00');
        },
        reduce(){
            var priceStr = $("#price").text();
            var price = priceStr.replace(/¥/g, "");
            var num = $(event.target).next().val();
            num--;
            if (num <= 0) {
                $(event.target).next().val(1);
                $("#totalPrice").text('¥ ' + price);
            } else {
                //console.log(num);
                $(event.target).next().val(num);
                $("#totalPrice").text('¥ ' + (num * price) + '.00');
            }
        },
        setCookie(){
            this.totalP = $("#totalPrice").text();
            this.num = $(".nummce").val();
            this.id = $("#btnAdd").attr("goodsid");
            console.log(this.num,this.id,this.totalP);
            
            this.opt = {
                    id: this.id,
                    num: this.num,
                    totalP: this.totalP,
            };
            this.cookiecheck(); 
        },
        cookiecheck(){
            this.getcookie = $.cookie('carList');
            if (!this.getcookie) {
                this.carList = [];
                this.carList.push(this.opt);
                this.carListStr = JSON.stringify(this.carList);
                $.cookie('carList', this.carListStr, {
                    expires: 7,
                    path: '/',
                })
            }else{
                this.getcookie = $.cookie("carList");
                this.getcookie = JSON.parse(this.getcookie);
                this.last = this.getcookie.length;
                this.getcookie.forEach(function (element, index) {
                    // console.log(element.id,this.id );
                    if (element.id == this.id) {

                        element.num = element.num + 1;

                    } else if (index == this.last - 1) {
                        console.log(this.opt);

                        this.getcookie.push(this.opt)
                    }
                }.bind(this))
                this.carListStr = JSON.stringify(this.getcookie);
                $.cookie('carList', this.carListStr, {
                    expires: 7,
                    path: '/',
                })
                console.log(this.carListStr); 
            }
        }

    }


    return proAddCar;

})