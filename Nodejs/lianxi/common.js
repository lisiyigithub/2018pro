const fs = require('fs')

var obj = {
	'home':function(req,res){
		fs.readFile('./home.json',(err,data)=>{
			res.write(data)
			res.end()
		})
	},
	'about':function(req,res){
		fs.readFile('./about.json',(err,data)=>{
			res.write(data)
			res.end()
		})
	},
	'other':function(req,res){
		fs.readFile('./other.json',(err,data)=>{
			res.write(data)
			res.end()
		})
	}
}
module.exports = obj
