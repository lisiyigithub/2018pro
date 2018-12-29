const http = require('http')
const router = require('./router')
const rrouter = require('./rrouter')
http.createServer((req,res)=>{
	res.writeHead(200,{'content-type':'text/html;charset=utf-8'})
	
	if(req.url != '/favicon.ico'){
		var path = req.url.slice(1)
		if(!/api/.test(req.url)){
			try{
				router[path](req,res)
			}catch(e){
				//TODO handle the exception
				res.write(e.message)
				res.end()
			}
		}else{
			try{
				rrouter[path](req,res)
			}catch(e){
				//TODO handle the exception
				res.write(e.message)
				res.end()
			}
		}
		
	}
}).listen(3000)
