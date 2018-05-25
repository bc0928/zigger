define(
    [
    "listAjax",
    "proList",
    "indexMain",
    "proInfo"
    ], 
    // function (ListData, Menu) {
    //     ListData.init();
    //     Menu.init(".typelist>li");
    function (ListData, all) {
        ListData.init();
        all.menu.init(".typelist>li");
        all.change.init();
});