<template>
    <div>
        <el-tree class="filter-tree" :data="data2" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2" @node-click="go">
        </el-tree>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filterText: '',
            data2: [{
                id: 1,
                label: '应用菜单树',
                children: [{
                    id: 4,
                    label: '组织权限管理',
                    children: [{
                        id: 9,
                        name: 'account',
                        label: '员工账号管理'
                    }, {
                        id: 10,
                        name: 'application',
                        label: '应用功能管理'
                    }]
                }, {
                    id: 4,
                    label: '我的工作',
                    children: [{
                        id: 9,
                        name: 'account',
                        label: '员工账号管理'
                    }, {
                        id: 10,
                        name: 'application',
                        label: '应用功能管理'
                    }]
                }, {
                    id: 4,
                    label: '客户管理',
                    children: [{
                        id: 9,
                        name: 'account',
                        label: '员工账号管理'
                    }, {
                        id: 10,
                        name: 'application',
                        label: '应用功能管理'
                    }]
                }, {
                    id: 4,
                    label: '业务审批',
                    children: [{
                        id: 9,
                        label: '员工账号管理'
                    }, {
                        id: 10,
                        label: '应用功能管理'
                    }]
                }]
            }], defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    }, watch: {
        filterText(val) {
            this.$refs.tree2.filter(val);
        }
    },

    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        go(a, b, c) {
            // console.log(a);
            // console.log(c);
            let data = b.data;
            console.log(data);
            this.$router.push({
                name: 'organization',
                params: {
                    name: data.name
                }
            })
        }
    }

}
</script>
<style>

</style>
