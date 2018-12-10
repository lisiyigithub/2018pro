<template>
	<div class="other">
		其他
	</div>
</template>

<script>
	export default{
		name:"Other",
		data(){
			return{
				tit:'其他'
			}
		},
		mounted(){
			this.$emit('toparent',this.tit)
		}
	}
</script>

<style>
</style>