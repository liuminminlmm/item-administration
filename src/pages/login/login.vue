<template>
<div class="box">
    <div class="login">
        <p>
            <span @click="page='TwoCode'" :class="{show:page==='TwoCode'}">二维码登录</span>
            <span @click="page='Account'" :class="{show:page==='Account'}">账号登录</span>
        </p>
        <Component class="cont" :is="page"></Component>
    </div>
    </div>
</template>
<script>
import TwoCode from './twocode.vue';
import Account from './account.vue';
export default {
    data() {
        return {
            page: 'TwoCode'
        }
    },
    methods: {

    },
    components: {
        TwoCode, Account

    },
    beforeEnter:(to,from,next)=>{
         next();
    }

}

</script>
<style>
* {
    padding: 0;
    margin: 0;
    list-style: none;
}

body,
html,
#app{
    width: 100%;
    height: 100%;
}

.box{
     background-image: url('../../img/login.png');
    background-size: 100% 100%;
    position: relative;
      width: 100%;
    height: 100%;
}

.login {
  
    position: absolute;
    right: 88px;
    top: 180px;
}

.login p span.show {
    background: #aaa;
}
</style>