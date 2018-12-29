//数据层---更新数据，发出change事件---eventemitter,object-assign

import {EventEmitter} from 'events';

//原生js拷贝模块
import assign from 'object-assign';
//把EventEmitter.prototype和业务逻辑拷贝到{}上

const Store=assign({},EventEmitter.prototype,{
	Todos:[],
	addTodo(text){
		this.Todos.push(text)
	},
	changes(){
		this.emit('change')
	},
	changelistener(callback){
		this.on('change',callback)
	},
	getAll(){
		return this.Todos;
	}
})



export default Store;