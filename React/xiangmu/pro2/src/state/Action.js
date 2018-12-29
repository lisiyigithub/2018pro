//动作层:操作事件,发送数据
const Action = {
	addItem(text){
		return{
			actionType:'ADD_TODO',
			text:text
		}
	}
}


export default Action;