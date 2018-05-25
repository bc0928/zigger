"use strict";

$(function () {

    var reg = {
        //  手机号码正则  
        passwordReg: /^[a-zA-Z0-9]{6,14}$/,
        phoneReg: /^1[345678]\d{9}$/

        /*------------------------验证手机号码------------------------*/
    };function checkPhone() {
        //验证手机号码的函数
        var v = $("#txtPhone").val(); //获取文本框的内容
        if (v.length == 0) {
            //如果长度为0证明没有输入内容  
            $(".tip").eq(0).removeClass("hide default").addClass("error").text("手机号码不能为空，请输入正确手机号"); //给当前的span标签移除隐藏的类 和 正常的类  并显示手机号不能为空
            return false;
        } else {
            //长度不为0 的情况
            if (reg.phoneReg.test(v)) {
                //匹配正则显示
                $(".tip").eq(0).addClass("hide"); //将span隐藏
                flag1 = true;
                return true;
            } else {
                $(".tip").eq(0).removeClass("hide default").addClass("error").text("手机号码格式有误，请修改"); //不匹配正则 手机号码有误
                return false;
            }
        }
    }
    $("#txtPhone").focus(function () {
        //获取焦点事件
        $(".tip").eq(0).removeClass("hide").addClass("default").text("请填写正确的手机号。便于您接收订单信息，取回密码等。"); //显示的信息  span显示出来
    });
    $("#txtPhone").blur(function () {
        checkPhone();
    });

    /*------------------------设置密码的时候------------------------*/
    function setPassword() {
        var v = $("#txtPwd").val();
        if (v.length == 0) {
            $(".tip").eq(2).removeClass("hide default").addClass("error").text("密码长度必须为6-14位 "); //给当前的span标签移除隐藏的类 和 正常的类  
            return false;
        } else {
            if (reg.passwordReg.test(v)) {
                //匹配正则显示
                $(".tip").eq(2).addClass("hide"); //将span隐藏
                return true;
            } else {
                $(".tip").eq(2).removeClass("hide default").addClass("error").text("密码长度必须为6-14位 "); //不匹配正则 手机号码有误
                return false;
            }
        }
    }
    $("#txtPwd").focus(function () {
        $(".tip").eq(2).removeClass("hide").addClass("default").text("密码长度6-14位支，支持字母数字、符号、字母区分大小写"); //显示的信息  span显示出来
    });
    $("#txtPwd").blur(function () {
        setPassword();
    });
    /*------------------------确认密码的时候------------------------*/
    function checkPassword() {
        var v1 = $("#txtPwd").val();
        var v2 = $("#txtConfirmPwd").val();
        if (v2.length == 0) {
            $(".tip").eq(3).removeClass("hide default").addClass("error").text("密码长度必须为6-14位 "); //不匹配正则 手机号码有误
            return false;
        } else {
            if (v1 == v2) {
                $(".tip").eq(3).addClass("hide"); //将span隐藏
                return true;
            } else {
                if (v1.length != v2.length) {
                    $(".tip").eq(3).removeClass("hide default").addClass("error").text("密码长度必须为6-14位 "); //不匹配正则 手机号码有误
                    return false;
                } else {
                    $(".tip").eq(3).removeClass("hide default").addClass("error").text("两次输入的密码不一致"); //不匹配正则 手机号码有误
                    return false;
                }
            }
        }
    }
    $("#txtConfirmPwd").focus(function () {
        $(".tip").eq(3).removeClass("hide").addClass("default").text("请再次输入您设置的密码"); //显示的信息  span显示出来
    });
    $("#txtConfirmPwd").blur(function () {
        checkPassword();
    });

    /*------------------------发送手机验证码------------------------*/

    function authCode() {
        var p = $("#txtPhone").val();
        var timeId;
        if (p.length == 0) {
            console.log(2);
            $(".tip").eq(1).removeClass("hide default").addClass("error").text("请先填写正确手机号");
            return false;
        } else {
            if (reg.phoneReg.test(p)) {
                console.log(3);
                var time = 10;
                $(".tip").eq(1).addClass("hide");
                timeId = setInterval(function () {
                    time--;
                    if (time <= 0) {
                        $("#yzmbtn").html("获取验证码");
                        $("#yzmbtn").css({ width: "112px" });
                        flag1 = true;
                        clearInterval(timeId);
                        return;
                    }
                    $("#yzmbtn").css({ width: "112px" });
                    $("#yzmbtn").html("(" + time + ")秒后重新获取");
                }, 1000);
            } else {
                $(".tip").eq(1).removeClass("hide default").addClass("error").text("请输入正确的验证码"); //不匹配正则 手机号码有误
                return false;
            }
        }
    }
    function checkCode() {
        if ($("#txtCaptcha").val() == "258456") {
            $(".tip").eq(1).addClass("hide");
            return true;
        } else {
            $(".tip").eq(1).removeClass("hide default").addClass("error").text("请输入正确的验证码"); //不匹配正则 手机号码有误
            return false;
        }
    }
    var flag1 = true;
    // $("#yzmbtn").on("click",function(){
    //     if (flag1) {
    //         flag1 = false;
    //         authCode();
    //         console.log(1);

    //     }
    // })
    $("#yzmbtn").click(function () {
        if (flag1) {
            flag1 = false;
            authCode();
            console.log(11);
        }
    });

    $("#txtCaptcha").blur(function () {
        // alert(1);
        checkCode();
    });
    /*------------------------立即注册------------------------*/
    $("#btnSubmit").on("click", function () {
        if (checkPhone() && setPassword() && checkPassword() && checkCode()) {
            console.log("right");
        } else {
            console.log("n");

            var username = $("#usr").val();
            var pwd = $("#pwd").val();
            var opt = {
                // url: "../../php/user.php",
                url: "http://localhost:8888/php/_connect.php",
                type: "POST",
                data: { username: username, password: pwd, type: "register" }
            };
            $.ajax(opt).then(function (res) {
                console.log(res);
            });
        }
    });
    // $("#btnSubmit").click(function () {
    //     // alert(1);
    //     if (checkPhone()  && setPassword() && checkPassword() && checkCode()) {
    //         console.log("right");
    //         $("#register").on("click", function () {
    //             var username = $("#usr").val();
    //             var pwd = $("#pwd").val();
    //             var opt = {
    //                 url: "http://localhost:81/bcjs/20180516/loginOrRegister/user.php",
    //                 type: "POST",
    //                 data: { username: username, password: pwd, type: "register" }
    //             }
    //             $.ajax(opt)
    //                 .then(function (res) {
    //                     console.log(res);
    //                 })
    //         })
    //         // var phone = $("#phone").val();
    //         // //注册成功之后，把用户名存在本地
    //         // localStorage["phone"] = phone;
    //         // var password = $("#pwd").val();
    //         // //注册成功之后，把用户名存在本地
    //         // localStorage["password"] = password;
    //         // //session（会话）  后端
    //         // window.location.href = "index.html";
    //     } else {
    //         alert("y")
    //     }
    // })
});