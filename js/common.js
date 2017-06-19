define(['host'], function(host) {
	var exports = {
		ajaxLoading: function(toggle) {
			var $loading = $('.ajaxLoading');
			if(toggle) {
				if($loading.length > 0) {
					$loading.show();
				} else {
					$('body').append('<div class="ajaxLoading">' +
                        '<div class="ajaxLoading_text">加载中~</div>' +
						'</div>');
				}
			} else {
				$loading.hide();
			}
		},
		commonAjax: function(url, data, callback, isHideMask) {
			var that = this;
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
					if(data.state == 0) {
						var loginWebview = plus.webview.getWebviewById('login');
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
					}
					//获得服务器响应
					callback(data);

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
			var newWindow = plus.webview.create(data.url, data.id, style, data.extras || null);
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
			_webview.show(data.id, 'fade-in', 400);
		}
	}

	return exports;
})