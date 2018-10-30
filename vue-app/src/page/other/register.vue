<template>
    <div class="register">
        <mt-header  fixed title="注册">
            <router-link to="/login" slot="left">
                <
            </router-link>
        </mt-header>
        <mt-field label="用户名" placeholder="6~20位字母、数字组合" v-model="username"></mt-field>
        <mt-field label="手机号" placeholder="请输入11位手机号码" v-model="phone"></mt-field>
        <mt-field label="验证码" placeholder="请输入手机验证码" v-model="yanzheng"></mt-field>
        <mt-field label="密码" placeholder="6~20位字母、数字组合" v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="6~20位字母、数字组合" v-model="surepassword"></mt-field>
        <button>注册</button>
        <p>
            点击注册即同意
            <router-link to="">《用户协议》</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name:"Register",
    data(){
        return{
            username:"",
            phone:"",
            yanzheng:"",
            password:"",
            surepassword:""
        }
    }
}
</script>

<style>
.register{
    width: 100%;
    height: 100%;
    position: absolute;
}
.mint-header a{
    text-decoration: none;
    color: rgb(236, 245, 247);
    font-size: 24px;  
    line-height: 44px;
    position: absolute;
    left: 10px;
}
h1{
    margin: 0;
    padding: 0;
    text-align: center;
    background: rgb(67, 144, 245);
    color: #fff;
    font-size: 20px;
    height: 44px;
    line-height: 44px;
}
.mint-cell-wrapper{
    border-bottom: 1px solid #ddd;
    margin: 0 4px;
}
.mint-cell-wrapper div{
    display: inline-block;
    line-height: 36px;
}
.mint-cell-title{
    width: 23%;
}
.mint-cell-value{
    width: 75%;
}
.mint-cell-value input{
    border: 0;
    outline: none;
    line-height: 36px;
    padding: 0;
}
.register button{
    width: 94%;
    margin: 30px 3% 0 3%;
    height: 34px;
    line-height: 34px;
    border-radius: 17px;
    border: 0;
    outline: none;
    background: rgb(44, 134, 238);
    color: #fff;
}
p{
    margin: 0;
    padding: 0;
    width: 90%;
    margin: 0 5%;
    font-size: 12px;
    line-height: 20px;
}
p a{
    text-decoration: none;
    color: rgb(44, 134, 238);
}
</style>
