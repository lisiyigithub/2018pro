const fs = require('fs')
const qs = require('querystring')
var conn = require('./conn')
const rrouter = {
	'api/register':function(req,res){
		var str = "";
		req.on("data",function(chunk){
			str += chunk;
		});
		req.on("end",function(){
			var data = qs.parse(str)			
			//只等传数据库
			conn.conn(data,res)
		})
	},
	'api/login':function(req,res){
		var str = "";
		req.on("data",function(chunk){
			str += chunk;
		});
		req.on("end",function(){
			var data = qs.parse(str)			
			//只等传数据库
			conn.conn(data,res)
		})
	}
}
module.exports = rrouter;
