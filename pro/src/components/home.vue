<template>
	<div id="home">
		<router-link to="/detail2">跳转到detail2页面</router-link>
		<router-link to="/detail">跳转到detail页面</router-link>
	</div>
</template>

<script>
	export default{
		name:"Home",
		data(){
			return{
				obj:{
					a:1
				}
			}
		},
		created(){
			console.log(this.obj)
			var Book = {}
			var name = ""
			Object.defineProperty(Book,"name",{
				set(value){
					name = value
					console.log("你取了一个书名叫做"+value)
				},
				get(){
					return "《"+name+"》"
				}
			})
			Book.name = "vue指南"
			console.log(Book.name)
			console.log(Book)
		}
	}
</script>

<style scoped="">
	
</style>