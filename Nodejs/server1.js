const http = require('http')
const hostname = 'localhost'
const port = 3000
const obj = require('./commons')//自定义文件模块要在根目录下查找

http.createServer((req,res)=>{
	res.setHeader({'content-type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'})
	
	res.statusCode=200
	if(req.url!='/favicon.ico'){
		//res.write('你好2019')//解决中文乱码添加charset=utf-8
		//res.write('123456')//报错   node里面写入的数据要是字符串或buffer格式
//		obj.fn1(req,res)
		obj.fn2(req,res)
		res.end()
	}
}).listen(port,hostname,()=>{
	console.log(`服务器已启动`)
})
