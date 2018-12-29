const https = require('https');
const fs = require('fs')

var obj = {
	'home':function(req,res){
		res.write('这是首页数据')
		res.end()
	},
	'about':function(req,res){
		res.write('这是关于数据')
		res.end()
	},
	'other':function(req,res){
		fs.readFile('./test.html',(err,data)=>{
			res.write(data)
			res.end()
		})	
	},
	'douban':function(reqq,ress){		
		//请求地址的配置信息对象
		const options = {
		  hostname: 'api.douban.com',
		  port: 443,
		  path: '/v2/movie/top250',
		  method: 'GET'
		};
		var str = ''
		var arr = []
		//发起请求
		const req = https.request(options, (res) => {		
		  //接收数据事件
		  res.on('data', (d) => {
		    str+=d
		  });
		  
		  //处理数据事件
		  res.on('end',()=>{
		  	let str1 = JSON.parse(str).subjects
		  	str1.map(function(item){ 		
		  		arr.push(item.title)
		  	})
		  	ress.write(JSON.stringify(arr))
		  	ress.end()
		  })
		});
		
		//请求失败
		req.on('error', (e) => {
		  console.error(e);
		});
		
		//结束请求
		req.end();
	}
}
module.exports = obj
