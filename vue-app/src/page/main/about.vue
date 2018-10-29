<template>
    <div class="about">
        关于
    </div>
</template>

<script>
export default {
    name:"About",
    data(){
        return{
            tit:"关于"
        }
    },
    mounted(){
        this.$emit('toparent',this.tit)
    }
}
</script>

<style>

</style>
