require(['FFF', 'host', 'common', 'commonAjax', 'numKeyboard','moment'], function(FFF, host, common, commonAjax, numKeyboard,moment) {
	var categoryData,
		categoryType,
		categoryIndex,
		categoryList,
		$firstCategory = $('.secondCategory_1');
		$firstCategoryName = $firstCategory.find('.secondCategory_1_title');
		
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
		if(currentType=='category'){
			_ajaxFn = commonAjax.categoryFirstUpdate;
		}else if(currentType=='incomeCategory'){
			_ajaxFn = commonAjax.incomeCategoryFirstUpdate;
		}
		
		$firstCategory.on('click',function(){
			var name = prompt('请输入修改后名称');
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
						getData();
					}
				})
			}
		})
	}
	}




    function getData(){
        if(categoryType=='category'){
            commonAjax.categoryList({},function(res){
                categoryList = res.data;
                categoryData = categoryList[categoryIndex].secondCategory;
                renderDomByData(categoryData);
            })
        }else if(categoryType=='incomeCategory'){
            commonAjax.incomecategory({},function(res){
                categoryList = res.data;
                categoryData = categoryList[categoryIndex].secondCategory;
                renderDomByData(categoryData);
            })
        }
    }



    function bind_addCategory(){
		var _ajaxFn = null;
		if(currentType=='category'){
			_ajaxFn = commonAjax.categoryAdd;
		}else if(currentType=='incomeCategory'){
			_ajaxFn = commonAjax.incomeCategoryAdd;
		}
		
		$addBtn.on('click',function(){
			var name = prompt('请输入类别名称');
			if(name==''){
				alert('名称不能为空');
			}else if(name==null){
				
			}else{
				_ajaxFn({
					name:name
				},function(res){
					console.log(res);
					if(res.state==1){
						getData();
					}
				})
			}
		})
	}
	function bind_goSecondCategory(){
		$ul.on('click','li',function(e){
			console.log(this);
			var _index = this.dataset.index;
			common.showWebview({
				id:'secondCategory',
				url:'../secondCategory/secondCategory.html',
				extras:{
					data:categoryList[_index]
				}
			})
		})
	}


	
})