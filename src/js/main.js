define(
    [
    "listAjax",
    "proList",
    "indexMain"
    ], 

    function (ListData, all) {
        ListData.init();
        all.menu.init(".typelist>li");
        all.change.init();
});