var Toast = Vue.component('Toast',{
	template:`
		<div v-if="show" class="toast">
			{{text}}
		</div>
	`,
	data(){
		return{
			show:true,//控制显示、隐藏
			text:'登录成功',//控制显示文本
			duration:2000//控制显示时长
		}
	}
})

function toast(){
	let vuetoast = new Toast({//实例化
		el:document.createElement("div")
	})
	document.body.appendChild(vuetoast.$el)
	setTimeout(function(){
		vuetoast.show = false
	},vuetoast.duration)
}
