<template>
    <div id="demo">
        <ul>
            <li v-for="(item,i) in arr"><span></span>-----<button key="i" value="1" @click="dian(i)">点击计时</button></li>
        </ul>
        <div class="out">
            <div class="inner">
                <h3>结束服务</h3>
                <p>本次服务时长：</p>
                <button @click="quxiao()">取消</button>
                <button @click="sure()">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
var flag = 0
export default {
    name:"Demo",
    data(){
        return{
            arr:[1,2,3,4]
        }
    },
    methods:{
        dian(i){
            console.log(i)
            var _this = this
                // var date = new Date()
                // $('span').eq(i).text(date.getDate())
            if(_this.flag == 0){
                
                setInterval(function() {   
                    var time = new Date();   // 程序计时的月从0开始取值后+1   
                    var m = time.getMonth() + 1;   
                    var t = time.getFullYear() + "-" + m + "-"     
                    + time.getDate() + " " + time.getHours() + ":"     
                    + time.getMinutes() + ":" + time.getSeconds();   
                    $('span').eq(i).text(t)                                 
                }, 1000); 
                _this.flag = 1;
            }else{    
                alert('结束')                    
                _this.flag = 0    
                       
            }
             
        },
        quxiao(){
            $('.out').hide()
        },
        sure(){
            clearInterval(k);
        }
    }
}
</script>

<style scoped>
.out{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: rgba(0,0,0,.5);
    display: none;
}
.inner{
    width: 240px;
    height: 150px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    background: #fff;
}

</style>
