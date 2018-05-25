requirejs.config({
    baseUrl:"../src",
    paths:{
        "jquery":"libs/jquery-3.3.1",
        "jqueryCookie":"libs/jquery.cookie",
         
        "srStart":"js/srStart",
        "mCookie":"js/mCookie",
        "jqueryPagination": "libs/jquery.pagination",
       
        "mainJs":"js/main",
        "listAjax": "js/list_ajax",
        "proList":"js/prolist",
        "indexMain":"js/index",
        "proInfo":"js/proinfo"                               
    },
    shim:{
        "jqueryCookie":{
            deps:["jquery"]
        },
        "jqueryPagination":{
            deps: ["jquery"]
        }
    }
})