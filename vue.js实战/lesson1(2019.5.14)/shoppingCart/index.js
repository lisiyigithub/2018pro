var app = new Vue({
	el:"#app",
	data:{
		list:[
			{
				id:1,
				name:"iPhone7",
				price:6188,
				count:1
			},
			{
				id:2,
				name:"iPad Pro",
				price:5888,
				count:1
			},
			{
				id:3,
				name:"MacBook Pro",
				price:21488,
				count:1
			}
		]
	},
	computed:{//计算属性
		totalPrice(){
			var total = 0;
			for(var i = 0; i < this.list.length; i++){
				var item = this.list[i]
				total += item.price*item.count
			}
			return total.toString().replace(/\B(?=(\d{3})+$)/g,',')
		
		}
		
	},
	filters:{//过滤器
		
	},
	//声明周期
	created(){
		console.log("created：实例创建完成")
		
	},
	mounted(){
		console.log("mounted:实例化挂载完成")

	},
	beforeDestroy(){
		console.log("beforeDestory:实例销毁前")
		
	},
	methods:{
		reduce(index){
			if(this.list[index].count === 1) return;
			this.list[index].count--;
		},
		add(index){
			this.list[index].count++;
		},
		remove(index){
			this.list.splice(index,1)
		}
	}
})