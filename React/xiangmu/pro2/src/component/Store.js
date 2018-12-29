import {EventEmitter} from 'events'
import assign from 'object-assign'
const Store = assign({},EventEmitter.prototype,{
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
