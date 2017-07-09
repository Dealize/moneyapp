define(['host'], function(host) {
	var exports = {
		ajaxLoading: function(toggle) {
			if(toggle){
				plus.nativeUI.showWaiting('正在请求数据~',{
				width:'100%',
				height:'100%',
				modal:true,
				back:'none',
				round:0,
				background:'rgba(0,0,0,0.8)',
				style:'white',
				color:'#fff',
				radius:0
				})	
			}else{
				plus.nativeUI.closeWaiting();
			}
		},
		commonAjax: function(url, data, callback, isHideMask) {
			var that = this;
			console.log(url);
			console.log(isHideMask);
			if(isHideMask != true) {
				this.ajaxLoading(true);
			}
			mui.ajax(host.api + url, {
				data: data,
				crossDomain: true,
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				success: function(data) {
					that.ajaxLoading(false);
					if(data.state == 999) {
						var loginWebview = plus.webview.getWebviewById('login');
						console.log(loginWebview);
						debugger;
						if(loginWebview) {
							that.showWebview({
								id: 'login'
							})
						} else {
							that.showWebview({
								url: '../login/login.html',
								id: 'login'
							})
						}
					}else{
						//获得服务器响应
						callback(data);	
					}
					
				},
				error:function(request,type,thrown){
					switch(type){
						case 'timeout':
							plus.nativeUI.alert('网络不佳，请在网络状况良好的时候再试。');
							break;
						case 'abort':
							plus.nativeUI.alert('请检查网络是否畅通');
							break;
						default:
							plus.nativeUI.alert('内部出错，请到更多设置中反馈出错步骤');
							break;													
					}
					plus.nativeUI.closeWaiting();					
				}
				
			});
		},
		createWebview: function(data) {
			var style = {
				background: 'red'
			}
			for(var i in data.styles) {
				style[i] = data.styles[i];
			}
//			var newWindow = plus.webview.create(data.url, data.id, style, data.extras || null);
			var newWindow = plus.webview.create(data.url, data.id, {
				'background':'transparent',
				'render':'always'
			}, data.extras || null);
			console.log(newWindow);
			return newWindow;
		},
		/**
		 *
		 * @param data
		 * url
		 * id
		 * data:要传递的参数
		 * styles
		 */
		showWebview: function(data) {
			
			var _webview = plus.webview.getWebviewById(data.id);
			if(!_webview){
				_webview  = this.createWebview(data); 
			}

//			_webview.show(data.id, 'fade-in', 400);
			_webview.show("fade-in",400);
			
		}
	}

	return exports;
})