//事件调度中心---flux中心枢纽---register注册回调 接收action，命令store操作
//派发器提供dispatch方法用于接收action



import {Dispatcher} from 'flux';
import Store from './Store';

//创建派发器对象
const Dispatch=new Dispatcher();

Dispatch.register((action)=>{
	switch (action.actionType){
		case 'ADD_TODO':
			//调用store的方法及发送数据
			Store.addTodo(action.text)
			//如果不掉视图不能进行更新
			Store.changes()
			break;
	}
})



export default Dispatch;