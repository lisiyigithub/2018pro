//精简版
const http = require('http')//所有的内置模块直接require

http.createServer((req,res)=>{
	//设置头部信息		写头部信息加er，设置头部信息不加er
	res.writeHead(200,{'content-type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'})
	if(req.ulr != '/favicon.ico'){
		//写入数据
		res.write('love')
		res.end()
		
		//接收数据----data事件
		req.on('data',(data)=>{
			console.log('数据：'+data.toString())
		})
	}
	
}).listen(3000)

//http://localhost:3000   你好