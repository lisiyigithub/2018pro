<template>
    <div class="mine">
        我的
    </div>
</template>

<script>
export default {
    name:"Mine",
    data(){
        return{
            tit:"我的"
        }
    },
    mounted(){
        this.$emit('toparent',this.tit)
    }
}
</script>

<style>

</style>
