define(['jquery', 'jqueryCookie'], function() {
    function proInfoRD(ele,url){
        this.main = $(ele);
        this.url = url;
        if (this.url == "" || this.main.length == 0) return;
        this.init();
    }
    proInfoRD.prototype = {
        constructor: proInfoRD,
        init(){
            this.load()
                .then(function (res) {
                    // console.log(res.productList);
                    this.goodsjson = res.productList.page1;
                    this.checkGood();

                }.bind(this))
        },
        load() {
            var opt = {
                url: this.url,
                type: "get",
                dataType: "json"
            };
            return $.ajax(opt);
        },
        checkGood(){
            this.getcookie = $.cookie("goodslist");
            // console.log(this.getcookie);
            this.jsonCookie = JSON.parse(this.getcookie);
            this.jsonCookie.forEach(function (ele, index) {
                this.proId = ele.id;
                this.pronum = ele.num;
                // console.log(this.proId)
                this.render_data();
            }.bind(this));
        },
        render_data(){
            this.html = "";
            this.goodsjson.forEach(function(item,index){
                if (item.goodsId == this.proId) {
                    
                    this.projson = this.goodsjson[index];
                    // console.log(this.projson);
                    this.html += `  
                                        <!-- 选择切换 左侧小图 -->
                                        <ul id="show_ul" class="detailyemul wydetailyemul wydetailyemul1">

                                            <li class="active detailyemulpicnom">
                                                <img id="sharePic" src="${item.detailProImg1}" alt="">
                                            </li>
                                            <li class="detailyemulpicnom">
                                                <img src="${item.detailProImg2}" class="jsFront" alt="">
                                            </li>
                                            <li class="detailyemulpic">
                                                <img src="${item.detailProImg3}" alt="T恤">
                                            </li>
                                            <li class="detailyemulpic">
                                                <img src="${item.detailProImg4}" alt="T恤">
                                            </li>
                                            <li class="detailyemulpic">
                                                <img class="mtimg" src="${item.detailProImg5}" alt="T恤">
                                            </li>
                                        </ul>

                                        <!-- 商品图片 -->
                                        <div class="detailyemimg detailymimg-lt">
                                            <ul id="smallBox" class="detailyemimgul">
                                                <div id="tool" class="tool" style="display: none; left: 375px; top: 39.5px;"></div>
                                                <li class="kzwiimg active">
                                                    <img src="${item.detailProImg1}" alt="">
                                                </li>
                                                <li class="kzwiimg">
                                                    <img src="${item.detailProImg2}" class="jsFront" alt="">
                                                </li>
                                                <li class="kzwiimg detailyemipic">
                                                    <img src="${item.detailProImg3}" alt="t恤">
                                                </li>
                                                <li class="kzwiimg detailyemipic">
                                                    <img src="${item.detailProImg4}" alt="t恤">
                                                </li>
                                                <li class="kzwiimg">
                                                    <img class="mtimgz" src="${item.detailProImg5}" alt="T恤">
                                                </li>
                                            </ul>
                                        </div>

                                        <!-- 放大镜盒子 -->
                                        <div id="bigBox" class="detailyemBigImg" style="display: none;">
                                            <img src="${item.detailProImg1}" alt="放大镜图片" class="bigImg active" style="left: -1500px; top: -158px;">
                                            <img src="${item.detailProImg2}" alt="放大镜图片" class="bigImg" style="left: -1500px; top: -158px;">
                                            <img src="${item.detailProImg3}" alt="放大镜图片" class="bigImg" style="left: -1500px; top: -158px;">
                                            <img src="${item.detailProImg4}" alt="放大镜图片" class="bigImg" style="left: -1500px; top: -158px;">
                                            <img src="${item.detailProImg5}" alt="放大镜图片" class="bigImg" style="left: -1500px; top: -158px;">
                                        </div>
                                        <!-- 右侧选择商品样式 数量等区域 -->
                                        <div class="detailyemfont detailyemfont-lt">
                                        <!-- 商品名称 title 渲染-->
                                            <h3 class="tit">
                                                ${item.normaltitle}
                                            </h3>
                                            <p class="pt10 threec">阿童木</p>
                                            <div class="shareprodetails clearfix">
                                                <a class="likebtn detailshare dzbtn fl" href="javascript:;">3</a>
                                                <div class="sharebtn fl">
                                                    <i class="detailshare sharebtnlist"></i>
                                                    <div class="sharecon sharedpcon">
                                                        <div class="sharediv clearfix">
                                                            <i class="detailshare"></i>
                                                            <span class="sharetit">分享宝贝</span>
                                                            <!-- cover jiathis -->
                                                        <div class="goods-detail-share wechat-down-share share-component social-share">
                                                            <a class="social-share-icon icon-qzone" href="#javascript"></a>
                                                            <a class="social-share-icon icon-qq" href="#javascript"></a>
                                                            <a class="social-share-icon icon-wechat" href="javascript:">
                                                                <!-- <div class="wechat-qrcode">
                                                                    <h4>微信扫一扫：分享</h4>
                                                                    <div class="qrcode" title="">
                                                                        <canvas width="100" height="100" style="display: none;"></canvas>
                                                                        <img alt="Scan me!" src="data:image/png;base64,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"
                                                                            style="display: block;">
                                                                    </div>
                                                                    <div class="help">
                                                                        <p>微信里点“发现”，扫一下</p>
                                                                        <p>二维码便可将本文分享至朋友圈。</p>
                                                                    </div>
                                                                </div> -->
                                                            </a>
                                                            <a class="social-share-icon icon-weibo" href="#javascript"></a>
                                                        </div>
                                                            <div class="copylink h-center">复制链接</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="color96969b lineheight22">原创插画 By
                                                <a href="#javascript" class="color41b9fa">玄素文身</a>
                                            </p>
                                            <div class="detailyemgDiv clearfix mt10">
                                                <div class="detailtoux fl mr10">
                                                    <a href="#javascript">
                                                        <img src="../images/index/123.59.57.85$20160512215106108233359.jpg" alt="">
                                                    </a>
                                                </div>
                                                <h4 class="fl">
                                                    <a class="color000" href="#">
                                                        玄素文身
                                                    </a>
                                                </h4>
                                                <a class="zggeysx-big-btn fr" href="#">进入店铺</a>
                                            </div>

                                            <!-- 选择sku -->
                                            <div class="dskubox" style="display: block">
                                                <div class="detailsku mt20">

                                                    <ul>
                                                        <!-- 面料 -->
                                                        <li class="clearfix">
                                                            <i class="tit fl">面料</i>
                                                            <div class="con fl">
                                                                <ul class="dskuDiv clearfix js-modelbtn jsML">
                                                                    <li data-val="gaozhimianPlus" data-id="1049" class="js-gzm-model  ">
                                                                        <span>高支棉</span>
                                                                        <b title="高支棉"></b>
                                                                    </li>
                                                                    <li data-val="jingdiankuan" data-id="1059" class="js-gzm-model  active">
                                                                        <span>经典款</span>
                                                                        <b title="经典款"></b>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                        <!-- 颜色 -->
                                                        <li class="clearfix">
                                                            <i class="tit fl">颜色</i>
                                                            <div class="con fl jsColor">
                                                                <div class="detailskucolor white active" title="白色" data-id="11"></div>


                                                            </div>
                                                        </li>
                                                        <!-- 款式 -->
                                                        <li class="clearfix">
                                                            <i class="tit fl">款式</i>
                                                            <div class="con fl">
                                                                <ul class="dskuDiv clearfix sexSku jsKS">
                                                                    <li data-val="1" data-id="1" class="active">
                                                                        <span class="sku-list">男款</span>
                                                                        <b title="男款"></b>
                                                                    </li>
                                                                    <li data-val="2" data-id="2" class="">
                                                                        <span class="sku-list">女款</span>
                                                                        <b title="女款"></b>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                        </li>
                                                        <!-- 尺码 -->
                                                        <li class="clearfix">
                                                            <i class="tit fl">尺码</i>
                                                            <div class="con fl cmDiv">
                                                                <!-- 尺码   根据点击的不同创建li？ -->
                                                                <ul class="dskuDiv sizeSku clearfix wh330 fl">
                                                                    <li data-type="size" data-skuid="1127" data-sizeid="1041" data-size="S" class="sku-list sku-liston active">
                                                                        <b></b>
                                                                        165/S
                                                                    </li>
                                                                    <li data-type="size" data-skuid="1128" data-sizeid="1042" data-size="M" class="sku-list sku-liston ">
                                                                        <b></b>
                                                                        170/M
                                                                    </li>
                                                                    <li data-type="size" data-skuid="1129" data-sizeid="1043" data-size="L" class="sku-list sku-liston ">
                                                                        <b></b>
                                                                        175/L
                                                                    </li>
                                                                    <li data-type="size" data-skuid="1130" data-sizeid="1044" data-size="XL" class="sku-list sku-liston ">
                                                                        <b></b>
                                                                        180/XL
                                                                    </li>
                                                                    <li data-type="size" data-skuid="1131" data-sizeid="10" data-size="XXL" class="sku-list sku-liston ">
                                                                        <b></b>
                                                                        185/XXL
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                            <!-- <input type="hidden" id="SkuIn" value="1127" /> -->
                                                            <!--新增尺码小助手-->
                                                            <!-- <a class="cmxzs clearfix" id="cmxzs">尺码小助手</a> -->
                                                        </li>
                                                        <!-- 单价 -->
                                                        <li class="clearfix">
                                                            <i class="tit fl">单价</i>
                                                            <div class="con fl redmc font16">
                                                                <b id="price" data-value="${item.normalmoney}"> ¥${item.normalmoney}</b>
                                                            </div>
                                                        </li>
                                                        <!-- 促销 -->
                                                        <li class="salesdethauto mb10 clearfix">
                                                            <i class="tit fl">促销</i>
                                                            <div class="con fl redmc font16 salesdetcon">
                                                                <div class="salescon">
                                                                    <ul class="salesconlist" id="salesconlist">
                                                                        <li class="bordert0 clearfix">
                                                                            <span class="salestit fl">满减</span>
                                                                            <span class="saledes fl">抱枕、帆布袋、T恤满98包邮</span>
                                                                            <a class="packupbtn" href="javascript:;" id="packupbtn" style="display:none;">
                                                                                <span class="packupicon"></span>
                                                                            </a>
                                                                        </li>

                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <!-- 数量选择框 -->
                                                        <li class="clearfix">
                                                            <i id="proNum" class="tit fl">数量</i>
                                                            <div class="numblst clearfix fl">
                                                                <!-- 左侧减号 -->
                                                                <a id="reduce" class="numlbtn DisDe" href="javascript:void(0)">
                                                                    <i></i>
                                                                </a>
                                                                <!-- 数量文本框    可以改动，当其改动cookie里的num也要改动 -->
                                                                <input class="nummce" value="1" autocomplete="off" maxlength="3">
                                                                <!-- 右侧加号 -->
                                                                <a id="add" class="numrbtn Increase" href="javascript:void(0)">
                                                                    <i></i>
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <!-- 合计 -->
                                                        <li class="clearfix">
                                                            <i class="tit fl">合计</i>
                                                            <div class="con fl redmc font18 ">
                                                                <strong id="totalPrice" tPrice="${item.normalmoney}">¥ ${item.normalmoney}</strong>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <!-- 按钮 -->
                                                <div class="to-fre-btn mt20">
                                                    <!-- 直接购买  跳到结算页面 -->
                                                    <a id="btnBuy" class="fl zgbigmon-btn mr20" href="http://localhost:81/bcjs/zigger_wamp2/html/shopCar.html">直接购买</a>
                                                    <!-- 加入购物车  跳到购物车页面 -->
                                                    <a id="btnAdd" class="fl zgbigkxmon-btn" href="javascript:void(0)" goodsid = "${item.goodsId}">加入购物车</a>
                                                </div>
                                            </div>
                                        </div>
                                    `
                    // this.script = `<script src="../src/js/pro_Info.js"></script>`
                    this.script = `<script>
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
                                                $("#smallBox").find("li").eq(index)
                                                .animate({ opacity: "1" }, 1000)
                                                .addClass("active")
                                                .siblings(".kzwiimg").removeClass("active")
                                                .animate({ opacity: "0" }, 1000)
                                                
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
                                            // console.log(444)
                                            //选择商品不同购买信息
                                            $(".dskuDiv").on("click", function (event) {
                                                // console.log(event.target);
                                                var li = $(event.target).parent();
                                                li.addClass("active").siblings().removeClass("active");

                                            }) 
                                    </script>
                                    `
                    this.main.html(this.html + this.script);
                }
            }.bind(this))
        }
    }
    return proInfoRD;
});