const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

//创建数据库
var conn = function(data,res){
	MongoClient.connect(url,function(err,db){
		if(err) throw err;
//		console.log("数据库已创建")
		var mydb = db.db('mydb')
		mydb.collection('users').find({username:data.username}).toArray(function(err,result){
			if(err) throw err;
			console.log(result.length)
			if(result.length){				
				res.write("0")
				res.end()
			}else{
				mydb.collection('users').insert(data)
				res.write("1")
				res.end()
				
			}	
			db.close()
		})	
	})
};

module.exports.conn = conn

