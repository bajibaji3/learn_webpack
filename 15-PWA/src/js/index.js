import '../css/test1.css'
import '../css/test2.css'

/*
  1、eslint不认识window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
      "env": {
        "browser": true //支持浏览器端全局变量
      }
  2、sw代码必须运行在服务器上
*/
//注册serviceWorker
//处理兼容性问题
if ('serviceworker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('sw注册成功');
    }).catch(() => {
      console.log('sw注册失败');
    })
  })
}