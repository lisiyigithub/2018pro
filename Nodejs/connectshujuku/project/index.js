const mongodb = require('mongodb')

//创建连接服务对象
const server = new mongodb.Server('localhost',27017,{suto_reconnect:true});

//创建数据库对象
const db = new mongodb.Db('newland',server,{safe:true})

//测试链接
db.open((err,database)=>{
	console.log('找到数据库了')
	database.collection('manger',(err,coll)=>{
		console.log('找到集合了')
		coll.find({}).toArray((er,data)=>{
			console.log(data)
			//关闭数据库
			database.close()
		})
//		console.log(coll.find({}))
	})
})
