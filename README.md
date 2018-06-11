# 项目总结

1:这是电信通集团长城宽带项目,主要内容是人员管理，整个项目结合Vue框架和Vuex进行数据管理,vue-router路由跳转和elementUI的组件引用;

2:基于官方vue-cli脚手架，并在vue-cli基础这上做了一些修改：自定义配置,例如:
    
* 增添了alias:{
        "@":"src"
    }
* ...

3:Vuex数据主要用

 * new Vuex.Store({state:{},minutions:{},acions:{},getters:{}})
 进行数据存储,在应用数据页面this.$store.dispatch('函数名')进行触发

 4:路由搭建(嵌套路由,引用router-link跳转页面),及应用
 * {
     routes:[{
        name: 'login',
        path: '/login',
        component: Login,
        children:[{}]
     }]
 }

 5:特色模块
 * 表格：内容，功能比较多,结合elementuI功能复用,结构嵌套多层
 * 登录，注册：功能完善,结构简洁明了,权限设置
 * ...

 6:遇到的问题
 * 路由多级嵌套产生混淆，按模块化分析解决问题
 * vuex中数据管理this指向不同，分析配置环境解决问题
 * elementuI原生组件与原型不够相符，自定义封装解决问题



For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
