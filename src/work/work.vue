<template>
    <ul class="work">
        <router-link to="update" tag="li">
            发起更名流程名单
        </router-link>
        <router-link to="transfer" tag="li">
            发起过户流程名单
        </router-link>
        <router-link to="maintain" tag="li">
            工程维护名单
        </router-link>
        <router-link to="type" tag="li">
            其他类型工单
        </router-link>
    </ul>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style>
* {
    padding: 0;
    margin: 0;
    list-style: none;
}

.work {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.work li{
    margin: 5px;
    width: 30%;
    height: 300px;
    line-height: 220px;
    text-align: center;
    background: #eee;
}

li{
    color: #aaa;
}
</style>

