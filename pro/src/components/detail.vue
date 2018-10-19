<template>
    <div id="detail">
        <header class="mui-bar mui-bar-nav mn-head">
			详情
		</header>
        <div class="content">
            
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    name:"Detail",
    data(){
        return{
            datetime:"",
            imgList: [],
            datas: new FormData(),
            files:0,
            size:0

        }
    },   
    methods:{
        
    }
}
</script>
<style scoped="">
.con{
    color: red;
    display: none;
}
.succ_out{
    position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0,.4);
	z-index: 666;
    display: none;
}
.succ_inner{
    width: 268px;
    height: 220px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background:#fff;
}
.succ_inner>div{
    height: 45px;
    margin-top: 20px;
}
.succ_inner>div img{
    width: 45px;
    height: 45px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
}
.succ_inner h3{
    line-height: 50px;
    font-size: 16px;
}
.succ_inner p{
    line-height: 20px;
    margin: 0 15px 16px;
    font-size: 14px;
}
.succ_inner button{
    width: 100%;
    border: none;
    line-height: 50px;
    border-top: 1px solid #D8D8D8;
    color:#25A2F2; 
}
</style>


