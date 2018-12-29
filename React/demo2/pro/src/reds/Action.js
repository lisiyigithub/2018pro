//动作---返回对象，

const Action = function(text){
	return{
		type:'ADD_TODO',
		text:text
	}
}

export default Action;