// pages/binding/binding.js
Page({
  data: {
    account: "",
    password: "",
    isBind: true,
  },
  watchAccount(event){
    let value = event.detail.value
    this.setData({ account: value })
  },
  watchPassword(event){
    let value = event.detail.value
    this.setData({ password: value })
  },
  zzz(){
    setTimeout(()=> {
      this.setData({ isBind: false })
    }, 200)
  },
  ccc(){
    setTimeout(() => {
      this.setData({ isBind: true })
    }, 200)
  },
  aaa(){
    console.log('绑定：功能关闭中')
  },
  sss() {
    console.log("注册：功能关闭中")
  }
})