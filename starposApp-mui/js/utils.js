// 从url中获取参数1
function getUrlParams(param) {
	var qs = location.search.length > 0 ? location.search.substring(1) : ""
	var args = {}
	var name = null
	var value = null

	//以&为界，切割字符串
	var item1 = qs.length ? qs.split("&") : []
	var item2 = null;

	//遍历数组，二次切割，以=为界
	for(var i = 0; i < item1.length; i++) {
		item2 = item1[i].split("=")
		name = decodeURIComponent(item2[0])
		value = decodeURIComponent(item2[1])
		if(item2.length) {
			args[name] = value
		}
	}
	return args[param];
};

//给过长的字符串增加省略号
function addEllipsis(str, limt) {
	if(str.length <= limt) {
		return str
	} else {
		return str.substr(0, limt) + "..."
	}
};
//判定参数值
function checkParam(value, name) {
	if(value === undefined || value === null || value === '') {
		mui.alert("未接收到参数:" + name + "的值");
		return false;
	} else {
		return true;
	}
};
//判定参数值2
function checkParam2(valueArr, nameArr) {
	var emArr = [];
	for(var i = 0; i < valueArr.length || 0; i++) {
		if(valueArr[i] === "") {
			emArr.push(nameArr[i]);
		}
	}
	if(emArr.length === 0) {
		return true;
	} else {
		mui.alert("未接收到参数:" + emArr.join(","));
		return false;
	}
};
//判定参数值-星榜单
function checkParamXBD(value, name) {
	if(value === undefined || value === null || value === '') {
		alert("未接收到参数:" + name + "的值");
		return false;
	} else {
		return true;
	}
};
//调起APP支付方法
function callWechatPay() {
	alert("调用ios/Android支付方法");
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.android.callWechatPay();
	} else if(isiOS) {
		window.WebViewJavascriptBridge.callWechatPay(
			"callWechatPay",
			function responseCallback(responseData) {
				console.log("JS received response:", responseData);
			}
		);
	}
};
//STM998 被踢下线时 回到登录页
function callLogOutApp() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.android.callLogOutApp();
	} else if(isiOS) {
		window.WebViewJavascriptBridge.callLogOutApp()(
			"callLogOutApp()",
			function responseCallback(responseData) {
				console.log("JS received response:", responseData);
			}
		);
	}
};

//关闭授权弹框
function closeAuthorizeDialog() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.android.closeAuthorizeDialog();
	} else if(isiOS) {
		window.WebViewJavascriptBridge.closeAuthorizeDialog()(
			"closeAuthorizeDialog()",
			function responseCallback(responseData) {
				console.log("JS received response:", responseData);
			}
		);
	}
};

//android toast
function showToast(message) {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.android.showToast(message);
	} else if(isiOS) {
		/*showToast(message,"Toast");*/
		window.WebViewJavascriptBridge.showToast()(
			"showToast()",
			function responseCallback(responseData) {
				console.log("JS received response:", responseData);
			}
		);
	}
};

//关闭webview回到发现页面
function callCloseWebview() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.android.callCloseWebview();
	} else if(isiOS) {
		window.WebViewJavascriptBridge.callCloseWebview()(
			"callCloseWebview",
			function responseCallback(responseData) {
				console.log("JS received response:", responseData);
			}
		);
	}
};
// 埋点事件
function callLayPoint(id) {
	try {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid) {
			window.android.callLayPoint(id);
		} else if(isiOS) {
			callLayPoint(id)
		}
	} catch(error) {
		console.log(error);
	}
};
//支付宝支付

function callAliPay(amount, subject, selOrderNo) {
	//	alert('进入支付')
	sessionSave("payNumber", selOrderNo);
	console.log(amount)
	try {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid) {
			window.android.callAliPay(amount, subject, selOrderNo);
		} else if(isiOS) {
			callLayPoint(amount, subject, selOrderNo)
		}
	} catch(error) {
		console.log(error);
	}

};

//跳转新url

function callOpenWebview(url) {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.android.callOpenWebview(url);
	} else if(isiOS) {
		console.log("iso-callOpenWebview")
		callOpenWebview(url)
		//window.webkit.messageHandlers.callOpenWebview.postMessage(url)
	}

};

//身份证识别

