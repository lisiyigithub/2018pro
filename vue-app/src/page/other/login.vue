<template>
    <div class="login">
        <img src="../../assets/share_logo.png" alt="">
        <div class="con">
            <div class="user">
                <input type="text" placeholder="请输入用户名或手机号">
            </div>
            <div class="user tle">
                <input type="text" placeholder="请输入密码">
            </div>
            <div class="user btn">
                <button>登录</button>
            </div>
            <div class="last">
                <router-link to="" class="last_left">
                    忘记密码
                </router-link>
                <router-link to="./register" class="last_right ">
                    注册
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Login"
}
</script>

<style>
.login{
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(../../assets/skip-bg.jpg) no-repeat center;
    background-size:cover;
}
.login img{
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    margin: auto;
}
.con{
    position: absolute;
    top: 44%;
    left: 0;
    right: 0;
    margin: auto;
}
.user{
    width: 80%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #999;
    border-radius: 20px;
    margin: 0 auto;
    margin-bottom: 20px;
}
.user input{
    border: none;
    outline: 0;
    background: 0;
    height: 60%;
    width: 80%;
    padding: 0;
    margin: 8px 5% 8px 0;
    float: right;
    border-left: 1px solid #999;
    text-indent: 5px;
}
.btn{
    border: none;
    width: 80%;
    height: 30px;
    line-height: 30px;     
    background: rgb(68, 120, 189);
    margin-bottom: 0;
}
.btn button{
    width: 100%;
    height: 100%;
    line-height: 100%;
    border: none;
    color: #fff;
    border-radius: 15px;
    outline: none;
    background: none;
}
.last{
    width: 80%;
    margin: 0 auto;
}
.last a{
    font-size: 12px;
    margin: 0 5px;
    color: rgba(58, 51, 51, 0.37);
    text-decoration: none;
}
.last .last_right{
    float: right;
}
</style>
