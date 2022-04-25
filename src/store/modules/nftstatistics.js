  import {get} from 'axios'
  export default{
    namespaced:true,
    state:{
      "name":'Nftstatistics',
    },
    mutations:{
      //普通方法
      getname(state){
        console.log(state.name);
      }
    },
    actions:{
      //异步方法
      fetchData(){
        get("www/sss").then((msg)=>{
            console.log(msg)
        })
      }
    }
  }
