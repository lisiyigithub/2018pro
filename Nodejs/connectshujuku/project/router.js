const fs = require('fs')
const router = {
	'register':function(req,res){
		fs.readFile('./register.html',function(err,data){
			res.write(data)		
			res.end()
		})
	},
	'login':function(req,res){
		fs.readFile('./login.html',function(err,data){
			res.write(data)		
			res.end()
		})
	}
}
module.exports = router;
