//http.get
//http.post
//http.put
//http.delete
const { host, t_app_id, t_app_secret } = getApp().globalData

const HTTP = (method, url, data)=> {
  return new Promise((resolve, reject)=> {
    wx.request({
      url: `${host}${url}`,
      data,
      header: {
        Authorization: `Bearer ${wx.getStorageSync('X-token')}`,
        "t-app-id": t_app_id,
        "t-app-secret": t_app_secret
      },
      method,
      dataType: 'json',
      success(response){ 
        let statusCode = response.statusCode
        if(statusCode >= 400){
          wx.removeStorageSync('me')
          wx.removeStorageSync('X-token')
          wx.reLaunch({
            url: '/pages/login/login',
          })
          wx.showToast({
            icon: 'none',
            title: '登录已失效，请重新登录',
          })
          reject({
            statusCode,
            data: response.data
          })
        }else {
          resolve({ statusCode, response })
        }
      },
      fail(error){
        wx.showToast({
          title: '请求失败',
          icon: 'none',
        })
        reject(error)
      }
    })
  })
}

const http = {
  get(url, parmas){
    return HTTP('GET', url, parmas)
  },
  post(url, data){
    return HTTP('POST', url, data)
  },
  put(url, data){
    return HTTP('PUT', url, data)
  },
  delete(url, data){
    return HTTP('Delete', url, data)
  }
}

module.exports = {
  http
}