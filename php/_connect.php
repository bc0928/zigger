<?php
    $servername = "localhost:3306"; //服务器端口默认3306
    $username = "root";
    $password = "660928";   //服务器自设置的密码
    $dbname = "user_msg";   //自建的库名，user_list表在其库内
    // 创建连接
    $conn = new mysqli($servername,$username,$password,$dbname);
    // 检测连接
    if($conn->connect_error){
        die("连接失败：" . $conn->connect_error);
    }
    // echo "连接成功";
?>