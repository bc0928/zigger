$(function(){
    function getFocus(index) {
        $(".tip").eq(index).removeClass("hide");
    }
    function lostFocus(index) {
        $(".tip").eq(index).addClass("hide");
    }

    function checkUserName() {
        var u = $("#Username").val();
        if (u.length == 0) {
            getFocus(0);
            return false;
        } else {
            return true;
        }
    }
    function checkPwd() {
        var p = $("#Pwd").val();
        if (p.length == 0) {
            getFocus(1);
            return false;
        } else {
            return true;
        }
    }
   
    $("#Username").focus(function () {
        getFocus(0);
    })
    $("#Username").blur(function () {
        lostFocus(0);
    })
    $("#Pwd").focus(function () {
        getFocus(1);
    })
    $("#Pwd").blur(function () {
        lostFocus(1);
    })

    $("#btnSubmit").click(function () {
        var u = $("#Username").val();
        var p = $("#Pwd").val();
        if ((checkUserName()) && (checkPwd())) {
            // var result = localStorage.getItem("phone");
            // var data = JSON.parse(result);

            // var result1 = localStorage.getItem("password");
            // var data1 = JSON.parse(result1);
            // if ((data == u) && (data1 == p)) {
            //     window.location.href = "index.html";
            // } else {
            //     alert("用户名密码不匹配")
            // }
            var username = $("#Username").val();
            var pwd = $("#Pwd").val();
            var opt = {
                url: "http://localhost:81/bcjs/zigger_wamp2/php/user.php",
                type: "POST",
                data: { username: username, password: pwd, type: "login" }
            }
            $.ajax(opt)
                .then(function (res) {
                    this.userRes = res;
                    if (this.userRes == "0"){
                        alert("该用户没有注册信息，请前去注册~");
                        // console.log(this.userRes);
                        window.location.href = "../../zigger_wamp2/html/regist.html";
                    }else{
                        this.userRes = JSON.parse(res);
                        // console.log(this.userRes);
                        var uName = this.userRes.username;
                        // console.log(uName);
                        localStorage["uName"] = uName;
                        var isLogin = "true";
                        localStorage["isLogin"] = isLogin;
                        window.location.href ="../../zigger_wamp2/html/index.html";
                    }
            })
        } else {
            console.log("登录条件不对"); 
        }
       
    })


})
