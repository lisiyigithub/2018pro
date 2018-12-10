<template>
	<div class="register">
		<h1>注册</h1>
		<div>
			用户名：<input type="text" v-model="user" />
		</div>
		<div>
			密码：<input type="text" v-model="pass" />
		</div>
		<button @click="register()">注册</button>
		<div><router-link to="/login">已有账号直接登陆</router-link></div>
	</div>
</template>

<script>
	export default{
		name:"Register",
		data(){
			return{
				user:'',
				pass:''
			}
		},
		methods:{
			register(){
				if(this.user&&this.pass != ""){
					this.$router.push('/login')
				}else{
					alert('账号密码不能为空')
				}
			}
		}
	}
</script>

<style>
	button,input{
		border: 1px solid #000;
	}
</style>