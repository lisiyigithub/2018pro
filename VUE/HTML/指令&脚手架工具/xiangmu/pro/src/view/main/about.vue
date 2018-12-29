<template>
	<div class="about">
		关于
		<hr />
		<h1>{{str}}</h1>
		<button @click="add()">数字+1</button>
		<button @click="jian()">数字-1</button>
		
	</div>
</template>

<script>
	import store from '../../store/store.js'
	export default{
		name:"About",
		data(){
			return{
				tit:"关于"
			}
		},
		mounted(){
			this.$emit('toparent',this.tit)
		},
		computed:{
			str(){
				return store.state.count
			}
		},
		methods:{
			add(){
				store.commit('add')
			},
			jian(){
				store.commit('jian')
			}
		}
	}
</script>

<style>
</style>