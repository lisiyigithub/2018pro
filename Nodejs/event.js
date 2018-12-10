const EventEmitter = require('events')
class Person extends EventEmitter{};
var person = new Person()

person.on('play',(data)=>{//on事件可以推送多个事件//once只推送第一个事件
	console.log('他最喜欢什么：'+data)
})

person.emit('play','spa')
person.emit('play','junk')



/*class Person extends EventEmitter{
	constructor(){
		
	}
}

class Person = function(){
	
}
function Person(){
	
}*/
