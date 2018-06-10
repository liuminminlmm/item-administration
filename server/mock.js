var fs = require('fs');
var Mock = require('mockjs');
let Random = Mock.Random;
let res = Mock.mock({
    "tableList|100": [
        {
            name: () => Random.cname(),
            id: () => Random.id(),
            mobile: /^1[3578]\d{9}$/,
            date: () => Random.date(),
            email: () => Random.email(),
            "org|1": [
                "工程维护部本部",
                "黄永璋组",
                "企业营销",
                "专网事业部",
                "资产管理部",
                "电信通行政部",
                "人事行政部",
                "财务部",
                "电信通帐务部",
                "法务部"],
            "forg|1": [
                "电信通后台2部",
                "教育业务部",
                "北京电信通电信工",
                "电信通后台1部",
                "教育业务部",
                "北京电信通电信工",
                "电信通后台1部",
                "电信通后台1部",
                "北京电信通电信工",
                "电信通后台1部"],
                auth:"",
                "code|100-600":1
        }
    ]
})
fs.writeFile('table.json', JSON.stringify(res), function () {
    console.log('success');
})