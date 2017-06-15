define([],function () {
    var p = window.location.protocol;
    var urlObj = {
        dev:{
            api:'http://money.dofyou.com/'
        },
        test:{
            api:'http://moneyapi.dofyou.win/'
        },
        beta:{
        	api:'http://moneyapibeta.dofyou.win'
        }
    }
    var enviroment = 'test';
    console.log(urlObj[enviroment].api);
    return urlObj[enviroment];
})


// (function () {
//     return host = {
//         'dev':'.'
//     };
// })()
