//按需导入Toast组件
// import {Toast} from 'mint-ui'
// import axios from 'axios'

// axios.defaults.baseURL = 'http://yfps.ngrok.it-wpf.info';
//  axios.defaults.timeout = 3000;
// axios.interceptors.response.use((res)=>{
//   return res.data;
// })

//在前端发给后端ajax中间进行一次拦截
// axios.interceptors.request.use(config =>{
//     loading.open('数据在路上......')
//     return config;
// },error =>{
//     return Promise.reject(error);
// });

//在后端返回数据给前端之前拦一下，主要做状态码错误吗判断。
// axios.interceptors.response.use(response => {
//     switch(response.status){
//        case 200:
//        loading.close('数据在路上......')
//        response.data.data = JSON.parse(response.data.data) 
//              return response;
//              break;
//        default:
//            Toast({position: 'top', time: 1200,message: "请求失败"  });
//         break;
//   }
// // });
// export default {
//       getcode(url){//获取轮播图
//           return axios.get(url);
//       },
//     // Get 请求
//    get (params){
//       // axios.defaults.headers.common['token'] = params.token;
//        return new Promise((resolve,reject) =>{
//         axios.get(params.url)
//        .then(success =>{
//            resolve(success.data)
//            console.log(success.data)
//        })
//        .catch(error =>{
//         Toast({
//             icon: 'error',
//             time: 1200,
//             mes: "get 请求失败"
//          });
//        })
//     })
       
//    },
//   //post 请求
//   post (params){
//   //  axios.defaults.headers.common['token'] = params.token;
//      return new Promise((resolve,reject) =>{
//        axios.post(params.url,params.bar)
//     .then(response =>{
//         resolve(response.data)
//     })
//     .catch(error =>{
//      Toast({
//           icon: 'error',
//           time: 1200,
//           mes: "post 请求失败"
//       });
//     })
//      })
   
// }

// // }
// export function get(url, params){
//   return new Promise((resolve, reject) =>{
//       axios.get(url, {
//           params: params
//       })
//       .then(res => {
//           resolve(res.data);
//       })
//       .catch(err => {
//           reject(err.data)
//       })
//   });
// }
// export function post(url, params) {
//   return new Promise((resolve, reject) => {
//       axios.post(url, QS.stringify(params))
//       .then(res => {
//           resolve(res.data);
//       })
//       .catch(err => {
//           reject(err.data)
//       })
//   });
// }
//get 请求
//  async created(){
//   let name={
//     id:1
//   }
//   let data= await this.$http.get({
//     url:"/shop/info?id=1",
//     token:name
//   });
//   console.log(data)
// }