function idCardVerify(flag, merc_id) {
	console.log(merc_id)
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.android.idCardVerify(flag, merc_id);
	} else if(isiOS) {
		console.log("iso-idCardVerify")
		idCardVerify(flag, merc_id)
	}

};

////身份证识别回调
//function idCardVerifyResult(arg) {
//	var idcard_img = arg['idcard_img'];
//	var idcard_name = arg['idcard_name'];
//	var idcard_number = arg['idcard_number'];
//	var repCode = arg['repCode'];
//	var repMsg = arg['repMsg'];
//	console.log(arg)
//	//console.log("idcard_img："+idcard_img+"idcard_name："+idcard_name+"idcard_number："+idcard_number+"repCode："+repCode+"repMsg："+repMsg)
//	
//}

//活体识别

function faceIdVerify(merc_id) {
	console.log(merc_id)
	var u = navigator.userAgent;
	var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.android.faceIdVerify(merc_id);
	} else if(isiOS) {
		console.log("iso-faceIdVerify")
		faceIdVerify(merc_id)
	}

};

//安卓支付通知
function callSendPayResult(status, message) {
	//status 成功：000000 失败：其他
	var ap = sessionFetch("ap");
	var payNumber = sessionFetch("payNumber");
	var user_info = sessionFetch("user_info");
	if(ap === "ad") {
		if(status === "000000") {
			mui.ajax(API.UPDATEFRIEND + '?advertisementOrderId=' + payNumber + '&payStatus=1' + '&payType=12' + '&sys_identification=0&token_id=' + user_info.token_id + '&userId=' + user_info.usr_no, {
				data: data,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				type: 'get',
				success: function(res) {
					mui(".loading")[0].style.display = "none";
					console.log(res);

					if(res.errorCode === "0000") {
						//提交成功后执行支付操作
						console.log("支付结果推送成功");
						window.location.href = "../common_pages/pay_succeed.html?ap=" + ap;
					} else {
						//提交失败不做跳转
						console.log("支付结果推送失败");
						mui.alert(' 错误原因：' + res.message);
					}

				},
				error: function(xhr, type, errorThrown) {
					mui(".loading")[0].style.display = "none";
					console.log(type);
					console.log(xhr);
					mui.alert("服务器开小差啦，请稍后再试");
					//window.location.href = "../common_pages/error_page.html?error_type=serviceError";
				}
			});
		} else {
			mui.ajax(API.UPDATEFRIEND + '?advertisementOrderId=' + payNumber + '&payStatus=0' + '&payType=12' + '&sys_identification=0&token_id=' + user_info.token_id + '&userId=' + user_info.usr_no, {
				data: data,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				type: 'get',
				success: function(res) {
					mui(".loading")[0].style.display = "none";
					console.log(res);

					if(res.errorCode === "0000") {
						//提交成功后执行支付操作
						console.log("支付结果推送成功");
						window.location.href = "../common_pages/pay_fail.html?ap=" + ap;
					} else {
						//提交失败不做跳转
						console.log("支付结果推送失败");
						mui.alert(' 错误原因：' + res.message);
					}

				},
				error: function(xhr, type, errorThrown) {
					mui(".loading")[0].style.display = "none";
					console.log(type);
					console.log(xhr);
					mui.alert("服务器开小差啦，请稍后再试");
					//window.location.href = "../common_pages/error_page.html?error_type=serviceError";
				}
			});
		}

	} else {
		if(status === "000000") {
			var data = {
				"payNumber": payNumber,
				"successFail": "1",
				"payType": "12", //支付宝支付
				"userId": user_info.usr_no,
				"token_id": user_info.token_id,
				"sys_identification": "0"
			}
			console.log(data);
			mui.ajax(API.GETPAYSTATUSFAIL, {
				data: data,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				type: 'post',
				success: function(res) {
					mui(".loading")[0].style.display = "none";
					console.log(res);

					if(res.errorCode === "0000") {
						//提交成功后执行支付操作
						console.log("支付结果推送成功");
						window.location.href = "../common_pages/pay_succeed.html?ap=" + ap;
					} else {
						//提交失败不做跳转
						console.log("支付结果推送失败");
						mui.alert(' 错误原因：' + res.message);
					}

				},
				error: function(xhr, type, errorThrown) {
					mui(".loading")[0].style.display = "none";
					console.log(type);
					console.log(xhr);
					mui.alert("服务器开小差啦，请稍后再试");
					//window.location.href = "../common_pages/error_page.html?error_type=serviceError";
				}
			});

		} else {
			var data = {
				"payNumber": payNumber,
				"successFail": "0",
				"payType": "12", //支付宝支付
				"userId": user_info.usr_no,
				"token_id": user_info.token_id,
				"sys_identification": "0"

			}
			console.log(data);
			mui.ajax(API.GETPAYSTATUSFAIL, {
				data: data,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				type: 'post',
				success: function(res) {
					mui(".loading")[0].style.display = "none";
					console.log(res);

					if(res.errorCode === "0000") {
						//提交成功后执行支付操作
						console.log("支付结果推送成功");
						window.location.href = "../common_pages/pay_fail.html?ap=" + ap;
					} else {
						//提交失败不做跳转
						console.log("支付结果推送失败");
						mui.alert(' 错误原因：' + res.message);
					}

				},
				error: function(xhr, type, errorThrown) {
					mui(".loading")[0].style.display = "none";
					console.log(type);
					console.log(xhr);
					mui.alert("服务器开小差啦，请稍后再试");
					//window.location.href = "../common_pages/error_page.html?error_type=serviceError";
				}
			});
		}
	}

}
//IOS支付通知
function callSendPayResultIOS(arg) {
	//status 成功：000000 失败：其他
	var ap = sessionFetch("ap");
	var payNumber = sessionFetch("payNumber");
	var user_info = sessionFetch("user_info");
	var status = arg['returnCode'];
	var message = arg['message'];
	if(ap === "ad") {
		if(status === "000000") {
			mui.ajax(API.UPDATEFRIEND + '?advertisementOrderId=' + payNumber + '&payStatus=1' + '&payType=12' + '&sys_identification=0&token_id=' + user_info.token_id + '&userId=' + user_info.usr_no, {
				data: data,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				type: 'get',
				success: function(res) {
					mui(".loading")[0].style.display = "none";
					console.log(res);

					if(res.errorCode === "0000") {
						//提交成功后执行支付操作
						console.log("支付结果推送成功");
						window.location.href = "../common_pages/pay_succeed.html?ap=" + ap;
					} else {
						//提交失败不做跳转
						console.log("支付结果推送失败");
						mui.alert(' 错误原因：' + res.message);
					}

				},
				error: function(xhr, type, errorThrown) {
					mui(".loading")[0].style.display = "none";
					console.log(type);
					console.log(xhr);
					mui.alert("服务器开小差啦，请稍后再试");
					//window.location.href = "../common_pages/error_page.html?error_type=serviceError";
				}
			});
		} else {
			mui.ajax(API.UPDATEFRIEND + '?advertisementOrderId=' + payNumber + '&payStatus=0' + '&payType=12' + '&sys_identification=0&token_id=' + user_info.token_id + '&userId=' + user_info.usr_no, {
				data: data,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				type: 'get',
				success: function(res) {
					mui(".loading")[0].style.display = "none";
					console.log(res);

					if(res.errorCode === "0000") {
						//提交成功后执行支付操作
						console.log("支付结果推送成功");
						window.location.href = "../common_pages/pay_fail.html?ap=" + ap;
					} else {
						//提交失败不做跳转
						console.log("支付结果推送失败");
						mui.alert(' 错误原因：' + res.message);
					}

				},
				error: function(xhr, type, errorThrown) {
					mui(".loading")[0].style.display = "none";
					console.log(type);
					console.log(xhr);
					mui.alert("服务器开小差啦，请稍后再试");
					//window.location.href = "../common_pages/error_page.html?error_type=serviceError";
				}
			});
		}

	} else {
		if(status === "000000") {
			var data = {
				"payNumber": payNumber,
				"successFail": "1",
				"payType": "12", //支付宝支付
				"userId": user_info.usr_no,
				"token_id": user_info.token_id,
				"sys_identification": "0"
			}
			console.log(data);
			mui.ajax(API.GETPAYSTATUSFAIL, {
				data: data,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				type: 'post',
				success: function(res) {
					mui(".loading")[0].style.display = "none";
					console.log(res);

					if(res.errorCode === "0000") {
						//提交成功后执行支付操作
						console.log("支付结果推送成功");
						window.location.href = "../common_pages/pay_succeed.html?ap=" + ap;
					} else {
						//提交失败不做跳转
						console.log("支付结果推送失败");
						mui.alert(' 错误原因：' + res.message);
					}

				},
				error: function(xhr, type, errorThrown) {
					mui(".loading")[0].style.display = "none";
					console.log(type);
					console.log(xhr);
					mui.alert("服务器开小差啦，请稍后再试");
					//window.location.href = "../common_pages/error_page.html?error_type=serviceError";
				}
			});

		} else {
			var data = {
				"payNumber": payNumber,
				"successFail": "0",
				"payType": "12", //支付宝支付
				"userId": user_info.usr_no,
				"token_id": user_info.token_id,
				"sys_identification": "0"

			}
			console.log(data);
			mui.ajax(API.GETPAYSTATUSFAIL, {
				data: data,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				type: 'post',
				success: function(res) {
					mui(".loading")[0].style.display = "none";
					console.log(res);

					if(res.errorCode === "0000") {
						//提交成功后执行支付操作
						console.log("支付结果推送成功");
						window.location.href = "../common_pages/pay_fail.html?ap=" + ap;
					} else {
						//提交失败不做跳转
						console.log("支付结果推送失败");
						mui.alert(' 错误原因：' + res.message);
					}

				},
				error: function(xhr, type, errorThrown) {
					mui(".loading")[0].style.display = "none";
					console.log(type);
					console.log(xhr);
					mui.alert("服务器开小差啦，请稍后再试");
					//window.location.href = "../common_pages/error_page.html?error_type=serviceError";
				}
			});
		}
	}

}

