requirejs.config({
    baseUrl:"../src",
    paths:{
        "jquery":"libs/jquery-3.3.1",
        "jqueryCookie":"libs/jquery.cookie",
        "indexMain":"js/index",
        
        "srStart":"js/srStart",
        "mCookie":"js/mCookie",
        "proInfoRD":"js/proInfoRD",
        
        "shopCarStart":"js/shopCarStart",
        "proAddCar":"js/pro_addCar",

        "jqueryPagination": "libs/jquery.pagination",
       
        "mainJs":"js/main",
        "listAjax": "js/list_ajax",
        "proList":"js/prolist"
                                  
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