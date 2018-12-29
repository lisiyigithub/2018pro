const http = require('http')
const url = require('url')
const obj = require('./common')

http.createServer((req,res)=>{
	res.writeHead(200,{'content-type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'})
	if(req.url != '/favicon.ico'){
		//req.url---url地址
		var path = url.parse(req.url).pathname.replace(/\//,'')
		console.log(path)
		try{//存在的情况下
			obj[path](req,res)
		}catch(e){//当路径不存在时显示默认路径
			obj['home'](req,res)
		}
		
		
//		res.write('hi')
//		//console.log('success')
//		res.end()
	}
}).listen(3000)



//文档
//http://localhost:3000   string  hi

//http://localhost:3000/home 首页数据
//http://localhost:3000/about 关于数据
//http://localhost:3000/other 其他数据
