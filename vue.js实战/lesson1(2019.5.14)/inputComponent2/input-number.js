function isValueNumber(value){
	return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '')
}
Vue.component("input-number",{
	template:`
		<div>
			<input type="text" :value="currentValue" @change="handleChange"/>
			<button	@click="handleDown" :disabled="this.currentValue <= this.min">-</button>
			<button @click="handleUp" :disabled="this.currentValue >= this.max">+</button>
		</div>
	`,
	data(){
		return{
			currentValue:this.value	
		}
	},
	props:{
		value:{
			type:Number,
			dafault:0
		},
		max:{
			type:Number,
			default:Infinity
		},
		min:{
			type:Number,
			dafault:-Infinity
		}
	},
	watch:{
		currentValue(val){
			this.$emit("input",val)
			this.$emit("on-change",val)
		},
		value(val){
			this.updateValue(val)
		}
	},
	methods:{
		updateValue(val){
			if(val > this.max) val = this.max;
			if(val < this.min) val = this.min;
			this.currentValue = val
		},
		handleDown(){
			if(this.currentValue <= this.min) return;
			this.currentValue -= 1;
		},
		handleUp(){
			if(this.currentValue >= this.max) return;
			this.currentValue += 2;
		},
		handleChange(event){
			console.log(event)
			var val = event.target.value.trim()//trim()去掉字符串两端的多余空格
			var max = this.max
			var min = this.min
			console.log(isValueNumber(val))
			if(isValueNumber(val)){
				val = Number(val)
				this.currentValue = val//这一句是给currentValue赋值然后再进行数据对比
				console.log(this.currentValue)
				if(val > max){
					this.currentValue = max
				}else if(val < min){
					this.currentValue = min
				}
			}else{
				console.log(event.target.value)
				event.target.value = this.currentValue//验证失败的情况下我们是给event的value赋值
				console.log(event.target.value)
			}
			
		}
	},
	mounted(){
		this.updateValue(this.value)
	}
})