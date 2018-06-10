<template>
     <h1>{{this.$route.params.name}}</h1>
</template>
<script>
    export default{
        data(){
            console.log(this.$route.params)
            return{

            }
        }
    }
</script>
<style>

</style>
