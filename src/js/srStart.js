define(["jqueryCookie","mCookie", "proInfoRD"], function (jqueryCookie, mCookie, proInfoRD) {
    new mCookie("#products");
    var url = "http://localhost:81/bcjs/zigger_wamp2/json/pros_list.json";
    new proInfoRD(".detailyem",url);
});