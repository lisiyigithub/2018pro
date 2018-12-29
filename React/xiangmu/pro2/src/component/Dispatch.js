//事件调度中心：flue中心枢纽--register注册回调，接收action，命令store操作
import {Dispatcher} from 'flux'
import Store from './Store'

const Dispatch = new Dispatcher();
Dispatch.register((action)=>{
	switch (action.actionType){
		case 'ADD_TODO':
			Store.addTodo(action.text)
			Store.changes()
			break;
		default:
			break;
	}
})

export default Dispatch;
