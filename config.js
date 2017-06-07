/**
 * 版本规范,0.0.1 第一位迭代的版本，第二位线上修复的版本，第三位测试的版本
 * @type {string}
 */
window.version = '0.0.1';
console.log('版本号：',window.version);
window.debug = false;
requirejs.config({
    baseUrl:'../',
    paths:{
        common:'./js/common',
        commonAjax:'./js/commonAjax',
        host:'./host',
        moment:'./lib/moment',
        //页面部分
        // login:'./login/login'

        numKeyboard:'./widget/numKeyboard'
    },
    shim:{
        // vConsole:{
        //     exports:'vConsole'
        // },
        // commonBridge:{
        //     exports:'commonBridge',
        //     deps:['jsBridge']
        // },
    },
    urlArgs:'v='+version
});
