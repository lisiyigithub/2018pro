function isValueNumber(value){//正则校验input输入框的内容是不是数字
	return(/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');	
}

Vue.component("input-number",{
	template:`
		<div class="input-number">
			<input type="text" :value="currentValue" @change="handleChange"/>
			<button @click="handleDown" :disabled="currentValue <= min">-</button>
			<button @click="handleUp" :disabled="currentValue >= max">+</button>
		</div>
	`,
	data(){
		return{
			currentValue:this.value//v-model的绑定数据value
		}
	},
	props:{
		value:{//v-model的绑定数据value如果传负值，则value直接取默认值0
			type:Number,
			default:0
		},
		min:{
			type:Number,
			default:-Infinity//无穷大
		},
		max:{
			type:Number,
			default:Infinity
		}
	},
	watch:{
		currentValue(val){
			this.$emit('input',val)
			this.$emit('on-change',val)
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
			this.currentValue += 1; 
			console.log(this.currentValue)
		},
		handleChange(event){//直接改变input的数据
			var val = event.target.value.trim()
			var max = this.max
			var min = this.min
			if(isValueNumber(val)){
				val = Number(val)
				this.currentValue = val
				if(val > max){
					this.currentValue = max
				}else if(val < min){
					this.currentValue = min
				}
			}else{
				event.target.value = this.currentValue
			}
		}
	},
	mounted(){
		//组件挂载完成之后，将传递的参数和max、min做对比，然后控制currentValue的初始值
		this.updateValue(this.value)
	}
})