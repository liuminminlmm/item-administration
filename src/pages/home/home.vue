<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu v-for="(items,index) in list" :index="index+1+''" :key="index">
                        <template slot="title">
                            <i class="el-icon-message"></i>{{items.name}}</template>
                        <el-menu-item-group v-for="(items2,ind) in items.subdata" :key="ind">
                            <el-menu-item :index="(index+1)+'+'+(ind+1)">
                                <router-link :to="{name:items2.type}">{{items2.name}}</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
export default {
    // data() {
    //     return {
    //         list: []
    //     }
    // },
    methods: {
        ...mapActions(['fetchData']),
      

    },
    computed: {
        ...mapState(['list']),
       
    },
    mounted() {
        //请求数据之二
        // this.$http.get('../../../server/data.json').then(res => {
        //     this.list = res.data;
        //     // console.log(res.data)
        // })
        //请求数据之一
        // axios.get('../../../server/data.json').then(res => {
        //     console.log(res.data);
        // })
        //请求数据之三，用Vuex存储数据 用$store.state.list显示视图
        // this.$store.dispatch('fetchData')
        //Vuex用map映射反应视图
        this.fetchData();
      
    }
}


</script>
<style>

</style>
