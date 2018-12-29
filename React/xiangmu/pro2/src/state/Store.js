//更新数据，发出change事件---eventemitter,Object-assign
import {EventEmitter} from 'events'
//原生js拷贝模块
import assign from 'object-assign'

const Store = assign({},EventEmitter.prototype,{//把EventEmitter的原型和后面的{}，通过assign拷贝到第一个{}里面
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