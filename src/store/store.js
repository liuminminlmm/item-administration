import Vue from 'vue';
import Vuex from 'vuex';
import {instance as http} from './../utils/http.js';
Vue.use(Vuex);
//store是一个实例对象

let store = new Vuex.Store({
    state:{
        list:[],
        group:[],
        table:[]
    },
    //用updateMenu(state,data){}老更新state数据， 通过commit来触发一个mutation 
    mutations:{
        updateList(state,data){
           state.list = data;
           console.log(data);
        },
         updateGroup(state,data){
           state.group = data;
        },
          updateTable(state,data){
           state.table = data;
        },
        updelete(state,data){
            // console.log(data)
            let tmp = [...state.table];
            let ind;
            tmp.forEach((item,index)=>{
                if(item.code == data){
                    ind = index;
                }
            })
            tmp.splice(ind,1);
            state.table = tmp;
        }
    },
    //中做异步请求数据,用dispatch触发该函数
    actions:{
        fetchData({commit}){
           http.get('./../../server/data.json').then(res=>{   
            //    console.log(res.data);
               commit('updateList',res.data)
           })
            // console.log(commit);
        },
        groupData({commit}){
            http.get('./../../server/group.json').then(res=>{
               commit('updateGroup',res.orgs)
            })
           
        },
        tableData({commit,state},cb){
            http.get('./../../server/table.json').then(res=>{
                setTimeout(()=>{
                    commit('updateTable',res.tableList);
               cb();
                },2000)
            })
         
        },
        deleteItem({commit},cb){
            commit('updelete',cb);
        }
    },
    //对我们已有的数据进行过滤
    getters:{
        filterGroup(state){
            // console.log(state);
            return (filter)=>{
                // console.log(filter)
                if(filter){
                   let  res =  state.group.filter((item)=>{
                        return item.ORGNAME.indexOf(filter)>-1 || item.FORGNAME.indexOf(filter)>-1
                    })
                    return res;
                }
                 return state.group;
            }
           
        }
    },
    modules:{}
})
export default store;