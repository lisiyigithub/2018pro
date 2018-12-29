<template>
	<div class="home">
		首页
		<p>{{str}}</p>
		<el-carousel height="150px">
	      <el-carousel-item v-for="item in 4" :key="item">
	        <h3>{{ item }}</h3>
	      </el-carousel-item>
	    </el-carousel>
	    <hr />
	    <h1>{{str1}}</h1>
	    <button @click="add()">数字+1</button>
	    <button @click="jian()">数字-1</button>
	    
	    <div>用户名 {{name}}</div>
	    <video width="100%" height="" src="http://www.w3cschool.cc/try/demo_source/mov_bbb.mp4" controls="controls"></video>
	    
	</div>
</template>

<script>
	import axios from 'axios'
	import store from '../../store/store.js'
	export default{
		name:"Home",
		data(){
			return{
				tit:'首页',
				str:""
			}
		},
		mounted(){
			this.$emit('toparent',this.tit)
			let _this = this
			axios('http://localhost:3000',{
				method:'get'
			}).then(function(data){
				console.log(data.data)
				_this.str = data.data
			})
		},
		computed:{
			str1(){
				return store.state.count
			},
			name(){
//				return store.state.name
				return sessionStorage.getItem('user')
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
	.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>