<template>
	<div class="register">
		<h1>注册</h1>
		<div class="demo-input-suffix">
			用户名：
			<el-input type="text" v-model="user" />
		</div>
		<div class="demo-input-suffix">
			密码：
			<el-input type="text" v-model="pass" />
		</div>
		<el-button type="primary" @click="register()">注册</el-button>
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
					this.$message({
			          showClose: true,
			          message: '账号密码不能为空',
			          type: 'error'
			        });
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