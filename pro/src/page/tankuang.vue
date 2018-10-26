<template>
    <div id="tos">
        <input type="text" placeholder="input mobile number"/>
        <button @click="tan">TAKE THE DIYA</button>
        <p>你好！我爱你！</p>
        <p>你好！我爱你！</p>
        <p>你好！我爱你！</p>
        <div class="wrap">
            <div class="box">
                <p>恭喜你中奖啦！</p>
                <div class="guan" @click="close">X</div>
            </div>           
        </div>
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </div>
</template>

<script>
import $ from "jquery"
export default {
    name:"Tan",
    methods:{
        tan(){
            $('.wrap').show()
        },
        close(){
            $('.wrap').hide()
        },
        onValuesChange(picker, values) {
            if (values[0] > values[1]) {
                picker.setSlotValue(1, values[0]);
            }
        }
    },
    data() {
        return {
            slots: [
                {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot1',
                textAlign: 'right'
                }, {
                divider: true,
                content: '-',
                className: 'slot2'
                }, {
                flex: 1,
                values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                className: 'slot3',
                textAlign: 'left'
                }
            ]
        };
    }
}
</script>

<style scoped>
#tos{
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    background: blue;
    position: absolute;
    width: 100%;
    height: 100%;
}
input{
    display: block;
    border: 0;
    border-radius: 10px;
    text-align: center;
    outline: none;
    line-height: 50px;
    width: 60%;
    margin: 10px auto;
}
button{
    display: block;
    width: 60%;
    border: 0;
    border-radius: 20px;
    line-height: 40px;
    color: #fff;
    background: orange;
    margin: 0 auto;
    outline: none;
}
.wrap{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    width:100%;
    height: 100%;
    display: none;
}
.box{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50%;
    height: 20%;
    background: #fff;
    text-align: center;
    color: red;
}
.box p{
    height: 80px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    line-height: 80px;
}
.guan{
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    border-radius:50%;
    color: #fff;
    background: rgba(0, 0, 0, .8);
    position: absolute;
    bottom: -30px;
    left: 0;
    right: 0;
    margin: auto;
}
</style>
