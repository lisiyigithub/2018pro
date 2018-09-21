<template>
    <div class="detail2">
        <mt-picker :slots="slots" @change="onValuesChange" style="border:1px solid #000;overflow:hidden;height:116px;"></mt-picker> 
        <div v-for="item in list">
             <input type="text" :placeholder="'你好'+item+'再见'">
        </div>
       
    </div>        
</template>

<script>
import { Picker } from 'mint-ui';
export default {
    name:"Detail2",
    data(){
        return{
            list:[1,2,3,4,5,6],
            slots: [
                {
                    flex: 1,
                    values: ['北京', '上海', '江苏', '杭州', '湖北', '河南'],
                    className: 'slot1',
                    textAlign: 'right',
                    float:'left'
                }, 
                {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, 
                {
                    flex: 1,
                    values: ['北京', '山海', '昆山', '杭州', '武汉', '郑州'],
                    className: 'slot3',
                    textAlign: 'left',
                    float:'left'
                }
            ],

        }    
    },
     methods: {
      onValuesChange(picker, values) {
        if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
        }
      },
      onProvinceChange(picker, values) {
    
        this.province = picker.getValues()[0]
        var cityArr = [];
        for(var key in provinceCity[this.province]) {
        cityArr.push(key);
      }
        this.slots2[0].values = cityArr;
      },
        onCityChange(picker, values) {
            this.city = picker.getValues()[0]
            var countyArr = [];
            for(var key in provinceCity[this.province][this.city]) {
                countyArr.push(key);
            }
            this.slots3[0].values = countyArr;
        },
        onCountyChange(picker, values) {
            
        this.county = picker.getValues()[0]
        },
        
    }
}
</script>

<style scoped>

</style>

