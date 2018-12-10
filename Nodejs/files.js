const fs = require('fs')

//错误优先回调函数---函数第一个参数为error信息
//获取文件信息fs.stat()
/*fs.stat('./fuxi.html',(err,data)=>{
	console.log(data.isFile())
})*/

//创建目录fs.mkdir()
/*fs.mkdir('./logs',()=>{
	console.log('success')
})*/

//创建文件fs.writeFile(url,con,fc)
/*fs.writeFile('./log/hello.log','nihao',()=>{
	console.log('success')
})*/

//追加内容 fs.appendFile(),如果路径文件不存在，则直接新增一个文件
/*fs.appendFile('./log/hello.log','------你好',()=>{
	console.log('success')
})*/

//读取文件 fs.readFile()
/*fs.readFile('./log/hello.log',(err,data)=>{
	console.log(data.toString())
})*/

//读取目录 fs.readdir()
/*fs.readdir('./log',(err,data)=>{
	console.log(data)//会以数组的形式显示
})*/

//重命名 fs.rename()
/*fs.rename('./log','./logs',()=>{
	console.log('success')
})*/

//删除单个文件fs.unlink()
/*fs.unlink('./logs/he.log',()=>{
	console.log('success')
})*/

//删除目录fs.rmdir()只能删除空目录
/*fs.rmdir('./log',()=>{
	console.log('success')
	
})*/


//混合运用删除有文件的目录
/*fs.readdir('./logs',(err,data)=>{
	data.map(function(item){
		fs.unlink('./logs/'+item,()=>{
			fs.rmdir('./logs',()=>{
				console.log('success')
			})
		})
	})
})*/

//读取目录
console.log(fs.readdirSync('./log'))