//将数据进行分离
var obj = {
	fn1:function(req,res){
		res.write('你好  数据1')
	},
	fn2:function(req,res){
		res.write('hello 数据2')
	}
}
module.exports = obj;//暴露对象
