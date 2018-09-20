<template>
    <div id="detail">
        <header class="mui-bar mui-bar-nav mn-head">
			详情
		</header>
        <div class="content">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">
                        身份证号
                        <i>*</i>
                    </span>
                    <yd-input slot="right" placeholder="请输入身份证号码"></yd-input>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">
                        身份证有效期
                        <i>*</i>
                    </span>
                    <yd-datetime type="time" slot="right" v-model="datetime"></yd-datetime>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        结算账号
                        <i>*</i>
                    </span>
                    <yd-input slot="right" placeholder="只支持储蓄卡"></yd-input>
                </yd-cell-item>
                 <yd-cell-item>
                    <span slot="left">
                        账户户名
                        <i>*</i>
                    </span>
                    <yd-input slot="right" placeholder="请输入账户户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">
                        开户支行
                        <i>*</i>
                    </span>
                    <span slot="right"></span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        商户名称
                        <i>*</i>
                    </span>
                    <yd-input slot="right" placeholder="请输入商户名称"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        联系人
                        <i>*</i>
                    </span>
                    <yd-input slot="right" placeholder="请输入联系人"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        手机号码
                        <i>*</i>
                    </span>
                    <yd-input slot="right" placeholder="请输入手机号码"></yd-input>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">
                        商户类型
                        <i>*</i>
                    </span>
                    <span slot="right">右边内容一</span>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">
                        商户地址
                    </span>
                    <span slot="right">右边内容一</span>
                </yd-cell-item>
                <yd-cell-item>
                    <yd-input slot="right" placeholder="详细地址"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
            <div class="tit">
                <span>
                    银行卡上传
                    <i>*</i>
                </span>
            </div>
            <div class="tit">
                <span>
                    证件上传
                    <i>*</i>
                </span>
            </div>
        </div>   
        <div class="con">
            成功
        </div>
        <button @click="change">更改</button>    
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    name:"Detail",
    data(){
        return{
            datetime:""
        }
    },
    methods:{
        change(){//改变提现页面内容页面
        //    $('.content').html(`
        //     <div class="succ">成功</div>
        //    `) //内容替换
            $('body').css('background','#fff')//改变背景色
            $('.content').hide()
            $('.con').show()
        }
    }
}
</script>
<style scoped="">
.con{
    color: red;
    display: none;
}
</style>


