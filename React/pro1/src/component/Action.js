//动作层---操作事件及发送数据

const Action = {
	addItem(text){
		return{
			actionType:'ADD_TODO',//类要用大写型
			text:text//固定的
		}
	}
}



export default Action;