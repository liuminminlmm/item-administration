<template>
    <section>
        <el-form ref="form" :model="form">
            <el-form-item label="用户姓名">
                <el-input v-model="form.name" size="small">
                </el-input>
            </el-form-item>
            <el-form-item label="员工编号">
                <el-input input v-model="form.name" suffix-icon="el-icon-date">
                </el-input>
            </el-form-item>
            <el-form-item label="用户邮箱">
                <el-input input v-model="form.name" suffix-icon="el-icon-date">
                </el-input>
            </el-form-item>
            <el-form-item label="归属组织">
                <el-popover placement="right" width="400" trigger="click">
                    <el-container direction="vertical">
                        <el-form>
                            <el-row>
                                <el-col :span="18">
                                    <el-form-item label="组织名称">
                                        <el-input size="small" v-model="a"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-button size="small" @click="filterItem=a">查询</el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-table :data="filterGroup()(filterItem)" :stripe="true" :height="300" @row-click="showData">
                            <el-table-column width="60" type="index" label="序号"></el-table-column>
                            <el-table-column width="150" property="ORGNAME" label="组织名称"></el-table-column>
                            <el-table-column width="150" property="FORGNAME" label="上级组织"></el-table-column>
                        </el-table>
                    </el-container>
                    <el-input v-model="newform.group" suffix-icon="el-icon-date" slot="reference">
                    </el-input>
                </el-popover>
            </el-form-item>
        </el-form>
        <hr/>
        <el-table :data="dataPage" border style="width: 100%" size="small" v-loading="tableLoading">
            <el-table-column type="index" width="50" label="序号">
            </el-table-column>
            <el-table-column fixed prop="name" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="id" label="员工ID" width="120" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="code" label="员工编号" width="120">
            </el-table-column>
            <el-table-column prop="mobile" label="手机号" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="120" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="org" label="归属组织" width="120">
            </el-table-column>
            <el-table-column prop="auth" label="权限" width="120">
            </el-table-column>
            <el-table-column prop="forg" label="上级组织" width="120" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="date" label="创建时间" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteFn(scope)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-size="pageSize" @current-change="pageChange" background layout="prev, pager, next" :total="table.length">
        </el-pagination>
        <el-button size="small" @click="addFn" class="add">新增</el-button>
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form ref="newf" :model="newform" :rules="newformRules">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="newform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工ID" prop="id">
                    <el-input v-model="newform.id" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工编号" prop="code">
                    <el-input v-model="newform.code" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="newform.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="newform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="归属组织" prop="org">
                    <el-input v-model="newform.org" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上级组织" prop="forg">
                    <el-input v-model="newform.forg" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                    <el-select v-model="newform.region" placeholder="请选择">
                        <el-option label="省份证" value="shenfen"></el-option>
                        <el-option label="毕业证" value="biye"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import { mapActions } from 'vuex';
import { mapState, mapGetters } from 'vuex';
export default {
    data() {
        let validator = (rule,value,callback) => {
            if (!value) {
                return callback(new Error('不能为空'));
            } else {
                return callback();
            };
        }
        return {
            form: {
                name: 'AA',
                group: '未知组织'
                // getData: [{

                // }]
            }, newform: {
                date: '',
                name: '',
                email: '',
                org: '',
                forg: '',
                mobile: '',
                auth: '',
                code: '',
                id: ''
            }, newformRules: {
                // name: [{
                //     required: true, message: '请填写姓名', trigger: 'blur'
                // }, {
                //     type: "string", message: "必须写名字", trigger: 'change'
                // }],
                name:[{ validator, trigger: 'blur' }],
                email: [{ validator, trigger: 'blur'}]
            },
            filterItem: '',
            a: '',
            tableLoading: false,
            pageSize: 5,
            page: 1,
            formLabelWidth: "80",
            dialogFormVisible: false
            // tableData: [{
            //     date: '',
            //     name: '',
            //     email: '',
            //     org: '',
            //     forg: '',
            //     mobile: '',
            //     auth: '',
            //     code: '',
            //     id: ''
            // }]

        }
    }, computed: {
        ...mapState(['group', 'table']),
        dataPage() {
            // console.log(this.table)
            return this.table.slice(this.pageSize * (this.page - 1), this.pageSize * this.page);
        }

    }, methods: {
        ...mapActions(['groupData', 'tableData',"deleteItem"]),
        showData(row, event, column) {
            // console.log(row);
            // console.log(event);
            // console.log(column);
            this.form.group = row.ORGNAME;
        },
        ...mapGetters(['filterGroup']),
        toTableData() {
            this.tableLoading = true;
            this.tableData(() => {
                this.tableLoading = false;
            })
        },
        pageChange(page) {
            console.log(page);
            this.page = page;
        },
        addFn() {
            this.newform = {
                date: '',
                name: '',
                email: '',
                org: '',
                forg: '',
                mobile: '',
                auth: '',
                code: '',
                id: ''
            },
                this.dialogFormVisible = true;
        },
        deleteFn(scope) {
            this.$confirm('确定删除', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                callback:()=>{
                    this.deleteItem(scope.row.code)
                }
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleClick(scope) {
            this.dialogFormVisible = true;
            console.log(scope);
            this.newform = scope.row;
        },
        sure() {
            this.$refs.newf.validate((isValid, tag) => {
                console.log(isValid, tag);
                this.dialogFormVisible = false;
            })
        }
    },
    mounted() {
        this.groupData();
        this.filterGroup();
        this.toTableData();
    }
}
</script>
<style>
.demo-input-suffix {
    display: flex;
}

.el-form .el-form-item {
    display: inline-flex;
    width: 50%;
}
.el-row{
    display: flex;
    width: 100%;
}
.el-col-6 {
    flex: 1;
    line-height: 5;
}
.el-col{
    width: 100%;
}
.el-pagination {
    margin: 8px 0;
    float: left;
}

.add {
    margin: 8px 0;
    float: right;
}

.el-form {
    display: flex;
    flex-wrap: wrap;
}

.el-dialog .el-form-item {
    width: 50%;
}

.el-form-item__content {
    width: 100px;
}
</style>
