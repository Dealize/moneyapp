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
        	api:'http://www.moneybeta.dofyou.win/'
        }
    }
    var enviroment = 'beta';
    console.log(urlObj[enviroment].api);
    return urlObj[enviroment];
})


// (function () {
//     return host = {
//         'dev':'.'
//     };
// })()
