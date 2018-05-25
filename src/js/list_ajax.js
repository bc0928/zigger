define(["jquery", "jqueryPagination","mCookie"], function() {
    function ListData(){
        // this.init();
    }
    ListData.prototype = {
        constructor: ListData,
        init(){
            this.url = "http://localhost:81/bcjs/zigger_wamp2/json/pros_list.json";
            this.main = $(".normalprocon");
            this.page = 1;
            this.load_data()
            .then(function(res){
                this.jsonRes = res; 
            }.bind(this));
            this.pageList();
        },
        load_data(){
             var opt = {
                url: this.url
            }
            return $.ajax(opt);
        },
        /*------------------------------------
         ----------------分页插件---------------
         ------------------------------------*/
        pageList() {
            $('.paginationBox').pagination({
                pageCount:6,
                prevCls:'prev',
                nextCls:'next',
                prevContent:'上一页',
                nextContent:'下一页',
                coping: 'true',
                homePage:'第一页',
                endPage:'末页',
                callback: function (api) {
                    // this.pageturn(api);
                    // this.pageCon(api.getCurrent());
                    this.page = api.getCurrent();
                    this.huoquPage(this.page);
                    this.render_data();
                    // console.log(api.getCurrent());
                }.bind(this)
            }); 
        },
        huoquPage(p){
            this.jsonF = this.jsonRes.pagenation;
            this.jsonS = this.jsonRes.productList;
            this.json = this.jsonS[this.jsonF[p]];
        },
        render_data() {
            this.html = "";
            this.json.forEach(function (item) {
                if (item.special == "1") {
                    // var html = "";
                    this.html += `<a class="normalprli normalprliphone" href="#javascript">
                                        <img data = "0" src="${item.hotproimagec}" alt="" class="mt60" />
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
                                    <a href="#javascript"  goodsid="${item.goodsId}">
                                        <em class="normalimgc" goodsid="${item.goodsId}">
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
            this.main.html(this.html);
        }
    }
    
    return new ListData();
    
   
});