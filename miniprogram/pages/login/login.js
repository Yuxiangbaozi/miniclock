const { http } = require('../../lib/http.js')
const { app_id, app_secret } = getApp().globalData
Page({
  data: {
    active1: false,
  },
  onShow(){
    http.get('/todos')
  },
  down() {
    this.setData({ active1: true })
  },
  up() {
    this.setData({ active1: false })
  },
  login(event){
    let code
    let iv = event.detail.iv
    let encrypted_data = event.detail.encryptedData
    wx.login({
      success(res) {
        code = res.code
        http.post('/sign_in/mini_program_user', {
          code,
          iv,
          encrypted_data,
          app_id,
          app_secret
        })
        .then((response)=> {
          wx.setStorageSync('me', response.data.resource)
          wx.reLaunch({
            url: '/pages/clock/clock',
          })
        })
      }
    })
  },
})