//返回上一页
function callForwardBack() {
	try {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
		if(isAndroid) {
			window.android.callForwardBack();
		}
	} catch(error) {
		console.log(error);
	}
}

//跳转钱客多页面
function callOpenQKD(id) {
	try {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid) {
			window.android.callLayPoint(id);
		} else if(isiOS) {
			callLayPoint(id)
		}
	} catch(error) {
		console.log(error);
	}
};

//星商户俱乐部 我要开通
function callOpenClub() {
	console.log("点击我要开通");
	try {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid) {
			window.android.callOpenClub();
		} else if(isiOS) {
			window.WebViewJavascriptBridge.callOpenClub()(
				"callOpenClub()",
				function responseCallback(responseData) {
					console.log("JS received response:", responseData);
				}
			);
		}
	} catch(error) {
		console.log(error);
	}
};

//星商户俱乐部 我的俱乐部
function callOpenMyClub() {
	console.log("点击我的俱乐部");
	try {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isAndroid) {
			window.android.callOpenMyClub();
		} else if(isiOS) {
			window.WebViewJavascriptBridge.callOpenMyClub()(
				"callOpenMyClub()",
				function responseCallback(responseData) {
					console.log("JS received response:", responseData);
				}
			);
		}
	} catch(error) {
		console.log(error);
	}
};
//格式化金额
function formatNum(str) {
	var newStr = "";
	var count = 0;

	str = str.toString();
	str = str.replace(/,/g, "");

	if(str.indexOf(".") == -1) {
		for(var i = str.length - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr;
			}
			count++;
		}
		str = newStr + ".00"; //自动补小数点后两位
		// console.log(str);
	} else {
		for(var i = str.indexOf(".") - 1; i >= 0; i--) {
			if(count % 3 == 0 && count != 0) {
				newStr = str.charAt(i) + "," + newStr;
			} else {
				newStr = str.charAt(i) + newStr; //逐个字符拼接
			}
			count++;
		}
		str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
	}
	return str
};
//数组去重
function arrayRemoval(Array) {
	var n = []; //一个新的临时数组 
	//遍历当前数组 
	for(var i = 0; i < Array.length; i++) {
		//如果当前数组的第i已经保存进了临时数组，那么跳过， 
		//否则把当前项push到临时数组里面 
		if(n.indexOf(Array[i]) == -1) n.push(Array[i]);
	}
	return n;
};
//数组对象排序 从小到大
function ArrObjcompare(prop) {
	return function(obj1, obj2) {
		var val1 = obj1[prop];
		var val2 = obj2[prop];
		if(val1 < val2) {
			return -1;
		} else if(val1 > val2) {
			return 1;
		} else {
			return 0;
		}
	}
};
//数组对象排序 从大到小
function ArrObjcompare2(prop) {
	return function(obj1, obj2) {
		var val1 = obj1[prop];
		var val2 = obj2[prop];
		if(val1 > val2) {
			return -1;
		} else if(val1 < val2) {
			return 1;
		} else {
			return 0;
		}
	}
};
//毫秒 to 时分秒
function formatTime(value) {
	var date = new Date(value);
	var Y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var H = date.getHours();
	var i = date.getMinutes();
	var s = date.getSeconds();
	if(m < 10) {
		m = '0' + m;
	}
	if(d < 10) {
		d = '0' + d;
	}
	if(H < 10) {
		H = '0' + H;
	}
	if(i < 10) {
		i = '0' + i;
	}
	if(s < 10) {
		s = '0' + s;
	}

	// var t1 = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
	var t1 = H + '' + i;

	return t1;
};

