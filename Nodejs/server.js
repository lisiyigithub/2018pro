//http://ww.baidu.com:3000

//协议	http/https(不能自行搭建,安全加密)
//主机名/域名	localhost/127.0.0.1
//端口  3000/8000/8080
//path  hash  search


//搭建服务器-----nodejs提供的三种模块模式;内置、外部、自定义文件
const http = require('http');//导入nodejs提供的内置模块(原生模块)
//require('webpack')//导入依赖模块(外部模块)
//require('./common.js')//导入自定义文件模块

//域名
const hostname = '127.0.0.1';

//端口号
const port = 3000

//创建服务
http.createServer((req,res)=>{
//	req=>request请求对象
//	res=>response响应对象

	//头部信息
	res.setHeader({'content-type':'text/html;','Access-Control-Allow-Origin':'*'})
	
	//状态码
	res.statusCode = 200;
	

//	console.log(req.url)
	
	//过滤对ico图标的请求
	if(req.url != 'favicon.ico'){
		//写入数据
		res.write('hello nodejs')
	}
	
	//结束响应标识
	res.end()
	
}).listen(port,hostname,()=>{//监听端口号/域名
	console.log(`服务器已启动:http://${hostname}:${port}`)
})

//http://127.0.0.1:3000   string     hello nodejs
