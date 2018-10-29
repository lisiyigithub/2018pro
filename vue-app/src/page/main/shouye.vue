<template>
    <div class="shouye">
        首页
    </div>
</template>

<script>
export default {
    name:"Shouye",
    data(){
        return{
            tit:"首页"
        }
    },
    mounted(){
        this.$emit('toparent',this.tit)
    }
}
</script>

<style>

</style>
