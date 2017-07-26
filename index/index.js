require(['commonAjax',
    'jquery',
    'jqueryui',
    'fullpage',
    'scrollOverflow'], function (
        commonAjax,
        $,
        ui,
        fullpage,
        IScroll) {
    var main = {
        init: function () {
            this._getDom();
            this._mui_init()
            this._init_fullpage();
        },
        _init_fullpage: function () {
            var that = this;
            $(document).ready(function () {
                $('#fullpage').fullpage({
                    scrollingSpeed: 500,
                    navigation: true,
                    slidesNavigation: true,
                    controlArrows: false,
                    // controlArrowColor: 'red',
                    verticalCentered: false,
                    loopHorizontal: false,
                    scrollOverflow:true,
                    css3: false,
                    onLeave: function(index, nextIndex, direction){
                        that._fullpage_onLeave(index,nextIndex,direction);
                    },
                    afterLoad: function(anchorLink, index){

                    },
                    afterRender: function(){},
                    afterResize: function(){},
                    afterResponsive: function(isResponsive){},
                    afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
                    onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
                        that._fullpage_onSlideLeave(anchorLink,index,slideIndex,direction,nextSlideIndex);
                    }
                });
            });
        },
        _fullpage_onLeave:function (index, nextIndex, direction) {
            console.log(index,nextIndex,direction);
        },
        _fullpage_onSlideLeave:function (anchorLink,index,slideIndex,direction,nextSlideIndex) {
            console.log(anchorLink,index,slideIndex,direction,nextSlideIndex);
            if(nextSlideIndex==0){
                $.fn.fullpage.setAllowScrolling(true,'up,down');
                this._fullpage_nav_toggle('nav',true);
            }else{
                $.fn.fullpage.setAllowScrolling(false,'up,down');
                this._fullpage_nav_toggle('nav',false);

            }

            
        },
        /**
         * @param type  nav slide
         * @param toggle true/false
         * @private
         */
        _fullpage_nav_toggle:function (type,toggle) {
            var _navDom;
            if(type=='nav'){
                _navDom = $('#fp-nav');
            }else if(type=='slide'){
                _navDom = $('.slidesNav');
            }
            if(toggle){
                _navDom.show();
            }else{
                _navDom.hide();
            }
        },
        _getDom:function () {
            this.$dailyCost = $('.dailyCost');
            this.$dailyCost_Num = this.$dailyCost.find('.dailyInfo_Num');
            this.$dailyBenefit = $('.dailyBenefit');
            this.$dailyBenefit_Num = this.$dailyBenefit.find('.dailyInfo_Num');
            this.$timeInfo = $('.timeInfo');
            this.$timeInfoTime = this.$timeInfo.find('.dailyInfo_Num');
            this.$timeInfoText = this.$timeInfo.find('.dailyInfo_title');
            this.$moreSettingBtn = $('.moreSetting');
            this.$finishBtn = $('.finishBtn');
            this.$finishLogin = $('.firstLogin');


        },
        _mui_init:function () {
            var that = this;
            mui.init({
                id:'index'
            });
            mui.plusReady(function () {
                that._set_index_data();
                that._begin_countDown();
            });
        },
        _set_index_data:function () {
            var  _storageData = JSON.parse(plus.storage.getItem('indexData') || '{}'),
                costNum = _storageData.costNum || 0,
                benefitNum = _storageData.benefitNum || 0,
                that = this;
            this.$dailyCost_Num.html(costNum);
            this.$dailyBenefit_Num.html(benefitNum);
            commonAjax.reportIndex({}, function(res) {
                costNum = res.data.indexInfo.outlayData_money;
                benefitNum = res.data.indexInfo.incomeData_money;
                plus.storage.setItem('indexData',JSON.stringify({
                    costNum:costNum,
                    benefitNum:benefitNum
                }))
                that.$dailyCost_Num.html(costNum);
                that.$dailyBenefit_Num.html(benefitNum);
            },true);
        },
        _begin_countDown:function () {
            var sevenAclock = new Date(),
                timeFlag = 1,
                that = this;
                timeSplit = ':';
            sevenAclock.setHours(23);
            sevenAclock.setMinutes(00);
            sevenAclock.setSeconds(00);
            var disHour, disMin, disSec, disTime;
            var timer = setInterval(function() {
                if(timeFlag % 2 == 0) {
                    timeSplit = ':';
                } else {
                    timeSplit = ':';
                    var nowTime = new Date();
                    disTime = Math.floor((sevenAclock - nowTime) / 1000);
                    disHour = Math.floor(disTime / 3600);
                    disTime = disTime - disHour * 3600;
                    disMin = Math.floor(disTime / 60);
                    disTime = disTime - disMin * 60;
                    disSec = disTime;

                    if(disHour <= -1) {
                        // showReportBtn();
                        clearInterval(timer);
                        return;
                    } else {
                        if(disHour < 10) {
                            disHour = '0' + disHour;
                        }
                        if(disMin < 10) {
                            disMin = '0' + disMin;
                        }
                        if(disSec < 10) {
                            disSec = '0' + disSec;
                        }
                        var timeStr = '';


                    }

                }
                timeStr = disHour + timeSplit + disMin + timeSplit + disSec;
                that.$timeInfoTime.html(timeStr);
                timeFlag++;
            }, 500)
        },
    }
    main.init();
})
