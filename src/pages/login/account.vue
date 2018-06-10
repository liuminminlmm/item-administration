<template>
    <div class="account">
        <el-form label-position="top" label-width="80px" ref="form" :model="loginModel">
            <el-form-item label="登录账号" prop="account" :rules="rules">
                <el-input placeholder="请输入手机号或者邮箱" v-model="loginModel.account"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="isphonedisable" @click="changeFn('phone')">{{msg}}</el-button>
                <el-button :disabled="isaccountdisable" @click="changeFn('email')">{{msg2}}</el-button>
            </el-form-item>
            <el-form-item label="动态密码" prop="random" :rules="ruless">
                <el-input placeholder="请输入动态密码" v-model="loginModel.random"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="gotoregister">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginModel: {
                account: '',
                random: ''
            },
            rules: [
                { required: true, message: '请输入账户信息！' }
            ],
            ruless: [
                { required: false, message: '请输入登录信息！' }
            ],
            msg: '使用手机号登录',
            msg2: '使用邮箱登录',
            isphonedisable: false,
            isaccountdisable: false,
            timer: null
        }
    }, methods: {
        gotoregister() {
            // sessionStorage.setItem('token',this.random);
            // this.$router.push({
            //     name:'home'
            // })
            this.ruless.push({
                validator: (rule, value, callback) => {
                if (value == this.random) {
                    callback();
                } else {
                    callback(new Error('请输入正确的密码！'))
                }

            }
            })
            
            this.$refs.form.validate((isVaild, rules) => {
                if (isVaild) {
                    sessionStorage.setItem('token', this.random);
                    this.$router.push({
                        name: 'home'
                    })
                }
            })
        },
        countdown(type) {
            let start = 10;
            this.timer = setInterval(() => {
                if (start > 0) {
                    start--;
                    if (type == 'phone') {
                        this.msg = start;
                        this.isphonedisable = true;
                    } else if (type == 'email') {
                        this.msg2 = start;
                        this.isaccountdisable = true;
                    }
                } else {
                    if (type == 'phone') {
                        this.msg = '重新发送手机号登录';
                        this.isphonedisable = false;
                        clearInterval(this.timer);
                    } else if (type == 'email') {
                        this.msg2 = '重新发送邮箱号登录';
                        this.isaccountdisable = false;
                        clearInterval(this.timer);
                    }
                }

            }, 1000)


        },
        changeFn(type) {
            //防止手机号 跟邮箱重复出现
            if (this.rules.length > 1) {
                this.rules.pop();
            }
            if (type == 'phone') {
                this.rules.push({
                    validator: (rule, value, callback) => {
                        if ((/^1[3578]\d{9}$/).test(value)) {
                            callback();
                        } else {
                            callback(new Error('请输入正确格式的手机号！'))
                        }

                    }, message: '请重新输入手机号'
                })

            } else if (type == 'email') {
                this.rules.push({ type, message: '请重新输入邮箱' })
            }
            this.$refs.form.validate((isVaild, rules) => {
                //console.log(isVaild);
                if (isVaild) {
                    this.countdown(type);
                    let randomItem = Math.random().toString().substr(2,4);
                   this.random = randomItem;
                    console.log(randomItem);
                }
            })
        }
    }
}

</script>
<style>

</style>