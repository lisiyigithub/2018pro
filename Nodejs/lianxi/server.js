//服务器
const http = require('http')
const url = require('url')
const obj = require('./common')
http.createServer((req,res)=>{
	res.writeHead(200,{'content-type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'})
	
	if(req.url != '/favicon.ico'){
		/*res.write('hello')
		res.end()*/
		var path = url.parse(req.url).pathname.replace(/\//,'')
		try{
			obj[path](req,res)
		}catch(e){
			//TODO handle the exception
			obj['home'](req,res)
		}
	}
}).listen(3000)



