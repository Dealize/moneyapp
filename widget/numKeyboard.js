define(['FFF'],function (FFF) {
    var F = FFF.FFF,
        Widget =F.Widget;
    
    function NumKeyBoard(){
        Widget.apply(this,arguments);
    }
    NumKeyBoard.ATTRS = {
        targetDom:{
            value:''
        },
        resultNum:{
            value:''
        }
    }
    F.extend(NumKeyBoard,Widget,{
        initialize:function () {
            var num = parseInt(this.targetDom.html());
            // num = isNaN(num)?'':num;
            num = '';
            this.setResultNum(num);
            this.$targetDom = this.getTargetDom();
        },
        renderUI:function () {
            this.hide();
            this.renderDomStr();
        },
        bindUI:function () {
            var that = this;
            $('.numkeyboardMask').on('click',function (e) {
                if(e.target.classList.contains('numkeyboardMask')){
                    that.hide();
                }
            })
            $('.numkeyboardMask').on('click','td',function (e) {
                var _currentValue = e.currentTarget.dataset.value,
                resultNum = that.getResultNum();
                if(!isNaN(parseInt(_currentValue))){
                    if(resultNum.split('.')[1] && resultNum.split('.')[1].length>1){
                        return;
                    }
                    if(resultNum.length>12){
                        return;
                    }
                    if(resultNum[0]=='0'){
                        resultNum = resultNum.substr(1,resultNum.length)
                    }
                    resultNum += _currentValue;
                    that.setResultNum(resultNum);
                }else if(_currentValue=='point'){
                    if(resultNum.indexOf('.')<0){
                        resultNum += '.';
                        that.setResultNum(resultNum);
                    }
                }else if(_currentValue == 'del'){
                    var resultArr = resultNum.split('');
                    resultArr.pop();
                    if(resultArr[resultArr.length-1]=='.'){
                        resultArr.pop();
                    }
                    if(resultArr.length==0){
                        resultArr = [0]
                    }
                    console.log(resultArr.length);
                    that.setResultNum(resultArr.join(''));
                }else if(_currentValue == 'ok'){
                    that.hide();
                }
            })
            this.on('resultNumChange',function (data) {
                that.targetDom.html(data.value);
            })
        },
        syncUI:function () {
            
        },
        renderDomStr:function () {
            var domStr = '<div class="numkeyboardMask">' +
                '<table  class="numkeyboard" border="1">'+
                '<tr>'+
                '<td data-value="1">1</td>'+
                '<td data-value="2">2</td>'+
                '<td data-value="3">3</td>'+
                '<td data-value="del" rowspan="2">del</td>'+
                '</tr>'+
                '<tr>'+
                '<td data-value="4">4</td>'+
                '<td data-value="5">5</td>'+
                '<td data-value="6">6</td>'+
                '</tr>'+
                '<tr>'+
                '<td data-value="7">7</td>'+
                '<td data-value="8">8</td>'+
                '<td data-value="9">9</td>'+
                '<td data-value="ok" rowspan="2">确定</td>'+
                '</tr>'+
                '<tr>'+
                '<td data-value="point">·</td>'+
                '<td data-value="0">0</td>'+ '<td data-value=""></td>'+
                '</tr>'+ '</table>'+ '</div>';
            this.getBoundingBox().append($(domStr));
        },
        show:function () {
            this.getBoundingBox().show();
        },
        hide:function(){
            this.getBoundingBox().hide();
        }

    })

    return {
        NumKeyBoard:NumKeyBoard
    }
})