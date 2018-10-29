<template>
    <div class="register">
        <img src="../../assets/share_logo.png" alt="">
        <div class="con">
            <div class="user">
                <input type="text" placeholder="请输入用户名或手机号">
            </div>
            <div class="user tle">
                <input type="text" placeholder="请输入密码">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Register"
}
</script>

<style>
.register{
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(../../assets/skip-bg.jpg) no-repeat center;
    background-size:cover;
}
.register img{
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
    background: red;
    height: 80%;
    width: 80%;
    padding: 0;
    margin: 4px 5% 4px 0;
    float: right;
}
</style>
