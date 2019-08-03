const { http } = require('../../lib/http.js')
const { app_id, app_secret } = getApp().globalData
Page({
  data: {
    active1: false,
  },
  down() {
    this.setData({ active1: true })
  },
  up() {
    this.setData({ active1: false })
  },
  login(event){
    let iv = event.detail.iv
    let encrypted_data = event.detail.encryptedData
    this.wxlogin(iv, encrypted_data)
  },
  wxlogin(iv, encrypted_data){
    wx.login({
      success: (res)=> {
        let code = res.code
        this.loginMe(code, iv, encrypted_data)
      }
    })
  },
  loginMe(code, iv, encrypted_data){
    http.post('/sign_in/mini_program_user', {
      code,
      iv,
      encrypted_data,
      app_id,
      app_secret
    }).then((response) => {
      wx.setStorageSync('me', response.response.data.resource)
      wx.setStorageSync('X-token', response.response.header["X-token"])
      wx.reLaunch({
        url: '/pages/clock/clock',
      })
    })
  }
})