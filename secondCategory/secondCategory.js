require(['FFF', 'host', 'common', 'commonAjax', 'numKeyboard','moment'], function(FFF, host, common, commonAjax, numKeyboard,moment) {
	var categoryData,
		categoryType,
		categoryIndex,
		categoryList,
		billWebview,
		$firstCategory = $('.secondCategory_1');
		$firstCategoryName = $firstCategory.find('.secondCategory_1_title'),
		$addBtn = $('.addcategory'),
		
		$ul = $('.secondCategoryUl')
		;
		
	mui.init({
		
	});
	
	mui.plusReady(function() {
		var _currentWebview = plus.webview.currentWebview();
		categoryData = _currentWebview.data;
		categoryType = _currentWebview.type;
		categoryIndex = _currentWebview.index;
		renderDomByData(categoryData.secondCategory);
        bind_updateFirstCategory();
        bind_addCategory();
        bind_goSecondCategory();
	})

	function renderDomByData(data){
		var domStr = '';
		$ul.empty();
		data.forEach(function(item,index){
			domStr += '<li class="secondCategory_item" data-index="'+index+'">'+
            			'<span class="item_title">'+item.name+'</span>'+
            			'<span> > </span>'+
        				'</li>'
		})
		$ul.append(domStr);
	}
	function bind_updateFirstCategory(){
		$firstCategoryName.html(categoryData.name);
		if(categoryType=='category'){
			_ajaxFn = commonAjax.categoryFirstUpdate;
            billWebview = plus.webview.getWebviewById('outlay');

        }else if(categoryType=='incomeCategory'){
			_ajaxFn = commonAjax.incomeCategoryFirstUpdate;
            billWebview = plus.webview.getWebviewById('income');

        }
		
		$firstCategory.on('click',function(){
			var name = prompt('请输入修改后名称',$firstCategoryName.html());
			if(name==''){
				alert('名称不能为空');
			}else if(name==null){
				
			}else{
				_ajaxFn({
					name:name,
					id:categoryData.id
				},function(res){
					console.log(res);
					if(res.state==1){
						alert('修改成功');
                        $firstCategoryName.html(name);
                        mui.fire(billWebview,'categoryUpdate')
                    }
				})
			}
		})
	}




    function getData(callback){
        if(categoryType=='category'){
            commonAjax.categoryList({},function(res){
                categoryList = res.data;
                categoryData = categoryList[categoryIndex].secondCategory;
                renderDomByData(categoryData);
                callback && callback();
            })
        }else if(categoryType=='incomeCategory'){
            commonAjax.incomecategory({},function(res){
                categoryList = res.data;
                categoryData = categoryList[categoryIndex];
                renderDomByData(categoryData.secondCategory);
                callback && callback();

            })
        }
    }



    function bind_addCategory(){
		var _ajaxFn = null;
		if(categoryType=='category'){
			_ajaxFn = commonAjax.categorySecondAdd;
		}else if(categoryType=='incomeCategory'){
			_ajaxFn = commonAjax.incomeCategorySecondAdd;
		}
		
		$addBtn.on('click',function(){
			var name = prompt('请输入新建类别名称');
			if(name==''){
				alert('名称不能为空');
			}else if(name==null){
				
			}else{
				_ajaxFn({
					name:name,
					firstId:categoryData.id
				},function(res){
					console.log(res);
					if(res.state==1){
						getData(function () {
							alert('更新成功');
                            mui.fire(billWebview,'categoryUpdate')
                        });
					}
				})
			}
		}) 
	}
	function bind_goSecondCategory(){
        var _ajaxFn = null;
        if(categoryType=='category'){
            _ajaxFn = commonAjax.categorySecondUpdate;
        }else if(categoryType=='incomeCategory'){
            _ajaxFn = commonAjax.incomeCategorySecondUpdate;
        }

        $ul.on('click','li',function(e){
        	var $dom = $(this);
        	var $domTitle = $dom.find('.item_title');
        	var domInnerName = $domTitle.html();
        	var domIndex = this.dataset.index;

            var name = prompt('请修改名称',domInnerName);
            if(name==''){
                alert('名称不能为空');
            }else if(name==null){

            }else{
                _ajaxFn({
                    name:name,
					id:categoryData.secondCategory[domIndex]['id']
                },function(res){
                	if(res.state==1){
                        $domTitle.html(name);
                        alert('更新成功');
                        mui.fire(billWebview,'categoryUpdate')
					}
                })
            }
		})
	}


	
})