//去除小数点后几位
function sliceFloat(str, num) {
	if(str.toString().indexOf(".") > -1 && (str.toString().length - str.toString().indexOf(".")) > num + 1) {
		str = Number(str.toString().substr(0, str.toString().length - 1));
		// console.log("已超过限制");
	}
	return str;
};
//过滤空格
function filterBlank(str) {
	return str.replace(/ /g, "");
};
//比对时间
function isTakeEffect(effect_date) {
	mydate = new Date();
	var year = mydate.getFullYear();
	var month = mydate.getMonth() + 1;
	var strDate = mydate.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + "" + month + "" + strDate;
	if(currentdate >= effect_date) {
		console.log("true")
		return true;
	} else {
		console.log("false")
		return false;
	}
};

//加法函数，用来得到精确的加法结果
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
//调用：accAdd(arg1,arg2)
//返回值：arg1加上arg2的精确结果
function accAdd(a, b) {
	var c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch(f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch(f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

//减法函数，用来得到精确的减法结果  
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。  
//调用：accSub(arg1,arg2)  
//返回值：arg1减去arg2的精确结果  
function accSub(a, b) {
	var c, d, e;
	try {
		c = a.toString().split(".")[1].length;
	} catch(f) {
		c = 0;
	}
	try {
		d = b.toString().split(".")[1].length;
	} catch(f) {
		d = 0;
	}
	return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}

function mul(a, b) {
	var c = 0,
		d = a.toString(),
		e = b.toString();
	try {
		c += d.split(".")[1].length;
	} catch(f) {}
	try {
		c += e.split(".")[1].length;
	} catch(f) {}
	return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

function div(a, b) {
	var c, d, e = 0,
		f = 0;
	try {
		e = a.toString().split(".")[1].length;
	} catch(g) {}
	try {
		f = b.toString().split(".")[1].length;
	} catch(g) {}
	return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

function sha1_to_base64(sha1) {   
	var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";   
	var base64_rep = "";   
	var cnt = 0;   
	var bit_arr = 0;   
	var bit_num = 0;      
	for(var n = 0; n < sha1.length; ++n)    {      
		if(sha1[n] >= 'A' && sha1[n] <= 'Z')       {         
			ascv = sha1.charCodeAt(n) - 55;      
		}      
		else if(sha1[n] >= 'a' && sha1[n] <= 'z')       {         
			ascv = sha1.charCodeAt(n) - 87;      
		}      
		else       {         
			ascv = sha1.charCodeAt(n) - 48;      
		}            
		bit_arr = (bit_arr << 4) | ascv;      
		bit_num += 4;      
		if(bit_num >= 6)       {         
			bit_num -= 6;                  
			base64_rep += digits[bit_arr >>> bit_num];         
			bit_arr &= ~(-1 << bit_num);      
		}   
	}      
	if(bit_num > 0)    {      
		bit_arr <<= 6 - bit_num;      
		base64_rep += digits[bit_arr];   
	}   
	var padding = base64_rep.length % 4;      
	if(padding > 0)    {      
		for(var n = 0; n < 4 - padding; ++n)       {         
			base64_rep += "=";      
		}   
	}   
	return base64_rep;
}

function cpr_version(ver1,ver2) {
    var version1pre = parseFloat(ver1);
    var version2pre = parseFloat(ver2);
    var version1next =  ver1.replace(version1pre + ".","");
    var version2next =  ver2.replace(version2pre + ".","");
    if(version1pre > version2pre){
        return true;
    }else if(version1pre < version2pre){
        return false;
    }else{
        if(version1next >= version2next){
            return true;
        }else{
            return false;
        }
    }
}
