<template>
    <div class="shouye">
        首页
        <ul>
            <li  v-for="(u,index) in house_arr" :key="index" class="li_count">
              <span>
                <p class="p_1"> {{u.name}}</p >
                <p class="p_2"> {{u.count}}</p >
              </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"Shouye",
    data(){
        return{
            tit:"首页",
            house_arr: [
                {
                "name": "全部房源",
                "count": 185
                },
                {
                    "name": "在租",
                    "count": 139
                },
                {
                    "name": "已租",
                    "count": 57
                },
                {
                    "name": "待审核",
                    "count": 3
                },
                {
                    "name": "审核未通过",
                    "count": 2
                },
                {
                    "name": "已下架",
                    "count": 2
                }
            ]
        }
    },
    mounted(){
        this.$emit('toparent',this.tit)
    }
}
</script>

<style>

</style>
