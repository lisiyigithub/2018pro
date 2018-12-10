const https = require('https');
const http = require('http')
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
  //console.log('statusCode:', res.statusCode);
  //console.log('headers:', res.headers);

  //接收数据事件
  res.on('data', (d) => {
    //process.stdout.write(d);
//  console.log(d.toString())
    str+=d
  });
  
  //处理数据事件
  res.on('end',()=>{
  	let str1 = JSON.parse(str).subjects
  	str1.map(function(item){ 		
  		arr.push(item.title)
  	})
  	console.log(arr)
  })
});

//请求失败
req.on('error', (e) => {
  console.error(e);
});


http.createServer((req,res)=>{
	res.writeHead(200,{'content-type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'})
	
	if(req.url != '/favicon.ico'){
		res.write(JSON.stringify(arr))
		res.end()
	}
}).listen(3000)

//结束请求
req.end();