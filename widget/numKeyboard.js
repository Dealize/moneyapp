define(['FFF'],function (FFF) {
    var F = FFF.FFF,
        Widget =F.Widget;
    
    function NumKeyBoard(){
        Widget.apply(this,arguments);
    }
    NumKeyBoard.ATTRS = {
        
    }
    F.extend(NumKeyBoard,Widget,{
        initialize:function () {
            console.log(123);
        },
        renderUI:function () {
            this.renderDomStr();
        },
        bindUI:function () {
            
        },
        syncUI:function () {
            
        },
        renderDomStr:function () {
            var domStr = '<table  class="numkeyboard" border="1">'+
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
                '</tr>'+ '</table>';

            this.getBoundingBox().append($(domStr));
        }
    })

    return {
        NumKerBoard:NumKeyBoard
    }
})